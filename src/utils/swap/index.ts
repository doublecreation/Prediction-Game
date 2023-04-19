import { TokenType } from "utils/tokens/tokens"

export type TSwapInfo = {
  from: {
    token: TokenType
    amount: string
  }
  to: {
    token: TokenType
    amount: string
  }
}

export type TAddLiquidityInfo = {
  tokenA: {
    token: TokenType
    amount: string
  }
  tokenB: {
    token: TokenType
    amount: string
  }
}
