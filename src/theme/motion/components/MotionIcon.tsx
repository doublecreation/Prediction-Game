import { type HTMLChakraProps, type IconProps, Icon } from "@chakra-ui/react"
import { type Merge } from "theme/types/merge"
import { motion, type SVGMotionProps } from "framer-motion"

export type MotionIconProps = Merge<
  IconProps,
  Merge<HTMLChakraProps<"svg">, SVGMotionProps<SVGSVGElement>>
>

const MotionIcon: React.FC<MotionIconProps> = motion(Icon)

export default MotionIcon
