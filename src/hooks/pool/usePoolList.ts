import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Liquidities, TLiquidity } from "utils/tokens/liquidities"
import { TPool, TPoolsWithBalances } from "utils/tokens/pools"
import { useChain } from "@cosmos-kit/react"
import { contracts } from "@hopersio/contracts"
import { TokenType } from "utils/tokens/tokens"

export const usePoolList = () => {
  const { data, isLoading } = useQuery<{
    pools: Array<TPool>
    newestPool: TPool
    highestAPRPool: TPool
    highestTVLPool: TPool
  }>(
    ["@hopers/poolsList"],
    async () => {
      const response = await fetch("https://api.hopers.io/pool-info")
      const responseJson = await response.json()
      const pools: TPool[] = responseJson.pools

      const newestPool: TPool = pools.at(-1)!
      let highestAPRPool: TPool = pools.at(responseJson.highestAprPool - 1)!
      let highestTVLPool: TPool = pools.at(responseJson.highestLiquidity - 1)!

      return {
        pools,
        newestPool,
        highestAPRPool,
        highestTVLPool
      }
    },
    {
      notifyOnChangeProps: ["data", "error"],
      onError() {
        throw new Error("Error fetching pools list")
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

export const usePoolFromListQueryById = ({ poolId }: { poolId: number }) => {
  const [poolsList, isLoading] = usePoolList()

  const requestedPool = useMemo(() => {
    if (!poolsList?.pools.length) return

    return poolsList?.pools.find((pool) => pool.poolId === poolId)
  }, [poolsList?.pools])

  return [requestedPool, isLoading] as const
}
