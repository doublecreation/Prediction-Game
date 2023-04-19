import {
  Avatar,
  AvatarGroup,
  Button,
  chakra,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Spacer,
  Text,
  useBreakpoint,
  VStack
} from "@chakra-ui/react"
import { useDebounceEffect } from "ahooks"
import { BannerIcon } from "components/Assets/earn/BannerIcon"
import { FarmIcon } from "components/Assets/FarmIcon"
import { useTokenPriceByPool } from "hooks/pool/useTokenPriceByPool"
import {
  getTokenInfoFromTokenList,
  useTokenInfo
} from "hooks/tokens/useTokenInfo"
import { useTokenList } from "hooks/tokens/useTokenList"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TPool } from "utils/tokens/pools"
import {
  TokenFullName,
  TokenStatus,
  TokenSymbol,
  TokenType
} from "utils/tokens/tokens"

export const PoolCard = ({
  bannerFontSize,
  icon,
  bannerColor,
  pool
}: {
  bannerFontSize: number
  icon: React.ReactNode
  bannerColor: string
  pool: TPool
}) => {
  const tokenA = useTokenInfo(pool.liquidity.token1.denom)
  const tokenB = useTokenInfo(pool.liquidity.token2.denom)

  const navigate = useNavigate()

  const breakpoint = useBreakpoint()
  const [showUI, setShowUI] = useState(false)

  const [tokenPrices, isLoadingTokenPrices] = useTokenPriceByPool({ pool })

  const highestTVL = useMemo(() => {
    if (isLoadingTokenPrices) {
      return 0
    }

    const token2Reserve =
      pool.liquidity.token2.amount /
      Math.pow(10, TokenStatus[pool.liquidity.token2.denom].decimal || 6)

    const token1Reserve =
      pool.liquidity.token1.amount /
      Math.pow(10, TokenStatus[pool.liquidity.token1.denom].decimal || 6)

    const token1Liquidity = token1Reserve * (tokenPrices?.token1Price ?? 0)
    const token2Liquidity = token2Reserve * (tokenPrices?.token2Price ?? 0)

    const totalLiquidity = token1Liquidity + token2Liquidity

    return totalLiquidity
  }, [tokenPrices])

  const highestApr = useMemo(() => {
    let highestApr: number = 0
    let rewardToken: TokenType = TokenType.HOPERS

    if (pool.bondingPeriods && pool.bondingPeriods.length > 0) {
      for (const [index, bondingPeriod] of pool.bondingPeriods.entries()) {
        if (bondingPeriod.apr > highestApr) {
          highestApr = bondingPeriod.apr
        }
        if (bondingPeriod.rewardToken) {
          rewardToken = bondingPeriod.rewardToken
        }
      }
    }

    return { highestApr, rewardToken }
  }, [pool])

  return (
    <Flex
      minH="20rem"
      minW={{ base: "0", md: "25vw" }}
      w={{ base: "full", md: "full" }}
      rounded="1.25em"
      bg="white"
      _dark={{
        bg: "gray.700",
        bgGradient: "linear(to-b, gray.600 1%, gray.700 80%)"
      }}
      pos="relative"
      align="start"
      px={3}
      pt={3}
      pb={{ base: 10, md: 3 }}
      shadow="md"
    >
      <Flex direction="column" gap={2} w="full">
        <AvatarGroup size="lg">
          <Avatar
            border="none"
            name={tokenA.name ?? ""}
            src={tokenA.imageUrl ?? ""}
          />
          <Avatar
            right="3"
            border="none"
            name={tokenB.name ?? ""}
            src={tokenB.imageUrl ?? ""}
          />
        </AvatarGroup>
        <VStack spacing={0} align="start" h="full">
          <Heading fontWeight="400" fontSize="2xl">
            {TokenSymbol[pool.liquidity.token1.denom]}
            <chakra.span color="gray.400" fontWeight="900" px={"4px"}>
              /
            </chakra.span>
            {TokenSymbol[pool.liquidity.token2.denom]}
          </Heading>
          <Text fontSize="lg">
            <chakra.span
              color="gray.400"
              fontWeight="900"
              fontSize="sm"
              pe={"2px"}
            >
              #
            </chakra.span>
            {pool.poolId}
          </Text>
        </VStack>
        <Flex w="full" flex={1} direction="column" gap={2} h="full">
          <HStack
            w="full"
            justify={"space-between"}
            bg="offwhite.2"
            color="gray.800"
            _dark={{ bg: "gray.800", color: "white" }}
            shadow="md"
            py={1}
            px={3}
            rounded="0.8em"
            h="3rem"
          >
            <Text fontFamily="heading">APR</Text>
            <Skeleton isLoaded={!!highestApr}>
              <HStack>
                <Text fontSize={highestApr.highestApr === 0 ? "20" : "14"}>
                  {highestApr.highestApr === 0 ? "No Rewards" : "Up to"}
                  {highestApr.highestApr !== 0 && (
                    <chakra.span
                      bgGradient="linear(45deg, brand.1, brand.2)"
                      bgClip="text"
                      fontSize="20"
                      fontFamily="heading"
                      ps={1}
                    >
                      {highestApr.highestApr}%
                    </chakra.span>
                  )}
                </Text>
                {highestApr.rewardToken && (
                  <Avatar
                    h="2rem"
                    w="2rem"
                    src={
                      `assets/listedTokens/${highestApr?.rewardToken?.replace(
                        /\//g,
                        ""
                      )}.png` ?? ""
                    }
                  />
                )}
              </HStack>
            </Skeleton>
          </HStack>
          <HStack
            w="full"
            justify={"space-between"}
            bg="offwhite.2"
            color="gray.800"
            _dark={{ bg: "gray.800", color: "white" }}
            shadow="md"
            py={1}
            px={3}
            rounded="0.8em"
            h="3rem"
          >
            <Text>TVL</Text>
            <Text>
              {highestTVL.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2
              }) ?? 0}
            </Text>
          </HStack>
        </Flex>
        <Button
          mt={2}
          rounded="0.9em"
          bgGradient="linear(45deg, brand.1, brand.2)"
          _hover={{
            filter:
              "brightness(110%) drop-shadow(0px 2px 6px rgba(2,226,150, 1))"
          }}
          transition="all 0.5s"
          _active={{
            filter:
              "brightness(80%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
          }}
          color="gray.800"
          fontSize="16"
          onClick={() => {
            navigate(`/pool/${pool?.poolId}`)
          }}
          leftIcon={<FarmIcon w="1.5rem" h="1.5rem" />}
        >
          Start Earning
        </Button>
      </Flex>

      <BannerIcon
        bannerColor={bannerColor}
        top={-3}
        right={3}
        icon={icon}
        bannerFontSize={bannerFontSize}
      />
    </Flex>
  )
}
