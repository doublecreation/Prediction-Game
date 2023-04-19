// eslint-disable-next-line import/no-extraneous-dependencies
import { queryClient } from "services/queryClient"
import { useQuery } from "@tanstack/react-query"
import {
  TokenChainName,
  TokenStatus,
  TokenType,
  TTokenListItem
} from "utils/tokens/tokens"
import { useMemo } from "react"
import { ChainConfigs, ConfigType } from "utils/tokens/chains"
import { useChain, useChainWallet } from "@cosmos-kit/react"
import {
  CosmWasmClient,
  SigningCosmWasmClient
} from "@cosmjs/cosmwasm-stargate"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { getTokenInfoFromTokenList } from "./useTokenInfo"
import { useTokenList } from "./useTokenList"
import { TTokenWithBalance } from "utils/tokens/tokens"
import { useRecoilState } from "recoil"
import { externalChainState } from "state/UIState"
import { StargateClient } from "@cosmjs/stargate"

export const fetchExternalBalance = async ({
  address,
  client,
  denom
}: {
  address: string
  client: StargateClient
  denom: string
}): Promise<number> => {
  const coin = await client.getBalance(address, denom)
  const amount = coin ? coin.amount : "0"

  const result = Number(amount)

  console.log(denom)

  return result
}

export const useExternalBalance = (denom: string) => {
  const [externalChain, setExternalChain] = useRecoilState(externalChainState)

  const { wallet } = useChain("juno")

  const {
    address: externalAddress,
    getStargateClient,
    isWalletConnected
  } = useChainWallet(TokenChainName[externalChain], wallet?.name!)

  const { data = "0", isLoading } = useQuery<number>(
    [
      `@hopers/${externalAddress}/${
        denom ?? ChainConfigs[TokenStatus[externalChain].chain].microDenom
      }/balance`
    ],
    async () => {
      const client = await getStargateClient()
      const tokenBalance = await fetchExternalBalance({
        address: externalAddress!,
        client,
        denom
      })
      return tokenBalance
    },
    {
      notifyOnChangeProps: ["data", "error"],
      onError(e: any) {
        throw new Error("Error fetching external token balance:" + e.message)
      },
      enabled: Boolean(isWalletConnected && externalAddress),
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: false,
      staleTime: 6000
    }
  )

  return [data, isLoading] as const
}
