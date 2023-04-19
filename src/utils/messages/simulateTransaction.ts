import { DeliverTxResponse, isDeliverTxFailure } from "@cosmjs/stargate"

export function simulateTransaction(result: DeliverTxResponse) {
  if (isDeliverTxFailure(result)) {
    throw new Error(
      `Error ${result.code} while broadcasting transaction: ${result.transactionHash} at height ${result.height}`
    )
  }

  return result
}
