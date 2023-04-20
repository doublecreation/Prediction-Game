import { atom } from "recoil"

export const btcPriceState = atom<{
  price: string
  priceChange: string
  state: 1 | 0 | -1
}>({
  default: { price: "0", priceChange: "", state: 0 },
  key: "btcPriceState"
})
