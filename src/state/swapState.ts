import { atom } from "recoil"
import { TSwapInfo } from "utils/swap"
import { TokenType } from "utils/tokens/tokens"

export const tokenSwapState = atom<TSwapInfo>({
  key: "tokenSwapState",
  default: {
    from: {
      token: TokenType.JUNO,
      amount: "0"
    },
    to: {
      token: TokenType.HOPERS,
      amount: "0"
    }
  },
  effects_UNSTABLE: [
    function validateIfTokensAreSame({ onSet, setSelf }) {
      onSet((newValue, oldValue) => {
        const { from, to } = newValue
        if (from.token === to.token) {
          requestAnimationFrame(() => {
            setSelf({ from: oldValue[1], to: oldValue[0] })
          })
        }
      })
    }
  ]
})

export const slippageState = atom<number>({
  key: "slippage",
  default: 1
})
