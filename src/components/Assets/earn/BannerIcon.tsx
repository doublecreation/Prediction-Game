import {
  Icon,
  type IconProps,
  Text,
  BoxProps,
  Box,
  Center
} from "@chakra-ui/react"
import { motion } from "framer-motion"

export const BannerIcon = ({
  bannerFontSize,
  icon,
  bannerColor,
  ...props
}: BoxProps & {
  bannerFontSize: number
  bannerColor: string
  icon: React.ReactNode
}) => {
  return (
    <Box {...props} pos="absolute">
      <Box pos="relative" w="6rem" h="6rem">
        <Icon
          color={bannerColor}
          w="6rem"
          h="6rem"
          viewBox="0 0 700 600"
          stroke="currentColor"
          fill="currentColor"
          filter={`drop-shadow(2px 2px 6px ${bannerColor})`}
          pos="absolute"
        >
          <path d="m127.79 14.336v515.48c0 15.793 10.023 20.551 22.344 10.695l185.02-143.36c12.266-9.9102 18.031-9.9102 30.297 0l184.46 143.3c12.266 9.9102 22.289 5.1523 22.289-10.641l-0.003907-515.48zm421.12 495.88-169.23-131.43c-7.168-5.7695-16.855-12.32-29.457-12.32-12.543 0-22.512 6.7188-29.734 12.602l-169.4 131.21v-472.64h397.82c-0.003906 0-0.003906 472.58-0.003906 472.58z" />
          <path d="m313.82 370.55c8.5664-6.8867 20.496-14.895 36.398-14.895 16.129 0 28.336 8.3438 36.121 14.672l151.82 117.94v-439.88h-376.32v439.94z" />
        </Icon>
        {icon}
      </Box>
    </Box>
  )
}
