import { ModalViews } from "@cosmos-kit/core"
import { ConnectedView } from "./Connected"
import { ConnectingView } from "./Connecting"
import { ErrorView } from "./Error"
import { NotExistView } from "./NotExist"
import { QRCodeView } from "./QRCode"
import { RejectedView } from "./Rejected"
import { WalletListView } from "./WalletList"

export const defaultModalViews: ModalViews = {
  Connecting: ConnectingView,
  Connected: ConnectedView,
  Error: ErrorView,
  NotExist: NotExistView,
  Rejected: RejectedView,
  QRCode: QRCodeView,
  WalletList: WalletListView
}
