/* eslint-disable sonarjs/no-small-switch */
import { ChakraProvider, useBreakpoint } from "@chakra-ui/react"
import { BrowserRouter as Router } from "react-router-dom"
import { wallets as vectisWallets } from "@cosmos-kit/vectis"
import { Decimal } from "@cosmjs/math"
import { GasPrice } from "@cosmjs/stargate"
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation"
import { wallets as keplrWallets } from "@cosmos-kit/keplr"
import { wallets as leapWallets } from "@cosmos-kit/leap"
// import { wallets as xdefiWallets } from "@cosmos-kit/xdefi-extension"
// import { wallets as omniWallets } from "@cosmos-kit/omni"
import { wallets as frontierWallets } from "@cosmos-kit/frontier"
// import { wallets as stationWallets } from "@cosmos-kit/terrastation"
import type { Chain } from "@chain-registry/types"
import { assets, chains } from "chain-registry"
import { MotionConfig } from "framer-motion"

import Layout from "components/Layout"
import RouterSetup from "components/Router/RouterSetup"
import { theme } from "theme"
import { ChainProvider } from "@cosmos-kit/react"
import { RecoilRoot } from "recoil"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "services/queryClient"

import "react-toastify/dist/ReactToastify.css"
import RecoilNexus from "recoil-nexus"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { getModal } from "components/WalletModal/getModal"
import Updater from "Updater"

const App = () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <RecoilRoot>
        <RecoilNexus />
        <QueryClientProvider client={queryClient}>
          <Updater />
          <ReactQueryDevtools initialIsOpen={false} />
          <ChainProvider
            chains={chains}
            assetLists={assets}
            modalTheme={theme}
            wrappedWithChakra={false}
            key="chainProvider"
            walletModal={getModal()}
            wallets={[
              ...keplrWallets,
              ...cosmostationWallets,
              ...leapWallets,
              ...vectisWallets,
              ...frontierWallets
              // ...stationWallets
              // ...trustWallets
              // ...xdefiWallets
              // ...omniWallets
            ]}
            defaultNameService="icns"
            walletConnectOptions={{
              signClient: {
                projectId: import.meta.env.VITE_WCCLIENT,
                relayUrl: "wss://relay.walletconnect.org"
              }
            }}
            signerOptions={{
              signingCosmwasm: (chain: Chain) => {
                switch (chain.chain_name) {
                  case "juno":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("25000", 2),
                        "ujuno"
                      )
                    }
                  default:
                    return undefined
                }
              },
              signingStargate: (chain: Chain) => {
                switch (chain.chain_name) {
                  case "juno":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("25000", 2),
                        "ujuno"
                      )
                    }
                  case "cosmoshub":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("25000", 2),
                        "uatom"
                      )
                    }
                  case "osmosis":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("25000", 2),
                        "uosmo"
                      )
                    }
                  case "axelar":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("25000", 2),
                        "uaxl"
                      )
                    }
                  case "kujira":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("25000", 2),
                        "ukuji"
                      )
                    }
                  case "stargaze":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("25000", 2),
                        "ustars"
                      )
                    }
                  case "comdex":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("25000", 2),
                        "ucmdx"
                      )
                    }
                  case "chihuahua":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("5000000", 2),
                        "uhuahua"
                      )
                    }
                  case "mars":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("25000", 2),
                        "umars"
                      )
                    }
                  case "evmos":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("25000000000", 2),
                        "aevmos"
                      )
                    }
                  case "planq":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("40000000000", 2),
                        "aplanq"
                      )
                    }
                  default:
                    return undefined
                }
              }
            }}
            endpointOptions={{
              endpoints: {
                juno: {
                  rpc: ["https://rpc.juno.basementnodes.ca"],
                  rest: ["https://api-juno.pupmos.network"]
                },
                comdex: {
                  rpc: ["https://rpc.comdex.one"]
                },
                cosmoshub: {
                  rpc: ["https://rpc-cosmoshub-ia.cosmosia.notional.ventures"]
                },
                evmos: {
                  rpc: ["https://rpc-evmos-ia.cosmosia.notional.ventures"]
                },
                planq: {
                  rpc: ["https://rpc.planq.network"]
                },
                osmosis: {
                  rpc: ["https://rpc.osl.zone"]
                }
              },
              isLazy: true
            }}
          >
            <Router>
              <MotionConfig
                transition={{ type: "spring", bounce: 0.4, damping: 7 }}
              >
                <Layout>
                  <RouterSetup />
                </Layout>
              </MotionConfig>
            </Router>
          </ChainProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default App
