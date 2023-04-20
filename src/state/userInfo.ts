import { atom } from "recoil"

export const balanceState = atom<number>({
    default: 0,
    key: "balanceState"
})
