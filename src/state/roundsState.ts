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

export const remainTimeState = atom<number>({
    default: 0,
    key: "remainTimeState"
})

export const liveRoundState = atom<number>({
    default: -1,
    key: "liveRoundState"
})

export const nextRoundState = atom<number>({
    default: -1,
    key: "nextRoundState"
})

export const calculatingRoundState = atom<number>({
    default: -1,
    key: "calculatingRoundState"
})
