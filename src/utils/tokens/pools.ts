import { TokenType, TTokenListItem } from "./tokens"

export type TPoolConfig = {
  lockDuration: number
  distributionEnd?: number
  rewardToken?: TokenType
}

export type BondingPeriod = {
  apr: number
  stakingAddress: string
  rewardToken: TokenType
  lockDuration: number
  distributionEnd: number
}

export type LiquidityToken = {
  amount: number
  tokenPrice: number
  denom: TokenType
}

export type Liquidity = {
  usd: number
  token1: LiquidityToken
  token2: LiquidityToken
}

export type TPool = {
  bondingPeriods: Array<BondingPeriod>
  poolId: number
  lpAddress: string
  ratio: number
  contractAddress: string
  lpTokens: number
  isVerified: boolean
  liquidity: Liquidity
}

export type TPoolWithBalance = {
  pool: TPool
  balance: number
  apr: number
}

export type TPoolsWithBalances = Array<TPoolWithBalance>
