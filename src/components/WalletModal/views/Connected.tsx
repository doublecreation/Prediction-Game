import { Box, Icon } from "@chakra-ui/react"
import { WalletViewProps } from "@cosmos-kit/core"
import { useCallback } from "react"
import { FaReply } from "react-icons/fa"
import { RiDoorOpenFill } from "react-icons/ri"
import { ConnectWalletButton } from "../components/buttons/ConnectWalletButton"
import { CopyAddressButton } from "../components/buttons/CopyAddressButton"
import { SimpleDisplayModalContent } from "../components/ui/ModalContent"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"

export const ConnectedView = ({
  onClose,
  onReturn,
  wallet
}: WalletViewProps) => {
  const {
    walletInfo: { prettyName, logo },
    username,
    address
  } = wallet

  const onDisconnect = useCallback(() => wallet.disconnect(true), [wallet])

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
      username={username}
      walletIcon={logo}
      addressButton={<CopyAddressButton address={address} />}
      bottomButton={
        <ConnectWalletButton
          leftIcon={<Icon as={FaReply} />}
          buttonText={"Disconnect"}
          onClick={onDisconnect}
        />
      }
    />
  )

  return <SimpleModalView modalHead={modalHead} modalContent={modalContent} />
}
