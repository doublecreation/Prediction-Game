import {
  Modal,
  ModalContent,
  ModalOverlay,
  useColorMode
} from "@chakra-ui/react"
import { useAnimationControls } from "framer-motion"
import { useEffect } from "react"
import { useResizeDetector } from "react-resize-detector"
import { AnimateBox, ModalContentVariants, ModalVariants } from "../Motion"
import { SimpleConnectModalType } from "../types"

export const SimpleConnectModalBaseStyle = (theme: string) => ({
  position: "relative",
  alignSelf: "center",
  borderRadius: "1.25em",
  bg: "white",
  _dark: { bg: "gray.700", color: "white" },
  color: "gray.800",
  _focus: { outline: "none" }
})

export const SimpleConnectModal = ({
  initialRef,
  modalView,
  className,
  styleProps,
  modalOpen,
  modalOnClose
}: SimpleConnectModalType) => {
  const controls = useAnimationControls()
  const contentControls = useAnimationControls()
  const { width, height, ref: nodeRef } = useResizeDetector()
  const { colorMode } = useColorMode()

  useEffect(() => {
    if (modalOpen) {
      controls.set("initial")
      contentControls.set("initial")
      controls.start("animate")
      contentControls.start("animate")
    }
  }, [modalView, modalOpen, controls, contentControls])

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={modalOpen}
      isCentered={true}
      onClose={modalOnClose}
      size="2xl"
    >
      <ModalOverlay backdropFilter="blur(70px)" />
      <ModalContent ref={nodeRef} sx={SimpleConnectModalBaseStyle(colorMode)}>
        <AnimateBox animate={contentControls} variants={ModalContentVariants}>
          {modalView}
        </AnimateBox>
      </ModalContent>
    </Modal>
  )
}
