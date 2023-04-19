import {
  type HTMLChakraProps,
  IconButton,
  type IconButtonProps
} from "@chakra-ui/react"
import { type Merge } from "theme/types/merge"
import { type HTMLMotionProps, motion } from "framer-motion"

type MotionIconButtonProps = Merge<
  IconButtonProps,
  Merge<HTMLChakraProps<"button">, HTMLMotionProps<"button">>
>

const MotionIconButton: React.FC<MotionIconButtonProps> = motion(IconButton)

export default MotionIconButton
