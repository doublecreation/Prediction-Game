import { Box } from "@chakra-ui/react"
import { WalletViewProps } from "@cosmos-kit/core"
import { ReloadIcon } from "components/Assets/ReloadIcon"
import { useCallback } from "react"
import { BsArrowCounterclockwise } from "react-icons/bs"
import { FaArrowCircleLeft } from "react-icons/fa"
import { IoReloadCircle } from "react-icons/io5"
import { LogoStatus, ConnectWalletButton } from "../components"
import { SimpleDisplayModalContent } from "../components/ui/ModalContent"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"

export const RejectedView = ({
  onClose,
  onReturn,
  wallet
}: WalletViewProps) => {
  const {
    walletInfo: { prettyName, logo }
  } = wallet

  const onReconnect = useCallback(() => {
    wallet.connect(false)
  }, [wallet])

  const modalHead = (
    <SimpleModalHead
      title={prettyName}
      backButton={true}
      onClose={onClose}
      onBack={onReturn}
    />
  )

  const modalContent = (
    <SimpleDisplayModalContent
      status={LogoStatus.Error}
      logo={logo}
      contentHeader={"Request Rejected"}
      contentDesc={
        wallet.rejectMessageTarget || "Connection permission was denied."
      }
      bottomButton={
        <ConnectWalletButton
          leftIcon={<ReloadIcon w="2rem" h="2rem" />}
          buttonText={"Reconnect"}
          onClick={onReconnect}
        />
      }
    />
  )

  return <SimpleModalView modalHead={modalHead} modalContent={modalContent} />
}
