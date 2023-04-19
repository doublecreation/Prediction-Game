import {
  MsgExecuteContractEncodeObject,
  SigningCosmWasmClient
} from "@cosmjs/cosmwasm-stargate"
import { SigningStargateClient, coin, coins } from "@cosmjs/stargate"
import { useChain } from "@cosmos-kit/react"
import { contracts } from "@hopersio/contracts"
import { HopersSwapHopersExecuteMsg } from "@hopersio/contracts/types/HopersSwapHopers.types"
import { useValidPool } from "hooks/swap/useValidPool"
import { useCallback, useEffect, useMemo, useState } from "react"
import { getRecoil } from "recoil-nexus"
import { addLiquidityState } from "state/poolState"
import { slippageState, tokenSwapState } from "state/swapState"
import { ChainConfigs } from "utils/tokens/chains"
import { convertDenomToMicroDenom } from "utils/tokens/helpers"
import { TValidPair } from "utils/tokens/liquidities"
import { TPool } from "utils/tokens/pools"
import { TokenStatus, TokenType, TTokenListItem } from "utils/tokens/tokens"
import { createExecuteMessage } from "../messages/createExecuteMessage"
import { createIncreaseAllowanceMessage } from "../messages/createIncreaseAllowanceMessage"
import { simulateTransaction } from "../messages/simulateTransaction"
import { externalChainInfoState, externalChainState } from "state/UIState"
import { ibc } from "juno-network"
import { ExtendedHttpEndpoint } from "@cosmos-kit/core"
import {
  EncodeObject,
  OfflineDirectSigner,
  OfflineSigner,
  isOfflineDirectSigner,
  makeAuthInfoBytes,
  makeSignDoc
} from "@cosmjs/proto-signing"
import { Any } from "cosmjs-types/google/protobuf/any"
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys"
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx"
import { Int53 } from "@cosmjs/math"
import { Field, Type } from "protobufjs"
import { fromBase64 } from "@cosmjs/encoding"

export const ibcTransfer = async (
  address: string,
  getSigningStargateClient: () => Promise<SigningStargateClient>,
  type: "deposit" | "withdraw",
  chain_id?: string,
  offlineSigner?: OfflineDirectSigner
) => {
  const transferMsg = getRecoil(externalChainInfoState)
  const externalChain = getRecoil(externalChainState)
  const { transfer } = ibc.applications.transfer.v1.MessageComposer.withTypeUrl
  const transferMessage = transfer(transferMsg)

  const client = await getSigningStargateClient()

  if (
    ChainConfigs[TokenStatus[externalChain].chain].isEVM &&
    offlineSigner &&
    chain_id
  ) {
    const rest = await fetch(
      `${
        ChainConfigs[TokenStatus[externalChain].chain].restEndpoint
      }/cosmos/auth/v1beta1/accounts/${address}`
    )

    const restJson = await rest.json()
    const { sequence, account_number } = restJson.account.base_account

    const accountFromSigner = (await offlineSigner.getAccounts()).find(
      (account) => account.address === address
    )

    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer")
    }

    const pubkeyBytes = accountFromSigner.pubkey

    const pubk = Any.fromPartial({
      typeUrl: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
      value: PubKey.encode({
        key: pubkeyBytes
      }).finish()
    })

    const txBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: [transferMessage],
        memo: "memo"
      }
    }

    const txBodyBytes = client.registry.encode(txBodyEncodeObject)
    const gasLimit = Int53.fromString("200000").toNumber()
    const authInfoBytes = makeAuthInfoBytes(
      [{ pubkey: pubk, sequence }],
      [{ amount: "25000000000", denom: "aevmos" }],
      gasLimit,
      undefined,
      undefined,
      undefined
    )

    const signDoc = makeSignDoc(
      txBodyBytes,
      authInfoBytes,
      chain_id,
      account_number
    )

    const { signature, signed } = await offlineSigner.signDirect(
      address,
      signDoc
    )

    const txRaw = TxRaw.encode({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)]
    }).finish()

    return simulateTransaction(await client.broadcastTx(txRaw))
  } else {
    return simulateTransaction(
      await client.signAndBroadcast(address, [transferMessage], "auto")
    )
  }
}
