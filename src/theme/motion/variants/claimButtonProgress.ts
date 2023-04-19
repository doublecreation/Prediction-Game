import { type Variants } from "framer-motion"

const claimButtonProgress: Variants = {
  animate: {
    backdropFilter: ["blur(0px)", "blur(2px)", "blur(4px)"],
    opacity: [0, 1, 1],
    transition: {
      duration: 1,
      type: "tween"
    },
    width: ["0%", "100%"]
  },
  enter: {
    opacity: 0,
    width: "0%"
  }
}

export default claimButtonProgress
