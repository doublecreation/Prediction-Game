import { useTokenInfo } from "hooks/tokens/useTokenInfo"
import { useMutation } from "@tanstack/react-query"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { useChain } from "@cosmos-kit/react"
import { slippageState, tokenSwapState } from "state/swapState"
import { useRefetchQueries } from "hooks/useRefetchQueries"
import { useTokenToTokenPrice } from "./useTokenToTokenPrice"
import { WalletStatus } from "@cosmos-kit/core"
import { Button } from "@chakra-ui/react"
import { toast } from "react-toastify"
import { convertDenomToMicroDenom } from "utils/tokens/helpers"
import { TokenStatus } from "utils/tokens/tokens"
import { useValidPool } from "./useValidPool"
import { tokenSwap } from "utils/swap/tokenSwap"
import { usePoolFromListQueryById } from "../pool/usePoolList"

export const useTokenSwap = () => {
  const { getSigningCosmWasmClient, address, status } = useChain("juno")
  const [{ from, to }, setTokenSwap] = useRecoilState(tokenSwapState)

  const refetchQueries = useRefetchQueries(["tokenBalance"])

  const validPool = useValidPool(from.token!, to.token!)

  return useMutation(
    ["swapTokens"],
    async () => {
      if (status !== WalletStatus.Connected) {
        throw new Error("Please connect your wallet.")
      }

      return await tokenSwap(validPool, address!, getSigningCosmWasmClient)
    },
    {
      onSuccess() {
        console.log("Swap Success")
        setTokenSwap({
          from: {
            ...from,
            amount: "0"
          },
          to
        })

        refetchQueries()
      },
      onError(e) {
        console.log("Swap Error: " + e)
      }
      //   onSettled() {
      //     setTransactionState(TransactionStatus.IDLE)
      //   }
    }
  )
}
