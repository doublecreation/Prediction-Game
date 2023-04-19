import { useState, useEffect, useMemo } from "react"
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
  Avatar,
  VStack
} from "@chakra-ui/react"
import { BondButton } from "./BondButton"
import { HopersSliderIcon } from "components/Assets/earn/HopersSliderIcon"
import { useUnbondTokens } from "hooks/pool/useUnbondTokens"
import { useBondedLiquidity } from "hooks/pool/useBondedLiquidity"
import { TPool } from "utils/tokens/pools"
import { getTokenInfoFromTokenList } from "hooks/tokens/useTokenInfo"
import { TokenType } from "utils/tokens/tokens"
import dayjs from "dayjs"
import { useTokenList } from "hooks/tokens/useTokenList"

export const UnbondTokens = ({ pool }: { pool: TPool }) => {
  const [tokenList] = useTokenList()

  const options = useMemo(() => {
    let optionsToShow: Array<{
      days: string
      value: string
      image: string
    }> = []

    for (const [index, bondingPeriod] of pool?.bondingPeriods.entries() || []) {
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
        image: tokenInfo.imageUrl
      }
      optionsToShow.push(currentOption)
    }

    return optionsToShow
  }, [pool])

  const [radioValue, setRadioValue] = useState(
    pool.bondingPeriods[0].stakingAddress
  )
  const [maxUnbond, setMaxUnbond] = useState("0")
  const [bondPercentage, setBondPercentage] = useState(35)
  const gaps = [25, 50, 75, 100]

  useEffect(() => {
    console.log(radioValue)
  }, [radioValue])

  const [bondedTokens] = useBondedLiquidity({
    pool: pool!
  })

  const { getRadioProps } = useRadioGroup({
    name: "period",
    defaultValue: undefined,
    onChange: (value) => {
      const selectedToken = bondedTokens?.bondedBalances.find(
        (bondedToken) => value === bondedToken.address
      )
      setRadioValue(value)
      setMaxUnbond(selectedToken?.balance ?? "0")
    }
  })

  const { mutate: handleUnbondTokens, isLoading: isExecutingUnbond } =
    useUnbondTokens({
      bondAmount: Math.floor((bondPercentage / 100) * (Number(maxUnbond) ?? 0)),
      stakingAddress: radioValue
    })

  return (
    <Flex gap={3} w="full" flexDir="column" h="full">
      <RadioGroup defaultValue={radioValue}>
        <SimpleGrid
          columns={{ base: 1, md: pool.bondingPeriods.length }}
          spacing={{ base: 2, md: 6 }}
          mb={{ base: 3, md: 1 }}
        >
          {options.map(({ days, value, image }, i) => {
            const radio = getRadioProps({ value })
            const isDisabled = bondedTokens?.bondedBalances.find(
              (bondedToken) =>
                value === bondedToken.address && bondedToken.balance === "0"
            )
            return (
              <BondButton key={value} {...radio} isDisabled={isDisabled}>
                <VStack spacing={0}>
                  <Avatar src={image} w="1.5rem" h="1.5rem" />
                  <Text
                    w="full"
                    textAlign="center"
                    fontSize="lg"
                    fontWeight="bold"
                  >
                    {days}
                  </Text>
                </VStack>
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
            <Button onClick={() => setBondPercentage(v)}>{v}%</Button>
          ))}
        </SimpleGrid>
      </Box>
      <Spacer />
      <Button
        isDisabled={bondPercentage === 0 && radioValue === "" ? true : false}
        w="full"
        rounded="1.25em"
        onClick={() => {
          handleUnbondTokens()
        }}
        _disabled={{
          bg: "whiteAlpha.200",
          cursor: "not-allowed",
          color: "whiteAlpha.500"
        }}
        bgGradient="linear(45deg, brand.1, brand.2)"
        _hover={{ bgSize: "150%" }}
        transition="0.2s all"
      >
        Unbond {bondPercentage}% Tokens
      </Button>
    </Flex>
  )
}
