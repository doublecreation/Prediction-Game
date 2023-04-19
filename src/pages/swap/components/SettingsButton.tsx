import {
  useRadio,
  useColorModeValue,
  useDisclosure,
  useRadioGroup,
  Popover,
  PopoverTrigger,
  IconButton,
  Icon,
  PopoverContent,
  PopoverBody,
  HStack,
  Grid,
  Box,
  Text,
  Flex,
  Tooltip,
  Divider
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useRef } from "react"
import { BsExclamationCircleFill } from "react-icons/bs"
import { FaQuestionCircle } from "react-icons/fa"
import { RiSettings4Fill } from "react-icons/ri"
import { useRecoilState, useRecoilValue } from "recoil"
import { marketAdvancedModeState } from "state/UIState"
import { CustomSwitch } from "./CustomSwitch"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RadioTag = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" px={2}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        shadow="md"
        bg={useColorModeValue("blackAlpha.300", "gray.700")}
        borderRadius="1em"
        _checked={{
          bg: useColorModeValue("blackAlpha.300", "#02e296"),
          color: "white"
        }}
        _disabled={{
          cursor: "not-allowed",
          opacity: 0.5
        }}
        transition="0.2s all"
        px={3}
        py={1}
      >
        <Text textAlign="center">{props.children}</Text>
      </Box>
    </Box>
  )
}

export const SettingsButton = () => {
  const { onToggle, onClose, isOpen } = useDisclosure()
  const initialFocusRef = useRef(null)
  const options = ["1%", "3%", "5%"]
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "1%",
    name: "setting",
    // eslint-disable-next-line no-console
    onChange: console.log
  })
  const group = getRootProps()

  const advancedMode = useRecoilValue(marketAdvancedModeState)

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialFocusRef}
      placement={advancedMode ? "left" : "right"}
    >
      <PopoverTrigger>
        <IconButton
          as={motion.button}
          position="relative"
          bg={useColorModeValue("white", "gray.700")}
          aria-label="Open Swap Settings"
          size="sm"
          shadow="md"
          rounded="0.8rem"
          icon={<Icon as={RiSettings4Fill} />}
          color={isOpen ? "#02e296" : "gray.800"}
          transition="0.2s all"
          _hover={{
            color: "#02e296",
            filter: "brightness(110%)"
          }}
          _dark={{
            color: "white",
            bg: "gray.700",
            _hover: {
              color: "#02e296"
            }
          }}
          _active={{ filter: "brightness(90%)" }}
          _focus={{ boxShadow: "none" }}
          onClick={onToggle}
        />
      </PopoverTrigger>
      <PopoverContent
        as={motion.div}
        bg="rgba(255,255,255,1)"
        _dark={{
          color: "white",
          bg: "gray.800"
        }}
        border="none"
        shadow="md"
        rounded="1em"
        w="full"
      >
        <PopoverBody p={0}>
          <Flex
            px={2}
            py={1}
            w="full"
            bg="offwhite.2"
            _dark={{ bg: "gray.700" }}
            roundedTop="1em"
          >
            Settings
          </Flex>
          <Text
            px={3}
            pt={2}
            pb={1}
            color={useColorModeValue("gray.800", "white")}
            verticalAlign="middle"
          >
            Slippage Tolerance
          </Text>
          <Grid
            px={3}
            pb={2}
            templateColumns={{ base: "1fr 1fr", sm: "repeat(3, 1fr)" }}
            gap={2}
            {...group}
          >
            {options.map((value) => {
              const radio = getRadioProps({ value })
              return (
                <RadioTag key={value} value={value} {...radio}>
                  {value}
                </RadioTag>
              )
            })}
          </Grid>
          <Divider />
          {/* <HStack
            px={{ base: 2, sm: 3 }}
            py={3}
            w="full"
            justify="space-between"
          >
            <Text>Advanced Mode</Text>
            <CustomSwitch defaultValue={advancedMode} onToggle={onToggle} />
          </HStack> */}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
