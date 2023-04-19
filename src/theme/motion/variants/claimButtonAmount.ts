import { type Variants } from "framer-motion"

const claimButtonAmount: Variants = {
  hide: { opacity: 0, scale: 0.2 },
  hover: {
    opacity: 1,
    scale: 1.2,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
      type: "tween"
    }
  },
  show: { opacity: 1, scale: 1 }
}

export default claimButtonAmount
