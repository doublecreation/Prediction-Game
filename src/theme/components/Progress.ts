import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

const helpers = createMultiStyleConfigHelpers(["filledTrack"])

export const Progress = helpers.defineMultiStyleConfig({
  baseStyle: {
    filledTrack: {
      bg: "rgba(2, 226, 150, 1)"
    }
  }
})
