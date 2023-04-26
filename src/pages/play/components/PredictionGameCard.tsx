import { useEffect, useState, useMemo } from "react"
import {
    Text,
    Flex,
    Icon,
    Spacer,
    Heading,
    Image,
    Tag,
    HStack,
    VStack,
    Button,
    Box,
    NumberInput,
    NumberInputField
} from "@chakra-ui/react"
import { useRecoilState } from "recoil"
// import { FaBan, FaClock, FaPlayCircle } from "react-icons/fa"
// import { getTokenPriceCoinGecko } from "utils/prices/getTokenPrice"
import { CountdownTimer } from "./CountdownTimer"

import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import MotionFlex from "theme/motion/components/MotionFlex"
import { claimRoundIdState, currentVotingState } from "state/voteState"
import { FaArrowLeft } from "react-icons/fa"
import { balanceState } from "state/userInfo"
import { SwapIcon } from "components/Assets/SwapIcon"
import { TRound, TRoundsStatus } from "types"
import { configState, currentTimeState } from "state/roundsState"
import { btcPriceState } from "state/btcPriceState"
import useContract from "hooks/useContract"
import {
    ConnectedChain,
    FuzioContract,
    FuzioOptionContract
} from "../../../constants"
import { useChain } from "@cosmos-kit/react"
import { toast } from "react-toastify"
import { IoClose } from "react-icons/io5"

dayjs.extend(duration)

const getColorByNumber = (num: number): string =>
    num > 0 ? "#00dd31" : num < 0 ? "#dd0000" : "white"

