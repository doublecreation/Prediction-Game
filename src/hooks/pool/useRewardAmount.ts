import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Liquidities, TLiquidity } from "utils/tokens/liquidities"
import { TPool, TPoolsWithBalances } from "utils/tokens/pools"
import { useChain } from "@cosmos-kit/react"
import { contracts } from "@hopersio/contracts"
import { TokenType } from "utils/tokens/tokens"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"

export const useRewardAmount = ({ pool }: { pool: TPool }) => {
  const { getSigningCosmWasmClient, address, isWalletConnected } =
    useChain("juno")
  const { data, isLoading } = useQuery<number>(
    [`@hopers/${pool.poolId}/rewardAmount`],
    async () => {
      const client = await getSigningCosmWasmClient()
      let rewardAmount: number = 0

      for (const bondingPeriod of pool.bondingPeriods) {
        const stakerInfo = await client.queryContractSmart(
          bondingPeriod.stakingAddress,
          {
            staker_info: {
              staker: address
            }
          }
        )

        rewardAmount += Number(stakerInfo.pending_reward)
      }

      return rewardAmount
    },
    {
      enabled: isWalletConnected,
      notifyOnChangeProps: ["data", "error"],
      onError() {
        throw new Error("Error fetching pending rewards")
      },
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: false,
      refetchInterval: 6_000
    }
  )

  return [data, isLoading] as const
}
