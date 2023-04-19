import { Box, Heading } from "@chakra-ui/react"
import { motion } from "framer-motion"

const NFT = () => {
  return (
    <Box
      as={motion.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Heading>NFTs</Heading>
    </Box>
  )
}

export default NFT
