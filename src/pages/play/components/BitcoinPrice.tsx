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
import { useRecoilState } from "recoil"
import { btcPriceState } from "state/btcPriceState"

export const BitcoinPrice = () => {
  const [{ price, state, priceChange }] = useRecoilState(btcPriceState)
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
          {state !== 0 && (
            <Text
              fontWeight="bold"
              fontSize="1rem"
              color={state === 1 ? "#00dd31" : "#dd0000"}
            >
              {priceChange}
            </Text>
          )}
        </HStack>
        <Text fontWeight="bold" fontSize="1.2rem" color="white">
          {`${price} USD`}
        </Text>
      </VStack>
    </HStack>
  )
}
