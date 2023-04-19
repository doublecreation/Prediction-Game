import { type Variants } from "framer-motion"

const validatorCardLayout: Variants = {
  hide: {
    opacity: 0,
    scale: 0.3,
    transition: {
      damping: 15,
      staggerChildren: 0.2,
      stiffness: 150,
      type: "spring"
    }
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      damping: 15,
      staggerChildren: 0.2,
      stiffness: 150,
      type: "spring"
    }
  }
}

export default validatorCardLayout
