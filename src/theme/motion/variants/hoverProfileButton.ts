import { type Variants } from "framer-motion"

export const hoverProfileButton: Variants = {
  hide: { opacity: 0, scale: 1 },
  hover: {
    backgroundSize: "120% 220%",
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
      type: "tween"
    }
  },
  show: { backgroundSize: "100% 100%", opacity: 1, scale: 1 }
}
