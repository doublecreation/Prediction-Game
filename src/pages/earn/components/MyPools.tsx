import { Center, SimpleGrid, useBreakpoint } from "@chakra-ui/react"
import { MyPoolCard } from "components/MyPoolCard"
import { useBondedLiquidity } from "hooks/pool/useBondedLiquidity"
import { useRef, useState } from "react"
import { Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { type Swiper as SwiperRef } from "swiper"
import { TPoolsWithBalances } from "utils/tokens/pools"
import { useRewardAmount } from "hooks/pool/useRewardAmount"

export const MyPools = ({ pools }: { pools: TPoolsWithBalances }) => {
  const breakpoint = useBreakpoint()

  const [swiper, setSwiper] = useState<SwiperRef>()
  const prevRef = useRef()
  const nextRef = useRef()

  if (breakpoint === "base" || breakpoint === "sm") {
    return (
      <Center h="22rem" w="full">
        <Swiper
          style={{
            width: "100%",
            overflow: "visible",
            // breakpoint === "sm" || breakpoint === "base" ? "hidden" : "visible",
            minHeight: "20rem",
            justifyContent: "center"
          }}
          grabCursor={false}
          centeredSlides={true}
          pagination={{ enabled: true, dynamicBullets: true }}
          spaceBetween={40}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => setSwiper(swiper)}
          modules={[Pagination, Navigation]}
          navigation={true}
          initialSlide={0}
        >
          {pools.map((pool) => {
            const [bondedPoolAmount] = useBondedLiquidity({ pool: pool.pool })
            const [pendingRewards] = useRewardAmount({ pool: pool.pool })
            if (
              bondedPoolAmount &&
              bondedPoolAmount?.totalBondedAmount > 0 &&
              pendingRewards
            )
              return (
                <SwiperSlide
                  style={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  <MyPoolCard
                    pool={pool}
                    bonded={bondedPoolAmount.totalBondedAmount}
                    rewards={pendingRewards}
                  />
                </SwiperSlide>
              )
          })}
        </Swiper>
      </Center>
    )
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ md: 3, lg: 6 }} w="full">
      {pools.map((pool) => {
        const [bondedPoolAmount] = useBondedLiquidity({ pool: pool.pool })
        const [pendingRewards] = useRewardAmount({ pool: pool.pool })
        if (
          bondedPoolAmount &&
          bondedPoolAmount?.totalBondedAmount > 0 &&
          pendingRewards
        )
          return (
            <MyPoolCard
              pool={pool}
              bonded={bondedPoolAmount.totalBondedAmount}
              rewards={pendingRewards}
            />
          )
      })}
    </SimpleGrid>
  )
}
