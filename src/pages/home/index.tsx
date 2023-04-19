import { Flex, Heading } from "@chakra-ui/react"
import { motion } from "framer-motion"

const Home = () => {
  return (
    <Flex
      as={motion.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    ></Flex>
  )
}

export default Home
