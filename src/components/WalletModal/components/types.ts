import { ActionMeta, OnChangeValue, OptionBase } from "chakra-react-select"
import React, { MouseEventHandler, ReactNode, RefObject } from "react"
import { IconType } from "react-icons"

/* ====================================================== */
/*                      default type                      */
/* ====================================================== */
export enum WalletStatus {
  Disconnected = "Disconnected",
  Connecting = "Connecting",
  Connected = "Connected",
  NotExist = "NotExist",
  Rejected = "Rejected",
  Error = "Error"
}
export enum Themes {
  Light = "light",
  Dark = "dark"
  // TestTheme = 'test-theme'
}
export type ThemeListType = {
  name: Themes
  displayColor: string
  colorMode: string
}
export type StyleDataType = {
  componentName: string
  category: string
  style: string
  theme: { themeName: Themes; themeValue: string }[]
}

/* ====================================================== */
/*                  Connect Wallet Button                 */
/* ====================================================== */
export type ConnectWalletButtonType = {
  /**
   * Text to display for button.
   *
   * If in need, set false to unset default string.
   */
  buttonText?: string | false
  /**
   * Button display spinning indicator.
   */
  loading?: boolean
  /**
   * Button display disabled.
   */
  disabled?: boolean
  /**
   * Props JSX.Element to custom icon.
   */
  leftIcon?: React.ReactNode | false
  /**
   * Props JSX.Element to custom icon.
   */
  rightIcon?: React.ReactNode
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string
  /**
   * Can use Chakra Style Props custom button style.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object
  /**
   * A function called to handle connect.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

/* ====================================================== */
/*                   Copy Address Button                  */
/* ====================================================== */
export type CopyAddressType = {
  /**
   * Text to display for address.
   */
  address?: string
  /**
   * Button display loading.
   */
  loading?: boolean
  /**
   * Button display disabled.
   */
  disabled?: boolean
  /**
   * Set the max length of address.
   */
  maxDisplayLength?: number
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string
  /**
   * Can use Chakra Style Props custom button style.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object
}

/* ====================================================== */
/*                  Change Chain Dropdown                 */
/* ====================================================== */
export interface DataType extends OptionBase {
  /**
   * Unique identifier for option.
   */
  name: string
  /**
   * Text to display for option.
   */
  label: string
  /**
   * Value of option.
   */
  value: string
  /**
   * Icon display for option.
   */
  icon?: {
    png?: string
    jpeg?: string
    svg?: string
  }
  /**
   * Disabled the option.
   */
  disabled?: boolean
}

export type handleSelectChainDropdown = (
  newValue: OnChangeValue<DataType, false>,
  actionMeta: ActionMeta<DataType>
) => void

export type ChangeChainDropdownType = {
  /**
   * Data of options.
   *
   * see `DataType` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L123-L148
   */
  data: DataType[]
  /**
   * Selected item.
   *
   * see `DataType` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L123-L148
   */
  selectedItem?: DataType
  /**
   * Dropdown display loading.
   */
  loading?: boolean
  /**
   * Dropdown display disabled.
   */
  disabled?: boolean
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string
  /**
   * Can use Chakra Style Props custom dropdown style.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   *
   * about chakra-react-select: https://github.com/csandman/chakra-react-select#chakrastyles
   */
  styleProps?: object
  /**
   * Can custom dropdown, default:
   * ```
   *  {
   *    DropdownIndicator,
   *    IndicatorSeparator,
   *    LoadingIndicator,
   *    Placeholder,
   *    Option
   *  }
   * ```
   */
  customComponents?: object
  /**
   * A function called to handle select item.
   *
   * see `handleSelectChainDropdown` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L150-L153
   */
  onChange: handleSelectChainDropdown
}

/* ====================================================== */
/*                  Simple Connect Modal                  */
/* ====================================================== */
export enum LogoStatus {
  Loading = "loading",
  Warning = "warning",
  Error = "error"
}

export enum WalletMode {
  Extension = "extension",
  WalletConnect = "wallet-connect"
}

export enum ButtonShape {
  Square = "Square",
  Rectangle = "Rectangle"
}

export enum QRCodeStatus {
  Pending = "Pending",
  Done = "Done",
  Error = "Error",
  Expired = "Expired"
}

export type DownloadInfo = {
  browser?: string
  os?: string
  icon?: IconType
  link: string
}

export type Downloads = {
  desktop: DownloadInfo[]
  tablet: DownloadInfo[]
  mobile: DownloadInfo[]
  default: string
}

export type SimpleModalHeadType = {
  /**
   * Text to display for modal head.
   */
  title: string
  /**
   * If is true, display the back button.
   */
  backButton: boolean
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string
  /**
   * Can use Chakra Style Props custom modal head style, also can use css.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object
  /**
   * A function called to handle modal content display.
   */
  onBack?: MouseEventHandler<HTMLButtonElement>
  /**
   * A function called to handle modal close.
   */
  onClose: MouseEventHandler<HTMLButtonElement>
}

export type SimpleModalViewType = {
  modalHead: ReactNode
  modalContent: ReactNode
}

export type SimpleConnectModalType = {
  /**
   * The ref of element to receive focus when the modal opens.
   *
   * Props ref will set default focus on the list first button.
   *
   * If is undefined will set focus on close button.
   */
  initialRef: RefObject<HTMLButtonElement>
  /**
   * The component of display on modal content.
   */
  modalView: ReactNode
  /**
   * If true, the modal will be open.
   */
  modalOpen: boolean
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string
  /**
   * Can use Chakra Style Props custom modal style, also can use css.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object
  /**
   * A function called to close modal.
   */
  modalOnClose: () => void
}

export type InstallWalletButtonType = {
  /**
   * Props react-icons item to a custom icon.
   *
   * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
   */
  icon?: IconType
  /**
   * Text to display for button.
   */
  buttonText?: string
  /**
   * Button display disabled.
   */
  disabled: boolean
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string
  /**
   * Can use Chakra Style Props custom button style, also can use css.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object
  /**
   * A function called to handle download wallet.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type ConnectModalContentType = {
  /**
   * Main logo on content.
   *
   * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
   */
  logo?: string | IconType
  /**
   * The border around logo.
   *
   * see `LogoStatus` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L221-L225
   */
  status?: LogoStatus
  /**
   * Connected user name.
   */
  username?: string
  /**
   * Connected Wallet icon.
   */
  walletIcon?: string
  /**
   * Bold text of the header.
   */
  contentHeader?: string
  /**
   * Describe the status.
   */
  contentDesc?: string
  /**
   * Props the `CopyAddressButton` component.
   */
  addressButton?: ReactNode
  /**
   * Props the `ConnectWalletButton` component.
   */
  bottomButton?: ReactNode
  /**
   * Props the link component.
   */
  bottomLink?: ReactNode
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string
  /**
   * Can use Chakra Style Props custom modal content style, also can use css.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object
}

export type QRCodeType = {
  /**
   * The QRCode display status.
   */
  status: QRCodeStatus
  /**
   * Link for connecting wallet from app.
   */
  link: string
  /**
   * Describe how to connect wallet.
   */
  description?: string
  /**
   * The title describes the QR code error.
   */
  errorTitle?: string
  /**
   * The description for the QR code error.
   */
  errorDesc?: string
  /**
   * QRCode size. Default is `230px`.
   */
  qrCodeSize?: number
  /**
   * A function called to handle refresh.
   */
  onRefresh?: () => void
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string
  /**
   * Can use Chakra Style Props custom QR Code style.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object
}

export type QRCodeDisplayErrorType = {
  /**
   * Current theme.
   */
  theme: string
  /**
   * QRCode size. Default is `230px`.
   */
  qrCodeSize?: number
  /**
   * A function called to handle refresh.
   */
  onRefresh: () => void
}

export type Wallet = {
  /**
   * Wallet name.
   */
  name: string
  /**
   * Display wallet name.
   */
  prettyName?: string
  /**
   * Wallet icon.
   *
   * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
   */
  logo?: string | IconType
  /**
   * Display sub icon.
   *
   * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
   */
  subLogo?: string | IconType
  /**
   * Connect wallet by extension or wallet-connect.
   *
   * see `WalletMode` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L227-L230
   */
  mode: WalletMode
  /**
   * Disabled button when on mobile or tablet.
   */
  mobileDisabled: boolean
  /**
   * List button is displaying Square or Rectangle.
   *
   * see `ButtonShape` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L232-L235
   */
  buttonShape?: ButtonShape
  /**
   * Description when rejected.
   */
  rejectMessage?: string
  /**
   * Description when rejected.
   *
   * see `Downloads` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L224-L249
   */
  downloads?: Downloads
  /**
   * Can use Chakra Style Props custom list items(buttons) style.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   *
   * default: `SimpleDisplayWalletListItemBaseStyle(index)`
   */
  styleProps?: object
  /**
   * A function called to handle clicked button.
   */
  onClick?: MouseEventHandler<HTMLDivElement>
}

export type DisplayWalletListType = {
  /**
   * The ref of element to receive focus when the modal opens.
   *
   * Props ref will set default focus on the list first button.
   *
   * If is undefined will set focus on close button.
   */
  initialFocus: RefObject<HTMLButtonElement>
  /**
   * Array of wallet list.
   *
   * see `Wallet` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L475-L543
   */
  walletsData: Wallet[]
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string
  /**
   * Can use Chakra Style Props custom list style.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object
  /**
   * Can use Framer Motion Props control animation.
   *
   * see framer-motion docs: https://www.framer.com/docs/
   */
  shadowAnimateProps?: object
}
