import { tween } from "theme/motion/transitions"
import { type Variants } from "framer-motion"

const popUp: Variants = {
  hide: {
    opacity: 0,
    scale: 0.5,
    transition: tween
  },
  show: { opacity: 1, scale: 1, transition: tween }
}

export default popUp
