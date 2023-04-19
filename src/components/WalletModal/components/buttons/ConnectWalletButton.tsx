import { Button, Center, Icon, useColorMode } from "@chakra-ui/react"
import { motion } from "framer-motion"
import React, { useContext } from "react"
import { RiWallet3Fill } from "react-icons/ri"
import { ConnectWalletButtonType } from "../types"

export const ConnectWalletButtonBaseStyle = (theme: string) => ({
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

export const ConnectWalletButton = ({
  buttonText = "Connect Wallet",
  loading,
  disabled,
  leftIcon = <Icon as={RiWallet3Fill} />,
  rightIcon,
  className,
  onClick
}: ConnectWalletButtonType) => {
  const { colorMode } = useColorMode()

  return (
    <Button
      className={className}
      isLoading={loading}
      maxW="13rem"
      as={motion.button}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      isDisabled={disabled}
      iconSpacing={!buttonText ? 0 : 1.5}
      leftIcon={leftIcon ? <Center>{leftIcon}</Center> : undefined}
      rightIcon={rightIcon ? <Center>{rightIcon}</Center> : undefined}
      onClick={onClick}
      sx={ConnectWalletButtonBaseStyle(colorMode)}
    >
      {buttonText}
    </Button>
  )
}
