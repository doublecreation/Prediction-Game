import { Flex, Heading } from "@chakra-ui/react"
import { motion } from "framer-motion"

const Coming = () => {
  return (
    <Flex
      as={motion.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      alignItems="center"
    >
      <Heading as="h1" color="white">
        Coming Soon
      </Heading>
    </Flex>
  )
}

export default Coming
