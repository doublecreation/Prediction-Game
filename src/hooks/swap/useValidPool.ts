import { SetStateAction, useEffect, useState } from "react"
import { TValidPair, Liquidities } from "utils/tokens/liquidities"
import { TokenType } from "utils/tokens/tokens"

export const useValidPool = (token1: TokenType, token2: TokenType) => {
  const [validPool, setValidPool] = useState<TValidPair>()

  useEffect(() => {
    let validPair: any
    for (let liquidity of Liquidities) {
      if (liquidity.tokenA === token1 && liquidity.tokenB === token2) {
        validPair = { pool: liquidity, reverse: false }
      }
      if (liquidity.tokenA === token2 && liquidity.tokenB === token1) {
        validPair = { pool: liquidity, reverse: true }
      }
    }
    if (!validPair) {
      const firstPool = Liquidities.find(
        (liquidity) =>
          liquidity.tokenA === token1 || liquidity.tokenB === token1
      )
      if (firstPool) {
        const middleToken =
          firstPool.tokenA === token1 ? firstPool.tokenB : firstPool.tokenA
        const secondPool = Liquidities.find(
          (liquidity) =>
            (liquidity.tokenA === middleToken ||
              liquidity.tokenB === middleToken) &&
            (liquidity.tokenA === token2 || liquidity.tokenB === token2)
        )
        if (secondPool) {
          validPair = {
            pool: firstPool,
            subPools: [
              { pool: firstPool, reverse: token1 === firstPool.tokenB },
              { pool: secondPool, reverse: token2 === secondPool.tokenA }
            ]
          }
        }
      }
    }
    setValidPool(validPair)
  }, [token1, token2])
  return validPool
}
