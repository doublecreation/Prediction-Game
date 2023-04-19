import { useMultipleTokenBalance } from "hooks/tokens/useTokenBalance"
import { useTokenList } from "hooks/tokens/useTokenList"
import { useMemo } from "react"
import { TTokenWithBalance } from "utils/tokens/tokens"

export const useFilterAssetsByBalance = () => {
  const [tokenList] = useTokenList()
  const [tokenBalances, loadingBalances] = useMultipleTokenBalance(
    tokenList ?? []
  )

  const categorizedBalances = useMemo((): Array<TTokenWithBalance> => {
    if (!tokenBalances?.length) {
      const fallbackTokensList: Array<TTokenWithBalance> =
        tokenList?.map((token) => ({
          token: token,
          balance: 0
        })) ?? []
      return fallbackTokensList
    }

    const tokensWithBalance: Array<TTokenWithBalance> = []

    for (const token of tokenBalances) {
      tokensWithBalance.push(token)
    }

    return tokensWithBalance
  }, [tokenBalances, tokenList])

  return [categorizedBalances, loadingBalances] as const
}
