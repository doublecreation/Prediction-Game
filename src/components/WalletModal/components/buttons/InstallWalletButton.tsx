import { Button, Icon, useColorMode } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { InstallWalletButtonType } from "../types"

export const InstallWalletButtonBaseStyle = (theme: string) => ({
  display: "flex",
  alignItems: "center",
  w: "full",
  h: "auto",
  minH: 12,
  fontSize: "lg",
  shadow: "md",
  bgColor: `connect-wallet-button-background-color-${theme}`,
  color: "gray.800",
  rounded: "1em",
  _dark: { bg: "#00b477", color: "white" },
  _hover: {
    filter: "brightness(110%)"
  },
  _loading: {
    bg: `connect-wallet-button-background-color-${theme}`,
    color: `connect-wallet-button-text-color-${theme}`,
    cursor: "progress",
    _hover: {
      bg: `connect-wallet-button-background-color-${theme}`,
      color: `connect-wallet-button-text-color-${theme}`,
      boxShadow: "none"
    },
    _active: {
      bg: `connect-wallet-button-background-color-${theme}`,
      color: `connect-wallet-button-text-color-${theme}`,
      boxShadow: "none"
    },
    _focus: {
      bg: `connect-wallet-button-background-color-${theme}`,
      color: `connect-wallet-button-text-color-${theme}`,
      boxShadow: "none"
    }
  },
  _disabled: {
    opacity: 0.8,
    bg: `connect-wallet-button-disabled-background-color-${theme}`,
    color: `connect-wallet-button-disabled-text-color-${theme}`,
    cursor: "not-allowed",
    _hover: {
      bg: `connect-wallet-button-disabled-background-color-${theme}`,
      color: `connect-wallet-button-disabled-text-color-${theme}`,
      boxShadow: "none"
    },
    _active: {
      bg: `connect-wallet-button-disabled-background-color-${theme}`,
      color: `connect-wallet-button-disabled-text-color-${theme}`,
      boxShadow: "none"
    },
    _focus: {
      bg: `connect-wallet-button-disabled-background-color-${theme}`,
      color: `connect-wallet-button-disabled-text-color-${theme}`,
      boxShadow: "none"
    }
  }
})

export const InstallWalletButton = ({
  icon,
  buttonText = "Install Wallet",
  disabled = false,
  className,
  styleProps,
  onClick
}: InstallWalletButtonType) => {
  const { colorMode } = useColorMode()

  return (
    <Button
      className={className}
      variant="unstyled"
      sx={InstallWalletButtonBaseStyle(colorMode)}
      as={motion.button}
      maxW="16rem"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      leftIcon={icon ? <Icon as={icon} /> : undefined}
      isDisabled={disabled}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  )
}
