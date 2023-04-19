// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from "@tanstack/react-query"
import { TPool } from "utils/tokens/pools"
import { useChain } from "@cosmos-kit/react"
import { contracts } from "@hopersio/contracts"

export const usePoolBalance = ({ pool }: { pool: TPool }) => {
  const { isWalletConnected, address, getSigningCosmWasmClient } =
    useChain("juno")
  const { HopersSwapHopersQueryClient } = contracts.HopersSwapHopers

  const { data, isLoading } = useQuery<number>(
    [
      `@hopers/poolBalance/${pool.liquidity.token1.denom}/${pool.liquidity.token2.denom}`
    ],
    async () => {
      const client = await getSigningCosmWasmClient()

      const queryService = new HopersSwapHopersQueryClient(
        client,
        pool.lpAddress
      )

      const balanceQuery = await queryService.balance({ address: address! })
      let balance = Number(balanceQuery.balance)

      balance = isNaN(balance) ? 0 : balance / 1e6

      return balance
    },
    {
      enabled: !!(isWalletConnected && address),
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
