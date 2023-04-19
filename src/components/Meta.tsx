import { Helmet } from "react-helmet"

const APP_NAME = "Hopers"

const Meta = () => {
  return (
    <Helmet>
      <title>Hopers | DeFi & NFTs</title>
      <meta
        name="description"
        content="Hopers.io, an avenue for the evolution of DeFi & NFTs on Juno"
      />

      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#FFFFFF" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  )
}

export default Meta
