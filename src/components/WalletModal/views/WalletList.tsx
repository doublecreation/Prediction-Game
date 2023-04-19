/* eslint-disable @next/next/no-img-element */

import { ChainWalletBase, WalletListViewProps } from "@cosmos-kit/core"
import React, { useCallback, useMemo, useRef } from "react"
import { Wallet } from "../components/types"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"
import { SimpleDisplayWalletList } from "../components/ui/WalletList"
import { useBreakpoint } from "@chakra-ui/react"

export const WalletListView = ({ onClose, wallets }: WalletListViewProps) => {
  const initialFocus = useRef()
  const breakpoint = useBreakpoint()

  console.log(breakpoint)

  const onWalletClicked = useCallback((wallet: ChainWalletBase) => {
    wallet.connect(true)
  }, [])

  const modalHead = (
    <SimpleModalHead
      title="Select your wallet"
      backButton={false}
      onClose={onClose}
    />
  )

  const walletsData = useMemo(() => {
    if (breakpoint === "base" || breakpoint === "sm") {
      return wallets
        .filter((wallet) => wallet.walletInfo.mode === "wallet-connect")
        .map((w, i) => {
          return {
            ...w.walletInfo,
            downloads: void 0,
            onClick: async () => {
              onWalletClicked(w)
            },
            buttonShape: i < 2 ? "Square" : "Rectangle",
            subLogo:
              w.walletInfo.mode === "wallet-connect"
                ? "https://user-images.githubusercontent.com/545047/202090621-bb110635-f6ce-4aa0-a4e5-a03beac29bd1.svg"
                : void 0
          } as Wallet
        })
    } else {
      return wallets
        .sort((a, b) => {
          if (a.walletInfo.mode === b.walletInfo.mode) {
            return 0
          } else if (a.walletInfo.mode !== "wallet-connect") {
            return -1
          } else {
            return 1
          }
        })
        .map((w, i) => {
          return {
            ...w.walletInfo,
            downloads: void 0,
            onClick: async () => {
              onWalletClicked(w)
            },
            buttonShape: i < 2 ? "Square" : "Rectangle",
            subLogo:
              w.walletInfo.mode === "wallet-connect"
                ? "https://user-images.githubusercontent.com/545047/202090621-bb110635-f6ce-4aa0-a4e5-a03beac29bd1.svg"
                : void 0
          } as Wallet
        })
    }
  }, [wallets, breakpoint])

  const modalContent = (
    <SimpleDisplayWalletList
      // @ts-ignore
      initialFocus={initialFocus}
      walletsData={walletsData}
    />
  )

  return <SimpleModalView modalHead={modalHead} modalContent={modalContent} />
}
