import {
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Tag,
  useBreakpoint,
  useColorModeValue,
  Text
} from "@chakra-ui/react"
import ConnectButton from "components/ConnectButton"
import ThemeToggle from "../../ThemeToggle"
import { HeaderMenu } from "./HeaderMenu"
import { RouterArea } from "./RouterArea"

const Header = () => {
  const breakpoint = useBreakpoint()

  const isMobile = Boolean(breakpoint === "base" || breakpoint === "sm")

  return (
    <Flex
      as="header"
      w="full"
      align="center"
      justifyContent="flex-end"
      gap={2}
      py={2}
      px={1}
      h="4rem"
      shadow="md"
      zIndex={5}
      bg={useColorModeValue("white", "gray.800")}
    >
      <HStack pos="relative" spacing={1}>
        <Image
          w={{ base: "2rem", lg: "3rem" }}
          src="/assets/logo_transparent.png"
        />
        {Boolean(breakpoint !== "md") && (
          <Heading
            fontSize={{ base: "17", md: "18", lg: "20" }}
            as="h1"
            fontFamily="body"
          >
            Hopers
          </Heading>
        )}
      </HStack>
      {!isMobile && <Spacer />}
      {!isMobile && <RouterArea />}
      <Spacer />
      <HStack spacing={"6px"}>
        <ConnectButton />
        {isMobile && <RouterArea />}
        {!isMobile && <ThemeToggle />}
        {!isMobile && <HeaderMenu />}
      </HStack>
    </Flex>
  )
}

export default Header
