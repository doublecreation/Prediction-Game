import {
  type BoxProps,
  type ButtonProps,
  Box,
  Button,
  Text,
  Tag,
  useColorModeValue,
  Skeleton,
  HStack,
  SkeletonCircle,
  Flex,
  Icon,
  keyframes,
  Portal,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Divider,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  useDisclosure
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useEffect, useState, type ReactElement } from "react"
import { Link, useLocation } from "react-router-dom"

export type NavigationButtonProps = ButtonProps & {
  activeIndex?: number
  icon: ReactElement
  isDisabled?: boolean
  label: string
  navId: number
  subLinks?: Record<string, string>
  onClick?: () => void
  url: string
}

const MotionBox = motion<BoxProps>(Box)

// eslint-disable-next-line complexity
const NavigationButton = ({
  label,
  url,
  activeIndex,
  navId,
  isDisabled,
  icon,
  onClick,
  subLinks,
  ...props
}: NavigationButtonProps) => {
  const [isActive, setisActive] = useState(false)

  const { pathname } = useLocation()

  //   const showUI = useRecoilValue(showUIState)
  //   const [isCollapsed, setIsCollapsed] = useRecoilState(isNavCollapsedState)

  useEffect(() => {
    if (navId === activeIndex) {
      setisActive(true)
    } else {
      setisActive(false)
    }
  }, [activeIndex])

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Menu isOpen={isOpen} offset={[0, 5]}>
      <Link
        key={props.key}
        to={isDisabled ? "" : url}
        style={{
          pointerEvents: isDisabled ? "none" : "all",
          position: "relative"
        }}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <MenuButton
          _disabled={{ opacity: 0.35 }}
          boxShadow="none"
          disabled={isDisabled}
          _hover={{
            background: url.includes(pathname)
              ? "transparent"
              : "rgba(255,255,255,0.1)",
            cursor: url === pathname ? "default" : "pointer"
          }}
          color="gray.800"
          _dark={{ color: isActive ? "gray.800" : "white" }}
          pos="relative"
          px={{ base: 1, md: 2, lg: 3 }}
          minW={{ base: "none", lg: "4rem" }}
          rounded="1em"
          onClick={onClick}
          justifyContent="start"
          alignItems="center"
        >
          <HStack spacing={2}>
            <SkeletonCircle
              w={{ base: "1rem", md: "1.5rem" }}
              isLoaded={true}
              zIndex={2}
            >
              {icon}
            </SkeletonCircle>
            <Skeleton isLoaded={true} rounded="1em" zIndex={2}>
              <Text
                zIndex={2}
                transition="0.35s all"
                fontSize={"1em"}
                fontWeight="400"
                fontFamily="heading"
                textAlign="start"
                color="white"
              >
                {label}
              </Text>
            </Skeleton>
          </HStack>

          {isActive && (
            <MotionBox
              bgGradient="linear(45deg, brand.1, brand.2)"
              inset={0}
              layoutId="navButton"
              pos="absolute"
              rounded="1.1rem"
              zIndex={0}
              // @ts-expect-error {"MotionValue(string) != string"
              transition={{
                bounce: 0.6,
                damping: 20,
                mass: 1,
                type: "spring"
              }}
            />
          )}
        </MenuButton>
      </Link>
    </Menu>
  )
}

export default NavigationButton
