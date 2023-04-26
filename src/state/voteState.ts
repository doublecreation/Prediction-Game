import { atom } from "recoil"

export const currentVotingState = atom<"none" | "up" | "down" | "claim">({
    default: "none",
    key: "currentVotingState"
})

export const claimRoundIdState = atom<number | "">({
    default: "",
    key: "claimRoundId"
})
