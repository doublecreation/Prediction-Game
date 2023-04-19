import { Text, Heading, Center, HStack, IconButton } from "@chakra-ui/react"
import { BiArrowFromLeft } from "react-icons/bi"
import { BsClockFill } from "react-icons/bs"
import { FaQuestionCircle } from "react-icons/fa"

export const GameTimer = () => {
  return (
    <HStack
      pos={{ base: "relative", md: "absolute" }}
      right={{ base: "0rem", md: "6rem" }}
    >
      <Center
        gap={3}
        px={4}
        bg="white"
        _dark={{ bg: "gray.700" }}
        rounded="1.25em"
        shadow="md"
        h="3rem"
      >
        <Heading fontSize="24">00:00</Heading>
        <Text>5m</Text>
        <BsClockFill />
      </Center>
      <IconButton
        rounded="1em"
        bg="white"
        h="3rem"
        w="3rem"
        _dark={{ bg: "gray.700", _hover: { bg: "gray.600" } }}
        shadow="md"
        icon={<FaQuestionCircle />}
        aria-label="Open Documentation / Help"
      />
    </HStack>
  )
}
