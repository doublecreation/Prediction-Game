import { Flex } from "@chakra-ui/react"
import { PredictionCardsIcon } from "components/Assets/PredictionCardsIcon"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import MotionIconButton from "theme/motion/components/MotionIconButton"

export const SwiperController = ({
  prevRef,
  nextRef
}: {
  prevRef: any
  nextRef: any
}) => {
  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      px={0}
      bg="white"
      _dark={{ bg: "gray.700" }}
      rounded="1.25em"
      shadow="md"
      minW="16rem"
      h="3rem"
      pos="relative"
    >
      <MotionIconButton
        rounded="1em"
        whileHover={{ scale: 1.25, cursor: "pointer" }}
        whileTap={{ scale: 1 }}
        transition={{ type: "tween", duration: 0.2, ease: "linear" }}
        // @ts-ignore
        ref={prevRef}
      >
        <FaArrowLeft size={"26"} />
      </MotionIconButton>

      <PredictionCardsIcon
        w="4rem"
        h="4rem"
        pos="absolute"
        shadow="md"
        bg="white"
        _dark={{ bg: "gray.600" }}
        rounded="full"
      />
      <MotionIconButton
        rounded="1em"
        whileHover={{ scale: 1.25, cursor: "pointer" }}
        whileTap={{ scale: 1 }}
        transition={{ type: "tween", duration: 0.2, ease: "linear" }}
        // @ts-ignore
        ref={nextRef}
      >
        <FaArrowRight size={"26"} />
      </MotionIconButton>
    </Flex>
  )
}
