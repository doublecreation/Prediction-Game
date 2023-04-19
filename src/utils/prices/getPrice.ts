import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { TValidPair } from "utils/tokens/liquidities"
import { TPool } from "utils/tokens/pools"
import { TokenStatus, TokenStatusType } from "utils/tokens/tokens"

export interface GetToken1ForToken2PriceInput {
  nativeAmount: string
  swapAddress: string
  client: CosmWasmClient
}

export const getToken1ForToken2Price = async ({
  nativeAmount,
  swapAddress,
  client
}: GetToken1ForToken2PriceInput) => {
  try {
    const response = await client.queryContractSmart(swapAddress, {
      token1_for_token2_price: {
        token1_amount: `${nativeAmount}`
      }
    })
    console.log(response)
    return response.token2_amount
  } catch (e) {
    console.error("err(getToken1ForToken2Price):", e)
  }
}

export interface GetToken2ForToken1PriceInput {
  tokenAmount: string
  swapAddress: string
  client: CosmWasmClient
}

export const getToken2ForToken1Price = async ({
  tokenAmount,
  swapAddress,
  client
}: GetToken2ForToken1PriceInput) => {
  try {
    const query = await client.queryContractSmart(swapAddress, {
      token2_for_token1_price: {
        token2_amount: `${tokenAmount}`
      }
    })
    return query.token1_amount
  } catch (e) {
    console.error("error(getToken2ForToken1Price):", e)
  }
}

export interface GetTokenForTokenPriceInput {
  fromAmount: string
  validPair: TValidPair
  getCosmWasmClient: () => Promise<CosmWasmClient>
}

export const getTokenForTokenPrice = async ({
  fromAmount,
  validPair,
  getCosmWasmClient
}: GetTokenForTokenPriceInput) => {
  const client = await getCosmWasmClient()
  let intermediatePrice, queryResult1, queryResult2
  try {
    if (!validPair.subPools) {
      intermediatePrice = !validPair.reverse
        ? await getToken1ForToken2Price({
            nativeAmount: fromAmount,
            swapAddress: validPair.pool.contractAddress,
            client
          })
        : await getToken2ForToken1Price({
            tokenAmount: fromAmount,
            swapAddress: validPair.pool.contractAddress,
            client
          })
    } else {
      const firstPool = validPair.subPools?.[0]
      const secondPool = validPair.subPools?.[1]
      if (!firstPool || !secondPool) return

      queryResult1 = !firstPool.reverse
        ? await getToken1ForToken2Price({
            nativeAmount: fromAmount,
            swapAddress: firstPool.pool.contractAddress,
            client
          })
        : await getToken2ForToken1Price({
            tokenAmount: fromAmount,
            swapAddress: firstPool.pool.contractAddress,
            client
          })

      if (isNaN(queryResult1) || !queryResult1) return

      intermediatePrice = !secondPool.reverse
        ? await getToken1ForToken2Price({
            nativeAmount: queryResult1,
            swapAddress: secondPool.pool.contractAddress,
            client
          })
        : await getToken2ForToken1Price({
            tokenAmount: queryResult1,
            swapAddress: secondPool.pool.contractAddress,
            client
          })
    }

    return intermediatePrice
  } catch (e) {
    console.error("error(getTokenForTokenPrice)", e)
  }
}

export type InfoResponse = {
  lp_token_supply: string
  lp_token_address: string
  token1_denom: string
  token1_reserve: string
  token2_denom: string
  token2_reserve: string
  owner?: string
  lp_fee_percent?: string
  protocol_fee_percent?: string
  protocol_fee_recipient?: string
}

export const getSwapInfo = async (
  swapAddress: string,
  client: CosmWasmClient
  // @ts-ignore
): Promise<InfoResponse> => {
  try {
    if (!swapAddress || !client) {
      throw new Error(
        `No swapAddress or rpcEndpoint was provided: ${JSON.stringify({
          swapAddress,
          client
        })}`
      )
    }

    return await client.queryContractSmart(swapAddress, {
      info: {}
    })
  } catch (e) {
    console.error("Cannot get swap info:", e)
  }
}

export type FeeResponse = {
  lp_fee_percent: string
  owner: string
  protocol_fee_percent: string
  protocol_fee_recipient: string
}

export const getSwapFee = async (
  swapAddress: string,
  client: CosmWasmClient
  //@ts-ignore
): Promise<FeeResponse> => {
  try {
    if (!swapAddress || !client) {
      throw new Error(
        `No swapAddress or rpcEndpoint was provided: ${JSON.stringify({
          swapAddress,
          client
        })}`
      )
    }

    return await client.queryContractSmart(swapAddress, {
      fee: {}
    })
  } catch (e) {
    console.error("Cannot get swap fee:", e)
  }
}
