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
  Text,
  Heading,
  Tag,
  Button,
  Portal,
  useDisclosure,
  Tooltip
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { LiquidityIcon } from "components/Assets/earn/LiquidityIcon"
import { useTokenInfo } from "hooks/tokens/useTokenInfo"
import { FaQuestionCircle } from "react-icons/fa"
import { usePalette } from "react-palette"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { TPool } from "utils/tokens/pools"
import { TokenStatus } from "utils/tokens/tokens"
import { BondingModal } from "./BondingModal"

export const PoolBonding = ({ pool }: { pool: TPool }) => {
  const tokenA = useTokenInfo(pool?.liquidity.token1.denom!)
  const tokenB = useTokenInfo(pool?.liquidity.token2.denom!)
  const { data: tokenAColors } = usePalette(tokenA?.imageUrl)
  const { data: tokenBColors } = usePalette(tokenB?.imageUrl)

  const { isWalletConnected } = useChain("juno")
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex
      bg="white"
      _dark={{
        bg: "gray.700",
        bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
      }}
      rounded="1.25em"
      w="full"
      py={4}
      ps={3}
      pe={3}
      flexDirection="column"
      gap={4}
      shadow="md"
    >
      <Flex w="full" align="center" gap={2}>
        <Tag
          rounded="0.8em"
          py={2}
          px={3}
          fontSize="16"
          fontWeight="900"
          color="brand.1"
        >
          Step 2
        </Tag>
        <Heading fontSize="20" fontWeight="500">
          Bond Your Liquidity
        </Heading>
      </Flex>
      <Flex ps={4} flex={1} w="full" align="start" gap={2}>
        <Text fontSize="16">
          Bond your added liquidity to earn from pool incentives in addition to
          swap fees.
        </Text>
      </Flex>
      <Flex w="full" align="center" justifyContent="flex-end" gap={2}>
        <Tooltip
          rounded="1em"
          hasArrow
          bg={useColorModeValue("offwhite.2", "gray.800")}
          color={useColorModeValue("gray.800", "white")}
          border="none"
          shadow="md"
          label={!isWalletConnected ? "Connect your wallet to continue" : ""}
        >
          <Button
            rounded="0.9em"
            bgGradient="linear(45deg, brand.1, brand.2)"
            _hover={{
              filter: isWalletConnected
                ? "brightness(110%) drop-shadow(0px 2px 6px rgba(2,226,150, 1))"
                : ""
            }}
            transition="all 0.3s"
            disabled={!isWalletConnected}
            _active={{
              filter: isWalletConnected
                ? "brightness(80%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
                : ""
            }}
            color="gray.800"
            fontSize="16"
            onClick={() => {
              onOpen()
            }}
            leftIcon={<LiquidityIcon w="1.5rem" h="1.5rem" />}
          >
            Bond
          </Button>
        </Tooltip>
      </Flex>
      <Portal>
        <BondingModal
          isOpen={isOpen}
          onClose={onClose}
          tokenAColor={tokenAColors.vibrant!}
          tokenBColor={tokenBColors.vibrant!}
          tokenAColorMuted={tokenAColors.darkMuted!}
          tokenBColorMuted={tokenBColors.darkMuted!}
          tokenA={pool.liquidity.token1.denom}
          tokenB={pool.liquidity.token1.denom}
        />
      </Portal>
    </Flex>
  )
}
