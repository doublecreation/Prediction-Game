import { type Variants } from "framer-motion"

const growWidth: Variants = {
  animate: {
    transition: {
      bounce: 1
    },
    width: ["0%", "100%"]
  },
  enter: {
    width: "0%"
  }
}

export default growWidth
