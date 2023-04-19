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

export const addLiquidity = async (
  contractAddress: string,
  address: string,
  pool: TPool,
  getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>
) => {
  const { tokenA, tokenB } = getRecoil(addLiquidityState)

  const client = await getSigningCosmWasmClient()

  const { HopersSwapHopersMessageComposer } = contracts.HopersSwapHopers

  const swapMessageComposer = new HopersSwapHopersMessageComposer(
    address,
    contractAddress
  )

  let funds: any[] = []
  let transactions: MsgExecuteContractEncodeObject[] = []

  const slippage: number = 0.99

  if (
    !TokenStatus[pool.liquidity.token1.denom].isNativeCoin &&
    !TokenStatus[pool.liquidity.token1.denom].isIBCCoin
  ) {
    const increaseAllowanceMessage = createIncreaseAllowanceMessage({
      senderAddress: address,
      tokenAmount: Number(tokenA.amount),
      tokenAddress: TokenStatus[pool.liquidity.token1.denom].contractAddress!,
      swapAddress: pool.contractAddress
    })

    transactions.push(increaseAllowanceMessage)
  } else {
    funds = [...funds, ...coins(tokenA.amount, pool.liquidity.token1.denom)]
  }

  if (
    !TokenStatus[pool.liquidity.token2.denom].isNativeCoin &&
    !TokenStatus[pool.liquidity.token2.denom].isIBCCoin
  ) {
    const increaseAllowanceMessage = createIncreaseAllowanceMessage({
      senderAddress: address,
      tokenAmount: Number(tokenB.amount),
      tokenAddress: TokenStatus[pool.liquidity.token2.denom].contractAddress!,
      swapAddress: pool.contractAddress
    })

    transactions.push(increaseAllowanceMessage)
  } else {
    funds = [...funds, ...coins(tokenB.amount, pool.liquidity.token2.denom)]
  }

  const addLiquidityMessage = swapMessageComposer.addLiquidity(
    {
      maxToken2: tokenB.amount,
      minLiquidity: "0",
      token1Amount: tokenA.amount
    },
    funds
  )

  transactions.push(addLiquidityMessage)

  return simulateTransaction(
    await client.signAndBroadcast(address, transactions, "auto")
  )

  // return await client.execute(
  //   address,
  //   pool.contract,
  //   transactions,
  //   "auto",
  //   undefined,
  //   funds
  // )
}
