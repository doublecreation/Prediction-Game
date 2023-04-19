import { Avatar, Heading, Input, Skeleton, VStack } from "@chakra-ui/react"
import { WalletStatus } from "@cosmos-kit/core"
import { useChain, useChainWallet } from "@cosmos-kit/react"
import dayjs from "dayjs"
import { useTokenInfo } from "hooks/tokens/useTokenInfo"
import Long from "long"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { externalChainInfoState } from "state/UIState"
import { ChainConfigs, ChainTypes, IBCConfig } from "utils/tokens/chains"
import { TokenChainName, TokenStatus, TokenType } from "utils/tokens/tokens"
import truncateAddress from "utils/ui/truncateAddress"

export const ExternalChain = ({
  externalChain,
  wallet,
  type,
  denom
}: {
  externalChain: TokenType
  wallet: string
  type: "withdraw" | "deposit"
  denom: string
}) => {
  const {
    address: externalAddress,
    connect,
    status
  } = useChainWallet(TokenChainName[externalChain], wallet)

  const { address } = useChain("juno")

  const [externalChainInfo, setExternalChainInfo] = useRecoilState(
    externalChainInfoState
  )

  const externalToken = useTokenInfo(externalChain!)

  useEffect(() => {
    if (status !== WalletStatus.Connected) {
      connect()
    }
    setExternalChainInfo({
      receiver: type === "deposit" ? address! : externalAddress!,
      sender: type === "deposit" ? externalAddress! : address!,
      sourceChannel:
        type === "deposit"
          ? IBCConfig[TokenStatus[externalChain].chain].channel
          : IBCConfig[TokenStatus[externalChain].chain].juno_channel,
      sourcePort: "transfer",
      token: {
        denom: type === "deposit" ? denom : externalChain,
        amount: "0"
      },
      timeoutTimestamp: Long.fromNumber(
        dayjs().add(10, "minutes").unix() * 1000000000
      )
    })
  }, [externalChain, type, denom, externalAddress])

  useEffect(() => {
    console.log(externalChainInfo)
  }, [externalChainInfo])

  return (
    <VStack w="full">
      <Heading fontSize="20">
        {type === "deposit" ? "From" : "To"}{" "}
        {ChainConfigs[TokenStatus[externalChain].chain].chainName ?? ""}
      </Heading>
      <Avatar src={externalToken.imageUrl ?? ""} />
      <Skeleton
        rounded="1.25em"
        w="full"
        isLoaded={Boolean(status === WalletStatus.Connected && externalAddress)}
      >
        <Input
          variant="unstyled"
          fontSize="md"
          fontWeight="bold"
          textAlign="center"
          _hover={{ _disabled: { cursor: "default" } }}
          defaultValue={truncateAddress(externalAddress, 10, 10)}
          w="full"
          rounded="1.25em"
          color="gray.800"
          isDisabled={type === "deposit"}
          px={2}
          py={1}
          minH="3rem"
          bg="white"
          _dark={{
            _focus: { bg: "gray.800", shadow: "md" },
            color: "white",
            bg: "gray.600"
          }}
          type="text"
          _focus={{
            border: "none",
            bg: "offwhite.2",
            shadow: "md"
          }}
        />
      </Skeleton>
    </VStack>
  )
}
