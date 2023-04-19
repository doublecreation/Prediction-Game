// eslint-disable-next-line import/no-extraneous-dependencies
import { queryClient } from "services/queryClient"
import { useQuery } from "@tanstack/react-query"
import { TokenStatus, TokenType, TTokenListItem } from "utils/tokens/tokens"
import { useMemo } from "react"
import { ChainConfigs } from "utils/tokens/chains"
import { TPool } from "utils/tokens/pools"
import { useChain } from "@cosmos-kit/react"
import { contracts } from "@hopersio/contracts"

export const useBondedLiquidity = ({ pool }: { pool: TPool }) => {
  const { isWalletConnected, address, getSigningCosmWasmClient } =
    useChain("juno")
  const { HopersStakingQueryClient } = contracts.HopersStaking

  const { data, isLoading } = useQuery<{
    bondedBalances: Array<{ balance: string; address: string }>
    totalBondedAmount: number
    token1: TokenType
    token2: TokenType
  }>(
    [
      `@hopers/bondedTokens/${pool.liquidity.token1.denom}+${pool.liquidity.token2.denom}/${address}`
    ],
    async () => {
      const client = await getSigningCosmWasmClient()

      const { bondingPeriods } = pool
      const bondedBalances: Array<{ balance: string; address: string }> = []
      let totalBondedAmount = 0

      for (const bondingPeriod of bondingPeriods) {
        const bondedTokens = await client.queryContractSmart(
          bondingPeriod.stakingAddress,
          {
            staker_info: {
              staker: address
            }
          }
        )

        console.log(bondedTokens)

        bondedBalances.push({
          balance: bondedTokens.bond_amount,
          address: bondingPeriod.stakingAddress
        })

        totalBondedAmount += Number(bondedTokens.bond_amount)
      }

      return {
        bondedBalances,
        totalBondedAmount,
        token1: pool.liquidity.token1.denom,
        token2: pool.liquidity.token2.denom
      }
    },
    {
      enabled: !!(isWalletConnected && address && pool),
      notifyOnChangeProps: ["data", "error"],
      onError() {
        throw new Error("Error fetching bonded tokens")
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
