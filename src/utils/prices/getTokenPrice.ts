import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { TokenStatusType, TokenType } from "utils/tokens/tokens"

export const getTokenPriceFromPool = async ({
  contractAddress,
  getCosmWasmClient,
  from,
  to
}: {
  contractAddress: string
  getCosmWasmClient: () => Promise<CosmWasmClient>
  from: TokenType
  to: TokenType
}) => {
  const client = await getCosmWasmClient()

  if (from === to) {
    return { price: 1 }
  }

  const info = await client.queryContractSmart(contractAddress, {
    pool: {}
  })

  const currentContractPrice =
    Number(info.assets[1].amount) / Number(info.assets[0].amount)

  return currentContractPrice
}

export const getTokenPriceCoinGecko = async ({
  tokenId,
  precision
}: {
  tokenId: string
  precision: number
}) => {
  const coinGeckoData = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd&precision=${precision}`
  )

  console.log(coinGeckoData)

  // return coinGeckoData.data["juno-network"]["usd"]
}
