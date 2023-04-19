import { type Variants } from "framer-motion"

const validatorCardItem: Variants = {
  hide: {
    opacity: 0,
    transition: {
      stiffness: 80,
      type: "spring"
    },
    y: 10
  },
  show: {
    opacity: 1,
    transition: {
      stiffness: 80,
      type: "spring"
    },
    y: 0
  }
}

export default validatorCardItem
