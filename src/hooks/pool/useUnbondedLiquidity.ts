// eslint-disable-next-line import/no-extraneous-dependencies
import { queryClient } from "services/queryClient"
import { useQuery } from "@tanstack/react-query"
import { TokenStatus, TokenType, TTokenListItem } from "utils/tokens/tokens"
import { useMemo } from "react"
import { ChainConfigs } from "utils/tokens/chains"
import { TPool } from "utils/tokens/pools"
import { useChain } from "@cosmos-kit/react"
import { contracts } from "@hopersio/contracts"

export const useUnbondedLiquidity = ({ pool }: { pool: TPool }) => {
  const { isWalletConnected, address, getSigningCosmWasmClient } =
    useChain("juno")
  const { HopersSwapHopersQueryClient } = contracts.HopersSwapHopers

  const { data, isLoading } = useQuery<number>(
    [
      `@hopers/unbondedTokens/${pool.liquidity.token1.denom}/${pool.liquidity.token2.denom}`
    ],
    async () => {
      const client = await getSigningCosmWasmClient()

      const queryService = new HopersSwapHopersQueryClient(
        client,
        pool.lpAddress
      )

      const balanceQuery = await queryService.balance({ address: address! })
      let balance = Number(balanceQuery.balance)

      balance = isNaN(balance) ? 0 : balance

      return balance
    },
    {
      enabled: !!(isWalletConnected && address),
      notifyOnChangeProps: ["data", "error"],
      onError() {
        throw new Error("Error fetching unbonded tokens")
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
