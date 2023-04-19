const truncateAddress = (
  address: string | undefined,
  startLength = 8,
  endLength = 6
) => {
  return `${address?.slice(0, Math.max(0, startLength))}...${address?.slice(
    Math.max(0, address.length - endLength)
  )}`
}

export default truncateAddress
