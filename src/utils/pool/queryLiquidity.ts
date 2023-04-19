import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { protectAgainstNaN } from "utils/tokens/helpers"

export const queryLiquidityBalance = async ({
  client,
  tokenAddress,
  address
}: {
  client: CosmWasmClient
  tokenAddress: string
  address: string
}) => {
  try {
    const query = await client.queryContractSmart(tokenAddress, {
      balance: { address }
    })

    return protectAgainstNaN(Number(query.balance))
  } catch (e) {
    console.error("Cannot get liquidity balance:", e)
  }
}