export const PredictionGameCard = ({
    connect,
    address,
    time,
    round
}: {
    connect: () => void
    address?: string
    time?: number
    round: TRound
}) => {
    const [votingState, setVotingState] = useRecoilState(currentVotingState)
    const [balance] = useRecoilState(balanceState)
    const [currentTime] = useRecoilState(currentTimeState)
    const [config] = useRecoilState(configState)
    const [btcPrice] = useRecoilState(btcPriceState)
    const [claimRoundId, setClaimRoundId] = useRecoilState(claimRoundIdState)

    const { createExecuteMessage, runExecute, runQuery } = useContract()
    const { getSigningCosmWasmClient } = useChain(ConnectedChain)

    const [isPending, setIsPending] = useState(false)
    const [claimableAmount, setClaimableAmount] = useState(0)
    const [inputValue, setInputValue] = useState<number | string>("")
    // const gameIcon = useMemo(() => {
    //   switch (gameStatus) {
    //     case "expired":
    //       return <Icon as={FaBan} />
    //     case "live":
    //       return <Icon as={FaPlayCircle} />
    //     case "next":
    //       return <Icon as={FaPlayCircle} />
    //     case "later":
    //       return <Icon as={FaClock} />
    //     case "calculating":
    //       return <Icon as={FaClock} />
    //     default:
    //       break
    //   }
    // }, [gameStatus])

    // useEffect(() => {
    //   console.log(
    //     // getTokenPriceCoinGecko({ tokenId: "juno-network", precision: 6 })
    //     dayjs().add(5, "m").unix()
    //   )
    // })
    const gameStatus: TRoundsStatus = useMemo(() => {
        const { open_time, close_time } = round
        const roundInterval = config.next_round_seconds || 0
        const biddingTime = currentTime + roundInterval * 1e3
        if (biddingTime < open_time) return "later"
        if (biddingTime > open_time && biddingTime < close_time) return "next"
        if (currentTime > open_time && currentTime < close_time) return "live"
        if (round.winner === undefined) return "calculating"
        return "expired"
    }, [currentTime, config, round])

    const prizeAmount =
        ((round.bear_amount || 0) + (round.bull_amount || 0)) / 1e6

    const { lockedPrice, direction, isWinner } = useMemo(() => {
        if (!address) return { lockedPrice: 0, direction: "", isWinner: false }
        const users = round.users || []
        if (!users.length)
            return { lockedPrice: 0, direction: "", isWinner: false }
        const myInfo = users.find((user) => user.player === address)
        if (!myInfo) return { lockedPrice: 0, direction: "", isWinner: false }
        return {
            lockedPrice: Number(myInfo.amount) / 1e6,
            direction: myInfo.direction,
            isWinner: myInfo.direction === round.winner
        }
    }, [round, address])

    useEffect(() => {
        if (address && votingState === "claim" && claimRoundId === round.id) {
            ;(async () => {
                const response = await runQuery(FuzioOptionContract, {
                    my_pending_reward_round: {
                        round_id: `${round.id}`,
                        player: address
                    }
                })
                    .then((res) => Number(res.pending_reward) / 1e6)
                    .catch(() => 0)
                setClaimableAmount(response)
            })()
        }
    }, [address, round, votingState, claimRoundId])

    const handleChangeInputValue = (event) => {
        event.preventDefault()
        setInputValue(event.target.value)
    }

    const handleConfirm = async () => {
        if (votingState === "none" || !address || !inputValue) return

        setIsPending(true)

        const transactions = [
            createExecuteMessage({
                senderAddress: address,
                contractAddress: FuzioContract,
                message: {
                    increase_allowance: {
                        spender: FuzioOptionContract,
                        amount: `${Number(inputValue) * 1e6}`
                    }
                }
            }),
            createExecuteMessage({
                senderAddress: address,
                contractAddress: FuzioOptionContract,
                message: {
                    [votingState === "up" ? "bet_bull" : "bet_bear"]: {
                        round_id: `${round.id}`,
                        amount: `${Number(inputValue) * 1e6}`
                    }
                }
            })
        ]
        const signingCosmWasmClient = await getSigningCosmWasmClient()
        signingCosmWasmClient
            .signAndBroadcast(address, transactions, "auto")
            .then(() => {
                toast.success("Transaction Success!")
                setVotingState("none")
            })
            .catch((e) => {
                toast.error(e.message)
            })
            .finally(() => setIsPending(false))
    }

    const handleCollectWinnings = async () => {
        setIsPending(true)
        runExecute(FuzioOptionContract, {
            collection_winning_round: {
                round_id: `${round.id}`
            }
        })
            .then(() => toast.success("Successfully Collected."))
            .catch((e) => toast.error(e.message))
            .finally(() => setIsPending(false))
    }

    return (
        <MotionFlex
            h="24rem"
            w="20rem"
            rounded="1em"
            bg={gameStatus === "expired" ? "#25425A" : "#00283A "}
            shadow="md"
            _dark={{ bg: "gray.700" }}
            overflow="hidden"
            pos="relative"
            // whileHover={{ opacity: 1 }}
            opacity={
                votingState === "none" ||
                (votingState === "claim" && claimRoundId == round.id)
                    ? 1
                    : gameStatus === "next"
                    ? 1
                    : 0.34
            }
            style={{ transition: "opacity 0.5s" }}
        >
            {claimRoundId !== round.id && (
                <Flex
                    px={2}
                    py={2}
                    align="center"
                    gap={1}
                    h="2rem"
                    w="full"
                    color={
                        gameStatus === "next" || gameStatus === "later"
                            ? "black"
                            : "white"
                    }
                    bg={
                        gameStatus === "expired"
                            ? "transparent"
                            : gameStatus === "live"
                            ? "#00b932"
                            : gameStatus === "calculating"
                            ? "#ffcf3f"
                            : "#00AAFF"
                    }
                    _dark={{
                        bg:
                            gameStatus === "next"
                                ? "rgba(60,230,130, 1)"
                                : "gray.600",
                        color:
                            gameStatus === "next"
                                ? "gray.700"
                                : gameStatus === "expired"
                                ? "gray.300"
                                : "rgba(60,230,130, 1)"
                    }}
                    position="relative"
                    _after={{
                        content: '""',
                        width: "100%",
                        height: "6px",
                        backgroundColor:
                            gameStatus === "expired"
                                ? "rgba(217, 217, 217, 0.5)"
                                : "transparent",
                        position: "absolute",
                        left: 0,
                        bottom: "-6px"
                    }}
                >
                    {/* {gameIcon} */}
                    {gameStatus !== "next" ||
                    votingState === "none" ||
                    (votingState === "claim" && claimRoundId !== round.id) ? (
                        <Box
                            w="1.2rem"
                            h="1.2rem"
                            rounded="full"
                            bg={
                                gameStatus === "expired"
                                    ? "#B1B1B1"
                                    : gameStatus === "live"
                                    ? "#00DD31"
                                    : "white"
                            }
                        />
                    ) : (
                        <Icon
                            as={FaArrowLeft}
                            onClick={() => setVotingState("none")}
                        />
                    )}
                    <Text fontWeight="600">
                        {gameStatus !== "next" ||
                        votingState === "none" ||
                        (votingState === "claim" && claimRoundId !== round.id)
                            ? gameStatus.toUpperCase()
                            : "Set Position"}
                    </Text>
                    <Spacer />
                    <Text>{`#${round.id}`}</Text>
                </Flex>
            )}
            {votingState === "none" ||
            (votingState === "claim" && claimRoundId !== round.id) ||
            (gameStatus !== "next" && claimRoundId !== round.id) ? (
                <>
                    <svg width="0" height="0">
                        <defs>
                            <clipPath
                                id="upClip"
                                clipPathUnits="objectBoundingBox"
                            >
                                <path d="M0.999,0.764 C0.997,0.654,0.981,0.576,0.953,0.536 C0.922,0.492,0.891,0.454,0.859,0.414 C0.769,0.298,0.679,0.184,0.59,0.065 C0.536,-0.006,0.483,-0.027,0.428,0.044 C0.302,0.206,0.176,0.368,0.05,0.531 C0.019,0.571,0.001,0.663,0.001,0.783 C0.001,0.846,0,0.91,0.001,0.973 C0.001,0.985,0.001,0.994,0,1 L1,1 C0.999,0.994,0.999,0.985,0.999,0.973 C1,0.903,1,0.833,0.999,0.764" />
                            </clipPath>
                            <clipPath
                                id="downClip"
                                clipPathUnits="objectBoundingBox"
                            >
                                <path d="M0.001,0.236 C0.003,0.346,0.019,0.424,0.047,0.464 C0.078,0.508,0.109,0.546,0.141,0.586 C0.231,0.702,0.321,0.816,0.41,0.935 C0.464,1,0.517,1,0.572,0.956 C0.698,0.794,0.824,0.632,0.95,0.469 C0.981,0.429,0.999,0.337,0.999,0.217 C0.999,0.154,1,0.09,0.999,0.027 C0.999,0.015,0.999,0.006,1,0 H0 C0.001,0.006,0.001,0.015,0.001,0.027 C0,0.097,0,0.167,0.001,0.236" />
                            </clipPath>
                        </defs>
                    </svg>
                    {isWinner && direction === "bull" ? (
                        <HStack
                            top="3.5rem"
                            left="0"
                            w="100%"
                            zIndex="2"
                            pos="absolute"
                            backgroundColor="#00B3FF"
                            p={1}
                            alignItems="center"
                            justifyContent="center"
                            gap={1}
                        >
                            <Image h="2.5rem" src="/assets/cup.png" />
                            <Button
                                color="white"
                                backgroundColor="#005b77"
                                border="1px solid white"
                                onClick={() => {
                                    setVotingState("claim")
                                    setClaimRoundId(round.id)
                                }}
                                disabled={isPending}
                            >
                                Collect Winnings
                            </Button>
                        </HStack>
                    ) : (
                        <VStack
                            top="3.5rem"
                            left="calc(50% - 7.25rem)"
                            w="14.5rem"
                            zIndex="2"
                            pos="absolute"
                        >
                            <Heading
                                fontSize="20"
                                pt={5}
                                pb={1}
                                color={
                                    gameStatus === "later"
                                        ? "transparent"
                                        : gameStatus === "next"
                                        ? lockedPrice
                                            ? "white"
                                            : "transparent"
                                        : "#00283A"
                                }
                                clipPath="url(#upClip)"
                                bg={
                                    round.close_price - round.open_price > 0
                                        ? "#00dd31"
                                        : "#B1B1B1"
                                }
                                width="70%"
                                height="100%"
                                textAlign="center"
                            >
                                UP
                            </Heading>
                        </VStack>
                    )}
                    {gameStatus === "next" && (
                        <Flex
                            w="14.5rem"
                            h="9rem"
                            justify="center"
                            gap={0}
                            bg="transparent"
                            _dark={{ bg: "gray.600" }}
                            zIndex={2}
                            rounded="1em"
                            // shadow="md"
                            top="calc(50% - 3.5rem)"
                            left="calc(50% - 7.25rem)"
                            pos="absolute"
                            flexDirection="column"
                            px={3}
                            py={1}
                            color="white"
                        >
                            <VStack w="full" pt={1}>
                                {address && !lockedPrice && (
                                    <Button
                                        colorScheme="green"
                                        shadow="md"
                                        w="full"
                                        rounded="1em"
                                        onClick={() => {
                                            setVotingState("up")
                                        }}
                                    >
                                        UP
                                    </Button>
                                )}
                                <Flex
                                    fontWeight="600"
                                    fontSize="16"
                                    justifyContent="space-between"
                                    w="100%"
                                    flexDirection={
                                        lockedPrice ? "column" : "row"
                                    }
                                    alignItems="center"
                                >
                                    <Text>Prize Pool:</Text>
                                    <HStack spacing={0.5}>
                                        <Text>{prizeAmount}</Text>
                                        <Image
                                            w="1.5rem"
                                            src="/assets/logo_transparent.png"
                                        />
                                    </HStack>
                                </Flex>
                                {address && !lockedPrice && (
                                    <Button
                                        colorScheme="red"
                                        shadow="md"
                                        w="full"
                                        rounded="1em"
                                        onClick={() => {
                                            setVotingState("down")
                                        }}
                                    >
                                        DOWN
                                    </Button>
                                )}
                                {!address && (
                                    <Button
                                        colorScheme="red"
                                        shadow="md"
                                        w="full"
                                        rounded="1em"
                                        style={{ backgroundColor: "#00b3ff" }}
                                        onClick={connect}
                                    >
                                        CONNECT
                                    </Button>
                                )}
                            </VStack>
                        </Flex>
                    )}
                    {gameStatus === "later" && (
                        <Flex
                            w="14.5rem"
                            h="8rem"
                            justify="center"
                            _dark={{ bg: "gray.600" }}
                            gap={0}
                            bg="transparent"
                            zIndex={2}
                            rounded="1em"
                            // shadow="md"
                            top="calc(50% - 3rem)"
                            left="calc(50% - 7.25rem)"
                            pos="absolute"
                            flexDirection="column"
                            px={3}
                            py={1}
                            color="white"
                        >
                            <Text w="full" textAlign="center" fontSize="13">
                                Game starts in:
                            </Text>
                            <CountdownTimer
                                timeTo={dayjs()
                                    .add(time ?? 0, "m")
                                    .unix()}
                            />
                        </Flex>
                    )}
                    {gameStatus === "live" && (
                        <Flex
                            w="14.5rem"
                            h="8rem"
                            justify="center"
                            gap={0}
                            bg="transparent"
                            _dark={{ bg: "gray.600" }}
                            zIndex={2}
                            rounded="1em"
                            // shadow="md"
                            top="calc(50% - 3rem)"
                            left="calc(50% - 7.25rem)"
                            pos="absolute"
                            flexDirection="column"
                            px={3}
                            py={1}
                            color="white"
                        >
                            <Text fontSize="13">Last Price</Text>
                            <Flex justifyContent="space-between">
                                <Heading
                                    fontSize="26"
                                    color={getColorByNumber(
                                        btcPrice.priceNumber -
                                            (round.open_price || 0)
                                    )}
                                >{`$${btcPrice.price}`}</Heading>
                                <Text
                                    color={getColorByNumber(
                                        btcPrice.priceNumber -
                                            (round.open_price || 0)
                                    )}
                                >{`$${
                                    btcPrice.priceNumber -
                                    (round.open_price || 0)
                                }`}</Text>
                            </Flex>
                            <Flex
                                pt={3}
                                fontSize="13"
                                justifyContent="space-between"
                            >
                                <Text>Locked Price:</Text>
                                <Text>{`$${lockedPrice}`}</Text>
                            </Flex>
                            <Flex
                                fontWeight="600"
                                fontSize="16"
                                justifyContent="space-between"
                            >
                                <Text>Prize Pool:</Text>
                                <HStack spacing={0.5}>
                                    <Text>{prizeAmount}</Text>
                                    <Image
                                        w="1.5rem"
                                        src="/assets/logo_transparent.png"
                                    />
                                </HStack>
                            </Flex>
                        </Flex>
                    )}
                    {gameStatus === "expired" && (
                        <Flex
                            w="14.5rem"
                            h="8rem"
                            justify="center"
                            gap={0}
                            bg="transparent"
                            _dark={{ bg: "gray.600" }}
                            zIndex={2}
                            rounded="1em"
                            // shadow="md"
                            top="calc(50% - 3rem)"
                            left="calc(50% - 7.25rem)"
                            pos="absolute"
                            flexDirection="column"
                            px={3}
                            py={1}
                            color="white"
                        >
                            <Text fontSize="13">Last Price</Text>
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Heading
                                    fontSize="26"
                                    color={getColorByNumber(
                                        round.close_price - round.open_price
                                    )}
                                >{`$${Number(
                                    round.close_price || 0
                                ).toLocaleString("en-US", {
                                    maximumFractionDigits: 3
                                })}`}</Heading>
                                <Text
                                    fontWeight="bold"
                                    color={getColorByNumber(
                                        round.close_price - round.open_price
                                    )}
                                >{`$${
                                    round.close_price - round.open_price
                                }`}</Text>
                            </Flex>
                            <Flex
                                pt={3}
                                fontSize="13"
                                justifyContent="space-between"
                            >
                                <Text>Locked Price:</Text>
                                <Text>{`$${lockedPrice}`}</Text>
                            </Flex>
                            <Flex
                                fontWeight="600"
                                fontSize="16"
                                justifyContent="space-between"
                            >
                                <Text>Prize Pool:</Text>
                                <HStack spacing={0.5}>
                                    <Text>{prizeAmount}</Text>
                                    <Image
                                        w="1.5rem"
                                        src="/assets/logo_transparent.png"
                                    />
                                </HStack>
                            </Flex>
                        </Flex>
                    )}
                    {isWinner && direction === "bear" ? (
                        <HStack
                            bottom="2rem"
                            left="0"
                            w="100%"
                            zIndex="2"
                            pos="absolute"
                            backgroundColor="#00B3FF"
                            p={1}
                            alignItems="center"
                            justifyContent="center"
                            gap={1}
                        >
                            <Image h="2.5rem" src="/assets/cup.png" />
                            <Button
                                color="white"
                                backgroundColor="#005b77"
                                border="1px solid white"
                                onClick={() => {
                                    setVotingState("claim")
                                    setClaimRoundId(round.id)
                                }}
                                disabled={isPending}
                            >
                                Collect Winnings
                            </Button>
                        </HStack>
                    ) : (
                        <VStack
                            bottom="2rem"
                            left="calc(50% - 7.25rem)"
                            w="14.5rem"
                            zIndex="2"
                            pos="absolute"
                        >
                            <Heading
                                fontSize="20"
                                pb={5}
                                pt={1}
                                color={
                                    gameStatus === "later"
                                        ? "transparent"
                                        : gameStatus === "next"
                                        ? lockedPrice
                                            ? "white"
                                            : "transparent"
                                        : "#00283A"
                                }
                                clipPath="url(#downClip)"
                                bg={
                                    round.close_price - round.open_price < 0
                                        ? "#dd0000"
                                        : "#B1B1B1"
                                }
                                width="70%"
                                height="100%"
                                textAlign="center"
                            >
                                DOWN
                            </Heading>
                        </VStack>
                    )}
                </>
            ) : votingState === "claim" && claimRoundId === round.id ? (
                <VStack
                    w="full"
                    h="full"
                    alignItems="center"
                    justifyContent="center"
                    gap={3}
                    color="white"
                    px={5}
                >
                    <HStack
                        color="white"
                        w="100%"
                        justifyContent="space-between"
                        position="relative"
                    >
                        <Text>Collect Winnings</Text>
                        <Icon
                            as={IoClose}
                            onClick={() => setVotingState("none")}
                        />
                    </HStack>
                    <Image w="30%" src="/assets/cup.png" />
                    <HStack
                        w="full"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text>Collecting</Text>
                        <Text>{claimableAmount}</Text>
                    </HStack>
                    <Text>{`From round #${round.id}`}</Text>
                    <Button
                        w="full"
                        color="white"
                        backgroundColor="#00b3ff"
                        border="1px solid white"
                        onClick={handleCollectWinnings}
                    >
                        Confirm
                    </Button>
                </VStack>
            ) : (
                <VStack
                    top="3.5rem"
                    left={0}
                    h="calc(100% - 3.5rem * 2)"
                    w="100%"
                    zIndex="2"
                    pos="absolute"
                    color="white"
                    px={5}
                    justifyContent="space-between"
                >
                    <HStack
                        w="100%"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text>Commit:</Text>
                        <Text>ZIO</Text>
                    </HStack>
                    <NumberInput
                        _after={{
                            content: `'Balance: ${balance}'`,
                            position: "absolute",
                            right: 0,
                            bottom: 0,
                            transform: "translate(0, 100%)",
                            color: "white",
                            fontWeight: "normal",
                            fontSize: "12px"
                        }}
                        value={inputValue}
                    >
                        <NumberInputField
                            textAlign="right"
                            pr="1rem"
                            h="3rem"
                            position="relative"
                            onChange={(e) => handleChangeInputValue(e)}
                        />
                    </NumberInput>
                    <HStack fontSize="12px">
                        {[0.1, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
                            <Text
                                key={index}
                                border="1px solid white"
                                rounded="full"
                                px={2}
                                py={1}
                                cursor="pointer"
                                onClick={() => setInputValue(balance * ratio)}
                            >{`${ratio * 100}%`}</Text>
                        ))}
                    </HStack>
                    <Button
                        rightIcon={<SwapIcon />}
                        w="100%"
                        bg="#00B3FF"
                        colorScheme="blue"
                        onClick={handleConfirm}
                        disabled={isPending}
                    >
                        Confirm
                    </Button>
                    <Text fontSize="12px">
                        You won't be able to remove or change your position once
                        you enter it.
                    </Text>
                </VStack>
            )}
        </MotionFlex>
    )
}
