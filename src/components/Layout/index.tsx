import { Flex, useColorMode, useColorModeValue } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { ToastContainer } from "react-toastify"

import Header from "./Header"
import Meta from "../Meta"
import { SubHeader } from "./Header/SubHeader"
import { Footer } from "./Footer"
import { AnimatePresence } from "framer-motion"
import { BackgroundImage } from "components/Assets/BackgroundImage"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { colorMode } = useColorMode()

  return (
    <Flex
      minH="100vh"
      w="full"
      transition="0.5s ease-out"
      overflow="hidden"

      // bgGradient={layoutBgColor}
    >
      <Meta />
      <Flex
        direction="column"
        w="full"
        align="start"
        justify="start"
        pos="relative"
      >
        <Header />

        <SubHeader />

        <Flex
          w="full"
          justify="center"
          as="main"
          minH="calc(100vh - 4rem)"
          pos="relative"
        >
          <AnimatePresence mode="wait">{children}</AnimatePresence>
          <BackgroundImage w="full" h="full" pos="absolute" zIndex={-1} />
        </Flex>
        {/* <Footer /> */}
      </Flex>

      <ToastContainer
        key={"toastContainer"}
        closeButton={false}
        autoClose={3000}
        draggableDirection={"x"}
        newestOnTop={false}
        pauseOnHover
        toastStyle={{
          borderRadius: "1em",
          background: useColorModeValue(
            "white",
            "var(--chakra-colors-gray-800)"
          )
        }}
        progressStyle={{
          background: "rgba(2, 226, 150, 1)",
          boxShadow: "var(--chakra-shadows-md)",
          height: "0.6rem"
        }}
        bodyStyle={{
          fontFamily: "var(--chakra-fonts-heading)",
          fontSize: "1.25em",
          color: useColorModeValue("var(--chakra-colors-gray-700)", "white")
        }}
        position="bottom-right"
        closeOnClick
        draggablePercent={20}
      />
    </Flex>
  )
}

export default Layout
