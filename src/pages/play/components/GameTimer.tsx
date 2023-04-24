import { useState } from "react"
import { Text, Heading, Center, HStack, IconButton } from "@chakra-ui/react"
import { BiArrowFromLeft } from "react-icons/bi"
import {
    BsHourglassTop,
    BsHourglassSplit,
    BsHourglassBottom
} from "react-icons/bs"
import { FaQuestion } from "react-icons/fa"
import { useRecoilState } from "recoil"
import { configState, currentTimeState, roundsState } from "state/roundsState"
import { numberToTime } from "utils/ui/numberToTime"

export const GameTimer = () => {
    const [config] = useRecoilState(configState)
    const [currentTime] = useRecoilState(currentTimeState)
    const [rounds] = useRecoilState(roundsState)

    const lastRound = rounds[rounds.length - 1]
    const roundInterval = config.next_round_seconds || 300
    const remainTime = lastRound
        ? (lastRound.open_time - currentTime) / 1000
        : roundInterval
    return (
        <HStack
            pos={{ base: "relative", md: "absolute" }}
            right={{ base: "0rem", md: "6rem" }}
        >
            <Center
                gap={3}
                px={4}
                bg="white"
                _dark={{ bg: "gray.700" }}
                rounded="1.25em"
                shadow="md"
                h="3rem"
            >
                <Heading fontSize="24">
                    {numberToTime(Math.floor(remainTime))}
                </Heading>
                <Heading fontSize="24">{`${roundInterval / 60}m`}</Heading>
                {remainTime < roundInterval / 3 ? (
                    <BsHourglassBottom size={35} />
                ) : remainTime > roundInterval / 3 ? (
                    <BsHourglassTop size={35} />
                ) : (
                    <BsHourglassSplit size={35} />
                )}
            </Center>
            <IconButton
                rounded="1em"
                bg="white"
                h="3rem"
                w="3rem"
                _dark={{ bg: "gray.700", _hover: { bg: "gray.600" } }}
                shadow="md"
                icon={<FaQuestion />}
                aria-label="Open Documentation / Help"
            />
        </HStack>
    )
}
