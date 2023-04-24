import { atom } from "recoil"

export const btcPriceState = atom<{
    price: string
    priceNumber: number
    priceChange: string
    state: 1 | 0 | -1
}>({
    default: { price: "0", priceNumber: 0, priceChange: "", state: 0 },
    key: "btcPriceState"
})
