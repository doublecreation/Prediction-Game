import { atom } from "recoil"
import { TAddLiquidityInfo, TSwapInfo } from "utils/swap"
import { TokenType } from "utils/tokens/tokens"

export const addLiquidityState = atom<TAddLiquidityInfo>({
  key: "addLiquidity",
  default: {
    tokenA: { token: TokenType.HOPERS, amount: "0" },
    tokenB: { token: TokenType.HOPERS, amount: "0" }
  }
})
