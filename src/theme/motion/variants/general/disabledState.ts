import { type Variants } from "framer-motion"

const disabledState: Variants = {
  hide: {
    opacity: 0.5,
    scale: 0.9,
    transition: {
      duration: 1,
      type: "tween"
    }
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      type: "tween"
    }
  }
}

export default disabledState
