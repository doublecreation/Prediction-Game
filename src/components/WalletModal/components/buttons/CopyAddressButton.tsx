import {
  Button,
  Icon,
  useClipboard,
  useColorMode,
  Text,
  Center
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { FiCopy } from "react-icons/fi"
import { CopyAddressType } from "../types"

function stringTruncateFromCenter(str: string, maxLength: number) {
  const midChar = "…" // character to insert into the center of the result
  let left: number
  let right: number

  if (str.length <= maxLength) return str

  // length of beginning part
  // eslint-disable-next-line prefer-const
  left = Math.ceil(maxLength / 2)

  // start index of ending part
  // eslint-disable-next-line prefer-const
  right = str.length - Math.floor(maxLength / 2) + 1

  return str.substring(0, left) + midChar + str.substring(right)
}

const defaultText = "address not identified yet"

export const CopyAddressButtonBaseStyle = (
  theme: string,
  hasCopied: boolean
) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "md",
  fontWeight: "normal",
  color: "brand.1",
  letterSpacing: "0.4px",
  lineHeight: 6,
  borderRadius: "full",

  w: "full",
  h: "1rem",
  minH: "fit-content",
  py: 0.5,
  px: 2,
  transition: "all .3s ease-in-out",
  _hover: {
    bg: `copy-address-button-hover-background-color-${theme}`,
    opacity: 0.9
  },
  _focus: {
    boxShadow: "none"
  },
  _loading: {
    py: 3.5,
    cursor: "progress"
  },
  _disabled: {
    opacity: 0.6,
    cursor: "not-allowed",
    _hover: {
      bg: "transparent",
      opacity: 0.6
    },
    _active: {
      boxShadow: "none"
    },
    _focus: {
      boxShadow: "none"
    }
  }
})

export const CopyAddressButton = ({
  address = defaultText,
  loading,
  disabled,
  className,
  styleProps,
  maxDisplayLength = 14
}: CopyAddressType) => {
  const { colorMode } = useColorMode()
  const [displayAddress, setDisplayAddress] = useState(address)
  const [displayIsDisabled, setDisplayIsDisabled] = useState(disabled)
  const { hasCopied, onCopy, setValue } = useClipboard("")

  useEffect(() => {
    // default
    if (address === defaultText) {
      setDisplayAddress(defaultText)
      setDisplayIsDisabled(true)
    }
    if (address !== defaultText) setValue(address)
    // has address and address length > max display length
    if (address !== defaultText && address.length >= maxDisplayLength) {
      setDisplayAddress(stringTruncateFromCenter(address, maxDisplayLength))
      if (disabled) setDisplayIsDisabled(true)
      if (!disabled) setDisplayIsDisabled(false)
    }
    // has address and address length < max display length
    if (address !== defaultText && address.length <= maxDisplayLength) {
      setDisplayAddress(address)
      if (disabled) setDisplayIsDisabled(true)
      if (!disabled) setDisplayIsDisabled(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, maxDisplayLength, disabled])

  return (
    <Button
      className={className}
      title={!loading && !disabled && address !== defaultText ? address : ""}
      variant="unstyled"
      isDisabled={displayIsDisabled}
      isLoading={loading}
      onClick={onCopy}
      gap={2}
      sx={CopyAddressButtonBaseStyle(colorMode, hasCopied)}
    >
      <Text>{!loading ? displayAddress : undefined}</Text>

      {!loading && address !== defaultText ? (
        <Center
          as={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          rounded="full"
          bg="offwhite.2"
          color={hasCopied ? "brand.1" : "gray.800"}
          _dark={{
            bg: "gray.600",
            color: hasCopied ? "brand.1" : "white"
          }}
          boxSize="1.5rem"
        >
          <Icon
            className="copy-address-button-icon"
            as={hasCopied ? FaCheckCircle : FiCopy}
          />
        </Center>
      ) : undefined}
    </Button>
  )
}
