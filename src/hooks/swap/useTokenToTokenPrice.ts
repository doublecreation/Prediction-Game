import { useTokenInfo } from "hooks/tokens/useTokenInfo"
import { useQuery } from "@tanstack/react-query"

import { useChain } from "@cosmos-kit/react"
import { tokenSwapState } from "state/swapState"
import { useRecoilValue } from "recoil"
import { useValidPool } from "./useValidPool"
import { getTokenPriceFromPool } from "utils/prices/getTokenPrice"
import { getTokenForTokenPrice } from "utils/prices/getPrice"
import { TokenStatus } from "utils/tokens/tokens"

export const useTokenToTokenPriceQuery = () => {
  const { getCosmWasmClient, status } = useChain("juno")
  const { from, to } = useRecoilValue(tokenSwapState)

  const fromToken = useTokenInfo(from.token)
  const toToken = useTokenInfo(to.token)

  const validPair = useValidPool(from.token, to.token)

  return useQuery(
    [`tokenToTokenPrice/${from.token}/${to.token}/${from.amount}`],
    async () => {
      if (validPair) {
        return await getTokenForTokenPrice({
          fromAmount: (
            Number(from.amount) *
            Math.pow(10, TokenStatus[from.token].decimal || 6)
          ).toString(),
          validPair,
          getCosmWasmClient
        })
      }
    },
    {
      enabled: Boolean(
        validPair && Number(from.amount) > 0 && fromToken.name !== toToken.name
      ),
      refetchOnMount: false,
      refetchInterval: 6000,
      refetchIntervalInBackground: true
    }
  )
}

export const useTokenToTokenPrice = () => {
  const { data: currentTokenPrice, isLoading } = useTokenToTokenPriceQuery()
  return [{ price: isLoading ? 0 : currentTokenPrice }, isLoading] as const
}
