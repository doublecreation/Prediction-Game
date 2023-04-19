import { IconButton, Stack, Text, useColorMode } from "@chakra-ui/react"
import React, { useContext } from "react"
import { FiChevronLeft, FiX } from "react-icons/fi"
import { SimpleModalHeadType } from "../types"

export const SimpleModalHeadBaseStyle = (
  theme: string,
  backButton: boolean
) => {
  return {
    w: "full",
    alignItems: "center",
    h: "fit-content",
    mb: 1,
    p: 4,
    pb: 1.5,
    ">.modal-header-text": {
      flex: 1,
      mr: backButton ? 0 : -10,
      fontSize: "lg",
      fontWeight: "semibold",
      textAlign: "center",
      color: `simple-modal-head-text-color-${theme}`
    },
    ">.icon-button": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "md",
      color: `simple-modal-head-button-icon-color-${theme}`,
      minW: 8,
      minH: 8,
      maxW: 8,
      maxH: 8,
      h: 8,
      w: 8,
      p: 0,
      _focus: { outline: "none" },
      ">svg": { w: 5, h: 5 }
    }
  }
}

export const SimpleModalHead = ({
  title,
  backButton,
  className,
  styleProps,
  onBack,
  onClose
}: SimpleModalHeadType) => {
  const { colorMode } = useColorMode()
  return (
    <Stack
      isInline={true}
      className={className}
      sx={
        styleProps
          ? styleProps
          : SimpleModalHeadBaseStyle(colorMode, backButton ? true : false)
      }
    >
      {backButton ? (
        <IconButton
          aria-label="back"
          className="icon-button"
          variant="ghost"
          icon={<FiChevronLeft />}
          onClick={onBack}
        />
      ) : undefined}
      <Text className="modal-header-text">{title}</Text>
      <IconButton
        aria-label="close"
        className="icon-button"
        variant="ghost"
        icon={<FiX />}
        onClick={onClose}
      />
    </Stack>
  )
}
