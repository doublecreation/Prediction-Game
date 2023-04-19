// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from "@tanstack/react-query"
import { TPool, TPoolsWithBalances } from "utils/tokens/pools"
import { useChain } from "@cosmos-kit/react"
import { contracts } from "@hopersio/contracts"
import { usePoolList } from "./usePoolList"

export const usePoolsWithBalances = () => {
  const { isWalletConnected, address, getCosmWasmClient } = useChain("juno")
  const { HopersSwapHopersQueryClient } = contracts.HopersSwapHopers

  const [poolsList] = usePoolList()

  const { data, isLoading } = useQuery<{
    poolsWithBalances: TPoolsWithBalances
    highestAprPool: TPool
    highestTvlPool: TPool
    newestPool: TPool
  }>(
    [`@hopers/poolBalances`],
    async () => {
      const client = await getCosmWasmClient()
      const balances: number[] = []
      let highestApr: number[] = Array.from(
        {
          length: poolsList?.pools.length ?? 0
        },
        () => 0
      )

      for (const [index, pool] of poolsList?.pools.entries()!) {
        const queryService = new HopersSwapHopersQueryClient(
          client,
          pool.lpAddress
        )
        if (isWalletConnected && address) {
          const balanceQuery = await queryService.balance({
            address
          })

          let balance = Number(balanceQuery.balance)

          balance = isNaN(balance) ? 0 : balance / 1e6

          balances.push(balance)
        } else {
          balances.push(0)
        }

        if (pool.bondingPeriods && pool.bondingPeriods.length > 0) {
          for (const [_, bondingPeriod] of pool.bondingPeriods.entries()) {
            if (bondingPeriod.apr > highestApr[index]) {
              highestApr[index] = bondingPeriod.apr
            }
          }
        }
      }

      const poolsWithBalances: TPoolsWithBalances = poolsList?.pools.map(
        (pool, index) => ({
          pool,
          balance: balances[index],
          apr: highestApr[index]
        })
      )!

      return {
        poolsWithBalances,
        highestAprPool: poolsList?.highestAPRPool!,
        highestTvlPool: poolsList?.highestTVLPool!,
        newestPool: poolsList?.newestPool!
      }
    },
    {
      enabled: !!(poolsList && poolsList.pools.length > 0),
      notifyOnChangeProps: ["data", "error"],
      onError() {
        throw new Error("Error fetching pools with balances")
      },
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: false,
      refetchInterval: 6000
    }
  )

  return [data, isLoading] as const
}
