import { useState, useMemo } from "react"
import {
  Box,
  Flex,
  Text,
  Button,
  RadioGroup,
  SimpleGrid,
  useRadioGroup,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  HStack,
  Avatar
} from "@chakra-ui/react"
import { BondButton } from "./BondButton"
import { HopersSliderIcon } from "components/Assets/earn/HopersSliderIcon"
import { usePoolFromListQueryById } from "hooks/pool/usePoolList"
import { useParams } from "react-router-dom"
import { useBondTokens } from "hooks/pool/useBondTokens"
import { useUnbondedLiquidity } from "hooks/pool/useUnbondedLiquidity"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { TokenType } from "utils/tokens/tokens"
import { getTokenInfoFromTokenList } from "hooks/tokens/useTokenInfo"
import { useTokenList } from "hooks/tokens/useTokenList"

dayjs.extend(duration)

export const BondTokens = () => {
  const parameters = useParams()
  const [pool, isLoading] = usePoolFromListQueryById({
    poolId: Number(parameters.slug!)
  })

  const [unbondedTokens] = useUnbondedLiquidity({ pool: pool! })

  const [tokenList] = useTokenList()

  const options = useMemo(() => {
    let optionsToShow: Array<{
      days: string
      value: string
      apr: number
      image: string
    }> = []

    for (const [index, bondingPeriod] of pool?.bondingPeriods.entries() ?? []) {
      const tokenInfo = getTokenInfoFromTokenList(
        bondingPeriod.rewardToken,
        tokenList
      )

      const currentOption = {
        days:
          dayjs
            .duration(bondingPeriod.lockDuration, "millisecond")
            .format("D") + " Days",
        value: bondingPeriod.stakingAddress,
        apr: bondingPeriod.apr,
        image: tokenInfo.imageUrl
      }
      optionsToShow.push(currentOption)
    }

    return optionsToShow
  }, [pool])

  const [radioValue, setRadioValue] = useState("")
  const [bondPercentage, setBondPercentage] = useState(35)
  const gaps = [25, 50, 75, 100]

  const { getRadioProps } = useRadioGroup({
    name: "period",
    defaultValue: undefined,
    onChange: (value) => {
      setRadioValue(value)
      console.log(value)
    }
  })

  const { mutate: handleBondTokens, isLoading: isExecutingBond } =
    useBondTokens({
      bondAmount: Math.floor((bondPercentage / 100) * (unbondedTokens ?? 0)),
      stakingAddress: radioValue
    })

  return (
    <Flex gap={3} w="full" flexDir="column" h="full">
      <RadioGroup defaultValue={radioValue} onChange={(v) => setRadioValue(v)}>
        <SimpleGrid
          columns={{ base: 1, md: pool?.bondingPeriods.length }}
          spacing={{ base: 2, md: 6 }}
          mb={{ base: 3, md: 1 }}
        >
          {options.map(({ days, value, apr, image }, i) => {
            const radio = getRadioProps({ value })
            return (
              <BondButton key={value} {...radio}>
                <Text fontSize="lg" fontWeight="bold" fontFamily="heading">
                  {days}
                </Text>
                <HStack>
                  <Text>{apr}%</Text>
                  <Avatar src={image} w="1.5rem" h="1.5rem" />
                </HStack>
              </BondButton>
            )
          })}
        </SimpleGrid>
      </RadioGroup>
      <Box
        bg="white"
        _dark={{ bg: "gray.800" }}
        rounded="1.25em"
        px={4}
        pb={4}
        pt={1}
        shadow="md"
        opacity={unbondedTokens === 0 || !radioValue ? 0.5 : 1}
      >
        <Text
          fontSize={{ base: "xl", sm: "4xl" }}
          fontWeight="bold"
          textAlign="center"
          fontFamily="heading"
        >
          {bondPercentage}%
        </Text>
        <Slider
          min={0}
          max={100}
          step={0.1}
          size="md"
          placeholder="0"
          isDisabled={unbondedTokens === 0 || !radioValue}
          value={bondPercentage}
          onChange={(val) => setBondPercentage(val)}
          mb={3}
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
            <Button
              isDisabled={unbondedTokens === 0 || !radioValue}
              rounded="1em"
              _disabled={{
                bg: "whiteAlpha.200",
                cursor: "not-allowed",
                color: "whiteAlpha.500",
                _active: {
                  bg: "whiteAlpha.200",
                  cursor: "not-allowed",
                  color: "whiteAlpha.500"
                },
                _focus: {
                  bg: "whiteAlpha.200",
                  cursor: "not-allowed",
                  color: "whiteAlpha.500"
                }
              }}
              onClick={() => setBondPercentage(v)}
            >
              {v}%
            </Button>
          ))}
        </SimpleGrid>
      </Box>
      <Spacer />
      <Button
        isDisabled={
          bondPercentage === 0 || radioValue === "" || unbondedTokens === 0
            ? true
            : false
        }
        w="full"
        rounded="1.25em"
        onClick={() => {
          handleBondTokens()
        }}
        isLoading={isExecutingBond}
        _disabled={{
          bg: "whiteAlpha.200",
          cursor: "not-allowed",
          color: "whiteAlpha.500",
          _active: {
            bg: "whiteAlpha.200",
            cursor: "not-allowed",
            color: "whiteAlpha.500"
          },
          _focus: {
            bg: "whiteAlpha.200",
            cursor: "not-allowed",
            color: "whiteAlpha.500"
          }
        }}
        bgGradient="linear(45deg, brand.1, brand.2)"
        _hover={{ bgSize: "150%" }}
        transition="0.2s all"
      >
        Bond {bondPercentage}% Tokens
      </Button>
    </Flex>
  )
}
