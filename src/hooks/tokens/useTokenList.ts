// eslint-disable-next-line import/no-extraneous-dependencies
import { queryClient } from "services/queryClient"
import { useQuery } from "@tanstack/react-query"
import { TokenStatus, TokenType, TTokenListItem } from "utils/tokens/tokens"
import { useMemo } from "react"
import { ChainConfigs } from "utils/tokens/chains"

export const getCachedTokenList = () =>
  queryClient.getQueryCache().find(["@hopers/tokenList"])?.state?.data as
    | TTokenListItem[]
    | undefined

export const useTokenList = () => {
  const tokenList: Array<TTokenListItem> = useMemo(() => {
    const result = (
      Object.keys(TokenType) as Array<keyof typeof TokenType>
    ).map((key) => {
      const tokenType = TokenType[key]
      const tokenStatus = TokenStatus[TokenType[key]]
      return {
        name: key as string,
        token: TokenType[key],
        imageUrl: `/assets/listedTokens/${tokenType.replace(/\//g, "")}.png`,
        contract: TokenStatus[tokenType].contractAddress || "",
        chainConfig: ChainConfigs[tokenStatus.chain]
      }
    })
    // .filter((item) => !hideZeroAssets || item.balance > 0)
    return result
  }, [])

  const { data, isLoading } = useQuery<Array<TTokenListItem>>(
    ["@hopers/tokenList"],
    async () => {
      return tokenList
    },
    {
      notifyOnChangeProps: ["data", "error"],
      onError() {
        throw new Error("Error fetching token list")
      },
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: false,
      staleTime: 3 * 60 * 1_000,
      initialData: tokenList
    }
  )

  return [data, isLoading] as const
}
