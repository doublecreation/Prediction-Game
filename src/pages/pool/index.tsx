import {
    Avatar,
    AvatarGroup,
    Button,
    Center,
    chakra,
    Flex,
    HStack,
    Icon,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
    Progress,
    Spacer,
    Stack,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text,
    Tooltip,
    useBreakpoint,
    useColorModeValue,
    VStack
} from "@chakra-ui/react"
import { info } from "console"
import { motion } from "framer-motion"
import { usePoolFromListQueryById } from "hooks/pool/usePoolList"
import { useTokenInfo } from "hooks/tokens/useTokenInfo"
import { Helmet } from "react-helmet"
import { FaArrowDown, FaArrowRight, FaQuestionCircle } from "react-icons/fa"
import { usePalette } from "react-palette"
import { useParams } from "react-router-dom"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { TokenStatus } from "utils/tokens/tokens"
import shortenNumber from "utils/ui/shortenNumber"
import { PoolBonding } from "./components/PoolBonding"
import { PoolLiquidity } from "./components/PoolLiquidity"
import { PoolSummary } from "./components/PoolSummary"

const Pool = () => {
    const parameters = useParams()
    const [pool, isLoading] = usePoolFromListQueryById({
        poolId: Number(parameters.slug!)
    })

    const tokenA = useTokenInfo(pool?.liquidity.token1.denom!)
    const tokenB = useTokenInfo(pool?.liquidity.token2.denom!)
    const { data: tokenAColors } = usePalette(tokenA?.imageUrl)
    const { data: tokenBColors } = usePalette(tokenB?.imageUrl)

    const breakpoint = useBreakpoint()

    return (
        <VStack
            as={motion.main}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            py={{ base: "1rem", md: "4rem" }}
            _dark={{
                bg: "transparent",
                bgGradient: `radial-gradient(ellipse at ${
                    breakpoint === "base" || breakpoint === "sm"
                        ? "top"
                        : "top left"
                }, ${tokenAColors.vibrant}, transparent ${
                    breakpoint === "base" || breakpoint === "sm" ? "80%" : "40%"
                }), radial-gradient(ellipse at ${
                    breakpoint === "base" || breakpoint === "sm"
                        ? "bottom"
                        : "bottom right"
                }, ${tokenBColors.vibrant}, transparent ${
                    breakpoint === "base" || breakpoint === "sm"
                        ? "100%"
                        : "40%"
                })`
            }}
            bg="transparent"
            bgGradient={`radial-gradient(ellipse at ${
                breakpoint === "base" || breakpoint === "sm"
                    ? "top"
                    : "top left"
            }, ${tokenAColors.vibrant}, transparent ${
                breakpoint === "base" || breakpoint === "sm" ? "80%" : "40%"
            }), radial-gradient(ellipse at ${
                breakpoint === "base" || breakpoint === "sm"
                    ? "bottom"
                    : "bottom right"
            }, ${tokenBColors.vibrant}, transparent ${
                breakpoint === "base" || breakpoint === "sm" ? "100%" : "40%"
            })`}
            gap={{ base: 1, md: "1rem" }}
            w="full"
            px={{
                base: 8,
                md: "3rem",
                lg: "6rem",
                xl: "10rem",
                "2xl": "24rem"
            }}
            flexDirection="column"
        >
            {/* <Helmet>
        <title>Pool #{parameters.slug!} | Hopers.io</title>
      </Helmet> */}
            {pool && <PoolSummary pool={pool} />}
            {pool && (
                <Stack
                    direction={{ base: "column", md: "row" }}
                    pos="relative"
                    spacing={{ base: 3, md: 4 }}
                    w="full"
                    h={{ base: "fit-content", md: "15rem" }}
                >
                    <PoolLiquidity pool={pool} />
                    <Button
                        as={motion.button}
                        rounded="full"
                        bg="offwhite.1"
                        _dark={{ bg: "gray.800" }}
                        h={{ base: "2.5rem", md: "3rem" }}
                        w={{ base: "2rem", md: "3rem" }}
                        pos="absolute"
                        top={{
                            base: "calc(50% - 2rem)",
                            md: "calc(50% - 1.5rem)"
                        }}
                        left={{
                            base: "calc(50% - 1.5rem)",
                            md: "calc(50% - 2.5rem)"
                        }}
                        shadow="md"
                        cursor="default"
                        zIndex={2}
                    >
                        <Icon
                            w={{ base: "1.5rem", md: "2rem" }}
                            h={{ base: "1.5rem", md: "2rem" }}
                            as={
                                breakpoint === "base" || breakpoint === "sm"
                                    ? FaArrowDown
                                    : FaArrowRight
                            }
                        />
                    </Button>
                    <PoolBonding pool={pool} />
                </Stack>
            )}
        </VStack>
    )
}

export default Pool
