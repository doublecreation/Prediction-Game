import { Stack } from "@chakra-ui/react"
import React from "react"
import { SimpleModalViewType } from "../types"

export const SimpleModalView = ({
  modalHead,
  modalContent
}: SimpleModalViewType) => {
  return (
    <Stack flex={1} spacing={1} h="full">
      {modalHead}
      {modalContent}
    </Stack>
  )
}
