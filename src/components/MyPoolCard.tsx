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
import { useBondedLiquidity } from "hooks/pool/useBondedLiquidity"
import { useTokenPriceByPool } from "hooks/pool/useTokenPriceByPool"
import {
  getTokenInfoFromTokenList,
  useTokenInfo
} from "hooks/tokens/useTokenInfo"
import { useTokenList } from "hooks/tokens/useTokenList"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { TPool, TPoolWithBalance } from "utils/tokens/pools"
import {
  TokenFullName,
  TokenStatus,
  TokenSymbol,
  TokenType
} from "utils/tokens/tokens"

export const MyPoolCard = ({
  pool,
  bonded,
  rewards
}: {
  pool: TPoolWithBalance
  bonded: number
  rewards: number
}) => {
  const tokenA = useTokenInfo(pool.pool.liquidity.token1.denom)
  const tokenB = useTokenInfo(pool.pool.liquidity.token2.denom)

  const navigate = useNavigate()

  const breakpoint = useBreakpoint()
  const [showUI, setShowUI] = useState(false)

  const highestApr = useMemo(() => {
    let highestApr: number = 0
    let rewardToken: TokenType = TokenType.HOPERS

    if (pool.pool.bondingPeriods && pool.pool.bondingPeriods.length > 0) {
      for (const [index, bondingPeriod] of pool.pool.bondingPeriods.entries()) {
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
      <Flex direction="column" gap={2} w="full" flex={1} h="full">
        <HStack>
          <AvatarGroup size="md">
            <Avatar
              border="none"
              name={tokenA.token ?? ""}
              src={tokenA.imageUrl ?? ""}
            />
            <Avatar
              right="3"
              border="none"
              name={tokenB.token ?? ""}
              src={tokenB.imageUrl ?? ""}
            />
          </AvatarGroup>
          <VStack spacing={0} align="start" h="full">
            <Heading fontWeight="400" fontSize="xl">
              {TokenSymbol[pool.pool.liquidity.token1.denom]}
              <chakra.span color="gray.400" fontWeight="900" px={"4px"}>
                /
              </chakra.span>
              {TokenSymbol[pool.pool.liquidity.token2.denom]}
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
              {pool.pool.poolId}
            </Text>
          </VStack>
        </HStack>

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
            <Text fontFamily="heading">Bonded</Text>
            <Skeleton isLoaded={!!highestApr}>
              <HStack>
                <Text fontSize={20}>
                  <chakra.span
                    bgGradient="linear(45deg, brand.1, brand.2)"
                    bgClip="text"
                    fontSize="20"
                    fontFamily="heading"
                    ps={1}
                  >
                    {convertMicroDenomToDenom(bonded, 6).toFixed(2)}
                  </chakra.span>
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
            <Text fontFamily="heading">Rewards</Text>
            <Skeleton isLoaded={!!highestApr}>
              <HStack>
                <Text fontSize={20}>
                  <chakra.span
                    bgGradient="linear(45deg, brand.1, brand.2)"
                    bgClip="text"
                    fontSize="20"
                    fontFamily="heading"
                    ps={1}
                  >
                    {convertMicroDenomToDenom(
                      rewards,
                      TokenStatus[highestApr.rewardToken].decimal ?? 6
                    ).toFixed(2)}
                  </chakra.span>
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
          leftIcon={<FarmIcon w="1.5rem" h="1.5rem" />}
        >
          Manage
        </Button>
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
          leftIcon={<FarmIcon w="1.5rem" h="1.5rem" />}
        >
          Claim
        </Button>
      </Flex>
    </Flex>
  )
}
