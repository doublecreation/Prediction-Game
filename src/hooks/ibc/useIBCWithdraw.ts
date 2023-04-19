import { useMutation } from "@tanstack/react-query"
import { useRecoilState } from "recoil"
import { useChain, useChainWallet } from "@cosmos-kit/react"
import { useRefetchQueries } from "hooks/useRefetchQueries"
import { WalletStatus } from "@cosmos-kit/core"
import { Id, toast } from "react-toastify"
import { convertDenomToMicroDenom } from "utils/tokens/helpers"
import { TokenChainName } from "utils/tokens/tokens"
import { useRef } from "react"
import { externalChainState } from "state/UIState"
import { ibcTransfer } from "utils/ibc/ibcTransfer"

export const useIBCWithdraw = () => {
  const { address, isWalletConnected, getSigningStargateClient } =
    useChain("juno")

  const toastId = useRef<Id>()

  const refetchQueries = useRefetchQueries(["tokenBalance"])

  return useMutation(
    ["ibcWithdraw"],
    async () => {
      if (!isWalletConnected) {
        throw new Error("Please connect your wallet.")
      }

      toastId.current = toast("Withdrawing...", { autoClose: false })

      return await ibcTransfer(address!, getSigningStargateClient, "withdraw")
    },
    {
      onSuccess() {
        toast.update(toastId.current!, {
          render: "Withdraw Successful",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000
        })

        refetchQueries()
      },
      onError(e) {
        toast.update(toastId.current!, {
          type: toast.TYPE.ERROR,
          render: "Withdraw " + e,
          autoClose: 5000
        })
      }
      //   onSettled() {
      //     setTransactionState(TransactionStatus.IDLE)
      //   }
    }
  )
}
