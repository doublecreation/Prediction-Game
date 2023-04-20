import { atom } from "recoil"

export const currentVotingState = atom<"none" | "up" | "down">({
  default: "none",
  key: "currentVotingState"
})
