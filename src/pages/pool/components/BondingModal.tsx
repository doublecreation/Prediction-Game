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
import { TokenStatus, TokenType } from "utils/tokens/tokens"
import { NumericFormat } from "react-number-format"
import { useState } from "react"
import { HopersSliderIcon } from "components/Assets/earn/HopersSliderIcon"
import { RemoveLiquidity } from "./RemoveLiquidity"
import { FaArrowUp } from "react-icons/fa"
import { useRemoveLiquidity } from "hooks/pool/useRemoveLiquidity"
import { BondTokens } from "./BondTokens"
import { UnbondTokens } from "./UnbondTokens"

export const BondingModal = ({
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
  tokenA: TokenType
  tokenB: TokenType
}) => {
  const parameters = useParams()
  const [pool, isLoading] = usePoolFromListQueryById({
    poolId: Number(parameters.slug!)
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay backdropFilter="blur(70px)" />
      <ModalContent
        rounded="1.25em"
        h="30rem"
        _dark={{
          bg: "gray.700",
          bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
        }}
      >
        <ModalHeader w="full" textAlign="center">
          Manage Bonding
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted isLazy variant="soft-rounded" h="full">
            <TabList
              color="gray.800"
              _dark={{ color: "white", bg: "whiteAlpha.200" }}
              gap={2}
              h="3rem"
              bg="blackAlpha.200"
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
                Bond Tokens
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
                Unbond Tokens
              </Tab>
            </TabList>

            <TabPanels h="calc(100% - 3rem)">
              <TabPanel h="full">
                <BondTokens />
              </TabPanel>
              <TabPanel h="full">
                <UnbondTokens pool={pool!} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
