import {
  getCosmWasmClient,
  getSigningCosmWasmClient,
  getQueryClient
} from "@sei-js/core"
import { useCallback } from "react"
import { useChain } from "@cosmos-kit/react"
import { ExtendedHttpEndpoint } from "@cosmos-kit/core"
import { useQueryClient } from "@sei-js/react"
import { cosmos } from "juno-network"
import { AssetInfo, ChainInfo } from "../constants"

const useContract = () => {
  const { getRpcEndpoint, address } = useChain("seimainnet")

  const getRpcEndpointString = useCallback(async () => {
    let rpcEndpoint = await getRpcEndpoint()

    if (!rpcEndpoint) {
      console.info("no rpc endpoint — using a fallback")
      rpcEndpoint = ChainInfo.apis.rpc[0].address
    }
    return typeof rpcEndpoint === "string"
      ? rpcEndpoint
      : (rpcEndpoint as ExtendedHttpEndpoint).url
  }, [getRpcEndpoint])

  const runQuery = useCallback(
    async (contractAddress: string, queryMsg: any) => {
      const rpcEndpoint = await getRpcEndpointString()
      const cosmwasmClient = await getCosmWasmClient(rpcEndpoint)
      const result = await cosmwasmClient.queryContractSmart(
        contractAddress,
        queryMsg
      )
      return result
    },
    [getRpcEndpointString]
  )

  const getBalance = useCallback(async () => {
    if (!address) return 0
    // get RPC client
    const rpcEndpoint = await getRpcEndpointString()
    const client = await cosmos.ClientFactory.createRPCQueryClient({
      rpcEndpoint
    })
    // fetch balance
    const balance = await client.cosmos.bank.v1beta1.balance({
      address,
      denom: AssetInfo.assets[0].denom_units[0].denom
    })

    return Number(balance?.balance?.amount || 0) / 1e6
  }, [address, getRpcEndpointString])

  return {
    getBalance,
    runQuery
  }
}

export default useContract
