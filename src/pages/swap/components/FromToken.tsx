import {
  useDisclosure,
  SystemStyleObject,
  useColorModeValue,
  Flex,
  Icon,
  Button,
  useOutsideClick,
  Menu,
  MenuButton,
  Skeleton,
  Editable,
  EditablePreview,
  EditableInput,
  Portal,
  MenuList,
  Box,
  Text,
  Image,
  HStack,
  Spacer,
  Input,
  VStack,
  Tag
} from "@chakra-ui/react"
import {
  OptionProps,
  GroupBase,
  chakraComponents,
  ControlProps,
  AsyncSelect,
  MenuListProps
} from "chakra-react-select"
import { motion } from "framer-motion"
import { useTokenBalance } from "hooks/tokens/useTokenBalance"
import { useTokenInfo } from "hooks/tokens/useTokenInfo"
import { useState, useRef, useEffect } from "react"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"
import { RiSearch2Fill } from "react-icons/ri"
import { useRecoilState } from "recoil"
import { tokenSwapState } from "state/swapState"
import fadeIn from "theme/motion/variants/general/fadeIn"
import { ChainConfigs, ChainTypes, ConfigType } from "utils/tokens/chains"
import { TokenStatus, TokenType, TTokenListItem } from "utils/tokens/tokens"
import { SwapSkeleton } from ".."
import { FixedSizeList as List } from "react-window"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { useTokenList } from "hooks/tokens/useTokenList"
import { usePalette } from "react-palette"
import { FaSearch } from "react-icons/fa"

export const CustomOption = ({
  children,
  ...props
}: OptionProps<TTokenListItem, true, GroupBase<TTokenListItem>>) => {
  const [tokenBalance] = useTokenBalance(props.data)

  return (
    <chakraComponents.Option {...props}>
      <Flex id={props.data.name} align="center" w="full" rounded="1em">
        <Flex align="center" flex={1} gap={2}>
          <Box w="2rem" h="2rem">
            <Image src={props.data.imageUrl} />
          </Box>
          <Box>
            <Text
              fontSize={{ base: "16", sm: "18" }}
              fontWeight="bold"
              textAlign="start"
              lineHeight="1"
            >
              {props.data.name}
            </Text>
            <Text fontSize={{ base: "16", sm: "14" }} textAlign="start">
              {ChainConfigs[TokenStatus[props.data.token].chain].chainName}
            </Text>
          </Box>
        </Flex>
        <Text
          fontSize={{ base: "md", sm: "md" }}
          textAlign="end"
          wordBreak="break-word"
        >
          {convertMicroDenomToDenom(
            tokenBalance,
            TokenStatus[props.data.token].decimal ?? 6
          ).toFixed(2) ?? 0}
        </Text>
      </Flex>
    </chakraComponents.Option>
  )
}

export const CustomControl = ({
  children,
  ...props
}: ControlProps<TTokenListItem, true>) => {
  const commonTokens: TokenType[] = [
    TokenType.HOPERS,
    TokenType.JUNO,
    TokenType.ATOM,
    TokenType.EVMOS
  ]

  return (
    <Flex direction="column" gap={3} py={2}>
      <chakraComponents.Control {...props}>
        <Flex align="center" ps={2}>
          <Icon as={FaSearch} />
        </Flex>
        {children}
      </chakraComponents.Control>
      <HStack w="full" justify="space-between">
        {commonTokens.map((tokenType: TokenType, index: number) => {
          const tokenName = (
            Object.keys(TokenType) as Array<keyof typeof TokenType>
          ).filter((key) => TokenType[key] === tokenType)[0]

          const tokenInfo = useTokenInfo(tokenType)
          const [, setSwapInfo] = useRecoilState(tokenSwapState)
          const { data, loading, error } = usePalette(tokenInfo.imageUrl)

          return (
            <Tag
              h="2rem"
              py={0}
              px={2}
              fontSize="md"
              shadow="md"
              variant="solid"
              fontWeight="600"
              rounded="1em"
              _hover={{
                cursor: "pointer",
                bg: "offwhite.4",
                borderColor: data.vibrant
              }}
              bg="offwhite.2"
              color="gray.800"
              _dark={{
                bg: "gray.600",
                color: "white",
                _hover: {
                  cursor: "pointer",
                  filter: "brightness(110%)",
                  bg: "gray.600"
                }
              }}
              transition="0.2s all"
              border="2px groove"
              borderColor="transparent"
              onClick={() => {
                setSwapInfo(({ from, to }) => {
                  return {
                    // @ts-ignore
                    from: {
                      ...from,
                      token: tokenType as TokenType
                    },
                    to: { ...to }
                  }
                })
              }}
            >
              <HStack w="full">
                <Image src={tokenInfo.imageUrl} h="1.5rem" w="1.5rem" />
                <Text textTransform={"capitalize"}>
                  {tokenName.toLowerCase()}
                </Text>
              </HStack>
            </Tag>
          )
        })}
      </HStack>
    </Flex>
  )
}

