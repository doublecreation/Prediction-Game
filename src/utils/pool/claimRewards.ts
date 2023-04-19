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
import { BondingPeriod, TPool } from "utils/tokens/pools"
import { TokenStatus, TokenType, TTokenListItem } from "utils/tokens/tokens"
import { createExecuteMessage } from "../messages/createExecuteMessage"
import { createIncreaseAllowanceMessage } from "../messages/createIncreaseAllowanceMessage"
import { simulateTransaction } from "../messages/simulateTransaction"

export const claimRewards = async (
  address: string,
  getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>,
  pool: TPool
) => {
  const client = await getSigningCosmWasmClient()
  const { bondingPeriods } = pool

  const { HopersStakingMessageComposer, HopersStakingClient } =
    contracts.HopersStaking

  let transactions: MsgExecuteContractEncodeObject[] = []

  for (const bondingPeriod of bondingPeriods) {
    const messageComposer = new HopersStakingMessageComposer(
      address,
      bondingPeriod.stakingAddress
    )

    const stakerInfo = await client.queryContractSmart(
      bondingPeriod.stakingAddress,
      {
        staker_info: {
          staker: address
        }
      }
    )

    const claimMessage = messageComposer.withdraw()

    if (stakerInfo.pending_reward > 0) transactions.push(claimMessage)
  }

  return simulateTransaction(
    await client.signAndBroadcast(address, transactions, "auto")
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
