import { ModalViews, WalletModalProps } from "@cosmos-kit/core"
import { WalletModal } from "./Modal"
import { defaultModalViews } from "./views/Config"

export function getModal(modalViews: ModalViews = defaultModalViews) {
  return ({ isOpen, setOpen, walletRepo }: WalletModalProps) => {
    return (
      <WalletModal
        isOpen={isOpen}
        setOpen={setOpen}
        walletRepo={walletRepo}
        modalViews={{
          ...defaultModalViews,
          ...modalViews
        }}
      />
    )
  }
}
