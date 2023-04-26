import { getCosmWasmClient } from "@sei-js/core"
import {
    SigningCosmWasmClient,
    MsgExecuteContractEncodeObject
} from "@cosmjs/cosmwasm-stargate"
import { toUtf8 } from "@cosmjs/encoding"
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx"
import { useCallback, useMemo } from "react"
import { useChain } from "@cosmos-kit/react"
import { ExtendedHttpEndpoint } from "@cosmos-kit/core"
import { cosmos } from "juno-network"
import { coins } from "@cosmjs/proto-signing"
import { Coin } from "@cosmjs/launchpad"
import {
    AssetInfo,
    ChainInfo,
    ConnectedChain,
    FuzioContract
} from "../constants"
import { toMicroAmount } from "utils/tokens/coins"
import { StdFee } from "@cosmjs/stargate"

type CreateExecuteMessageArgs = {
    senderAddress: string
    message: Record<string, Record<string, string>>
    contractAddress: string
    funds?: Array<Coin>
}

const useContract = () => {
    const { getRpcEndpoint, address, getSigningCosmWasmClient, chain } =
        useChain(ConnectedChain)

    const currentChain = useMemo(
        () => ({
            denom: chain?.fees?.fee_tokens?.[0]?.denom || "usei"
        }),
        [chain]
    )

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
        // const rpcEndpoint = await getRpcEndpointString()
        // const client = await cosmos.ClientFactory.createRPCQueryClient({
        //     rpcEndpoint
        // })
        // fetch balance
        // const balance = await client.cosmos.bank.v1beta1.balance({
        //     address,
        //     denom: currentChain.denom
        // })
        const balance = await runQuery(FuzioContract, {
            balance: { address }
        })

        // return Number(balance?.balance?.amount || 0) / 1e6
        return Number(balance?.balance || 0) / 1e6
    }, [
        address,
        // getRpcEndpointString,
        runQuery,
        currentChain
    ])

    const runExecute = useCallback(
        async (
            contractAddress: string,
            executeMsg: any,
            option?: {
                memo?: string
                funds?: string
                denom?: string
            }
        ) => {
            if (!address) return
            const executeMemo = option?.memo || ""
            const executeFunds = option?.funds || ""
            const executeDenom = option?.denom || currentChain.denom

            const fee: StdFee = {
                amount: [
                    {
                        denom: executeDenom,
                        amount: "1"
                    }
                ],
                gas: "86364"
            }

            const signingCosmWasmClient = await getSigningCosmWasmClient()
            return signingCosmWasmClient
                .execute(
                    address,
                    contractAddress,
                    executeMsg,
                    fee,
                    executeMemo,
                    executeFunds
                        ? coins(
                              toMicroAmount(executeFunds, executeDenom),
                              executeDenom
                          )
                        : undefined
                )
                .then((res) => res)
                .catch((err) => console.error(err.message))
        },
        [getSigningCosmWasmClient, address]
    )

    const createExecuteMessage = useCallback(
        ({
            senderAddress,
            contractAddress,
            message,
            funds
        }: CreateExecuteMessageArgs): MsgExecuteContractEncodeObject => ({
            typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
            value: MsgExecuteContract.fromPartial({
                sender: senderAddress,
                contract: contractAddress,
                msg: toUtf8(JSON.stringify(message)),
                funds: funds || []
            })
        }),
        []
    )

    return {
        getBalance,
        runQuery,
        runExecute,
        createExecuteMessage
    }
}

export default useContract
