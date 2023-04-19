import { type Variants } from "framer-motion"

const popUpWithDelay: Variants = {
  hide: {
    opacity: 0,
    scale: 0.35,
    transition: {
      duration: 0.5,
      when: "afterChildren"
    }
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren"
    }
  }
}

export default popUpWithDelay
