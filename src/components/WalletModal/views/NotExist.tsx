import { WalletViewProps } from "@cosmos-kit/core"
import React, { useCallback } from "react"
import { GoDesktopDownload } from "react-icons/go"
import { LogoStatus } from "../components"
import { InstallWalletButton } from "../components/buttons/InstallWalletButton"
import { SimpleDisplayModalContent } from "../components/ui/ModalContent"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"

export const NotExistView = ({
  onClose,
  onReturn,
  wallet
}: WalletViewProps) => {
  const {
    walletInfo: { prettyName, logo },
    downloadInfo
  } = wallet

  const onInstall = useCallback(() => {
    if (downloadInfo?.link) {
      window.open(downloadInfo?.link, "_blank")
    }
  }, [downloadInfo])

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
      contentHeader={`${prettyName} could not be found.`}
      contentDesc={
        // @ts-ignore
        onInstall
          ? `If ${prettyName} is installed on your device, please refresh this page or follow the browser instructions.`
          : `Download link not provided.`
      }
      bottomButton={
        <InstallWalletButton
          icon={GoDesktopDownload}
          buttonText={`Install ${prettyName}`}
          onClick={() => onInstall()}
          disabled={Boolean(!downloadInfo)}
        />
      }
    />
  )

  return <SimpleModalView modalHead={modalHead} modalContent={modalContent} />
}
