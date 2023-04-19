import { Box, GridItem } from "@chakra-ui/react"
import { motion, Variants } from "framer-motion"

export const ModalVariants: Variants = {
  initial: ({ width, height }) => ({
    scale: 1.001,
    opacity: 0.9,
    width: width,
    height: height
  }),
  animate: {
    originX: 0.5,
    originY: 0.5,
    scale: 1,
    opacity: 1,
    width: "auto",
    height: "auto",
    transition: {
      duration: 0.18,
      delay: 0.05,
      ease: [0.49, 0.81, 0.84, 1]
    }
  }
}
export const ModalContentVariants: Variants = {
  initial: {
    scale: 0.95,
    opacity: 0.05
  },
  animate: {
    scale: 1,
    opacity: 1,
    originX: 0.5,
    originY: 0.5,
    transition: { duration: 0.21, delay: 0.1, ease: [0.15, 1.15, 0.6, 1] }
  }
}
export const LoadingVariants: Variants = {
  hidden: {
    rotate: 0,
    transition: { duration: 0.4, type: "easeOut" }
  },
  animate: {
    opacity: [1, 0.7, 0.5, 0.3, 0.5, 0.7, 1],
    rotate: 360,
    transition: {
      duration: 2,
      type: "easeInOut",
      repeat: Infinity,
      repeatType: "loop"
    }
  }
}

export const AnimateBox = motion(Box)
export const AnimateGridItem = motion(GridItem)
