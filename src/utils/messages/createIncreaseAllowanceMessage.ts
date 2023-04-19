import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate"
import { toUtf8 } from "@cosmjs/encoding"
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx"
import { type Cw20ExecuteMsg } from "@hopersio/contracts/types/CW20Base.types"

type CreateIncreaseAllowanceMessageArgs = {
  senderAddress: string
  tokenAmount: number
  tokenAddress: string
  swapAddress: string
}

export const createIncreaseAllowanceMessage = ({
  senderAddress,
  tokenAmount,
  tokenAddress,
  swapAddress
}: CreateIncreaseAllowanceMessageArgs): MsgExecuteContractEncodeObject => {
  const increaseAllowanceMsg: Cw20ExecuteMsg = {
    increase_allowance: {
      amount: `${tokenAmount}`,
      spender: `${swapAddress}`
    }
  }

  return {
    typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
    value: MsgExecuteContract.fromPartial({
      sender: senderAddress,
      contract: tokenAddress,
      msg: toUtf8(JSON.stringify(increaseAllowanceMsg)),
      funds: []
    })
  }
}
