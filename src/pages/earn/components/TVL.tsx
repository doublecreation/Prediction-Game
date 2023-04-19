import { Flex, HStack, Skeleton, Text, useBreakpoint } from "@chakra-ui/react"
import { useTokenPriceByPool } from "hooks/pool/useTokenPriceByPool"
import { useEffect } from "react"
import { Liquidity, TPool } from "utils/tokens/pools"
import { TokenType, TokenStatus } from "utils/tokens/tokens"
import shortenNumber from "utils/ui/shortenNumber"

const TVL: React.FC<{ liquidity: Liquidity }> = ({ liquidity }) => {
  // const [tokenPrices, isLoading] = useTokenPriceByPool({ pool })

  // const token2Reserve =
  //   pool.liquidity.token2.amount /
  //   Math.pow(10, TokenStatus[pool.liquidity.token2.denom].decimal || 6)

  // const token1Reserve =
  //   pool.liquidity.token1.amount /
  //   Math.pow(10, TokenStatus[pool.liquidity.token1.denom].decimal || 6)

  // const token1Liquidity = token1Reserve * (tokenPrices?.token1Price ?? 0)
  // const token2Liquidity = token2Reserve * (tokenPrices?.token2Price ?? 0)

  const breakpoint = useBreakpoint()

  if (breakpoint === "base" || breakpoint === "sm ") {
    return (
      <HStack spacing={1}>
        <Text
          fontFamily="heading"
          fontSize={{ base: 18, md: "md" }}
          lineHeight={{ base: 1, md: 1.4 }}
        >
          TVL
        </Text>
        <Skeleton rounded="full" w="full" isLoaded={Boolean(liquidity.usd)}>
          <Text
            fontFamily="heading"
            fontSize={{ base: 18, md: "md" }}
            lineHeight={{ base: 1, md: 1.4 }}
            bgGradient="linear(45deg, brand.1, brand.2)"
            bgClip="text"
          >
            {`$${shortenNumber(liquidity.usd, 2)}`}
          </Text>
        </Skeleton>
      </HStack>
    )
  }

  return (
    <Text
      fontFamily="heading"
      fontSize={{ base: 18, md: "md" }}
      lineHeight={{ base: 1, md: 1.4 }}
    >
      {`$${shortenNumber(liquidity.usd, 2)}`}
    </Text>
  )
}

export default TVL
