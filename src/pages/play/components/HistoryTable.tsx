import { useEffect, useMemo, useState, useContext } from "react"
import {
    Button,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tr,
    VStack
} from "@chakra-ui/react"
import useContract from "hooks/useContract"
import { useRecoilState } from "recoil"
import { claimState, myGameListState } from "state/userInfo"
import { FuzioOptionContract } from "../../../constants"
import {
    calculatingRoundState,
    liveRoundState,
    nextRoundState
} from "state/roundsState"
import { toast } from "react-toastify"
import { UdaterContext } from "Updater"

const HistoryTable = ({ address }: { address?: string }) => {
    const [myGameList] = useRecoilState(myGameListState)
    const [claimed] = useRecoilState(claimState)
    const [liveRound] = useRecoilState(liveRoundState)
    const [nextRound] = useRecoilState(nextRoundState)
    const [calculatingRound] = useRecoilState(calculatingRoundState)

    const { runQuery, runExecute } = useContract()
    const { refreshAll } = useContext(UdaterContext)

    const [displayInfo, setDisplayInfo] = useState<
        {
            id: number
            lastPrice: number
            prizePool: number
            claimable: number
            claimed: boolean
        }[]
    >([])
    const [isPending, setIsPending] = useState(false)

    const historyRounds = useMemo(() => {
        const merged = [...myGameList, ...claimed]
        return merged
            .filter(
                (round) =>
                    round.round_id !== liveRound &&
                    round.round_id !== nextRound &&
                    round.round_id !== calculatingRound
            )
            .sort((round1, round2) => round2.round_id - round1.round_id)
            .slice(0, Math.min(merged.length, 4))
            .reverse()
    }, [myGameList, claimed, liveRound, nextRound, calculatingRound])

    useEffect(() => {
        if (!address) return
        ;(async () => {
            const fetchRoundInfoQueries = historyRounds.map((round) =>
                runQuery(FuzioOptionContract, {
                    finished_round: { round_id: `${round.round_id}` }
                })
            )
            const roundInfoResponse = await Promise.all(fetchRoundInfoQueries)
                .then((results) =>
                    results.map((result) => ({
                        ...result,
                        round_id: Number(result.id)
                    }))
                )
                .catch(() => [])
            const fetchClaimableAmountQueries = historyRounds.map((round) =>
                runQuery(FuzioOptionContract, {
                    my_pending_reward_round: {
                        round_id: `${round.round_id}`,
                        player: address
                    }
                })
            )
            const claimableAmountResponse = await Promise.all(
                fetchClaimableAmountQueries
            )
                .then((results) =>
                    results.map((result) => Number(result.pending_reward) / 1e6)
                )
                .catch(() => [])
            const result = roundInfoResponse.map((roundInfo, index) => ({
                id: roundInfo.round_id,
                lastPrice: Number(roundInfo.close_price),
                prizePool:
                    (Number(roundInfo.bear_amount) +
                        Number(roundInfo.bull_amount)) /
                    1e6,
                claimable:
                    claimableAmountResponse[index] ||
                    Number(historyRounds[index].claimed_amount || "0") / 1e6,
                claimed: Number(historyRounds[index].claimed_amount || "0") > 0
            }))
            setDisplayInfo(result)
        })()
    }, [historyRounds, address])

    const handleCollectWinnings = async (id: number) => {
        setIsPending(true)
        runExecute(FuzioOptionContract, {
            collection_winning_round: {
                round_id: `${id}`
            }
        })
            .then(() => {
                toast.success("Successfully Collected.")
            })
            .catch((e) => toast.error(e.message))
            .finally(() => {
                setIsPending(false)
                refreshAll()
            })
    }

    return (
        <VStack color="white" my={20}>
            <TableContainer>
                <Table borderRadius={30}>
                    <TableCaption
                        style={{ captionSide: "top" }}
                        textAlign="left"
                        color="white"
                    >
                        Recent History
                    </TableCaption>
                    <Tbody
                        backgroundColor="rgba(0, 0, 0, 0.6)"
                        borderRadius="30px"
                    >
                        <Tr>
                            <Td border="none">OPTION ID</Td>
                            {displayInfo.map((info) => (
                                <Td
                                    border="none"
                                    key={info.id}
                                >{`#${info.id}`}</Td>
                            ))}
                        </Tr>
                        <Tr>
                            <Td border="none">LAST PRICE</Td>
                            {displayInfo.map((info) => (
                                <Td key={info.id} border="none">
                                    {info.lastPrice}
                                </Td>
                            ))}
                        </Tr>
                        <Tr>
                            <Td border="none">PRIZE POOL</Td>
                            {displayInfo.map((info) => (
                                <Td key={info.id} border="none">
                                    {info.prizePool}
                                </Td>
                            ))}
                        </Tr>
                        <Tr>
                            <Td border="none">PAYOUT</Td>
                            {displayInfo.map((info) => (
                                <Td key={info.id} border="none">
                                    {info.claimable}
                                </Td>
                            ))}
                        </Tr>
                        <Tr>
                            <Td border="none">WINNING</Td>
                            {displayInfo.map((info) => (
                                <Td key={info.id} border="none">
                                    {info.claimable ? (
                                        info.claimed ? (
                                            <Text
                                                backgroundColor="#ffcf3f"
                                                border="1px solid black"
                                                color="black"
                                                p={2}
                                                borderRadius="10px"
                                                fontWeight="bold"
                                            >
                                                Collected
                                            </Text>
                                        ) : (
                                            <Button
                                                color="white"
                                                backgroundColor="#005b77"
                                                border="1px solid white"
                                                disabled={isPending}
                                                onClick={() =>
                                                    handleCollectWinnings(
                                                        info.id
                                                    )
                                                }
                                            >
                                                Collect
                                            </Button>
                                        )
                                    ) : null}
                                </Td>
                            ))}
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </VStack>
    )
}

export default HistoryTable
