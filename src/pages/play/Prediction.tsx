import {
    Button,
    chakra,
    Flex,
    HStack,
    IconButton,
    Image,
    Text,
    useBreakpoint,
    useClipboard,
    VStack
} from "@chakra-ui/react"
import { PredictionGameCard } from "./components/PredictionGameCard"
import { SwiperController } from "./components/SwiperController"
import { BitcoinPrice, GameTimer } from "./components"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import {
    EffectCoverflow,
    Mousewheel,
    Navigation,
    Pagination,
    Virtual
} from "swiper"
import { type Swiper as SwiperRef } from "swiper"
import { useRef, useCallback, useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import { useChain } from "@cosmos-kit/react"
import { ConnectedChain } from "../../constants"
import useWalletConnect from "hooks/useWalletConnect"
import { useRecoilState } from "recoil"
import { roundsState } from "state/roundsState"
import HistoryTable from "./components/HistoryTable"

const Prediction = () => {
    const { address } = useChain(ConnectedChain)
    const [swiper, setSwiper] = useState<SwiperRef>()
    const { connect } = useWalletConnect()
    const prevRef = useRef()
    const nextRef = useRef()
    const [rounds] = useRecoilState(roundsState)
    // console.log("debug rounds", rounds)

    useEffect(() => {
        if (swiper) {
            // @ts-expect-error
            swiper.params.navigation.prevEl = prevRef.current
            // @ts-expect-error
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
        }
    }, [swiper])

    return (
        <Flex
            gap={{ base: 8, md: 12 }}
            align="center"
            w="full"
            as={motion.main}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            justify="center"
            direction="column"
            px={{ base: 6, md: 32 }}
            mt="10rem"
        >
            {/* <Helmet>
                <title>Prediction | Hopers.io</title>
            </Helmet> */}
            <Flex
                w="full"
                justify="center"
                direction={{ base: "column", md: "row" }}
                gap={8}
                align="center"
            >
                <BitcoinPrice />
                <SwiperController nextRef={nextRef} prevRef={prevRef} />
                <GameTimer />
            </Flex>
            <Swiper
                style={{
                    width: "100%",
                    overflow: "visible",
                    // breakpoint === "sm" || breakpoint === "base" ? "hidden" : "visible",
                    minHeight: "23rem",
                    justifyContent: "center"
                }}
                // effect={"coverflow"}
                grabCursor={false}
                centeredSlides={true}
                // coverflowEffect={{
                //   rotate: 50,
                //   stretch: 0,
                //   depth: 0,
                //   modifier: 0.5,
                //   slideShadows: false
                // }}
                // onInit={() => {
                //   setInit(true)
                // }}
                pagination={true}
                spaceBetween={0}
                breakpoints={{
                    0: {
                        slidesPerView: 1
                    },
                    640: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                }}
                // onBeforeInit={(swiper) => {
                //   swiper.navigation.nextEl = navigationNextRef.current!
                //   swiper.navigation.prevEl = navigationPrevRef.current!
                // }}
                // onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => setSwiper(swiper)}
                modules={[
                    EffectCoverflow,
                    Pagination,
                    Virtual,
                    Navigation,
                    Mousewheel
                ]}
                mousewheel
                navigation={{
                    prevEl: prevRef?.current,
                    nextEl: nextRef?.current
                }}
                initialSlide={Math.max(rounds.length - 2, 0)}
                // ref={sliderRef}
            >
                {rounds.map((round, index) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            justifyContent: "center",
                            display: "flex"
                        }}
                    >
                        <PredictionGameCard
                            round={round}
                            connect={connect}
                            address={address}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <HistoryTable address={address} />
        </Flex>
    )
}

export default Prediction
