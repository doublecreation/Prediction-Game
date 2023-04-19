import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useColorMode,
  VStack
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { BsFillCheckCircleFill } from "react-icons/bs"
import { ConnectWalletButtonBaseStyle } from "../buttons/ConnectWalletButton"
import { AnimateBox, LoadingVariants } from "../Motion"
import { LogoStatus, ConnectModalContentType } from "../types"

function handleStatusColor(theme: string, status: LogoStatus) {
  switch (status) {
    case LogoStatus.Loading:
      return {
        border: "rgba(2, 226, 150, 1)",
        text: theme === "dark" ? "white" : "gray.800"
      }
    case LogoStatus.Warning:
      return {
        border: "yellow.400",
        text: theme === "dark" ? "white" : "gray.800"
      }
    case LogoStatus.Error:
      return {
        border: "red.500",
        text: theme === "dark" ? "white" : "gray.800"
      }
    default:
      return undefined
  }
}

export const SimpleDisplayModalContentBaseStyle = (
  theme: string,
  status: LogoStatus
) => {
  return {
    w: "full",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    px: 4,
    pt: 6,
    pb: 8,
    ">.modal-content-logo": {
      position: "relative",
      mx: "auto",
      w: 20,
      h: 20,
      minW: 20,
      minH: 20,
      maxW: 20,
      maxH: 20,
      mb: 4,
      ">.modal-content-logo-status": {
        position: "absolute",
        top: status === LogoStatus.Loading ? -1.5 : -2,
        right: status === LogoStatus.Loading ? -1.5 : -2,
        bottom: status === LogoStatus.Loading ? -1.5 : -2,
        left: status === LogoStatus.Loading ? -1.5 : -2,
        border: "2px solid",
        borderTopColor:
          status === LogoStatus.Loading
            ? "transparent"
            : handleStatusColor(theme, status)?.border,
        borderBottomColor:
          status === LogoStatus.Loading
            ? "transparent"
            : handleStatusColor(theme, status)?.border,
        borderLeftColor: handleStatusColor(theme, status)?.border,
        borderRightColor: handleStatusColor(theme, status)?.border,
        borderRadius: "full"
      },
      ">.modal-content-image": {
        p: status ? 3.5 : 0
      }
    },
    ">.modal-content-header": {
      fontWeight: "semibold",
      color: handleStatusColor(theme, status)?.text
    },
    ">.modal-content-description": {
      position: "relative",
      ">.modal-content-description-box": {
        fontSize: "sm",
        lineHeight: 1.3,
        opacity: 0.7,
        whiteSpace: "pre-line",
        px: 8,
        pt: 1,
        maxH: 28,
        overflowY: "scroll",
        // For Firefox
        scrollbarWidth: "none",
        // For Chrome and other browsers except Firefox
        "&::-webkit-scrollbar": {
          display: "none"
        }
      },
      ">.modal-content-description-animate-shadow": {
        position: "absolute",
        left: 0,
        bottom: 0,
        w: "full",
        bg: `simple-display-modal-content-shadow-background-color-${theme}`
      }
    },
    ">.modal-content-username": {
      alignItems: "center",
      fontSize: "lg",
      fontWeight: "semibold",
      ">.modal-content-username-image": {
        w: 4,
        h: 4,
        minW: 4,
        minH: 4,
        maxW: 4,
        maxH: 4
      }
    },
    ">.modal-content-address-button": {
      w: "full",
      pt: 2.5,
      px: 8
    },
    ">.modal-content-bottom-button": {
      w: "full",
      pt: 3.5,
      px: 5
    },
    ">.modal-content-bottom-link": {
      w: "full",
      pt: 2
    }
  }
}

export const ConfirmButtonBaseStyle = (theme: string) => ({
  display: "flex",
  alignItems: "center",
  w: "3rem",
  h: "3rem",
  fontSize: "lg",
  shadow: "md",
  bgColor: `connect-wallet-button-background-color-${theme}`,
  color: "gray.800",
  rounded: "1em",
  _dark: { bg: "#00b477", color: "white" },
  _hover: {
    filter: "brightness(110%)"
  }
})

export const SimpleDisplayModalContent = ({
  status,
  contentHeader,
  contentDesc,
  username,
  walletIcon,
  addressButton,
  bottomButton,
  bottomLink,
  className,
  logo
}: ConnectModalContentType) => {
  const { colorMode } = useColorMode()
  const { closeView } = useChain("juno")

  return (
    <Flex
      className={className}
      sx={SimpleDisplayModalContentBaseStyle(colorMode, status!)}
    >
      {logo ? (
        <Center className="modal-content-logo">
          {status === "loading" ? (
            <AnimateBox
              className="modal-content-logo-status"
              initial="hidden"
              animate="animate"
              variants={LoadingVariants}
            ></AnimateBox>
          ) : undefined}
          {status === "warning" || status === "error" ? (
            <Box className="modal-content-logo-status"></Box>
          ) : undefined}
          <Center className="modal-content-image">
            {typeof logo === "string" ? (
              <Image src={logo} w="full" h="full" alt="logo" />
            ) : (
              <Icon as={logo} w="full" h="full" />
            )}
          </Center>
        </Center>
      ) : undefined}
      {contentHeader ? (
        <Text className="modal-content-header">{contentHeader}</Text>
      ) : undefined}
      {contentDesc ? (
        <Box className="modal-content-description">
          <Box className="modal-content-description-box">
            <Text>{contentDesc}</Text>
          </Box>
        </Box>
      ) : undefined}
      <HStack>
        {username ? (
          <HStack
            bg="offwhite.2"
            _dark={{ bg: "gray.800" }}
            py={2}
            px={2}
            rounded="1em"
            gap={1}
            shadow="md"
          >
            <Center boxSize="1.5rem">
              <Image src={walletIcon} alt="wallet-icon" />
            </Center>
            <Text lineHeight="1" fontSize="lg" fontWeight="600">
              {username}
            </Text>
            {addressButton ? (
              <Box className="modal-content-address-button">
                {addressButton}
              </Box>
            ) : undefined}
          </HStack>
        ) : undefined}
      </HStack>

      {bottomButton ? (
        <HStack mt={4} spacing={4} w="full" justify="center">
          {bottomButton}
          <IconButton
            sx={ConfirmButtonBaseStyle(colorMode)}
            as={motion.button}
            aria-label="Confirm Wallet Selection"
            rounded="0.9em"
            icon={<Icon as={BsFillCheckCircleFill}></Icon>}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            display="flex"
            alignItems="center"
            onClick={() => closeView()}
          />
        </HStack>
      ) : undefined}
      {bottomLink ? (
        <Center className="modal-content-bottom-link">{bottomLink}</Center>
      ) : undefined}
    </Flex>
  )
}
