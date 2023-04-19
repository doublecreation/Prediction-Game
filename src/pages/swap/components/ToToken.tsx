import {
  useDisclosure,
  SystemStyleObject,
  useColorModeValue,
  Flex,
  Icon,
  useOutsideClick,
  Menu,
  MenuButton,
  Button,
  Skeleton,
  Portal,
  MenuList,
  Collapse,
  Box,
  Image,
  Text,
  VStack,
  Spacer
} from "@chakra-ui/react"
import {
  OptionProps,
  GroupBase,
  chakraComponents,
  ControlProps,
  AsyncSelect
} from "chakra-react-select"
import { motion } from "framer-motion"
import { useTokenToTokenPrice } from "hooks/swap/useTokenToTokenPrice"
import { useTokenInfo } from "hooks/tokens/useTokenInfo"
import { useTokenList } from "hooks/tokens/useTokenList"
import { useEffect, useRef } from "react"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"
import { RiSearch2Fill } from "react-icons/ri"
import { useRecoilState } from "recoil"
import { tokenSwapState } from "state/swapState"
import fadeIn from "theme/motion/variants/general/fadeIn"
import { ChainConfigs, ChainTypes, ConfigType } from "utils/tokens/chains"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { TokenStatus, TTokenListItem } from "utils/tokens/tokens"
import { SwapSkeleton } from ".."
import { CustomControl, CustomOption } from "./FromToken"

export const ToToken = () => {
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

  const IndicatorSeparator = () => {
    return null
  }

  const DropdownIndicator = () => {
    return null
  }

  const [tokenList] = useTokenList()
  const [{ from, to }, setSwapInfo] = useRecoilState(tokenSwapState)
  const toToken = useTokenInfo(to.token)

  const [tokenToTokenPrice] = useTokenToTokenPrice()

  useEffect(() => {
    setSwapInfo((prev) => ({
      ...prev,
      to: {
        ...prev.to,
        amount: tokenToTokenPrice.price
      }
    }))
  }, [])

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
      px={3}
      py={2}
      w="full"
    >
      <Flex
        position="relative"
        justify="space-between"
        flexDirection={{ base: "column", sm: "row" }}
        align={{ base: "start", sm: "center" }}
        w="full"
      >
        <Menu isLazy placement="bottom" preventOverflow={false} flip={false}>
          {({ isOpen, onClose }) => (
            <>
              <Flex
                direction="row"
                gap={3}
                align="space-between"
                w="full"
                pt={6}
              >
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
                      isLoaded={Boolean(toToken)}
                    >
                      <Image h="2.25rem" w="2.75rem" src={toToken?.imageUrl} />
                    </Skeleton>
                    <Skeleton
                      alignItems="center"
                      isLoaded={Boolean(toToken)}
                      h={{ base: "3rem", md: "3rem" }}
                      display="flex"
                      rounded="1em"
                      w="full"
                    >
                      <VStack spacing={0} align="start">
                        <Text
                          fontSize={{ base: "md", sm: "18" }}
                          fontWeight="bold"
                          textAlign="start"
                          fontFamily="heading"
                          lineHeight={1}
                        >
                          {toToken?.name}
                        </Text>
                        <Text
                          lineHeight={1}
                          fontSize={{ base: "0.9em", sm: "14" }}
                          textAlign="start"
                          fontWeight="400"
                          fontFamily="body"
                        >
                          {
                            ChainConfigs[TokenStatus[toToken?.token!].chain]
                              .chainName
                          }
                        </Text>
                      </VStack>
                      <Spacer />
                      <Icon
                        as={isOpen ? FiChevronUp : FiChevronDown}
                        fontSize={{ base: "xl", sm: "3xl" }}
                        color={useColorModeValue("gray.800", "white")}
                      />
                    </Skeleton>
                  </Flex>
                </MenuButton>
                {toToken ? (
                  <Flex
                    flex={1}
                    gap={0}
                    direction="column"
                    align="end"
                    maxW="10rem"
                  >
                    <Text
                      variant="unstyled"
                      fontSize={{ base: "lg", sm: "24" }}
                      fontWeight="bold"
                      textAlign="end"
                      color="gray.800"
                      h="3rem"
                      _dark={{ color: "white" }}
                      mb={{ base: 1, md: 0 }}
                      placeholder="0"
                    >
                      {convertMicroDenomToDenom(
                        tokenToTokenPrice.price,
                        TokenStatus[to.token].decimal ?? 6
                      ) ?? 0}
                    </Text>
                    <Text
                      fontSize={{ sm: "16" }}
                      textAlign="end"
                      fontWeight="bold"
                      color="gray.800"
                      _dark={{ color: "whiteAlpha.600" }}
                      mb={0}
                    >
                      $0
                    </Text>
                  </Flex>
                ) : (
                  <Flex flexDirection="column" align="end">
                    <Skeleton
                      w={{ base: 20, sm: 36 }}
                      h={{ base: 8, sm: 10 }}
                    />
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
                    {toToken ? (
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
                        value={toToken}
                        loadOptions={(inputValue, callback) => {
                          setTimeout(() => {
                            const values = tokenList.filter((option) =>
                              option.name
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                            )
                            callback(values)
                          }, 1_000)
                        }}
                        onChange={(selectedOption) => {
                          let value = {}
                          value = { ...selectedOption }
                          setSwapInfo(({ from, to }) => {
                            return {
                              from: {
                                ...from
                              },
                              // @ts-ignore
                              to: { ...to, token: value.token as TokenType }
                            }
                          })
                          onClose()
                        }}
                        components={{
                          Control: CustomControl,
                          DropdownIndicator,
                          IndicatorSeparator,
                          Option: CustomOption
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
      </Flex>
    </Box>
  )
}
