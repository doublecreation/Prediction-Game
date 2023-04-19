import { MsgTransfer } from "juno-network/types/codegen/ibc/applications/transfer/v1/tx"
import Long from "long"
import { atom } from "recoil"
import { ChainTypes } from "utils/tokens/chains"
import { IBCConfig } from "utils/tokens/chains"
import { TTokenListItem, TokenStatus, TokenType } from "utils/tokens/tokens"

export const showUIState = atom<boolean>({
  default: false,
  key: "showUI"
})

export const marketAdvancedModeState = atom<boolean>({
  default: false,
  key: "marketAdvancedMode"
})

export const activeRouteState = atom<Record<string, string> | undefined>({
  default: undefined,
  key: "activeRoute"
})

export const externalChainState = atom<TokenType>({
  default: TokenType["ATOM"],
  key: "externalChain"
})

export const externalTokenState = atom<TTokenListItem | undefined>({
  default: undefined,
  key: "externalToken"
})

export const externalChainInfoState = atom<MsgTransfer>({
  default: {
    sourcePort: "transfer",
    sourceChannel: IBCConfig[ChainTypes["COSMOS"]].juno_channel,
    token: { denom: "uatom", amount: "0" },
    sender: "",
    receiver: "",
    timeoutTimestamp: new Long(0)
  },
  key: "externalChainInfo"
})
