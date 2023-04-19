import { useCallback, useMemo } from "react"
import { TokenType, TTokenListItem } from "utils/tokens/tokens"

import { useTokenList } from "./useTokenList"

export const getTokenInfoFromTokenList = (
  token: TokenType,
  tokenList: Array<TTokenListItem>
): TTokenListItem => tokenList.find((x) => x.token === token)!

export const useGetMultipleTokenInfo = () => {
  const [tokenList] = useTokenList()
  return useCallback(
    (tokens: Array<TokenType>) =>
      tokens?.map((token) => getTokenInfoFromTokenList(token, tokenList!)),
    [tokenList]
  )
}

export const useMultipleTokenInfo = (tokens: Array<TokenType>) => {
  const getMultipleTokenInfo = useGetMultipleTokenInfo()
  return useMemo(
    () => getMultipleTokenInfo(tokens),
    [tokens, getMultipleTokenInfo]
  )
}

export const useTokenInfo = (token: TokenType) => {
  return useMultipleTokenInfo(useMemo(() => [token], [token]))[0]
}
