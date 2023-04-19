import { useQuery } from "@tanstack/react-query"
import { TokenType } from "utils/tokens/tokens"
import { TPool } from "utils/tokens/pools"
import { usePoolsWithBalances } from "./usePoolsWithBalances"

export const useTokenPriceByPool = ({ pool }: { pool: TPool }) => {
  const [poolsList] = usePoolsWithBalances()

  const { data, isLoading } = useQuery<{
    token1Price: number
    token2Price: number
  }>(
    [
      `@hopers/tvl/${pool.liquidity.token1.denom}/${pool.liquidity.token2.denom}`
    ],
    async () => {
      const hopersUsdcLiquidity = poolsList?.poolsWithBalances.find(
        (liquidity) =>
          liquidity.pool.liquidity.token1.denom === TokenType.HOPERS &&
          liquidity.pool.liquidity.token2.denom === TokenType.USDC
      )
      const ratio = hopersUsdcLiquidity?.pool.ratio || 0
      const hopersPrice = ratio

      let token1Price = 0
      let token2Price = 0

      if (pool.liquidity.token1.denom !== TokenType.HOPERS) {
        const ratio = pool.ratio ?? 0
        token1Price = ratio ? hopersPrice / ratio : 0
      } else {
        token1Price = hopersPrice
      }

      if (pool.liquidity.token2.denom !== TokenType.HOPERS) {
        const ratio = pool.ratio || 0
        token2Price = ratio ? hopersPrice / ratio : 0
      } else {
        token2Price = hopersPrice
      }

      return { token1Price, token2Price }
    },
    {
      enabled: poolsList && poolsList.poolsWithBalances.length > 0,
      notifyOnChangeProps: ["data", "error"],
      onError() {
        throw new Error("Error fetching pool TVL")
      },
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: false,
      staleTime: 6000
    }
  )

  return [data, isLoading] as const
}
