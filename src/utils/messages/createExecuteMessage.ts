import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate"
import { toUtf8 } from "@cosmjs/encoding"
import { Coin } from "@cosmjs/stargate"
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx"

type CreateExecuteMessage = {
  senderAddress: string
  message: any
  contractAddress: string
  funds?: Array<Coin>
}

export const createExecuteMessage = ({
  senderAddress,
  contractAddress,
  message,
  funds
}: CreateExecuteMessage): MsgExecuteContractEncodeObject => ({
  typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
  value: MsgExecuteContract.fromPartial({
    sender: senderAddress,
    contract: contractAddress,
    msg: toUtf8(JSON.stringify(message)),
    funds: funds || []
  })
})
