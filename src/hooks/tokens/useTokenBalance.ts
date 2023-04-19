// eslint-disable-next-line import/no-extraneous-dependencies
import { queryClient } from "services/queryClient"
import { useQuery } from "@tanstack/react-query"
import { TokenStatus, TokenType, TTokenListItem } from "utils/tokens/tokens"
import { useMemo } from "react"
import { ChainConfigs, ConfigType } from "utils/tokens/chains"
import { useChain } from "@cosmos-kit/react"
import {
  CosmWasmClient,
  SigningCosmWasmClient
} from "@cosmjs/cosmwasm-stargate"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { getTokenInfoFromTokenList } from "./useTokenInfo"
import { useTokenList } from "./useTokenList"
import { TTokenWithBalance } from "utils/tokens/tokens"

export const fetchTokenBalance = async ({
  address,
  client,
  token
}: {
  address: string
  client: CosmWasmClient
  token: TokenType
}): Promise<number> => {
  let result = 0
  if (TokenStatus[token].isNativeCoin) {
    const coin = await client.getBalance(address, token)
    const amount = coin ? coin.amount : "0"

    result = Number(amount)
  } else {
    const tokenBalance = await client.queryContractSmart(
      TokenStatus[token].contractAddress!,
      {
        balance: { address }
      }
    )
    result = Number(tokenBalance.balance)
  }
  return result
}

export const useTokenBalance = (token: TTokenListItem) => {
  const { address, getCosmWasmClient, isWalletConnected } = useChain("juno")

  const { data = "0", isLoading } = useQuery<number>(
    [
      `@hopers/${address}/${
        TokenStatus[token.token].isNativeCoin
          ? TokenStatus[token.token].denom
          : TokenStatus[token.token].contractAddress
      }/balance`
    ],
    async () => {
      const client = await getCosmWasmClient()
      const tokenBalance = await fetchTokenBalance({
        address: address!,
        client,
        token: token.token
      })
      return tokenBalance
    },
    {
      notifyOnChangeProps: ["data", "error"],
      onError(e: any) {
        throw new Error("Error fetching token balance:" + e.message)
      },
      enabled: Boolean(isWalletConnected && address),
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: false,
      staleTime: 6000
    }
  )

  return [data, isLoading] as const
}

export const useMultipleTokenBalance = (tokens: Array<TTokenListItem>) => {
  const { address, getSigningCosmWasmClient, isWalletConnected } =
    useChain("juno")
  const tokenTypes = useMemo(() => tokens?.map(({ token }) => token), [tokens])
  const [tokenList] = useTokenList()

  const queryKey = useMemo(
    () => `multipleTokenBalances/${tokenTypes?.join("+")}`,
    [tokenTypes]
  )

  const { data, isLoading } = useQuery(
    [queryKey, address],
    async () => {
      const client = await getSigningCosmWasmClient()
      let balances: Array<number> = []

      if (tokenTypes && client && address && tokenTypes && tokenList) {
        balances = await Promise.all(
          tokens.map((token) =>
            fetchTokenBalance({
              client,
              address,
              token: getTokenInfoFromTokenList(token.token, tokenList).token
            })
          )
        )
      }

      const tokenBalances: Array<TTokenWithBalance> = tokens.map(
        (token, index) => ({
          token,
          balance: balances[index]
        })
      )

      return tokenBalances
    },
    {
      enabled: Boolean(isWalletConnected && tokens?.length && tokenList),

      refetchOnMount: "always",
      refetchInterval: 6000,
      refetchIntervalInBackground: true,

      onError(error) {
        console.error("Couldn't fetch asset balances: ", error)
      }
    }
  )

  return [data, isLoading] as const
}
