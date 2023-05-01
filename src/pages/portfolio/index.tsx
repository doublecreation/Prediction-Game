import {
    Button,
    Flex,
    Heading,
    SimpleGrid,
    VStack,
    Text,
    Avatar,
    HStack,
    IconButton,
    Skeleton,
    useBreakpoint,
    useDisclosure,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useBreakpointValue,
    Icon
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import Rive from "@rive-app/react-canvas"
import { Row, createColumnHelper } from "@tanstack/react-table"
import { useLocalStorageState } from "ahooks"
import { MyPoolCard } from "components/MyPoolCard"

import { motion } from "framer-motion"
import { useTokenBalance } from "hooks/tokens/useTokenBalance"
import { useTokenInfo } from "hooks/tokens/useTokenInfo"
import { useTokenList } from "hooks/tokens/useTokenList"
import { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet"
import { FaArrowDown, FaArrowUp, FaRegStar, FaStar } from "react-icons/fa"
import { HiExternalLink } from "react-icons/hi"
import { useRecoilState } from "recoil"
import { externalChainState, externalTokenState } from "state/UIState"
import { ChainConfigs } from "utils/tokens/chains"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import {
    getTokenName,
    TokenFullName,
    TokenStatus,
    TTokenListItem,
    TTokenWithBalance
} from "utils/tokens/tokens"
import truncateAddress from "utils/ui/truncateAddress"
import { PortfolioTable } from "./components/PortfolioTable"
import { useFilterAssetsByBalance } from "hooks/tokens/useFilterTokensByBalance"
import { IBCModal } from "./components/IBCModal"
import shortenNumber from "utils/ui/shortenNumber"
import { MyPools } from "pages/earn/components/MyPools"
import { usePoolsWithBalances } from "hooks/pool/usePoolsWithBalances"

const Portfolio = () => {
    const breakpoint = useBreakpoint()
    const isTabsFitted = useBreakpointValue({ base: true, md: false })

    const [assets] = useFilterAssetsByBalance()
    const [poolsList, isLoadingPools] = usePoolsWithBalances()

    const [externalChain, setExternalChain] = useRecoilState(externalChainState)
    const [externalToken, setExternalToken] = useRecoilState(externalTokenState)

    const { address, isWalletConnected } = useChain("juno")

    const [favourites, setFavourites] = useLocalStorageState<Array<string>>(
        `favoriteTokens`,
        {
            defaultValue: []
        }
    )

    const addToFavourites = (token: string) => {
        if (!favourites.includes(token)) {
            setFavourites([...favourites, token])
        } else {
            setFavourites([...favourites.filter((item) => item !== token)])
        }
    }

    const sortedAssets = useMemo(() => {
        const favouriteAssets = assets.filter((asset) =>
            favourites.includes(asset.token.token)
        )

        const assetsWithoutFavourites = assets.filter(
            (asset) => !favourites.includes(asset.token.token)
        )

        return [...favouriteAssets, ...assetsWithoutFavourites]
    }, [favourites, assets])

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalType, setModalType] = useState<"withdraw" | "deposit">(
        "deposit"
    )

    const columnHelper = createColumnHelper<TTokenWithBalance>()
    const columns = useMemo(() => {
        return [
            columnHelper.accessor("token.name", {
                maxSize: 50,
                cell: (info) => {
                    return (
                        <HStack>
                            {breakpoint !== "base" && breakpoint !== "sm" && (
                                <IconButton
                                    size="sm"
                                    aria-label="add/remove favourite token"
                                    rounded="full"
                                    bg="transparent"
                                    color={
                                        favourites.includes(
                                            info.row.original.token.token
                                        )
                                            ? "yellow.600"
                                            : "white"
                                    }
                                    _dark={{
                                        color: favourites.includes(
                                            info.row.original.token.token
                                        )
                                            ? "yellow.400"
                                            : "white"
                                    }}
                                    icon={
                                        favourites.includes(
                                            info.row.original.token.token
                                        ) ? (
                                            <Icon
                                                as={FaStar}
                                                w="1.5rem"
                                                h="1.5rem"
                                            />
                                        ) : (
                                            <Icon
                                                as={FaRegStar}
                                                w="1.5rem"
                                                h="1.5rem"
                                            />
                                        )
                                    }
                                    onClick={() =>
                                        addToFavourites(
                                            info.row.original.token.token
                                        )
                                    }
                                />
                            )}

                            <HStack>
                                <Skeleton
                                    isLoaded={Boolean(
                                        info.row.original.token.imageUrl
                                    )}
                                    rounded="full"
                                >
                                    <Avatar
                                        size={{ base: "sm", md: "md" }}
                                        src={info.row.original.token.imageUrl}
                                        border="none"
                                    />
                                </Skeleton>
                                <Skeleton
                                    isLoaded={Boolean(
                                        info.row.original.token.name
                                    )}
                                    rounded="full"
                                >
                                    <VStack align="start">
                                        <Text
                                            fontSize={{ base: "md", sm: "18" }}
                                            fontWeight="400"
                                            textAlign="start"
                                            fontFamily="heading"
                                            lineHeight={1}
                                        >
                                            {info.row.original.token.name}
                                        </Text>
                                        <Text
                                            lineHeight={1}
                                            fontSize={{
                                                base: "0.9em",
                                                sm: "14"
                                            }}
                                            textAlign="start"
                                            fontWeight="400"
                                            fontFamily="body"
                                        >
                                            {
                                                ChainConfigs[
                                                    TokenStatus[
                                                        info.row.original.token
                                                            .token
                                                    ].chain
                                                ].chainName
                                            }
                                        </Text>
                                    </VStack>
                                </Skeleton>
                            </HStack>
                        </HStack>
                    )
                },
                header: "Asset",
                id: "tokens",
                sortingFn: (a, b, columnId) => {
                    return String(a.getValue(columnId)).toLowerCase() <
                        String(b.getValue(columnId)).toLowerCase()
                        ? -1
                        : String(a.getValue(columnId)).toLowerCase() >
                          String(b.getValue(columnId)).toLowerCase()
                        ? 1
                        : 0
                }
            }),
            columnHelper.accessor("balance", {
                id: "tokenBalance",
                meta: {
                    isNumeric: true
                },
                cell: (info) => {
                    return (
                        <Skeleton
                            isLoaded={Boolean(info.getValue())}
                            rounded="full"
                        >
                            <Text>
                                {`${shortenNumber(
                                    convertMicroDenomToDenom(
                                        info.getValue(),
                                        TokenStatus[
                                            info.row.original.token.token
                                        ].decimal ?? 6
                                    ),
                                    2
                                )}`}
                            </Text>
                        </Skeleton>
                    )
                },
                header: "Balance"
            }),
            columnHelper.display({
                meta: {
                    isNumeric: true
                },
                cell: (info) => {
                    const tokenInfo = info.row.original

                    if (
                        !TokenStatus[tokenInfo.token.token].isIBCCoin ||
                        !isWalletConnected
                    ) {
                        return null
                    }

                    if (breakpoint === "base" || breakpoint === "sm") {
                        return (
                            <IconButton
                                onClick={() => {
                                    setModalType("deposit")
                                    setExternalChain(tokenInfo.token.token)
                                    setExternalToken(tokenInfo.token)
                                    onOpen()
                                }}
                                bg="white"
                                rounded="full"
                                aria-label="Open Actions Modal"
                                icon={<HiExternalLink size="20" />}
                            />
                        )
                    }

                    return (
                        <HStack>
                            <Button
                                _hover={{
                                    bgGradient:
                                        "linear(45deg, brand.1, brand.2)"
                                }}
                                bg="white"
                                shadow="md"
                                _dark={{
                                    bg: "gray.600",
                                    _hover: {
                                        bgGradient:
                                            "linear(45deg, brand.1, brand.2)"
                                    }
                                }}
                                rounded="1em"
                                leftIcon={<FaArrowDown />}
                                onClick={() => {
                                    setModalType("deposit")
                                    setExternalChain(tokenInfo.token.token)
                                    setExternalToken(tokenInfo.token)
                                    onOpen()
                                }}
                            >
                                Deposit
                            </Button>
                            <Button
                                rounded="1em"
                                shadow="md"
                                leftIcon={<FaArrowUp />}
                                onClick={() => {
                                    setModalType("withdraw")
                                    setExternalChain(tokenInfo.token.token)
                                    setExternalToken(tokenInfo.token)
                                    onOpen()
                                }}
                                _hover={{
                                    bgGradient:
                                        "linear(45deg, brand.1, brand.2)"
                                }}
                                bg="white"
                                _dark={{
                                    bg: "gray.600",
                                    _hover: {
                                        bgGradient:
                                            "linear(45deg, brand.1, brand.2)"
                                    }
                                }}
                            >
                                Withdraw
                            </Button>
                        </HStack>
                    )
                },
                header: "",
                id: "actions"
            })
        ]
    }, [assets, favourites])

    return (
        <Flex
            as={motion.main}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            py={{ base: "1rem", md: "4rem" }}
            mx="auto"
            px={{ base: 4, md: 8, lg: 24 }}
            flexDirection="column"
            gap={"1rem"}
            w="full"
            pos="relative"
        >
            {/* <Helmet>
        <title>Portfolio | Hopers.io</title>
      </Helmet> */}
            <SimpleGrid
                mx={{ base: 4, md: 0 }}
                columns={{ base: 1, sm: 2, md: 4 }}
                spacing={{ base: 2, sm: 4, md: 6, lg: 10 }}
                h="fit-content"
                py={"1rem"}
                px={4}
                rounded="1.25em"
                bg="offwhite.1"
                shadow="md"
                _dark={{ bg: "gray.800" }}
            >
                <Flex
                    h="full"
                    minW={{ base: "0", md: "16vw" }}
                    w={{ base: "full", md: "full" }}
                    rounded="1.25em"
                    bg="white"
                    _dark={{ bg: "gray.700" }}
                    pos="relative"
                    align="start"
                    px={3}
                    py={3}
                    shadow="md"
                >
                    <VStack align="start" w="full" h="full" spacing={0}>
                        <Heading fontSize="22" as="h2" fontWeight="400">
                            Total
                        </Heading>
                        <Flex align="center" flex={1}>
                            <Heading
                                bgGradient="linear(45deg, brand.1, brand.2)"
                                fontSize="36"
                                fontWeight="900"
                                bgClip="text"
                                as="h1"
                            >
                                $0
                            </Heading>
                        </Flex>
                    </VStack>
                </Flex>
                <Flex
                    h="full"
                    minW={{ base: "0", md: "16vw" }}
                    w={{ base: "full", md: "full" }}
                    rounded="1.25em"
                    bg="white"
                    _dark={{ bg: "gray.700" }}
                    pos="relative"
                    align="start"
                    px={3}
                    py={3}
                    shadow="md"
                >
                    <VStack align="start" w="full" h="full" spacing={0}>
                        <Heading fontSize="22" as="h2" fontWeight="400">
                            Bonded
                        </Heading>
                        <Flex align="center" flex={1}>
                            <Heading
                                bgGradient="linear(45deg, brand.1, brand.2)"
                                fontSize="36"
                                fontWeight="900"
                                bgClip="text"
                                as="h1"
                            >
                                $0
                            </Heading>
                        </Flex>
                    </VStack>
                </Flex>
                <Flex
                    h="full"
                    minW={{ base: "0", md: "16vw" }}
                    w={{ base: "full", md: "full" }}
                    rounded="1.25em"
                    bg="white"
                    _dark={{ bg: "gray.700" }}
                    pos="relative"
                    align="start"
                    px={3}
                    py={3}
                    shadow="md"
                >
                    <VStack align="start" w="full" h="full" spacing={0}>
                        <Heading fontSize="22" as="h2" fontWeight="400">
                            Unbonded
                        </Heading>
                        <Flex align="center" flex={1}>
                            <Heading
                                bgGradient="linear(45deg, brand.1, brand.2)"
                                fontSize="36"
                                fontWeight="900"
                                bgClip="text"
                                as="h1"
                            >
                                $0
                            </Heading>
                        </Flex>
                    </VStack>
                </Flex>
                <Flex
                    h="full"
                    minW={{ base: "0", md: "16vw" }}
                    w={{ base: "full", md: "full" }}
                    rounded="1.25em"
                    bg="white"
                    _dark={{ bg: "gray.700" }}
                    pos="relative"
                    align="start"
                    px={3}
                    py={3}
                    shadow="md"
                >
                    <VStack align="start" w="full" h="full" spacing={0}>
                        <Heading fontSize="22" as="h2" fontWeight="400">
                            Staked
                        </Heading>
                        <Flex align="center" flex={1}>
                            <Heading
                                bgGradient="linear(45deg, brand.1, brand.2)"
                                fontSize="22"
                                fontWeight="900"
                                bgClip="text"
                                as="h1"
                            >
                                Coming Soon
                            </Heading>
                        </Flex>
                    </VStack>
                </Flex>
            </SimpleGrid>
            <Tabs
                isFitted={isTabsFitted}
                isLazy
                variant="soft-rounded"
                h="full"
                w="full"
            >
                <TabList
                    color="gray.800"
                    _dark={{ color: "white", bg: "whiteAlpha.200" }}
                    gap={2}
                    h="3rem"
                    mx={{ base: 4, md: 0 }}
                    bg="blackAlpha.200"
                    rounded="1.25em"
                >
                    <Tab
                        maxW="15rem"
                        fontWeight="900"
                        color="gray.800"
                        rounded="1.25em"
                        _dark={{
                            color: "white",
                            _selected: { color: "gray.800" }
                        }}
                        _selected={{
                            bgGradient: "linear(45deg, brand.1, brand.2)",
                            color: "gray.800"
                        }}
                    >
                        My Assets
                    </Tab>
                    <Tab
                        maxW="15rem"
                        color="gray.800"
                        rounded="1.25em"
                        _dark={{
                            color: "white",
                            _selected: { color: "gray.800" }
                        }}
                        _selected={{
                            bgGradient: "linear(45deg, brand.1, brand.2)",
                            color: "gray.800"
                        }}
                    >
                        My Pools
                    </Tab>
                    <Tab
                        maxW="15rem"
                        color="gray.800"
                        rounded="1.25em"
                        _dark={{
                            color: "white",
                            _selected: { color: "gray.800" }
                        }}
                        _selected={{
                            bgGradient: "linear(45deg, brand.1, brand.2)",
                            color: "gray.800"
                        }}
                    >
                        My NFTs
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel h="full" w="full">
                        <PortfolioTable
                            data={sortedAssets}
                            columns={columns}
                            favourites={favourites}
                        />
                        {isWalletConnected && externalToken && (
                            <IBCModal
                                type={modalType}
                                isOpen={isOpen}
                                onClose={onClose}
                                token={externalToken}
                            />
                        )}
                    </TabPanel>
                    <TabPanel h="full" w="full">
                        {poolsList?.poolsWithBalances &&
                            poolsList?.poolsWithBalances.length > 0 && (
                                <MyPools pools={poolsList?.poolsWithBalances} />
                            )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}

export default Portfolio
