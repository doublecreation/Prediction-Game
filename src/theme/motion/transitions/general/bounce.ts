import { type Transition } from "framer-motion"

const bounce: Transition = {
  damping: 20,
  mass: 2,
  stiffness: 150,
  type: "spring"
}

export default bounce
