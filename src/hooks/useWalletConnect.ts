import { useChain } from "@cosmos-kit/react"
import { ConnectedChain } from "../constants"
import { useCallback, useEffect } from "react"
import { WalletStatus } from "@cosmos-kit/core"
import { useClipboard } from "@chakra-ui/react"
import { animate, useMotionValue } from "framer-motion"
import { useLocalStorageState } from "ahooks"

const useWalletConnect = () => {
    const {
        address,
        openView,
        isWalletConnected,
        status: walletStatus
    } = useChain(ConnectedChain)
    const { setValue } = useClipboard("")

    const [connectedWalletStorage, setConnectedWalletStorage] =
        useLocalStorageState<boolean>("@fuzio/walletStatus", {
            defaultValue: false
        })

    const connectWalletBackgroundImage = useMotionValue(
        connectedWalletStorage
            ? "linear-gradient(0deg, rgb(2,226,150),rgb(2,226,150))"
            : "linear-gradient(0deg, rgb(218, 32, 73),rgb(218, 32, 73))"
    )

    useEffect(() => {
        if (walletStatus === WalletStatus.Connected) {
            setValue(address ?? "")
            animate(
                connectWalletBackgroundImage,
                "linear-gradient(0deg, rgb(2,226,150),rgb(2,226,150))",
                {
                    duration: 0.5,
                    type: "tween"
                }
            )
            setConnectedWalletStorage(true)
        } else {
            animate(
                connectWalletBackgroundImage,
                "linear-gradient(0deg, rgb(218, 32, 73),rgb(218, 32, 73))",
                {
                    duration: 0.5,
                    type: "tween"
                }
            )
            setConnectedWalletStorage(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletStatus])

    const connect = useCallback(() => {
        if (isWalletConnected) return
        openView()
    }, [isWalletConnected, openView])

    const disconnect = useCallback(() => {
        if (!isWalletConnected) return
        openView()
    }, [isWalletConnected, openView])
    return {
        connect,
        disconnect,
        openView
    }
}

export default useWalletConnect
