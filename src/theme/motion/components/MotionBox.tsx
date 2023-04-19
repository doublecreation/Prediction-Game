import { type HTMLChakraProps, chakra } from "@chakra-ui/react"
import { type Merge } from "theme/types/merge"
import { type HTMLMotionProps, motion } from "framer-motion"

export type MotionBoxProps = Merge<
  HTMLChakraProps<"div">,
  HTMLMotionProps<"div">
>

const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div)

export default MotionBox
