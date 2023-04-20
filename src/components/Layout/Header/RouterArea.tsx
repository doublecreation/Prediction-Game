import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  Skeleton,
  useBreakpoint,
  useColorModeValue,
  VStack
} from "@chakra-ui/react"
import { IDOIcon } from "components/Assets/IDOIcon"
import { SwapIcon } from "components/Assets/SwapIcon"
import { WinIcon } from "components/Assets/WinIcon"
import { motion } from "framer-motion"
import { useCallback, useMemo, useRef, useState } from "react"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"
import { activeRouteState } from "state/UIState"
import NavigationButton, { NavigationButtonProps } from "./NavigationButton"
import { useChain } from "@cosmos-kit/react"
import { EarnIcon } from "components/Assets/EarnIcon"
import { AssetsIcon } from "components/Assets/AssetsIcon"

export const RouterArea = () => {
  const location = useLocation()
  const [, setActiveRoute] = useRecoilState(activeRouteState)

  const { isWalletConnected } = useChain("juno")

  // @ts-ignore
  const data: NavigationButtonProps[] = useMemo(() => {
    return [
      {
        icon: <Icon zIndex={1} as={SwapIcon} h="full" w="full" fill="white" />,
        label: "Trade",
        navId: 0,
        url: "/",
        subLinks: {
          Swap: "/",
          "Options Trading": "/play"
        }
      },
      {
        icon: <Icon zIndex={1} as={IDOIcon} h="full" w="full" stroke="white" />,
        label: "IDO",
        navId: 1,
        url: "/"
      },
      {
        icon: <Icon zIndex={1} as={EarnIcon} h="full" w="full" fill="white" />,
        label: "Earn",
        navId: 2,
        url: "/",
        isDisabled: isWalletConnected ? false : true
      },
      {
        icon: <Icon zIndex={1} as={WinIcon} h="full" w="full" fill="white" />,
        label: "Play",
        navId: 3,
        url: "/play",
        subLinks: {
          Prediction: "/play"
        }
      },
      {
        icon: (
          <Icon zIndex={1} as={AssetsIcon} h="full" w="full" fill="white" />
        ),
        isDisabled: true,
        label: "Assets",
        navId: 4,
        url: "/"
      }
    ]
  }, [isWalletConnected])

  const initialIndex = useCallback(() => {
    let initialIndexId = 0
    switch (location.pathname.split("/")[1]) {
      case "swap":
        initialIndexId = 0
        setActiveRoute(data[0].subLinks)
        break
      case "earn":
        initialIndexId = 1
        setActiveRoute(data[1].subLinks)
        break
      case "pool":
        initialIndexId = 1
        setActiveRoute(data[1].subLinks)
        break
      case "portfolio":
        initialIndexId = 2
        setActiveRoute(data[2].subLinks)
        break
      case "play":
        initialIndexId = 3
        setActiveRoute(data[3].subLinks)
        break
      case "collections":
        initialIndexId = 4
        setActiveRoute(data[4].subLinks)
        break
      case "ido":
        initialIndexId = 5
        setActiveRoute(data[5].subLinks)
        break
      default:
        initialIndexId = -1
        setActiveRoute(undefined)
        break
    }

    return initialIndexId
  }, [])

  const menuColor = useColorModeValue(
    "linear(to-br, white, offwhite.3)",
    "linear(to-br, blue.800, blue.900)"
  )

  const [activeIndex, setActiveIndex] = useState<number>(initialIndex)

  const breakpoint = useBreakpoint()
  const isMobile = Boolean(breakpoint === "base" || breakpoint === "sm")

  const handleClick = (
    navid: number,
    subLinks: Record<string, string> | undefined
  ) => {
    setActiveIndex(navid)
    setActiveRoute(subLinks)
  }

  return (
    <Flex justify="start" align="start" pos="relative">
      {isMobile ? (
        <Menu>
          {({ isOpen, onClose }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={IconButton}
                rounded="1.25em"
                minWidth="2rem"
                h={{ base: "3rem", md: "4rem" }}
                w={{ base: "3rem", md: "4rem" }}
                icon={<HiOutlineMenuAlt3 size="25" />}
              />
              <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay bg="transparent" backdropFilter="blur(20px)" />
                <DrawerContent
                  roundedStart="2em"
                  overflow="hidden"
                  bgGradient={menuColor}
                >
                  <DrawerBody px={3} bg="offwhite.3" _dark={{ bg: "gray.700" }}>
                    <Flex gap={1} direction="column">
                      {data.map((props: NavigationButtonProps) => {
                        return (
                          <motion.div
                            key={props.navId}
                            layout
                            onClick={() => {
                              handleClick(props.navId, props.subLinks)
                            }}
                          >
                            <NavigationButton
                              activeIndex={activeIndex}
                              {...props}
                              icon={props.icon}
                            />
                          </motion.div>
                        )
                      })}
                    </Flex>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Menu>
      ) : (
        <HStack spacing={{ base: 1, xl: 3 }} align="center">
          {data.map((props: NavigationButtonProps) => {
            return (
              <NavigationButton
                key={props.navId}
                isDisabled={props.isDisabled}
                onClick={() => {
                  handleClick(props.navId, props.subLinks)
                }}
                activeIndex={activeIndex}
                {...props}
              />
            )
          })}
        </HStack>
      )}
    </Flex>
  )
}
