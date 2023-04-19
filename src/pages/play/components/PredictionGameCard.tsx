import {
  Text,
  Flex,
  Icon,
  Spacer,
  Heading,
  Image,
  Tag,
  HStack,
  VStack,
  Button
} from "@chakra-ui/react"
import { useEffect, useMemo } from "react"
import { FaBan, FaClock, FaPlayCircle } from "react-icons/fa"
import { getTokenPriceCoinGecko } from "utils/prices/getTokenPrice"
import { CountdownTimer } from "./CountdownTimer"

import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import MotionFlex from "theme/motion/components/MotionFlex"

dayjs.extend(duration)

export const PredictionGameCard = ({
  gameStatus,
  time
}: {
  gameStatus: "expired" | "live" | "next" | "later" | "calculating"
  time?: number
}) => {
  const gameIcon = useMemo(() => {
    switch (gameStatus) {
      case "expired":
        return <Icon as={FaBan} />
      case "live":
        return <Icon as={FaPlayCircle} />
      case "next":
        return <Icon as={FaPlayCircle} />
      case "later":
        return <Icon as={FaClock} />
      case "calculating":
        return <Icon as={FaClock} />
      default:
        break
    }
  }, [gameStatus])

  useEffect(() => {
    console.log(
      // getTokenPriceCoinGecko({ tokenId: "juno-network", precision: 6 })
      dayjs().add(5, "m").unix()
    )
  })

  return (
    <MotionFlex
      h="20rem"
      w="16rem"
      rounded="1em"
      bg="white"
      shadow="md"
      _dark={{ bg: "gray.700" }}
      overflow="hidden"
      pos="relative"
      whileHover={{ opacity: 1 }}
      opacity={gameStatus === "expired" ? 0.6 : 1}
    >
      <Flex
        px={2}
        py={2}
        align="center"
        gap={1}
        h="2rem"
        w="full"
        color={
          gameStatus === "next"
            ? "white"
            : gameStatus === "expired"
            ? "gray.300"
            : "rgba(60,230,130, 1)"
        }
        bg={gameStatus === "next" ? "rgba(60,230,130, 1)" : "white"}
        _dark={{
          bg: gameStatus === "next" ? "rgba(60,230,130, 1)" : "gray.600",
          color:
            gameStatus === "next"
              ? "gray.700"
              : gameStatus === "expired"
              ? "gray.300"
              : "rgba(60,230,130, 1)"
        }}
      >
        {gameIcon}
        <Text fontWeight="600">{gameStatus.toUpperCase()}</Text>
        <Spacer />
        <Text>#99999</Text>
      </Flex>
      <svg width="0" height="0">
        <defs>
          <clipPath id="myClip" clipPathUnits="objectBoundingBox">
            <polygon
              points=".41,.02 .59,.02 
                       .91,.16 1,.33 
                       1,.66 .91,.83 
                       .59,.98 .41,.98 
                       .09,.83 0,.66
                       0,.33 .09,.16
                       "
            />

            <circle cx=".5" cy=".2" r=".2" />
            <circle cx=".5" cy=".8" r=".2" />
            <circle cx=".8" cy=".33" r=".2" />
            <circle cx=".8" cy=".66" r=".2" />
            <circle cx=".2" cy=".33" r=".2" />
            <circle cx=".2" cy=".66" r=".2" />
          </clipPath>
        </defs>
      </svg>
      <Flex
        clipPath={"url(#myClip)"}
        borderRadius="0"
        zIndex={2}
        pos="absolute"
        bg="gray.200"
        _dark={{
          bg: "gray.800",
          bgImage:
            gameStatus === "live" || gameStatus === "next"
              ? `linear-gradient(
            0deg,
            hsl(341deg 100% 58%) 1%,
            hsl(355deg 100% 62%) 44%,
            hsl(13deg 100% 59%) 50%,
            hsl(29deg 100% 50%) 51%,
            hsl(36deg 100% 50%) 50%,
            hsl(47deg 100% 45%) 49%,
            hsl(63deg 100% 41%) 50%,
            hsl(81deg 100% 46%) 56%,
            hsl(103deg 100% 50%) 99%
                )`
              : `none`
        }}
        bgImage={
          gameStatus === "live" || gameStatus === "next"
            ? `linear-gradient(
            0deg,
            hsl(341deg 100% 58%) 1%,
            hsl(355deg 100% 62%) 44%,
            hsl(13deg 100% 59%) 50%,
            hsl(29deg 100% 50%) 51%,
            hsl(36deg 100% 50%) 50%,
            hsl(47deg 100% 45%) 49%,
            hsl(63deg 100% 41%) 50%,
            hsl(81deg 100% 46%) 56%,
            hsl(103deg 100% 50%) 99%
                )`
            : `none`
        }
        w="13rem"
        top="calc(50% - 7rem)"
        left="calc(50% - 6.5rem)"
        h="16rem"
        filter="url(#goo)"
      />
      <VStack
        top="3.5rem"
        left="calc(50% - 7.25rem)"
        w="14.5rem"
        zIndex="2"
        pos="absolute"
      >
        <Heading fontSize="24" color="white">
          UP
        </Heading>
      </VStack>
      {gameStatus === "next" && (
        <Flex
          w="14.5rem"
          h="9rem"
          justify="center"
          gap={0}
          bg="white"
          _dark={{ bg: "gray.600" }}
          zIndex={2}
          rounded="1em"
          shadow="md"
          top="calc(50% - 3.5rem)"
          left="calc(50% - 7.25rem)"
          pos="absolute"
          flexDirection="column"
          px={3}
          py={1}
        >
          <Flex fontWeight="600" fontSize="16" justifyContent="space-between">
            <Text>Prize Pool:</Text>
            <HStack spacing={0.5}>
              <Text>20</Text>
              <Image w="1.5rem" src="/assets/logo_transparent.png" />
            </HStack>
          </Flex>
          <VStack w="full" pt={1}>
            <Button colorScheme="green" shadow="md" w="full" rounded="1em">
              Junø Pumps
            </Button>
            <Button colorScheme="red" shadow="md" w="full" rounded="1em">
              Junø Dumps
            </Button>
          </VStack>
        </Flex>
      )}
      {gameStatus === "later" && (
        <Flex
          w="14.5rem"
          h="8rem"
          justify="center"
          _dark={{ bg: "gray.600" }}
          gap={0}
          bg="white"
          zIndex={2}
          rounded="1em"
          shadow="md"
          top="calc(50% - 3rem)"
          left="calc(50% - 7.25rem)"
          pos="absolute"
          flexDirection="column"
          px={3}
          py={1}
        >
          <Text w="full" textAlign="center" fontSize="13">
            Game starts in:
          </Text>
          <CountdownTimer
            timeTo={dayjs()
              .add(time ?? 0, "m")
              .unix()}
          />
        </Flex>
      )}
      {gameStatus === "live" && (
        <Flex
          w="14.5rem"
          h="8rem"
          justify="center"
          gap={0}
          bg="white"
          _dark={{ bg: "gray.600" }}
          zIndex={2}
          rounded="1em"
          shadow="md"
          top="calc(50% - 3rem)"
          left="calc(50% - 7.25rem)"
          pos="absolute"
          flexDirection="column"
          px={3}
          py={1}
        >
          <Text fontSize="13">Last Price</Text>
          <Flex justifyContent="space-between">
            <Heading fontSize="26">$0.00</Heading>
            <Tag>$0.00</Tag>
          </Flex>
          <Flex pt={3} fontSize="13" justifyContent="space-between">
            <Text>Locked Price:</Text>
            <Text>$0.00</Text>
          </Flex>
          <Flex fontWeight="600" fontSize="16" justifyContent="space-between">
            <Text>Prize Pool:</Text>
            <HStack spacing={0.5}>
              <Text>20</Text>
              <Image w="1.5rem" src="/assets/logo_transparent.png" />
            </HStack>
          </Flex>
        </Flex>
      )}
      {gameStatus === "expired" && (
        <Flex
          w="14.5rem"
          h="8rem"
          justify="center"
          gap={0}
          bg="white"
          _dark={{ bg: "gray.600" }}
          zIndex={2}
          rounded="1em"
          shadow="md"
          top="calc(50% - 3rem)"
          left="calc(50% - 7.25rem)"
          pos="absolute"
          flexDirection="column"
          px={3}
          py={1}
        >
          <Text fontSize="13">Closed Price</Text>
          <Flex justifyContent="space-between">
            <Heading fontSize="26">$0.00</Heading>
            <Tag>$0.00</Tag>
          </Flex>
          <Flex pt={3} fontSize="13" justifyContent="space-between">
            <Text>Locked Price:</Text>
            <Text>$0.00</Text>
          </Flex>
          <Flex fontWeight="600" fontSize="16" justifyContent="space-between">
            <Text>Prize Pool:</Text>
            <HStack spacing={0.5}>
              <Text>20</Text>
              <Image w="1.5rem" src="/assets/logo_transparent.png" />
            </HStack>
          </Flex>
        </Flex>
      )}
      <VStack
        bottom="2rem"
        left="calc(50% - 7.25rem)"
        w="14.5rem"
        zIndex="2"
        pos="absolute"
      >
        <Heading fontSize="24" color="white">
          DOWN
        </Heading>
      </VStack>
    </MotionFlex>
  )
}
