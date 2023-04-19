import { Box } from "@chakra-ui/react"
import { WalletViewProps } from "@cosmos-kit/core"
import { ConnectWalletButton } from "../components/buttons/ConnectWalletButton"
import { LogoStatus } from "../components/types"
import { SimpleDisplayModalContent } from "../components/ui/ModalContent"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"

export const ErrorView = ({ onClose, onReturn, wallet }: WalletViewProps) => {
  const {
    walletInfo: { prettyName, logo },
    message
  } = wallet

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
      contentHeader={"Oops! Something wrong..."}
      contentDesc={message}
      bottomButton={
        <ConnectWalletButton buttonText={"Change Wallet"} onClick={onReturn} />
      }
    />
  )

  return <SimpleModalView modalHead={modalHead} modalContent={modalContent} />
}
