import { Box, Heading } from "@chakra-ui/react"
import { motion } from "framer-motion"

const IDO = () => {
  return (
    <Box
      as={motion.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Heading>IDO</Heading>
    </Box>
  )
}

export default IDO
