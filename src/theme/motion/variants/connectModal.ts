import { Box } from "@chakra-ui/react"
import { motion, type Variants } from "framer-motion"

export const ModalContentVariants: Variants = {
  enter: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, type: "easeOut" }
  },
  hidden: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.4, type: "easeOut" }
  }
}
export const LoadingVariants: Variants = {
  animate: {
    opacity: [1, 0.7, 0.5, 0.3, 0.5, 0.7, 1],
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      type: "easeInOut"
    }
  },
  hidden: {
    rotate: 0,
    transition: { duration: 0.4, type: "easeOut" }
  }
}

export const AnimateBox = motion(Box)
