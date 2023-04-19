import {
  Flex,
  HStack,
  AvatarGroup,
  Avatar,
  chakra,
  Spacer,
  Stat,
  StatNumber,
  Popover,
  PopoverTrigger,
  Center,
  Icon,
  PopoverContent,
  useColorModeValue,
  PopoverArrow,
  StatLabel,
  Text
} from "@chakra-ui/react"
import { useTokenPriceByPool } from "hooks/pool/useTokenPriceByPool"
import { useTokenInfo } from "hooks/tokens/useTokenInfo"
import { FaQuestionCircle } from "react-icons/fa"
import { usePalette } from "react-palette"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { TPool } from "utils/tokens/pools"
import { TokenStatus } from "utils/tokens/tokens"

export const PoolSummary = ({ pool }: { pool: TPool }) => {
  const tokenA = useTokenInfo(pool.liquidity.token1.denom!)
  const tokenB = useTokenInfo(pool.liquidity.token2.denom!)
  const { data: tokenAColors } = usePalette(tokenA?.imageUrl)
  const { data: tokenBColors } = usePalette(tokenB?.imageUrl)

  const [tokenPrices, isLoading] = useTokenPriceByPool({ pool })
  const token2Reserve =
    pool.liquidity.token2.amount /
    Math.pow(10, TokenStatus[pool?.liquidity.token2.denom!].decimal || 6)

  const token1Reserve =
    pool.liquidity.token1.amount /
    Math.pow(10, TokenStatus[pool?.liquidity.token1.denom!].decimal || 6)

  const token1Liquidity = token1Reserve * (tokenPrices?.token1Price ?? 0)
  const token2Liquidity = token2Reserve * (tokenPrices?.token2Price ?? 0)

  const totalLiquidity = token1Liquidity + token2Liquidity

  return (
    <Flex
      bg="white"
      _dark={{
        bg: "gray.700",
        bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
      }}
      rounded="1.25em"
      w="full"
      px={{ base: 3, md: 4 }}
      py={{ base: 2, md: 4 }}
      flexDirection="column"
      gap={2}
      shadow="md"
    >
      <Flex w="full" direction={{ base: "column", md: "row" }}>
        <HStack spacing={{ base: 0, md: 2 }}>
          <AvatarGroup>
            <Avatar src={tokenA?.imageUrl} border="none" />
            <Avatar src={tokenB?.imageUrl} border="none" right="2" />
          </AvatarGroup>
          <Flex
            fontSize={{ base: "lg", md: "2xl" }}
            flexDir="column"
            gap={"3px"}
          >
            <Text lineHeight="1">
              {tokenA?.name}
              <chakra.span color="gray.400" fontWeight="900" px={"2px"}>
                /
              </chakra.span>
              {tokenB?.name}
            </Text>
            <Text lineHeight="1.2">
              <chakra.span
                color="gray.400"
                fontWeight="100"
                fontSize="lg"
                px={"2px"}
              >
                Pool #
              </chakra.span>
              {pool.poolId}
            </Text>
          </Flex>
        </HStack>
        <Spacer />
        <Stat pe={5} pt={{ base: 3, md: 0 }} maxW="16rem">
          <Flex fontSize="sm" direction="row" align="center" gap={1}>
            Current Liquidity
          </Flex>
          <StatNumber fontSize={{ base: "2xl", md: "4xl" }}>
            {totalLiquidity.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2
            }) ?? 0}
          </StatNumber>
        </Stat>

        <Stat maxW="7rem" pt={{ base: 3, md: 0 }}>
          <Flex fontSize="sm" direction="row" align="center" gap={1}>
            Swap Fee
            <Popover trigger="hover" placement="top" arrowShadowColor="none">
              <PopoverTrigger>
                <Center w="fit-content" justifyContent="start">
                  <Icon h="1rem" as={FaQuestionCircle} />
                </Center>
              </PopoverTrigger>
              <PopoverContent
                px={2}
                py={1}
                maxW="15rem"
                border="none"
                shadow="md"
                rounded="1em"
                _focus={{ shadow: "md" }}
                bg={useColorModeValue("white", "gray.800")}
                color="gray.800"
                _dark={{ color: "white" }}
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={2}
              >
                <PopoverArrow bg={useColorModeValue("white", "gray.800")} />
                <Stat maxW="5.6rem">
                  <StatLabel fontSize="xs">Burned Hopers</StatLabel>
                  <StatNumber fontSize="md">0.5%</StatNumber>
                </Stat>
                <Text fontWeight="600" fontSize="xl">
                  +
                </Text>
                <Stat maxW="6.5rem">
                  <StatLabel fontSize="xs">Protocol Revenue</StatLabel>
                  <StatNumber fontSize="md">0.5%</StatNumber>
                </Stat>
              </PopoverContent>
            </Popover>
          </Flex>

          <StatNumber w="fit-content" fontSize={{ base: "2xl", md: "4xl" }}>
            1%
          </StatNumber>
        </Stat>
      </Flex>
      <Flex w="full" direction="column" gap={1}>
        {pool && (
          <Flex w="full" gap={3}>
            <Flex
              w="full"
              direction="column"
              justify="center"
              align="end"
              pb={2}
            >
              <Text
                fontSize="md"
                textTransform="capitalize"
                color={tokenAColors.vibrant}
              >
                {tokenA?.name.toLowerCase() ?? "Token 1"}
                <chakra.span fontWeight="400" color="white" ps={1}>
                  50%
                </chakra.span>
              </Text>
              <Flex
                fontWeight="900"
                align="center"
                fontSize="xl"
                lineHeight="1.2"
                gap={1}
              >
                {convertMicroDenomToDenom(
                  pool.liquidity.token1.amount ?? 0,
                  TokenStatus[pool.liquidity.token1.denom].decimal ?? 6
                ).toFixed(2) ?? "0"}
                <Avatar w="1.3rem" h="1.3rem" src={tokenA.imageUrl} />
              </Flex>
            </Flex>
            <Flex w="full" direction="column">
              <Text
                fontSize="md"
                textTransform="capitalize"
                color={tokenBColors.vibrant}
              >
                <chakra.span fontWeight="400" color="white" pe={1}>
                  50%
                </chakra.span>
                {tokenB?.name.toUpperCase() ?? "Token 2"}
              </Text>
              <Flex
                fontWeight="900"
                align="center"
                fontSize="xl"
                lineHeight="1.2"
                gap={1}
              >
                {convertMicroDenomToDenom(
                  pool.liquidity.token2.amount ?? 0,
                  TokenStatus[pool.liquidity.token2.denom].decimal ?? 6
                ).toFixed(2) ?? 0}{" "}
                <Avatar w="1.3rem" h="1.3rem" src={tokenB.imageUrl} />
              </Flex>
            </Flex>
          </Flex>
        )}

        <Flex
          overflow="hidden"
          bg="offwhite.2"
          _dark={{ bg: "gray.800" }}
          w="full"
          h="1.5rem"
          rounded="0.9em"
        >
          <Flex bg={tokenAColors.vibrant} w="full" h="1.5rem"></Flex>
          <Flex bg={tokenBColors.vibrant} w="full" h="1.5rem"></Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
