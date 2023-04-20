export const ChainInfo = {
  $schema: "../chain.schema.json",
  chain_name: "seimainnet",
  status: "live",
  network_type: "mainnet",
  pretty_name: "Sei Atlantic 2",
  chain_id: "atlantic-2",
  bech32_prefix: "sei",
  node_home: "$HOME/.sei",
  key_algos: ["secp256k1"],
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: "usei",
        fixed_min_gas_price: 0
      }
    ]
  },
  codebase: {
    git_repo: "https://github.com/sei-protocol/sei-chain",
    recommended_version: "1.0.6beta",
    compatible_versions: ["1.0.6beta"],
    genesis: {
      genesis_url:
        "https://raw.githubusercontent.com/sei-protocol/testnet/main/sei-incentivized-testnet/genesis.json"
    }
  },
  staking: {
    staking_tokens: [
      {
        denom: "usei"
      }
    ]
  },
  apis: {
    rpc: [
      {
        address: "https://rpc.atlantic-2.seinetwork.io/",
        provider: "nodestake"
      }
    ],
    rest: [
      {
        address: "https://rest.atlantic-2.seinetwork.io/",
        provider: "Anonstake"
      }
    ]
  }
}

export const AssetInfo = {
  $schema: "../../assetlist.schema.json",
  chain_name: "seimainnet",
  assets: [
    {
      description:
        "The native staking and governance token of the Atlantic mainnet version of Sei.",
      denom_units: [
        {
          denom: "usei",
          exponent: 0
        },
        {
          denom: "sei",
          exponent: 6
        }
      ],
      base: "usei",
      name: "Sei",
      display: "sei",
      symbol: "SEI"
    }
  ]
}
