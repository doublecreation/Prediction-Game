import { WalletViewProps } from "@cosmos-kit/core"
import { LogoStatus } from "../components/types"
import { SimpleDisplayModalContent } from "../components/ui/ModalContent"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"

export const ConnectingView = ({
  onClose,
  onReturn,
  wallet
}: WalletViewProps) => {
  const {
    walletInfo: { prettyName, logo, mode },
    message
  } = wallet

  let title: string = "Requesting Connection"
  let desc: string =
    mode === "wallet-connect"
      ? `Approve ${prettyName} connection request on your mobile.`
      : `Open the ${prettyName} browser extension to connect your wallet.`

  if (message === "InitClient") {
    title = "Initializing Wallet Client"
    desc = ""
  }

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
      status={LogoStatus.Loading}
      logo={logo}
      contentHeader={title}
      contentDesc={desc}
    />
  )

  return <SimpleModalView modalHead={modalHead} modalContent={modalContent} />
}
