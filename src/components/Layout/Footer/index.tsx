import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Link,
  Stack,
  VStack,
  Image,
  Text,
  Heading,
  chakra,
  Button,
  IconButton
} from "@chakra-ui/react"
import ThemeToggle from "components/ThemeToggle"
import {
  FaArrowRight,
  FaDiscord,
  FaTelegramPlane,
  FaTwitter
} from "react-icons/fa"
import { SiMedium } from "react-icons/si"

export const Footer = () => {
  return (
    <Flex
      w="full"
      flexDir="column"
      justify="center"
      align="center"
      pos="relative"
      bg="white"
      _dark={{
        bg: "gray.800"
      }}
    >
      <Flex
        pos={{ base: "relative", md: "absolute" }}
        right={{ base: "0rem", md: "5rem", lg: "5rem" }}
        top="1rem"
        justify="center"
      >
        <Image
          src="/assets/logo_transparent.png"
          alt="Hopers Logo"
          width="5rem"
          height="5rem"
        />
      </Flex>
      <Stack
        direction={{
          base: "column",
          md: "row"
        }}
        w={{ base: "100%", md: "75%" }}
        maxW={{ base: "none", lg: "75%" }}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "space-between" }}
        pt={{ base: 3, md: 10 }}
        px={10}
      >
        <Stack
          direction={{
            base: "column",
            md: "row"
          }}
          alignItems="start"
          flex={1}
          py={4}
          justify="center"
          gap={{ base: "1rem", md: "3rem" }}
          fontSize={{
            base: "14px",
            md: "1em"
          }}
          color="gray.800"
          _dark={{
            color: "white"
          }}
          textAlign={{
            base: "center",
            md: "left"
          }}
        >
          <Flex justify="center" direction="column" w="full">
            <Heading
              fontSize="18"
              letterSpacing={1.2}
              fontWeight="600"
              color="brand.1"
              textShadow="0px 1px 1px #000"
              pb={2}
            >
              ABOUT
            </Heading>
            <Link
              target="_blank"
              href="https://hopers-io.gitbook.io/documents/"
            >
              Contact Us
            </Link>
            <Link
              target="_blank"
              href="https://hopers-io.gitbook.io/documents/"
            >
              Brand
            </Link>
            <Link target="_blank" href="https://hopegalaxy.medium.com/">
              Blog
            </Link>
            <Link target="_blank" href="https://t.me/hoperscommunity">
              Community
            </Link>
          </Flex>
          <Flex justify="center" direction="column" w="full">
            <Heading
              fontSize="18"
              letterSpacing={1.2}
              fontWeight="600"
              color="brand.1"
              textShadow="0px 1px 1px #000"
              pb={2}
            >
              HELP
            </Heading>
            <Link target="_blank" href="https://t.me/hoperscommunity">
              Customer Support
            </Link>
            <Link target="_blank" href="https://t.me/hoperscommunity">
              Troubleshooting
            </Link>
            <Link
              target="_blank"
              href="https://hopers-io.gitbook.io/documents/"
            >
              Guides
            </Link>
          </Flex>
          <Flex justify="center" direction="column" w="full">
            <Heading
              fontSize="18"
              letterSpacing={1.2}
              fontWeight="600"
              color="brand.1"
              textShadow="0px 1px 1px #000"
              pb={2}
            >
              DEVEL
              <chakra.span fontSize="15" px={"1px"}>
                (H)
              </chakra.span>
              OPERS
            </Heading>
            <Link target="_blank" href="https://github.com/HopersNFT/">
              GitHub
            </Link>
            <Link
              target="_blank"
              href="https://hopers-io.gitbook.io/documents/"
            >
              Documentation
            </Link>
          </Flex>
        </Stack>
      </Stack>
      <HStack
        px={14}
        justify={{ base: "center", md: "center" }}
        alignSelf="center"
        w={{ base: "100%", md: "45%" }}
        maxW={{ md: "none", lg: "45%" }}
        py={3}
        spacing={1}
      >
        <Link target="_blank" href="https://twitter.com/hopers_io">
          <IconButton
            aria-label="Hopers Twitter Account"
            color="gray.800"
            rounded="1em"
            _hover={{ bg: "offwhite.2" }}
            _dark={{
              color: "white",
              bg: "gray.800",
              _hover: {
                bg: "gray.700"
              }
            }}
            icon={<FaTwitter size="20" />}
          />
        </Link>
        <Link target="_blank" href="https://discord.com/invite/BfKPacc5jF">
          <IconButton
            aria-label="Join the Hopers Discord"
            color="gray.800"
            rounded="1em"
            _hover={{ bg: "offwhite.2" }}
            _dark={{
              color: "white",
              bg: "gray.800",
              _hover: {
                bg: "gray.700"
              }
            }}
            icon={<FaDiscord size="20" />}
          />
        </Link>
        <Link target="_blank" href="https://hopegalaxy.medium.com/">
          <IconButton
            aria-label="Hopers Blog on Medium"
            color="gray.800"
            rounded="1em"
            _hover={{ bg: "offwhite.2" }}
            _dark={{
              color: "white",
              bg: "gray.800",
              _hover: {
                bg: "gray.700"
              }
            }}
            icon={<SiMedium />}
          />
        </Link>
        <Link target="_blank" href="https://t.me/hoperscommunity">
          <IconButton
            aria-label="Hopers Twitter Account"
            color="gray.800"
            rounded="1em"
            _hover={{ bg: "offwhite.2" }}
            _dark={{
              color: "white",
              bg: "gray.800",
              _hover: {
                bg: "gray.700"
              }
            }}
            icon={<FaTelegramPlane />}
          />
        </Link>
      </HStack>
      <Divider
        w={{ base: "80%", md: "75%" }}
        maxW={{ base: "none", md: "75%" }}
        borderColor="gray.800"
        _dark={{
          borderColor: "#FFF"
        }}
        border="1px solid"
      />
      <HStack
        py={3}
        w={{ base: "80%", md: "75%" }}
        maxW={{ base: "none", md: "75%" }}
        justify="space-between"
      >
        <ThemeToggle />
        <HStack spacing={4}>
          <HStack spacing={1}>
            <Image src="/assets/logo_transparent.png" w="2rem" h="2rem" />
            <Text fontWeight="600">$23.10</Text>
          </HStack>
          <Button
            color="gray.800"
            rounded="full"
            bg="brand.1"
            py={0}
            h="2rem"
            rightIcon={<FaArrowRight />}
          >
            Buy Hopers
          </Button>
        </HStack>
      </HStack>
    </Flex>
  )
}
