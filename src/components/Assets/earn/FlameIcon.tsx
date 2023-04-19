import { Icon, type IconProps } from "@chakra-ui/react"
import { motion } from "framer-motion"

export const FlameIcon = ({ ...props }: IconProps) => (
  <Icon
    viewBox="0 0 600 600"
    stroke="currentColor"
    fill="currentColor"
    w="2.5rem"
    h="2.5rem"
    color="gray.800"
    pos="absolute"
    bottom="calc(100% - 3.5rem)"
    left="calc(100% - 4.5rem)"
  >
    <path d="m290.51 28c19.578 140.93-136.29 182-139.37 349.25-3.9766 51.145 45.125 153.09 131.18 154.75-37.867-37.855-76.762-119.46-6.8281-229.63 4.7578 39.035 18.73 60.922 39.609 69.945 20.668-45.152 32.199-97.699 38.242-154.69 97.594 117.56 101.8 215.21 20.488 314.38 291.86-37.332 188.05-404.11-83.316-504z" />
  </Icon>
)
