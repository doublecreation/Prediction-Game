import {
  type HTMLChakraProps,
  Button,
  type ButtonProps
} from "@chakra-ui/react"
import { type Merge } from "theme/types/merge"
import { type HTMLMotionProps, motion } from "framer-motion"

type MotionButtonProps = Merge<
  ButtonProps,
  Merge<HTMLChakraProps<"button">, HTMLMotionProps<"button">>
>

const MotionButton: React.FC<MotionButtonProps> = motion(Button)

export default MotionButton
