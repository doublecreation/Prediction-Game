export type TRoundsStatus =
    | "expired"
    | "live"
    | "next"
    | "later"
    | "calculating"

export type TRound = {
    id: number
    bid_time: number
    open_time: number
    close_time: number
    bull_amount: number
    bear_amount: number
    current_time: number
    open_price: number
    close_price: number
    winner: string
}
