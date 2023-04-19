import { Box, useRadio } from "@chakra-ui/react"

export const BondButton = (props) => {
  const { getInputProps, getCheckboxProps, state } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor={props.isDisabled ? "not-allowed" : "pointer"}
        rounded="1.25em"
        _checked={{
          bgGradient: "linear(45deg, brand.1, brand.2)",
          color: "white",
          filter:
            "drop-shadow(0px 0px 1px rgba(255,255,255, 0.8)) drop-shadow(0px 0px 4px rgba(2,226,150, 1))"
        }}
        _focus={{
          boxShadow: "md"
        }}
        px={5}
        py={3}
        borderRadius="1.25em"
        opacity={props.isDisabled ? 0.3 : 1}
        bg="white"
        shadow="md"
        _dark={{ bg: "gray.800" }}
        transition="0.2s all"
        _hover={{
          filter:
            state.isChecked || props.isDisabled
              ? ""
              : "brightness(110%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))"
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}
