import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { BsFillMoonStarsFill } from "react-icons/bs"
import { RiMoonFill, RiSunFill, RiSunLine } from "react-icons/ri"

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const bgColor = useColorModeValue("brand.1", "gray.700")

  return (
    <IconButton
      aria-label="theme toggle"
      rounded="full"
      h="2.5rem"
      w="2rem"
      shadow="md"
      p={0}
      bg={bgColor}
      _hover={{ filter: "brightness(110%)" }}
      _active={{ filter: "brightness(90%)" }}
      icon={
        colorMode === "light" ? (
          <BsFillMoonStarsFill size="14" />
        ) : (
          <RiSunFill size="14" />
        )
      }
      onClick={() => {
        toggleColorMode()
      }}
    />
  )
}

export default ThemeToggle
