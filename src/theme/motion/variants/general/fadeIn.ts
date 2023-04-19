import { tween } from "theme/motion/transitions"
import { type Variants } from "framer-motion"

const fadeIn: Variants = {
  hide: {
    opacity: 0,
    y: 20,
    transition: tween
  },
  show: { opacity: 1, transition: tween, y: 0 }
}

export default fadeIn
