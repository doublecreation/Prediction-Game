/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Flex, Icon } from "@chakra-ui/react"
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion"
import { useEffect } from "react"
import { FaCheck, FaTimes } from "react-icons/fa"
import { useRecoilState } from "recoil"
import { marketAdvancedModeState } from "state/UIState"

export const CustomSwitch = ({
  defaultValue,
  onToggle
}: {
  defaultValue: boolean | undefined
  onToggle: () => void
}) => {
  const [advancedMode, setAdvancedMode] = useRecoilState(
    marketAdvancedModeState
  )

  const colorModeBgColor = useMotionValue("#02e296")

  useEffect(() => {
    if (advancedMode) {
      animate(colorModeBgColor, "#02e296", {
        duration: 0.5,
        type: "tween"
      })
    } else {
      animate(colorModeBgColor, "#2D3748", {
        duration: 0.5,
        type: "tween"
      })
    }
  }, [advancedMode])

  return (
    <Flex
      as={motion.div}
      align="center"
      px={1}
      cursor="pointer"
      transition="all .2s"
      overflow="hidden"
      w="3rem"
      h="1.7rem"
      rounded="full"
      shadow="md"
      onClick={() => {
        setAdvancedMode(!advancedMode)
        onToggle()
      }}
      style={{
        // @ts-expect-error Chakra Types WIP
        background: colorModeBgColor,
        justifyContent: advancedMode ? "flex-end" : "flex-start"
      }}
    >
      <Flex
        align="center"
        justify="center"
        overflow="hidden"
        as={motion.div}
        layout
        bg="white"
        boxSize="1.3rem"
        rounded="50%"
      >
        <AnimatePresence mode="wait" initial={false}>
          {advancedMode ? (
            <Flex
              align="center"
              justify="center"
              as={motion.div}
              key="lightModeButton"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
            >
              <Icon color="#02e296" as={FaCheck} />
            </Flex>
          ) : (
            <Flex
              align="center"
              justify="center"
              as={motion.div}
              key="darkModeButton"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              style={{ width: "1rem" }}
            >
              <Icon as={FaTimes} color="#2D3748" />
            </Flex>
          )}
        </AnimatePresence>
      </Flex>
    </Flex>
  )
}
