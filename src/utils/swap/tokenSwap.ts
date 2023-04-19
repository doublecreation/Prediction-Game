import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { coin, coins } from "@cosmjs/stargate"
import { useChain } from "@cosmos-kit/react"
import { HopersSwapHopersExecuteMsg } from "@hopersio/contracts/types/HopersSwapHopers.types"
import { useValidPool } from "hooks/swap/useValidPool"
import { useEffect, useState } from "react"
import { getRecoil } from "recoil-nexus"
import { slippageState, tokenSwapState } from "state/swapState"
import { ChainConfigs } from "utils/tokens/chains"
import { convertDenomToMicroDenom } from "utils/tokens/helpers"
import { TValidPair } from "utils/tokens/liquidities"
import { TokenStatus, TokenType, TTokenListItem } from "utils/tokens/tokens"
import { createExecuteMessage } from "../messages/createExecuteMessage"
import { createIncreaseAllowanceMessage } from "../messages/createIncreaseAllowanceMessage"
import { simulateTransaction } from "../messages/simulateTransaction"

export const tokenSwap = async (
  validPool: TValidPair | undefined,
  address: string,
  getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>
) => {
  const { from, to } = getRecoil(tokenSwapState)
  const slippage = getRecoil(slippageState)

  const client = await getSigningCosmWasmClient()

  const firstPool = validPool?.subPools?.[0]
  const secondPool = validPool?.subPools?.[1]

  const swapMsg = validPool?.subPools
    ? {
        pass_through_swap: {
          output_amm_address: secondPool?.pool.contractAddress,
          input_token: firstPool?.reverse ? "Token2" : "Token1",
          input_token_amount: Math.ceil(
            Number(from.amount) *
              Math.pow(10, TokenStatus[from.token!].decimal || 6)
          ).toString(),
          output_min_token: "0"
        }
      }
    : {
        swap: {
          input_token: validPool?.reverse ? "Token2" : "Token1",
          input_amount: Math.ceil(
            Number(from.amount) *
              Math.pow(10, TokenStatus[from.token!].decimal || 6)
          ).toString(),
          min_output: "0"
        }
      }

  let funds: any[] = []

  if (
    !TokenStatus[from.token!].isNativeCoin &&
    !TokenStatus[from.token!].isIBCCoin
  ) {
    const increaseAllowanceMessage = createIncreaseAllowanceMessage({
      senderAddress: address,
      tokenAmount: Math.ceil(
        Number(from.amount) *
          Math.pow(10, TokenStatus[from.token!].decimal || 6)
      ),
      tokenAddress: TokenStatus[from.token!].contractAddress!,
      swapAddress: validPool?.pool.contractAddress!
    })

    // console.log(validPool?.pool.contractAddress)
    console.log(swapMsg)

    const executeMessage = createExecuteMessage({
      senderAddress: address,
      contractAddress: validPool?.pool.contractAddress!,
      message: swapMsg
    })

    console.log(executeMessage)

    return simulateTransaction(
      await client.signAndBroadcast(
        address,
        [increaseAllowanceMessage, executeMessage],
        "auto"
      )
    )
  } else {
    funds = coins(
      convertDenomToMicroDenom(
        from.amount,
        TokenStatus[from.token!].decimal ?? 6
      ),
      from.token!
      // ChainConfigs[TokenStatus[swapInfo.from.token].chain]["microDenom"]
    )
  }

  return await client.execute(
    address,
    validPool?.pool.contractAddress!,
    swapMsg,
    "auto",
    undefined,
    funds
  )
}
