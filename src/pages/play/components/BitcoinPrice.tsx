import {
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  HStack,
  Spacer,
  Image,
  VStack
} from "@chakra-ui/react"
import { FaArrowDown } from "react-icons/fa"

export const BitcoinPrice = () => {
  return (
    <HStack
      pos={{ base: "relative", md: "absolute" }}
      left={{ base: "0", md: "6rem" }}
      gap={1}
    >
      <Image w={{ base: "2rem", lg: "3rem" }} src="/assets/bitcoin.png" />
      <VStack alignItems="flex-start">
        <HStack>
          <Text fontWeight="bold" fontSize="1rem" color="white">
            BItcoin BTC
          </Text>
          <Text fontWeight="bold" fontSize="1rem" color="rgba(0, 221, 49, 0.8)">
            +1%
          </Text>
        </HStack>
        <Text fontWeight="bold" fontSize="1.2rem" color="white">
          52.345,64 USD
        </Text>
      </VStack>
    </HStack>
  )
}
