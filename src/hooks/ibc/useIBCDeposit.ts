import { useMutation } from "@tanstack/react-query"
import { useRecoilState } from "recoil"
import { useChain, useChainWallet } from "@cosmos-kit/react"
import { useRefetchQueries } from "hooks/useRefetchQueries"
import { WalletStatus } from "@cosmos-kit/core"
import { Id, toast } from "react-toastify"
import { convertDenomToMicroDenom } from "utils/tokens/helpers"
import { TokenChainName, TokenStatus } from "utils/tokens/tokens"
import { useRef } from "react"
import { externalChainState } from "state/UIState"
import { ibcTransfer } from "utils/ibc/ibcTransfer"
import { ChainConfigs } from "utils/tokens/chains"

export const useIBCDeposit = () => {
  const { wallet } = useChain("juno")
  const [externalChain, setExternalChain] = useRecoilState(externalChainState)

  const {
    address,
    isWalletConnected,
    getSigningStargateClient,
    getOfflineSignerDirect,
    chain
  } = useChainWallet(TokenChainName[externalChain], wallet?.name ?? "")

  const toastId = useRef<Id>()

  const refetchQueries = useRefetchQueries(["tokenBalance"])

  return useMutation(
    ["ibcDeposit"],
    async () => {
      if (!isWalletConnected) {
        throw new Error("Please connect your wallet.")
      }

      toastId.current = toast("Depositing...", { autoClose: false })

      return await ibcTransfer(
        address!,
        getSigningStargateClient,
        "deposit",
        chain.chain_id,
        getOfflineSignerDirect()
      )
    },
    {
      onSuccess() {
        toast.update(toastId.current!, {
          render: "Deposit successful",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000
        })

        refetchQueries()
      },
      onError(e) {
        toast.update(toastId.current!, {
          type: toast.TYPE.ERROR,
          render: "Deposit " + e,
          autoClose: 5000
        })
      }
      //   onSettled() {
      //     setTransactionState(TransactionStatus.IDLE)
      //   }
    }
  )
}
