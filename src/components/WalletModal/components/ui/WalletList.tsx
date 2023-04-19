import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react"
import { RefObject, useRef } from "react"
import { ButtonShape, DisplayWalletListType } from "../types"

export const SimpleDisplayWalletListBaseStyle = (
  theme: string,
  dataLength: number
) => ({
  position: "relative",
  justifyContent: dataLength > 2 ? "start" : "center",
  gridTemplateColumns: {
    base: "1fr",
    md: dataLength > 2 ? "1fr 1fr 1fr" : "var(--chakra-space-36)"
  },
  gridTemplateRows: { base: "min-content", md: "auto" },
  columnGap: 4,
  rowGap: 2,
  minH: { base: 24, md: 36 },
  w: "full",
  maxH: "20rem",
  overflowY: "scroll",
  py: 3,
  px: 8,
  maskImage: `linear-gradient(
        to bottom,
        transparent,
        black 1rem,
        black calc(100% - 1rem),
        transparent
    ), linear-gradient(black, black)`,
  maskSize: "calc(100% - 12px) 100%, 12px 100%",
  maskPosition: "0 0, 100% 0",
  maskRepeat: "no-repeat, no-repeat",
  scrollbarWidth: "none", // for firefox
  "&::-webkit-scrollbar": {
    background: useColorModeValue(
      "rgba(160,160,160,0.1)",
      "rgba(255,255,255,0.1)"
    ),
    borderRadius: "4px",
    width: "12px"
  },

  "&::-webkit-scrollbar-thumb": {
    background: useColorModeValue("rgba(0,0,0,0.1)", "rgba(255,255,255,0.1)"),
    borderRadius: "4px"
  }
})

export const SimpleDisplayWalletListItemBaseStyle = (
  theme: string,
  buttonShape: ButtonShape,
  index: number
) => {
  return {
    gridColumn: { base: "span 2", md: index > 2 ? "span 3" : "auto" },
    display: "flex",
    flexDirection: {
      base: "row",
      md: buttonShape === ButtonShape.Square ? "column" : "row"
    },
    justifyContent: {
      base: "start",
      md: buttonShape === ButtonShape.Square ? "center" : "start"
    },
    alignItems: "center",
    position: "relative",
    w: "full",
    h: "full",
    p: 2,
    shadow: "md",
    py: { md: buttonShape === ButtonShape.Square ? 7 : 2 },
    mt: { md: buttonShape === ButtonShape.Square ? 0 : 1 },
    borderRadius: "1em",
    whiteSpace: "break-spaces",
    fontSize: buttonShape === ButtonShape.Square ? "lg" : "sm",
    fontWeight: "600",
    lineHeight: "none",
    textAlign: {
      base: "start",
      md: buttonShape === ButtonShape.Square ? "center" : "start"
    },
    transition: "all .1s ease-in-out",
    color: "gray.800",
    bg: "rgba(2, 226, 150, 1)",
    _dark: { bg: "#00B477", color: "white" },
    _hover: {
      filter: "brightness(110%)"
    }
  }
}

export const SimpleDisplayWalletList = ({
  initialFocus,
  walletsData,
  className
}: DisplayWalletListType) => {
  const { colorMode } = useColorMode()
  const listRef = useRef<HTMLDivElement>(null)

  return (
    <Box className={className} position="relative" pb={4}>
      <Grid
        ref={listRef}
        sx={SimpleDisplayWalletListBaseStyle(colorMode, walletsData.length)}
        gap={0}
      >
        {walletsData.map(
          ({ name, prettyName, logo, subLogo, buttonShape, onClick }, i) => {
            if (i <= 2) {
              buttonShape = ButtonShape.Square
            }
            return (
              <GridItem
                id={name}
                key={name}
                as="button"
                ref={
                  i === 0
                    ? (initialFocus as unknown as RefObject<
                        HTMLButtonElement & HTMLDivElement
                      >)
                    : null
                }
                sx={SimpleDisplayWalletListItemBaseStyle(
                  colorMode,
                  buttonShape!,
                  i
                )}
                onClick={onClick}
              >
                <Box
                  w={buttonShape === ButtonShape.Square ? "4rem" : "2rem"}
                  pb={buttonShape === ButtonShape.Square ? "0.75rem" : 0}
                >
                  {typeof logo === "string" ? (
                    <Image src={logo} alt={prettyName} />
                  ) : (
                    <Icon as={logo} />
                  )}
                  {subLogo && buttonShape === ButtonShape.Square ? (
                    <Flex>
                      {typeof subLogo === "string" ? (
                        <Image src={subLogo} alt="wallet-icon" />
                      ) : (
                        <Icon as={subLogo} w="full" h="full" />
                      )}
                    </Flex>
                  ) : undefined}
                </Box>
                <Text px={buttonShape === ButtonShape.Square ? 0 : "0.5rem"}>
                  {prettyName}
                </Text>
                <Spacer />
                {subLogo && buttonShape !== ButtonShape.Square ? (
                  <Center w="1.8rem" bg="white" rounded="0.6em" h="1.8rem">
                    {typeof subLogo === "string" ? (
                      <Image w="1.25rem" src={subLogo} alt="wallet-connect" />
                    ) : (
                      <Icon w="1.25rem" as={subLogo} />
                    )}
                  </Center>
                ) : undefined}
              </GridItem>
            )
          }
        )}
      </Grid>
    </Box>
  )
}
