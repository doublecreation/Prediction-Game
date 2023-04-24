import { atom } from "recoil"
import { TRound } from "types"

export const roundsState = atom<TRound[]>({
    default: [],
    key: "roundsState"
})

export const configState = atom<any>({
    default: {},
    key: "configState"
})

export const currentTimeState = atom<number>({
    default: 0,
    key: "currentTimeState"
})