export const CustomMenuList = ({
  children,
  ...props
}: MenuListProps<TTokenListItem, true>) => {
  const itemHeight = 70
  const { options, maxHeight, getValue } = props
  const [value] = getValue()
  const initialOffset = options.indexOf(value) * itemHeight

  return (
    <chakraComponents.MenuList {...props}>
      <List
        height={maxHeight}
        // @ts-ignore
        itemCount={children?.length ?? 0}
        itemSize={itemHeight}
        initialScrollOffset={initialOffset}
        style={{
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            background: useColorModeValue(
              "rgba(160,160,160,0.1)",
              "rgba(255,255,255,0.1)"
            ),
            borderRadius: "4px",
            width: "12px"
          },

          "&::-webkit-scrollbar-thumb": {
            background: useColorModeValue(
              "rgba(0,0,0,0.1)",
              "rgba(255,255,255,0.1)"
            ),
            borderRadius: "4px"
          }
        }}
      >
        {({ index, style }) => (
          <Flex style={style}>{children && children[index]}</Flex>
        )}
      </List>
    </chakraComponents.MenuList>
  )
}

export const FromToken = ({
  fromToken,
  tokenInputValue
}: {
  fromToken: TTokenListItem
  tokenInputValue: string
}) => {
  const [{ from }, setSwapInfo] = useRecoilState(tokenSwapState)
  const [tokenList] = useTokenList()
  const [tokenBalance] = useTokenBalance(fromToken)

  const IndicatorSeparator = () => {
    return null
  }

  const DropdownIndicator = () => {
    return null
  }

  const customStyles: any = {
    control: (provided: SystemStyleObject) => ({
      ...provided,
      bg: useColorModeValue("offwhite.2", "gray.700"),
      border: "none",
      shadow: "md",
      borderRadius: "1em"
    }),
    menu: (provided: SystemStyleObject) => ({
      ...provided,
      maxH: { base: "sm", md: "3xl" },
      mb: 0,
      zIndex: 10,
      position: "relative"
    }),
    menuList: (provided: SystemStyleObject) => ({
      ...provided,
      // For Chrome and other browsers except Firefox
      "&::-webkit-scrollbar": {
        background: useColorModeValue(
          "rgba(160,160,160,0.1)",
          "rgba(255,255,255,0.1)"
        ),
        borderRadius: "4px",
        width: "12px"
      },

      "&::-webkit-scrollbar-thumb": {
        background: useColorModeValue(
          "rgba(0,0,0,0.1)",
          "rgba(255,255,255,0.1)"
        ),
        borderRadius: "4px"
      },

      bg: "transparent",
      overflowX: "hidden",
      border: "none",
      shadow: "none",
      borderRadius: "0",
      py: 0,
      pe: 2,
      scrollbarColor: useColorModeValue(
        "rgba(0,0,0,0.3) rgba(0,0,0,0.2)",
        "rgba(255,255,255,0.2) rgba(255,255,255,0.1)"
      ),
      // For Firefox
      scrollbarWidth: "auto"
    }),
    option: (provided: SystemStyleObject, state: { isSelected: boolean }) => ({
      ...provided,
      _disabled: {
        _hover: { bg: "transparent" }
      },
      _hover: {
        bg: state.isSelected
          ? useColorModeValue("primary.100", "primary.500")
          : useColorModeValue("blackAlpha.200", "whiteAlpha.200")
      },
      bg: state.isSelected
        ? useColorModeValue("green.100", "gray.600")
        : "transparent",
      borderRadius: "1em",
      color: "inherit",
      mt: 2
    })
  }

  return (
    <Box
      position="relative"
      _dark={{
        bg: "gray.700",
        bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
      }}
      bg="white"
      shadow="md"
      as={motion.div}
      variants={fadeIn}
      borderRadius="1em"
      p={3}
      w="full"
    >
      <Flex
        position="relative"
        justify="space-between"
        flexDirection="row"
        align={{ base: "start", sm: "center" }}
        mb={4}
        w="full"
      >
        <Flex
          maxW={{ sm: "2xs" }}
          w="full"
          justify="start"
          align="center"
          gap={2}
        >
          <Text fontSize={{ base: "0.9em", md: "md" }} fontWeight="normal">
            Available
          </Text>
          <Text
            fontSize={{ base: "0.9em", md: "md" }}
            fontWeight="900"
            color="brand.1"
          >
            {convertMicroDenomToDenom(
              tokenBalance,
              TokenStatus[fromToken.token].decimal ?? 6
            ) ?? 0}
          </Text>
        </Flex>
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
              setSwapInfo(({ from, to }) => {
                return {
                  from: {
                    ...from,

                    amount: convertMicroDenomToDenom(
                      Number(tokenBalance) / 2,
                      TokenStatus[fromToken.token].decimal ?? 6
                    ).toFixed(6)
                  },
                  to: { ...to }
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
              setSwapInfo(({ from, to }) => {
                return {
                  from: {
                    ...from,

                    amount: convertMicroDenomToDenom(
                      tokenBalance,
                      TokenStatus[fromToken.token].decimal ?? 6
                    ).toString()
                  },
                  to: { ...to }
                }
              })
            }}
          >
            Max
          </Button>
        </HStack>
      </Flex>
      <Menu isLazy placement="bottom" preventOverflow={false} flip={false}>
        {({ isOpen, onClose }) => (
          <>
            <Flex direction="row" gap={3} align="space-between" w="full">
              <MenuButton
                flex={1}
                as={Button}
                variant="unstyled"
                whiteSpace="normal"
                bg="offwhite.2"
                _dark={{ bg: "gray.800" }}
                rounded="1em"
                px={2}
                h="3rem"
                w="full"
                shadow="md"
              >
                <Flex
                  flexDirection="row"
                  gap={3}
                  px={2}
                  h="3rem"
                  align="center"
                  justify="center"
                >
                  <Skeleton
                    rounded="full"
                    overflow="hidden"
                    isLoaded={Boolean(fromToken)}
                  >
                    <Image h="2.25rem" w="2.75rem" src={fromToken?.imageUrl} />
                  </Skeleton>
                  <Skeleton
                    alignItems="center"
                    isLoaded={Boolean(fromToken)}
                    h={{ base: "3rem", md: "3rem" }}
                    display="flex"
                    rounded="1em"
                    w="full"
                  >
                    <VStack spacing={0} align="start">
                      <Text
                        fontSize={{ base: "md", sm: "18" }}
                        fontWeight="400"
                        textAlign="start"
                        fontFamily="heading"
                        lineHeight={1}
                      >
                        {fromToken?.name}
                      </Text>
                      <Text
                        lineHeight={1}
                        fontSize={{ base: "0.9em", sm: "14" }}
                        textAlign="start"
                        fontWeight="400"
                        fontFamily="body"
                      >
                        {
                          ChainConfigs[TokenStatus[fromToken?.token!].chain]
                            .chainName
                        }
                      </Text>
                    </VStack>
                    <Spacer />
                    <Icon
                      as={isOpen ? FiChevronUp : FiChevronDown}
                      fontSize={{ base: "xl", md: "3xl" }}
                      color={useColorModeValue("gray.800", "white")}
                    />
                  </Skeleton>
                </Flex>
              </MenuButton>
              {fromToken ? (
                <Flex
                  flex={1}
                  gap={3}
                  direction="column"
                  align="end"
                  maxW="10rem"
                >
                  <Input
                    variant="unstyled"
                    fontSize={{ base: "lg", sm: "24" }}
                    fontWeight="bold"
                    textAlign="end"
                    w="full"
                    rounded="0.6em"
                    color={useColorModeValue("gray.800", "white")}
                    px={2}
                    py={1}
                    value={from.amount}
                    placeholder="0"
                    minH="3rem"
                    bg="transparent"
                    _dark={{ _focus: { bg: "gray.800" } }}
                    type="number"
                    min="0"
                    max={
                      convertMicroDenomToDenom(
                        tokenBalance,
                        TokenStatus[fromToken.token].decimal ?? 6
                      ) ?? 0
                    }
                    _focus={{ border: "none", bg: "offwhite.2", shadow: "md" }}
                    defaultValue="0"
                    onChange={(event) => {
                      const value = event.target.value
                      // eslint-disable-next-line unicorn/no-unsafe-regex
                      const floatRegex =
                        /(0{0,1}\.d*)(d+(\.d*)?(e[+-]?d+)?|\.d+(e[+-]?d+)?)/gu
                      const floatCheck = value.match(floatRegex)
                      if (floatCheck !== null) {
                        setSwapInfo(({ from, to }) => {
                          return {
                            from: { ...from, amount: value },
                            to: { ...to }
                          }
                        })
                        return value
                      }

                      setSwapInfo(({ from, to }) => {
                        return {
                          from: {
                            ...from,
                            amount: Number.parseFloat(value).toString()
                          },
                          to: { ...to }
                        }
                      })
                      // setTokenInputValue(Number.parseFloat(value).toString())
                      return (event.target.value =
                        Number.parseFloat(value).toString())
                    }}
                  />
                  <Text
                    fontSize={{ sm: "16" }}
                    textAlign="end"
                    fontWeight="bold"
                    color={
                      tokenInputValue === "0"
                        ? useColorModeValue("blackAlpha.600", "whiteAlpha.600")
                        : useColorModeValue("blackAlpha.700", "whiteAlpha.700")
                    }
                    mb={0}
                  >
                    $0
                  </Text>
                </Flex>
              ) : (
                <Flex flexDirection="column" align="end">
                  <Skeleton w={{ base: 20, sm: 36 }} h={{ base: 8, sm: 10 }} />
                  <Skeleton w={{ base: 12, sm: 16 }} h={{ base: 6, sm: 8 }} />
                </Flex>
              )}
            </Flex>
            <Portal>
              <MenuList
                position="relative"
                bg="rgba(255,255,255,1)"
                _dark={{ bg: "gray.800" }}
                shadow="md"
                rounded="1em"
                border="none"
                px={6}
                left="5.38rem"
              >
                <Box py={2} w={{ base: "20rem", md: "25rem" }}>
                  {fromToken ? (
                    <AsyncSelect
                      placeholder="Search"
                      chakraStyles={customStyles}
                      isClearable={false}
                      // isOptionDisabled={(option) => option.label === 'Ion'} // test option disabled
                      blurInputOnSelect={true}
                      controlShouldRenderValue={false}
                      menuIsOpen={true}
                      loadingMessage={() => <SwapSkeleton />}
                      defaultOptions={tokenList}
                      value={fromToken}
                      loadOptions={(inputValue, callback) => {
                        setTimeout(() => {
                          const values = tokenList.filter((option) =>
                            option.name
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                          )
                          callback(values)
                        }, 25)
                      }}
                      onChange={(selectedOption) => {
                        let value = {}
                        value = { ...selectedOption }
                        setSwapInfo(({ from, to }) => {
                          return {
                            // @ts-ignore
                            from: { ...from, token: value.token as TokenType },
                            to: { ...to }
                          }
                        })
                        onClose()
                      }}
                      components={{
                        Control: CustomControl,
                        DropdownIndicator,
                        IndicatorSeparator,
                        Option: CustomOption
                        // MenuList: CustomMenuList
                      }}
                    />
                  ) : (
                    <SwapSkeleton />
                  )}
                </Box>
              </MenuList>
            </Portal>
          </>
        )}
      </Menu>
    </Box>
  )
}
