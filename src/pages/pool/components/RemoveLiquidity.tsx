import {
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SimpleGrid,
  Button,
  Text,
  Flex,
  Spacer
} from "@chakra-ui/react"
import { HopersSliderIcon } from "components/Assets/earn/HopersSliderIcon"
import { useRemoveLiquidity } from "hooks/pool/useRemoveLiquidity"
import { useState } from "react"

export const RemoveLiquidity = () => {
  const [removeValue, setRemoveValue] = useState(35)
  const gaps = [25, 50, 75, 100]

  const { mutate: handleRemoveLiquidity, isLoading: isExecutingRemove } =
    useRemoveLiquidity({ removeAmount: removeValue / 100 })

  return (
    <Flex gap={3} w="full" flexDir="column" h="full">
      <VStack
        align="center"
        spacing={3}
        bg="white"
        shadow="md"
        _dark={{ bg: "gray.800" }}
        p={4}
        rounded="1.25em"
      >
        <Text
          fontSize={{ base: "xl", sm: "4xl" }}
          fontWeight="bold"
          textAlign="center"
          fontFamily="heading"
        >
          {removeValue}%
        </Text>
        <Slider
          min={0}
          max={100}
          step={0.1}
          size="md"
          placeholder="0"
          value={removeValue}
          onChange={(val) => setRemoveValue(val)}
          mb={16}
        >
          <SliderTrack
            h="0.75rem"
            rounded="full"
            bg="offwhite.3"
            _dark={{ bg: "gray.600" }}
          >
            <SliderFilledTrack bgGradient="linear(45deg, brand.1, brand.2)" />
          </SliderTrack>
          <SliderThumb
            bg="offwhite.2"
            w={{ base: 5, sm: 7 }}
            h={{ base: 5, sm: 7 }}
          >
            <HopersSliderIcon w="2rem" h="2rem" color="brand.1" />
          </SliderThumb>
        </Slider>
        <SimpleGrid h="full" columns={{ base: 2, sm: 4 }} spacing={2} w="full">
          {gaps.map((v) => (
            <Button onClick={() => setRemoveValue(v)}>{v}%</Button>
          ))}
        </SimpleGrid>
      </VStack>
      <Spacer />
      <Button
        isDisabled={removeValue > 0 ? false : true}
        w="full"
        rounded="1.25em"
        onClick={() => handleRemoveLiquidity()}
        _disabled={{
          bg: "whiteAlpha.200",
          cursor: "not-allowed",
          color: "whiteAlpha.500"
        }}
        bgGradient="linear(45deg, brand.1, brand.2)"
        _hover={{ bgSize: "150%" }}
        transition="0.2s all"
      >
        Remove Liquidity
      </Button>
    </Flex>
  )
}
