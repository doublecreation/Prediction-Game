import {
  Button,
  chakra,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  useBreakpoint,
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

const Play = () => {
  const [swiper, setSwiper] = useState<SwiperRef>()
  const prevRef = useRef()
  const nextRef = useRef()

  const breakpoint = useBreakpoint()

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
    >
      <Helmet>
        <title>Prediction | Hopers.io</title>
      </Helmet>
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
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiper(swiper)}
        modules={[EffectCoverflow, Pagination, Virtual, Navigation, Mousewheel]}
        mousewheel={true}
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current
        }}
        initialSlide={3}
        // ref={sliderRef}
      >
        {/* <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard gameStatus={"expired"} />
        </SwiperSlide> */}
        <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard gameStatus={"expired"} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard gameStatus={"expired"} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard gameStatus={"live"} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard gameStatus={"next"} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard time={5} gameStatus={"later"} />
        </SwiperSlide>
        {/* <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard time={10} gameStatus={"later"} />
        </SwiperSlide> */}
      </Swiper>
      {/* <Flex
        pos="absolute"
        bottom="1rem"
        right="1rem"
        minW="8rem"
        h="3rem"
        bg="white"
        rounded="1em"
        shadow="md"
        px={2}
      >
        <HStack w="full" justify="start">
          <Image w="1.5rem" src="assets/cg.svg" />
          <VStack align="start" spacing={0}>
            <Text fontSize="14" lineHeight="1">
              Price Data by
            </Text>
            <Text lineHeight="1" fontWeight="600" fontSize="17">
              CoinGecko
            </Text>
          </VStack>
        </HStack>
      </Flex> */}
    </Flex>
  )
}

export default Play
