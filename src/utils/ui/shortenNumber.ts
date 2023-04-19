// eslint-disable-next-line consistent-return
const shortenNumber = (n: number, digits: number): string => {
  if (n < 1e3) return n.toFixed(digits)
  if (n >= 1e3 && n < 1e6) return Number((n / 1e3).toFixed(digits)) + "K"
  if (n >= 1e6 && n < 1e9) return Number((n / 1e6).toFixed(digits)) + "M"
  if (n >= 1e9 && n < 1e12) return Number((n / 1e9).toFixed(digits)) + "B"
  if (n >= 1e12) return Number((n / 1e12).toFixed(1)) + "T"

  return n.toFixed(digits)
}

export default shortenNumber
