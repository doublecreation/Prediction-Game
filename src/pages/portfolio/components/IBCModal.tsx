import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  VStack,
  Heading,
  Avatar,
  Input,
  ModalFooter,
  Button,
  useBreakpoint,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  useColorModeValue,
  Spacer,
  Flex,
  Text
} from "@chakra-ui/react"
import { useChain, useChainWallet, useWallet } from "@cosmos-kit/react"
import { useTokenInfo } from "hooks/tokens/useTokenInfo"
import { useEffect, useMemo } from "react"
import { useRecoilState } from "recoil"
import { externalChainState } from "state/UIState"
import { ChainConfigs } from "utils/tokens/chains"
import {
  TTokenListItem,
  TokenChainName,
  TokenFullName,
  TokenStatus,
  TokenType
} from "utils/tokens/tokens"
import truncateAddress from "utils/ui/truncateAddress"
import { toBech32, fromBech32 } from "@cosmjs/encoding"
import { ExternalChain } from "./ExternalChain"
import { ibc } from "juno-network"
import { MsgTransfer } from "juno-network/types/codegen/ibc/applications/transfer/v1/tx"
import Long from "long"
import { NumericFormat } from "react-number-format"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { useTokenBalance } from "hooks/tokens/useTokenBalance"
import Deposit from "./Deposit"
import Withdraw from "./Withdraw"
import { useIBCDeposit } from "hooks/ibc/useIBCDeposit"

export const IBCModal = ({
  isOpen,
  onClose,
  token,
  type
}: {
  isOpen: boolean
  onClose: () => void
  token: TTokenListItem
  type: "deposit" | "withdraw"
}) => {
  const breakpoint = useBreakpoint()

  const [externalChain, setExternalChain] = useRecoilState(externalChainState)

  if (breakpoint === "base" || breakpoint === "sm") {
    return (
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent roundedTop="1.25em">
          <DrawerHeader w="full" textAlign="center">
            Manage your {TokenFullName[externalChain!]}
          </DrawerHeader>

          <DrawerBody>
            <Tabs
              defaultIndex={type === "deposit" ? 0 : 1}
              isFitted
              isLazy
              variant="soft-rounded"
              h="full"
            >
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
                  Deposit
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
                  Withdraw
                </Tab>
              </TabList>
              <TabPanels h="calc(100% - 3rem)">
                <TabPanel>
                  <Deposit token={token} />
                </TabPanel>
                <TabPanel>
                  <Withdraw token={token} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        rounded="1.25em"
        _dark={{
          bg: "gray.700",
          bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
        }}
      >
        <ModalHeader>Manage your {TokenFullName[externalChain!]}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            defaultIndex={type === "deposit" ? 0 : 1}
            isFitted
            isLazy
            variant="soft-rounded"
            h="full"
          >
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
                Deposit
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
                Withdraw
              </Tab>
            </TabList>
            <TabPanels h="calc(100% - 3rem)">
              <TabPanel>
                <Deposit token={token} />
              </TabPanel>
              <TabPanel>
                <Withdraw token={token} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
