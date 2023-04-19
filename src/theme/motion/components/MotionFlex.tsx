import { type HTMLChakraProps, Flex } from "@chakra-ui/react"
import { type Merge } from "theme/types/merge"
import { type HTMLMotionProps, motion } from "framer-motion"

export type MotionFlexProps = Merge<
  HTMLChakraProps<"div">,
  HTMLMotionProps<"div">
>

const MotionFlex: React.FC<MotionFlexProps> = motion(Flex)

export default MotionFlex
