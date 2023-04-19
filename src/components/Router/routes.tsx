import type { PathRouteProps } from "react-router-dom"

import Home from "pages/home"
import Swap from "pages/swap"
import Assets from "pages/portfolio"
import NFT from "pages/nft"
import IDO from "pages/ido"
import Play from "pages/play"
import Earn from "pages/earn"
import Pool from "pages/pool"
import Portfolio from "pages/portfolio"

export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/swap",
    element: <Swap />
  },
  {
    path: "/earn",
    element: <Earn />
  },
  {
    path: "/play",
    element: <Play />
  },
  {
    path: "/portfolio",
    element: <Portfolio />
  },
  {
    path: "/collections",
    element: <NFT />
  },
  {
    path: "/ido",
    element: <IDO />
  },
  {
    path: "/pool/:slug",
    element: <Pool />
  }
]

export const privateRoutes: Array<PathRouteProps> = []
