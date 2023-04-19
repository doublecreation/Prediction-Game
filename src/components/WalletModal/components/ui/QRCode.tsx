import {
  Box,
  Center,
  Flex,
  IconButton,
  Skeleton,
  Stack,
  Text,
  useColorMode
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { IoReloadOutline } from "react-icons/io5"
import { AnimateBox } from "../Motion"
import { QRCodeDisplayErrorType, QRCodeStatus, QRCodeType } from "../types"
import { QRCode as QRCodeImage } from "react-qrcode-logo"

export const QRCodeSkeleton = () => (
  <Center
    flexDirection="column"
    w="full"
    maxW={72}
    minH={40}
    px={6}
    textAlign="center"
  >
    <Skeleton w={48} h={48} borderRadius="base" />
  </Center>
)

export const QRCodeDisplayError = ({ onRefresh }: QRCodeDisplayErrorType) => {
  return (
    <Center className="qr-code">
      <Box className="qr-code-blur" filter="auto" blur="md" />
      <Center className="qr-code-refresh-button-box">
        <IconButton
          className="qr-code-refresh-button"
          aria-label="refresh-button"
          icon={<IoReloadOutline />}
          size="lg"
          onClick={onRefresh}
        />
      </Center>
      <Flex
        maxW="sm"
        rounded="3xl"
        overflow="hidden"
        as={QRCodeImage}
        value={""}
        logoImage={"/assets/logo_transparent.png"}
        eyeRadius={[
          [25, 25, 0, 25], // top/left eye
          [25, 25, 25, 0], // top/right eye
          [25, 0, 25, 25] // bottom/left
        ]}
        quietZone={20}
        qrStyle="dots"
        logoWidth={100}
        size={350}
        bgColor={"#ffffff"}
        fgColor={"rgba(2, 226, 150, 1)"}
        ecLevel={"L"}
      />
    </Center>
  )
}

export const QRCodeBaseStyle = (theme: string, status: QRCodeStatus) => {
  return {
    w: "full",
    justifyContent: "center",
    alignItems: "center",
    spacing: 4,
    p: 6,
    pb: 10,
    ">.qr-code-description": {
      fontWeight: "medium",
      textAlign: "center",
      opacity: 0.75,
      px: 4,
      pb: 1.5
    },
    ">.qr-code": {
      position: "relative",
      w: "full",
      p: 5,
      ">.qr-code-refresh-button-box": {
        position: "absolute",
        w: "full",
        h: "full",
        zIndex: 3,
        ">.qr-code-refresh-button": {
          bg: `qr-code-qr-background-color-${theme}`,
          color: `qr-code-qr-text-color-${theme}`,
          borderRadius: "full",
          boxShadow: `qr-code-button-shadow-${theme}`
        }
      },
      ">.qr-code-blur": {
        position: "absolute",
        w: "full",
        h: "full",
        zIndex: 2,
        borderRadius: "lg",
        blur: "md",
        bg: `qr-code-qr-blur-background-color-${theme}`
      },
      ">.qr-code-svg": {
        opacity: 0.5
      }
    },
    ">.qr-code-error-title": {
      fontWeight: "medium",
      textAlign: "center",
      pt: 2,
      "&.qr-code-error": {
        color: `qr-code-qr-error-text-color-${theme}`
      },
      "&.qr-code-expired": {
        color: `qr-code-qr-expired-text-color-${theme}`
      }
    },
    ">.qr-code-error-desc-box": {
      position: "relative",
      ">.qr-code-error-desc": {
        maxH: 16,
        px: 1,
        overflowX: "hidden",
        overflowY: "auto",
        scrollbarWidth: "none", // For Firefox
        "&::-webkit-scrollbar": {
          // For Chrome and other browsers except Firefox
          display: "none"
        },
        fontSize: "sm",
        fontWeight: "base",
        textAlign: "center",
        lineHeight: "shorter",
        opacity: 0.75
      },
      ">.qr-code-error-desc-animate-shadow": {
        position: "absolute",
        left: 0,
        bottom: 0,
        w: "full",
        bg: `qr-code-shadow-background-color-${theme}`
      }
    }
  }
}

export const QRCode = ({
  status,
  link,
  description,
  qrCodeSize = 230,
  errorTitle,
  errorDesc,
  className,
  onRefresh
}: QRCodeType) => {
  const descRef = useRef<HTMLDivElement>(null)
  const { colorMode } = useColorMode()

  return (
    <Stack className={className} sx={QRCodeBaseStyle(colorMode, status)}>
      {description ? <Text>{description}</Text> : undefined}
      {status === QRCodeStatus.Pending ? <QRCodeSkeleton /> : undefined}
      {status === QRCodeStatus.Done ? (
        <Center rounded="3xl" overflow="hidden">
          <Flex
            maxW="sm"
            rounded="3xl"
            overflow="hidden"
            as={QRCodeImage}
            value={link}
            logoImage={"/assets/logo_transparent.png"}
            eyeRadius={[
              [25, 25, 0, 25], // top/left eye
              [25, 25, 25, 0], // top/right eye
              [25, 0, 25, 25] // bottom/left
            ]}
            quietZone={20}
            qrStyle="dots"
            logoWidth={100}
            size={350}
            bgColor={"#ffffff"}
            fgColor={"rgba(2, 226, 150, 1)"}
            ecLevel={"L"}
          />
        </Center>
      ) : undefined}
      {status === QRCodeStatus.Error || status === QRCodeStatus.Expired ? (
        <QRCodeDisplayError
          theme={colorMode}
          qrCodeSize={qrCodeSize}
          onRefresh={onRefresh!}
        />
      ) : undefined}
      {errorTitle ? <Text>{errorTitle}</Text> : undefined}
      {errorDesc ? (
        <Box className="qr-code-error-desc-box">
          <Box ref={descRef} className="qr-code-error-desc">
            <Text>{errorDesc}</Text>
          </Box>
          <AnimateBox
            className="qr-code-error-desc-animate-shadow"
            initial={false}
            animate={{
              height: 0,
              opacity: 0,
              transition: {
                type: "spring",
                duration: 0.2
              }
            }}
          ></AnimateBox>
        </Box>
      ) : undefined}
    </Stack>
  )
}
