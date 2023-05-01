import {
    Avatar,
    AvatarGroup,
    Button,
    Center,
    chakra,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Skeleton,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    Text,
    useBreakpoint,
    useBreakpointValue,
    VStack
} from "@chakra-ui/react"
import { CelebrationIcon } from "components/Assets/earn/CelebrationIcon"
import { APRIcon } from "components/Assets/earn/ExclusiveIcon"
import { FlameIcon } from "components/Assets/earn/FlameIcon"
import { useState, useRef, useEffect, useMemo } from "react"
import { Helmet } from "react-helmet"
import { Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { type Swiper as SwiperRef } from "swiper"
import { TPoolWithBalance } from "utils/tokens/pools"
import { PoolCard } from "./components/PoolCard"
import { useChain } from "@cosmos-kit/react"
import { PoolTable } from "./components/PoolTable"
import { createColumnHelper } from "@tanstack/react-table"
import { FaTimesCircle } from "react-icons/fa"
import { VerifiedIcon } from "components/Assets/earn/VerifiedIcon"
import {
    getTokenInfoFromTokenList,
    useTokenInfo
} from "hooks/tokens/useTokenInfo"
import { HiExternalLink } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import TVL from "./components/TVL"
import { useTokenList } from "hooks/tokens/useTokenList"
import { usePoolsWithBalances } from "hooks/pool/usePoolsWithBalances"
import { useClaimRewards } from "hooks/pool/useClaimRewards"
import { useRewardAmount } from "hooks/pool/useRewardAmount"
import { FarmIcon } from "components/Assets/FarmIcon"
import { MyPools } from "./components/MyPools"
import { PoolCardSkeleton } from "./components/PoolCardSkeleton"

const Earn = () => {
    const [poolsList, isLoadingPools] = usePoolsWithBalances()
    const [tokenList] = useTokenList()

    const { isWalletConnected } = useChain("juno")

    const [swiper, setSwiper] = useState<SwiperRef>()
    const prevRef = useRef()
    const nextRef = useRef()

    const breakpoint = useBreakpoint()

    const columnHelper = createColumnHelper<TPoolWithBalance>()

    const columns = useMemo(() => {
        return [
            columnHelper.accessor("pool.poolId", {
                cell: (info) => {
                    const tokenA = getTokenInfoFromTokenList(
                        info.row.original.pool.liquidity.token1.denom,
                        tokenList
                    )
                    const tokenB = getTokenInfoFromTokenList(
                        info.row.original.pool.liquidity.token2.denom,
                        tokenList
                    )

                    return (
                        <HStack>
                            <AvatarGroup>
                                <Avatar
                                    src={tokenA?.imageUrl ?? ""}
                                    border="none"
                                    size={{ base: "sm", md: "md" }}
                                />
                                <Avatar
                                    src={tokenB?.imageUrl ?? ""}
                                    border="none"
                                    right={{ base: 1, md: 2 }}
                                    size={{ base: "sm", md: "md" }}
                                />
                            </AvatarGroup>
                            <Flex flexDir="column" gap={{ base: 1, md: 0 }}>
                                <HStack>
                                    <Text
                                        fontSize={{ base: 18, md: "md" }}
                                        lineHeight={{ base: 1, md: 1.4 }}
                                        fontFamily="heading"
                                    >
                                        {tokenA?.name}
                                        <chakra.span
                                            color="gray.400"
                                            fontWeight="100"
                                            px={"2px"}
                                        >
                                            /
                                        </chakra.span>
                                        {tokenB?.name}
                                    </Text>
                                    {info.row.original.pool.isVerified ? (
                                        <VerifiedIcon
                                            w={{ base: "1rem", md: "1.5rem" }}
                                            h={{ base: "1rem", md: "1.5rem" }}
                                            color="#00E296"
                                        />
                                    ) : (
                                        <Icon
                                            w={{ base: "1rem", md: "1.5rem" }}
                                            h={{ base: "1rem", md: "1.5rem" }}
                                            color="red.400"
                                            as={FaTimesCircle}
                                        />
                                    )}
                                </HStack>
                                <Text
                                    fontSize={{ base: 18, md: "md" }}
                                    lineHeight={{ base: 1, md: 1.4 }}
                                >
                                    <chakra.span
                                        color="gray.400"
                                        fontWeight="100"
                                        px={"2px"}
                                    >
                                        #
                                    </chakra.span>
                                    {info.getValue()}
                                </Text>
                            </Flex>
                        </HStack>
                    )
                },
                header: "Pool",
                id: "pools"
            }),
            columnHelper.accessor("pool.liquidity.usd", {
                cell: (info) => {
                    return <TVL liquidity={info.row.original.pool.liquidity} />
                },
                header: "Liquidity",
                id: "liquidity"
            }),
            columnHelper.accessor("apr", {
                cell: (info) => {
                    if (breakpoint === "base" || breakpoint === "sm ") {
                        return (
                            <HStack spacing={1}>
                                <Text
                                    fontFamily="heading"
                                    fontSize={{ base: 18, md: "md" }}
                                    lineHeight={{ base: 1, md: 1.4 }}
                                >
                                    APR
                                </Text>
                                <Text
                                    fontFamily="heading"
                                    fontSize={{ base: 18, md: "md" }}
                                    lineHeight={{ base: 1, md: 1.4 }}
                                    bgGradient="linear(45deg, brand.1, brand.2)"
                                    bgClip="text"
                                >
                                    {info.getValue() === 0
                                        ? "None"
                                        : info.getValue()}
                                    %
                                </Text>
                            </HStack>
                        )
                    }

                    return (
                        <Tag
                            bg="white"
                            _dark={{ bg: "gray.600" }}
                            shadow="md"
                            rounded="1em"
                            py={2}
                            px={3}
                        >
                            <Text
                                bgGradient="linear(45deg, brand.1, brand.2)"
                                bgClip="text"
                                fontFamily="heading"
                                fontSize={{ base: 18, md: "md" }}
                            >
                                {info.getValue() === 0
                                    ? "None"
                                    : `${info.getValue()}%`}
                            </Text>
                        </Tag>
                    )
                },
                header: "APR",
                id: "apr"
            }),
            columnHelper.display({
                cell: (info) => {
                    const navigate = useNavigate()

                    const [rewardAmount] = useRewardAmount({
                        pool: info.row.original.pool
                    })

                    const {
                        mutate: handleClaimRewards,
                        isLoading: isExecutingClaim
                    } = useClaimRewards({
                        pool: info.row.original.pool
                    })

                    const iconSize = useBreakpointValue({
                        base: "14",
                        md: "20"
                    })

                    if (breakpoint === "base" || breakpoint === "sm") {
                        return (
                            <HStack>
                                <IconButton
                                    aria-label="Go to pools page"
                                    onClick={() => {
                                        navigate(
                                            `/pool/${info.row.original.pool.poolId}`
                                        )
                                    }}
                                    size="md"
                                    icon={<HiExternalLink size={iconSize} />}
                                />

                                {isWalletConnected && (
                                    <IconButton
                                        isDisabled={rewardAmount! <= 0}
                                        isLoading={isExecutingClaim}
                                        aria-label="Claim Pool Rewards"
                                        onClick={() => {
                                            handleClaimRewards()
                                        }}
                                        size="md"
                                        icon={<FarmIcon />}
                                    />
                                )}
                            </HStack>
                        )
                    }
                    return (
                        <HStack>
                            <Button
                                aria-label="Go to pools page"
                                onClick={() => {
                                    navigate(
                                        `/pool/${info.row.original.pool.poolId}`
                                    )
                                }}
                                size="md"
                                leftIcon={<HiExternalLink size={iconSize} />}
                                _hover={{
                                    bgGradient:
                                        "linear(45deg, brand.1, brand.2)"
                                }}
                                bg="white"
                                shadow="md"
                                _dark={{
                                    bg: "gray.600",
                                    _hover: {
                                        bgGradient:
                                            "linear(45deg, brand.1, brand.2)"
                                    }
                                }}
                                rounded="1em"
                            >
                                Pool
                            </Button>

                            {isWalletConnected && (
                                <Button
                                    isDisabled={rewardAmount! <= 0}
                                    isLoading={isExecutingClaim}
                                    aria-label="Claim Pool Rewards"
                                    onClick={() => {
                                        handleClaimRewards()
                                    }}
                                    size="md"
                                    leftIcon={<FarmIcon />}
                                    _hover={{
                                        bgGradient:
                                            "linear(45deg, brand.1, brand.2)"
                                    }}
                                    bg="white"
                                    shadow="md"
                                    _disabled={{
                                        opacity: 0.5,
                                        cursor: "not-allowed",
                                        _hover: { bg: "white" }
                                    }}
                                    _dark={{
                                        bg: "gray.600",
                                        _hover: {
                                            bgGradient:
                                                "linear(45deg, brand.1, brand.2)"
                                        },
                                        _disabled: {
                                            opacity: 0.5,
                                            cursor: "not-allowed",
                                            _hover: { bg: "gray.600" }
                                        }
                                    }}
                                    rounded="1em"
                                >
                                    Claim
                                </Button>
                            )}
                        </HStack>
                    )
                },
                header: "Actions",
                id: "actions"
            })
        ]
    }, [poolsList])

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

    const isTabsFitted = useBreakpointValue({ base: true, md: false })

    return (
        <VStack
            as={motion.main}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            py={{ base: "1rem", md: "4rem" }}
            mx="auto"
            px={{ base: 4, md: 8, lg: 24 }}
            gap={"1rem"}
            w="full"
        >
            {/* <Helmet>
        <title>Earn | Hopers.io</title>
      </Helmet> */}
            <Tabs
                isFitted={isTabsFitted}
                isLazy
                variant="soft-rounded"
                w="full"
            >
                <TabList
                    color="gray.800"
                    _dark={{ color: "white", bg: "whiteAlpha.200" }}
                    gap={2}
                    h="3rem"
                    bg="blackAlpha.200"
                    rounded="1.25em"
                >
                    <Tab
                        maxW="15rem"
                        fontWeight="900"
                        color="gray.800"
                        rounded="1.25em"
                        _dark={{
                            color: "white",
                            _selected: { color: "gray.800" }
                        }}
                        _selected={{
                            bgGradient: "linear(45deg, brand.1, brand.2)",
                            color: "gray.800"
                        }}
                    >
                        Hot Pools
                    </Tab>
                    <Tab
                        isDisabled={!isWalletConnected}
                        maxW="15rem"
                        color="gray.800"
                        rounded="1.25em"
                        _dark={{
                            color: "white",
                            _selected: { color: "gray.800" }
                        }}
                        _selected={{
                            bgGradient: "linear(45deg, brand.1, brand.2)",
                            color: "gray.800"
                        }}
                    >
                        My Pools
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel h="full" w="full">
                        {!poolsList &&
                            (breakpoint === "base" || breakpoint === "sm" ? (
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
                                        pagination={true}
                                        spaceBetween={40}
                                        slidesPerView={1}
                                        onSlideChange={() =>
                                            console.log("slide change")
                                        }
                                        onSwiper={(swiper) => setSwiper(swiper)}
                                        modules={[Pagination, Navigation]}
                                        navigation={true}
                                        initialSlide={0}
                                        // ref={sliderRef}
                                    >
                                        <SwiperSlide
                                            style={{
                                                justifyContent: "center",
                                                display: "flex"
                                            }}
                                        >
                                            <PoolCardSkeleton
                                                bannerFontSize={18}
                                                icon={<CelebrationIcon />}
                                                bannerColor={"#00E296"}
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide
                                            style={{
                                                justifyContent: "center",
                                                display: "flex"
                                            }}
                                        >
                                            <PoolCardSkeleton
                                                bannerFontSize={18}
                                                icon={<FlameIcon />}
                                                bannerColor={"#FC4361"}
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide
                                            style={{
                                                justifyContent: "center",
                                                display: "flex"
                                            }}
                                        >
                                            <PoolCardSkeleton
                                                bannerFontSize={14}
                                                icon={<APRIcon />}
                                                bannerColor={"#FFA530"}
                                            />
                                        </SwiperSlide>
                                    </Swiper>
                                </Center>
                            ) : (
                                <HStack gap={5} w="full">
                                    <PoolCardSkeleton
                                        bannerFontSize={18}
                                        icon={<CelebrationIcon />}
                                        bannerColor={"#00E296"}
                                    />
                                    <PoolCardSkeleton
                                        bannerFontSize={18}
                                        icon={<FlameIcon />}
                                        bannerColor={"#FC4361"}
                                    />
                                    <PoolCardSkeleton
                                        bannerFontSize={14}
                                        icon={<APRIcon />}
                                        bannerColor={"#FFA530"}
                                    />
                                </HStack>
                            ))}
                        {poolsList &&
                            poolsList.poolsWithBalances.length > 0 &&
                            poolsList.highestTvlPool &&
                            poolsList.highestAprPool &&
                            (breakpoint === "base" || breakpoint === "sm" ? (
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
                                        pagination={true}
                                        spaceBetween={40}
                                        slidesPerView={1}
                                        onSlideChange={() =>
                                            console.log("slide change")
                                        }
                                        onSwiper={(swiper) => setSwiper(swiper)}
                                        modules={[Pagination, Navigation]}
                                        navigation={true}
                                        initialSlide={0}
                                        // ref={sliderRef}
                                    >
                                        <SwiperSlide
                                            style={{
                                                justifyContent: "center",
                                                display: "flex"
                                            }}
                                        >
                                            <PoolCard
                                                pool={poolsList.newestPool}
                                                bannerFontSize={18}
                                                icon={<CelebrationIcon />}
                                                bannerColor={"#00E296"}
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide
                                            style={{
                                                justifyContent: "center",
                                                display: "flex"
                                            }}
                                        >
                                            <PoolCard
                                                pool={poolsList.highestTvlPool}
                                                bannerFontSize={18}
                                                icon={<FlameIcon />}
                                                bannerColor={"#FC4361"}
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide
                                            style={{
                                                justifyContent: "center",
                                                display: "flex"
                                            }}
                                        >
                                            <PoolCard
                                                pool={poolsList.highestAprPool}
                                                bannerFontSize={14}
                                                icon={<APRIcon />}
                                                bannerColor={"#FFA530"}
                                            />
                                        </SwiperSlide>
                                    </Swiper>
                                </Center>
                            ) : (
                                <HStack gap={5} w="full">
                                    <PoolCard
                                        pool={poolsList.newestPool}
                                        bannerFontSize={18}
                                        icon={<CelebrationIcon />}
                                        bannerColor={"#00E296"}
                                    />
                                    <PoolCard
                                        pool={poolsList.highestTvlPool}
                                        bannerFontSize={18}
                                        icon={<FlameIcon />}
                                        bannerColor={"#FC4361"}
                                    />
                                    <PoolCard
                                        pool={poolsList.highestAprPool}
                                        bannerFontSize={14}
                                        icon={<APRIcon />}
                                        bannerColor={"#FFA530"}
                                    />
                                </HStack>
                            ))}
                    </TabPanel>
                    <TabPanel h="full" w="full">
                        {poolsList?.poolsWithBalances &&
                            poolsList?.poolsWithBalances.length > 0 && (
                                <MyPools pools={poolsList?.poolsWithBalances} />
                            )}
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <VStack w="full" align="center" spacing={3}>
                <Heading
                    w="full"
                    textAlign={
                        breakpoint === "base" || breakpoint === "sm"
                            ? "center"
                            : "start"
                    }
                    fontSize="3xl"
                >
                    All Pools
                </Heading>
                <PoolTable
                    data={poolsList?.poolsWithBalances ?? []}
                    columns={columns}
                />
            </VStack>
        </VStack>
    )
}

export default Earn
