import {
  MsgExecuteContractEncodeObject,
  SigningCosmWasmClient
} from "@cosmjs/cosmwasm-stargate"
import { coin, coins } from "@cosmjs/stargate"
import { useChain } from "@cosmos-kit/react"
import { contracts } from "@hopersio/contracts"
import { HopersSwapHopersExecuteMsg } from "@hopersio/contracts/types/HopersSwapHopers.types"
import { useValidPool } from "hooks/swap/useValidPool"
import { useCallback, useEffect, useMemo, useState } from "react"
import { getRecoil } from "recoil-nexus"
import { addLiquidityState } from "state/poolState"
import { slippageState, tokenSwapState } from "state/swapState"
import { ChainConfigs } from "utils/tokens/chains"
import { convertDenomToMicroDenom } from "utils/tokens/helpers"
import { TValidPair } from "utils/tokens/liquidities"
import { TPool } from "utils/tokens/pools"
import { TokenStatus, TokenType, TTokenListItem } from "utils/tokens/tokens"
import { createExecuteMessage } from "../messages/createExecuteMessage"
import { createIncreaseAllowanceMessage } from "../messages/createIncreaseAllowanceMessage"
import { simulateTransaction } from "../messages/simulateTransaction"

export const removeLiquidity = async (
  contractAddress: string,
  address: string,
  pool: TPool,
  getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>,
  poolBalance: number,
  removeAmount: number
) => {
  const client = await getSigningCosmWasmClient()
  const { HopersSwapHopersMessageComposer } = contracts.HopersSwapHopers

  const swapMessageComposer = new HopersSwapHopersMessageComposer(
    address,
    contractAddress
  )

  let transactions: MsgExecuteContractEncodeObject[] = []

  const increaseAllowanceMessage = createIncreaseAllowanceMessage({
    senderAddress: address,
    tokenAmount: convertDenomToMicroDenom(poolBalance * removeAmount, 6),
    tokenAddress: pool.lpAddress,
    swapAddress: contractAddress
  })

  transactions.push(increaseAllowanceMessage)

  const removeLiquidityMessage = swapMessageComposer.removeLiquidity({
    amount: convertDenomToMicroDenom(poolBalance * removeAmount, 6).toString(),
    minToken1: "0",
    minToken2: "0"
  })

  transactions.push(removeLiquidityMessage)

  return simulateTransaction(
    await client.signAndBroadcast(address, transactions, "auto")
  )
}
