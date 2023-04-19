import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
  VStack,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  Input,
  Spacer,
  HStack,
  useToken,
  Box,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack
} from "@chakra-ui/react"
import { useAddLiquidity } from "hooks/pool/useAddLiquidity"
import { usePoolFromListQueryById } from "hooks/pool/usePoolList"
import { useTokenBalance } from "hooks/tokens/useTokenBalance"
import { useParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import { addLiquidityState } from "state/poolState"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { TokenStatus, TokenType, TTokenListItem } from "utils/tokens/tokens"
import { NumericFormat } from "react-number-format"
import { useState } from "react"
import { HopersSliderIcon } from "components/Assets/earn/HopersSliderIcon"
import { RemoveLiquidity } from "./RemoveLiquidity"
import { FaArrowUp } from "react-icons/fa"
import { useRemoveLiquidity } from "hooks/pool/useRemoveLiquidity"

// TODO Fix half and max buttons logic for decimals over 6 (evmos, weth, plq)

export const LiquidityModal = ({
  isOpen,
  onClose,
  tokenAColor,
  tokenBColor,
  tokenAColorMuted,
  tokenBColorMuted,
  tokenA,
  tokenB
}: {
  isOpen: boolean
  onClose: () => void
  tokenAColor: string
  tokenBColor: string
  tokenAColorMuted: string
  tokenBColorMuted: string
  tokenA: TTokenListItem
  tokenB: TTokenListItem
}) => {
  const [tokenABalance] = useTokenBalance(tokenA)
  const [tokenBBalance] = useTokenBalance(tokenB)

  const parameters = useParams()
  const [pool, isLoading] = usePoolFromListQueryById({
    poolId: Number(parameters.slug!)
  })

  const [{ tokenA: token1, tokenB: token2 }, setLiquidityAmount] =
    useRecoilState(addLiquidityState)

  const { mutate: handleAddLiquidity, isLoading: isExecutingAdd } =
    useAddLiquidity()

  const slippage = 0.99

  const [red500] = useToken(
    // the key within the theme, in this case `theme.colors`
    "colors",
    // the subkey(s), resolving to `theme.colors.red.100`
    ["red.500"]
    // a single fallback or fallback array matching the length of the previous arg
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay backdropFilter="blur(70px)" />
      <ModalContent
        rounded="1.25em"
        h="26rem"
        _dark={{
          bg: "gray.700",
          bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
        }}
      >
        <ModalHeader w="full" textAlign="center">
          Manage Liquidity
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted isLazy variant="soft-rounded" h="full">
            <TabList
              color="gray.800"
              _dark={{ color: "white" }}
              gap={2}
              h="3rem"
              bg="whiteAlpha.200"
              rounded="1.25em"
            >
              <Tab
                fontWeight="900"
                color="gray.800"
                rounded="1.25em"
                _dark={{
                  color: "white",
                  _selected: { color: "gray.800" }
                }}
                _selected={{
                  bgGradient: "linear(45deg, brand.1, brand.2)",
                  color: "gray.800"
                }}
              >
                Add Liquidity
              </Tab>
              <Tab
                color="gray.800"
                rounded="1.25em"
                _dark={{
                  color: "white",
                  _selected: { color: "gray.800" }
                }}
                _selected={{
                  bgGradient: "linear(45deg, brand.1, brand.2)",
                  color: "gray.800"
                }}
              >
                Remove Liquidity
              </Tab>
            </TabList>

            <TabPanels h="calc(100% - 3rem)">
              <TabPanel>
                <Flex gap={3} w="full" flexDir="column" h="full">
                  <VStack align="center" spacing={2}>
                    <Flex
                      w="full"
                      bg="offwhite.2"
                      _dark={{ bg: "gray.800" }}
                      py={2}
                      px={2}
                      rounded="1.25em"
                      gap={2}
                    >
                      <CircularProgress
                        trackColor={tokenAColor}
                        color={tokenBColorMuted}
                        value={50}
                        size="5rem"
                        thickness="0.75rem"
                      >
                        <CircularProgressLabel>50%</CircularProgressLabel>
                      </CircularProgress>
                      <VStack align="start" w="full">
                        <Flex
                          w="full"
                          justify="end"
                          align="center"
                          gap={2}
                          pe={2}
                        >
                          <Text
                            fontSize={{ base: "0.9em", md: "md" }}
                            fontWeight="normal"
                          >
                            Available
                          </Text>
                          <Text
                            fontSize={{ base: "0.9em", md: "md" }}
                            fontWeight="900"
                            color="brand.1"
                          >
                            {convertMicroDenomToDenom(
                              tokenABalance,
                              TokenStatus[tokenA.token].decimal ?? 6
                            ) ?? 0}
                          </Text>
                          <Spacer />
                          <HStack>
                            <Button
                              fontSize="sm"
                              bg="offwhite.1"
                              color="gray.800"
                              _dark={{ color: "white", bg: "gray.600" }}
                              _hover={{ filter: "brightness(110%)" }}
                              _active={{ filter: "brightness(90%)" }}
                              rounded={"0.8em"}
                              shadow="md"
                              transition="0.2s all"
                              h={7}
                              py={0}
                              px={0}
                              w={12}
                              onClick={() => {
                                setLiquidityAmount({
                                  tokenA: {
                                    token: token1.token,
                                    amount: Math.ceil(
                                      Number(tokenABalance) / 2
                                    ).toString()
                                  },
                                  tokenB: {
                                    token: token2.token,
                                    amount: Math.ceil(
                                      ((Number(tokenABalance) / 2) *
                                        pool?.ratio!) /
                                        slippage
                                    ).toString()
                                  }
                                })
                              }}
                            >
                              Half
                            </Button>
                            <Button
                              rounded={"0.8em"}
                              fontSize="sm"
                              bg="offwhite.1"
                              color="gray.800"
                              _dark={{ color: "white", bg: "gray.600" }}
                              _hover={{ filter: "brightness(110%)" }}
                              _active={{ filter: "brightness(90%)" }}
                              shadow="md"
                              transition="0.2s all"
                              h={7}
                              py={0}
                              px={0}
                              w={12}
                              onClick={() => {
                                setLiquidityAmount({
                                  tokenA: {
                                    token: token1.token,
                                    amount: Math.ceil(
                                      Number(tokenABalance)
                                    ).toString()
                                  },
                                  tokenB: {
                                    token: token2.token,
                                    amount: Math.ceil(
                                      (Number(tokenABalance) * pool?.ratio!) /
                                        slippage
                                    ).toString()
                                  }
                                })
                              }}
                            >
                              Max
                            </Button>
                          </HStack>
                        </Flex>
                        <NumericFormat
                          value={
                            convertMicroDenomToDenom(
                              token1.amount,
                              TokenStatus[tokenA.token].decimal ?? 6
                            ) ?? 0
                          }
                          valueIsNumericString
                          decimalScale={6}
                          allowNegative={false}
                          thousandSeparator=","
                          allowLeadingZeros={false}
                          onValueChange={(values, sourceInfo) => {
                            const { value } = values

                            setLiquidityAmount(({ tokenA, tokenB }) => {
                              return {
                                tokenA: {
                                  token: tokenA.token,
                                  amount: Math.ceil(
                                    Number(value) *
                                      Math.pow(
                                        10,
                                        TokenStatus[
                                          pool?.liquidity.token1.denom!
                                        ].decimal || 6
                                      )
                                  ).toString()
                                },
                                tokenB: {
                                  token: tokenB.token,
                                  amount: Math.ceil(
                                    ((Number(value) * pool?.ratio!) /
                                      slippage) *
                                      Math.pow(
                                        10,
                                        TokenStatus[
                                          pool?.liquidity.token2.denom!
                                        ].decimal || 6
                                      )
                                  ).toString()
                                }
                              }
                            })
                          }}
                          customInput={Input}
                          variant="unstyled"
                          fontSize={{ base: "lg", sm: "24" }}
                          fontWeight="bold"
                          textAlign="end"
                          w="full"
                          rounded="0.6em"
                          color={useColorModeValue("gray.800", "white")}
                          px={2}
                          py={1}
                          placeholder="0"
                          // valueIsNumericString
                          minH="3rem"
                          bg="transparent"
                          _dark={{ _focus: { bg: "gray.800" } }}
                        />
                      </VStack>
                    </Flex>
                    <Flex
                      w="full"
                      bg="offwhite.2"
                      _dark={{ bg: "gray.800" }}
                      py={2}
                      px={2}
                      rounded="1.25em"
                    >
                      <CircularProgress
                        trackColor={tokenAColorMuted}
                        color={tokenBColor}
                        value={50}
                        size="5rem"
                        thickness="0.75rem"
                      >
                        <CircularProgressLabel>50%</CircularProgressLabel>
                      </CircularProgress>
                      <VStack align="end" w="full">
                        <Flex
                          w="full"
                          justify="end"
                          align="center"
                          gap={2}
                          pe={2}
                        >
                          <Text
                            fontSize={{ base: "0.9em", md: "md" }}
                            fontWeight="normal"
                          >
                            Available
                          </Text>
                          <Text
                            fontSize={{ base: "0.9em", md: "md" }}
                            fontWeight="900"
                            color="brand.1"
                          >
                            {convertMicroDenomToDenom(
                              tokenBBalance,
                              TokenStatus[tokenB.token].decimal ?? 6
                            ) ?? 0}
                          </Text>
                          <Spacer />
                          <HStack>
                            <Button
                              fontSize="sm"
                              bg="offwhite.1"
                              color="gray.800"
                              _dark={{ color: "white", bg: "gray.600" }}
                              _hover={{ filter: "brightness(110%)" }}
                              _active={{ filter: "brightness(90%)" }}
                              rounded={"0.8em"}
                              shadow="md"
                              transition="0.2s all"
                              h={7}
                              py={0}
                              px={0}
                              w={12}
                              onClick={() => {
                                setLiquidityAmount({
                                  tokenB: {
                                    token: token2.token,
                                    amount: Math.ceil(
                                      Number(tokenBBalance) / 2
                                    ).toString()
                                  },
                                  tokenA: {
                                    token: token1.token,
                                    amount: Math.ceil(
                                      ((Number(tokenBBalance) / 2) * slippage) /
                                        pool?.ratio!
                                    ).toString()
                                  }
                                })
                              }}
                            >
                              Half
                            </Button>
                            <Button
                              rounded={"0.8em"}
                              fontSize="sm"
                              bg="offwhite.1"
                              color="gray.800"
                              _dark={{ color: "white", bg: "gray.600" }}
                              _hover={{ filter: "brightness(110%)" }}
                              _active={{ filter: "brightness(90%)" }}
                              shadow="md"
                              transition="0.2s all"
                              h={7}
                              py={0}
                              px={0}
                              w={12}
                              onClick={() => {
                                setLiquidityAmount({
                                  tokenB: {
                                    token: token2.token,
                                    amount: Math.ceil(
                                      Number(tokenBBalance)
                                    ).toString()
                                  },
                                  tokenA: {
                                    token: token1.token,
                                    amount: Math.ceil(
                                      (Number(tokenBBalance) * slippage) /
                                        pool?.ratio!
                                    ).toString()
                                  }
                                })
                              }}
                            >
                              Max
                            </Button>
                          </HStack>
                        </Flex>
                        <NumericFormat
                          value={
                            convertMicroDenomToDenom(
                              token2.amount,
                              TokenStatus[pool?.liquidity.token2.denom!]
                                .decimal ?? 6
                            ) ?? 0
                          }
                          transition="0.2s all"
                          border="0px"
                          isInvalid={token2.amount > tokenBBalance}
                          _invalid={{
                            border: `1px solid ${red500}`
                          }}
                          valueIsNumericString
                          decimalScale={
                            TokenStatus[pool?.liquidity.token2.denom!]
                              .decimal ?? 6
                          }
                          allowNegative={false}
                          thousandSeparator=","
                          allowLeadingZeros={false}
                          onValueChange={(values, sourceInfo) => {
                            const { value } = values
                            setLiquidityAmount(({ tokenA, tokenB }) => {
                              return {
                                tokenB: {
                                  token: tokenB.token,
                                  amount: Math.ceil(
                                    Number(value) *
                                      Math.pow(
                                        10,
                                        TokenStatus[
                                          pool?.liquidity.token2.denom!
                                        ].decimal || 6
                                      )
                                  ).toString()
                                },
                                tokenA: {
                                  token: tokenA.token,
                                  amount: Math.ceil(
                                    ((Number(value) * slippage) /
                                      pool?.ratio!) *
                                      Math.pow(
                                        10,
                                        TokenStatus[
                                          pool?.liquidity.token2.denom!
                                        ].decimal || 6
                                      )
                                  ).toString()
                                }
                              }
                            })
                          }}
                          customInput={Input}
                          variant="unstyled"
                          fontSize={{ base: "lg", sm: "24" }}
                          fontWeight="bold"
                          textAlign="end"
                          w="fit-content"
                          rounded="0.6em"
                          color={useColorModeValue("gray.800", "white")}
                          px={2}
                          py={1}
                          placeholder="0"
                          minH="3rem"
                          bg="transparent"
                          _dark={{ _focus: { bg: "gray.800" } }}
                        />
                      </VStack>
                    </Flex>
                  </VStack>
                  <Button
                    rounded="1.25em"
                    w="full"
                    onClick={() => handleAddLiquidity()}
                    isDisabled={token1.amount === "0" || token2.amount === "0"}
                    _disabled={{
                      bg: "whiteAlpha.200",
                      cursor: "not-allowed",
                      color: "whiteAlpha.500"
                    }}
                    bgGradient="linear(45deg, brand.1, brand.2)"
                    _hover={{ bgSize: "150%" }}
                    transition="0.2s all"
                  >
                    Add Liquidity
                  </Button>
                </Flex>
              </TabPanel>
              <TabPanel h="full">
                <RemoveLiquidity />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
