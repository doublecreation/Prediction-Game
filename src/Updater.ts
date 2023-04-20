import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRecoilState } from "recoil"
import { btcPriceState } from "state/btcPriceState"

export default function Updater(): null {
  const [, setBtcPrice] = useRecoilState(btcPriceState)
  const { data } = useQuery({
    queryKey: ["btcPrice"],
    queryFn: () =>
      axios
        .get("https://api.coingecko.com/api/v3/coins/bitcoin")
        .then((res) => res.data),
    refetchInterval: 1000 * 10
  })
  useEffect(() => {
    if (data?.market_data) {
      const priceNumber = data.market_data.current_price?.usd || 0
      const price = priceNumber.toLocaleString("en-US", {
        maximumFractionDigits: 3
      })
      const priceChangeNumber =
        Math.round(
          (data.market_data.price_change_percentage_1h_in_currency?.usd || 0) *
            1000
        ) / 1000
      const priceChange =
        priceChangeNumber === 0
          ? ""
          : priceChangeNumber > 0
          ? `+${priceChangeNumber}%`
          : `${priceChangeNumber}%`
      const state = priceChangeNumber > 0 ? 1 : priceChangeNumber < 0 ? -1 : 0
      setBtcPrice({
        price,
        priceChange,
        state
      })
    }
  }, [data])
  return null
}
