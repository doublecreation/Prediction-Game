import { type Variants } from "framer-motion"

const claimButtonText: Variants = {
  hide: { opacity: 0, scale: 0.2 },
  hover: {
    opacity: 1,
    scale: 0.8,
    transition: {
      duration: 0.25,
      ease: "easeOut",
      type: "tween"
    }
  },
  show: { opacity: 1, scale: 1 }
}

export default claimButtonText
