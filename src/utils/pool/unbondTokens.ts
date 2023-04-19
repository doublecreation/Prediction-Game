import {
  CosmWasmClient,
  MsgExecuteContractEncodeObject,
  SigningCosmWasmClient
} from "@cosmjs/cosmwasm-stargate"
import { toBase64, toUtf8 } from "@cosmjs/encoding"
import { coin, coins } from "@cosmjs/stargate"
import { useChain } from "@cosmos-kit/react"
import { contracts } from "@hopersio/contracts"
import { HopersSwapHopersExecuteMsg } from "@hopersio/contracts/types/HopersSwapHopers.types"
import { useValidPool } from "hooks/swap/useValidPool"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { getRecoil } from "recoil-nexus"
import { addLiquidityState } from "state/poolState"
import { slippageState, tokenSwapState } from "state/swapState"
import { ChainConfigs } from "utils/tokens/chains"
import {
  convertDenomToMicroDenom,
  protectAgainstNaN
} from "utils/tokens/helpers"
import { TValidPair } from "utils/tokens/liquidities"
import { TPool } from "utils/tokens/pools"
import { TokenStatus, TokenType, TTokenListItem } from "utils/tokens/tokens"
import { createExecuteMessage } from "../messages/createExecuteMessage"
import { createIncreaseAllowanceMessage } from "../messages/createIncreaseAllowanceMessage"
import { simulateTransaction } from "../messages/simulateTransaction"

export const unbondTokens = async (
  address: string,
  getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>,
  amount: number,
  stakingAddress: string
) => {
  const client = await getSigningCosmWasmClient()

  const { HopersStakingMessageComposer } = contracts.HopersStaking

  const messageComposer = new HopersStakingMessageComposer(
    address,
    stakingAddress
  )

  const unbondMessage = messageComposer.unbond({ amount: amount.toString() })

  return simulateTransaction(
    await client.signAndBroadcast(address, [unbondMessage], "auto")
  )

  // return await client.execute(
  //   address,
  //   stakingAddress,
  //   testMessage,
  //   "auto",
  //   undefined,
  //   []
  // )
}
