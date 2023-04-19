import {
  Avatar,
  AvatarGroup,
  Button,
  chakra,
  Flex,
  Heading,
  HStack,
  Skeleton,
  SkeletonCircle,
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

export const PoolCardSkeleton = ({
  bannerFontSize,
  icon,
  bannerColor
}: {
  bannerFontSize: number
  icon: React.ReactNode
  bannerColor: string
}) => {
  const breakpoint = useBreakpoint()

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
        <AvatarGroup>
          <SkeletonCircle w="4rem" h="4rem">
            <Avatar size="lg" border="none" name={""} src={""} />
          </SkeletonCircle>
          <SkeletonCircle right="3" pos="relative" w="4rem" h="4rem">
            <Avatar size="lg" border="none" name={""} src={""} />
          </SkeletonCircle>
        </AvatarGroup>
        <VStack spacing={0.5} align="start" h="full">
          <Skeleton rounded="1em">
            <Heading fontWeight="400" fontSize="2xl">
              Token 1
              <chakra.span color="gray.400" fontWeight="900" px={"4px"}>
                /
              </chakra.span>
              Token 2
            </Heading>
          </Skeleton>
          <Skeleton rounded="1em">
            <Text fontSize="lg">
              <chakra.span
                color="gray.400"
                fontWeight="900"
                fontSize="sm"
                pe={"2px"}
              >
                #
              </chakra.span>
              00
            </Text>
          </Skeleton>
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
            <Skeleton
              rounded="1em"
              overflow="hidden"
              w="11rem"
              isLoaded={false}
            >
              <HStack>
                <Text fontSize="20" fontFamily="heading" ps={1}>
                  Up to 000%
                </Text>
                <Avatar h="2rem" w="2rem" src={""} />
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
            <Text fontFamily="heading">TVL</Text>
            <Skeleton w="11rem" rounded="1em" isLoaded={false}>
              <Text fontSize="20" fontFamily="heading" ps={1}>
                $0
              </Text>
            </Skeleton>
          </HStack>
        </Flex>
        <Skeleton mt={2} rounded="1em">
          <Button
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
            Start Earning
          </Button>
        </Skeleton>
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
