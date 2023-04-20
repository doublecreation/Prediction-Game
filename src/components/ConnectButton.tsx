/* eslint-disable no-negated-condition */
import {
    type ButtonProps,
    Button,
    Text,
    Avatar,
    IconButton,
    useBreakpoint,
    useClipboard,
    VStack,
    HStack,
    useColorModeValue,
    Spacer
} from "@chakra-ui/react"
import { WalletStatus } from "@cosmos-kit/core"
import { useChain, useManager } from "@cosmos-kit/react"
import {
    animate,
    AnimatePresence,
    motion,
    MotionValue,
    useMotionValue,
    type Variants
} from "framer-motion"
import truncateAddress from "utils/ui/truncateAddress"
import { type FC, useEffect } from "react"
import { FaClipboardList } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import { useLocalStorageState } from "ahooks"
import { toast } from "react-toastify"

export type ConnectButtonProps = ButtonProps & {
    activeIndex?: number
}

const connectWalletVariants: Variants = {
    hide: {
        opacity: 0,
        transition: {
            duration: 0.5,
            type: "tween"
        },
        y: -30
    },
    show: {
        opacity: 1,
        transition: {
            duration: 0.5,
            type: "tween"
        },
        y: 0
    }
}

export const walletToolbarVariants: Variants = {
    hide: {
        transition: {
            staggerChildren: 0.25,
            transition: {
                duration: 0.5,
                type: "tween"
            }
        }
    },
    show: {
        transition: {
            delayChildren: 0.25,
            staggerChildren: 0.2,
            transition: {
                duration: 1,
                type: "tween"
            }
        }
    }
}

export const walletToolbarItemVariants: Variants = {
    hide: { opacity: 0, y: -0 },
    show: { opacity: 1, y: 0 }
}

const ConnectButton: FC<ConnectButtonProps> = () => {
    const {
        address,
        openView,
        isWalletConnected,
        status: walletStatus
    } = useChain("seimainnet")

    const { onCopy, value, setValue } = useClipboard("")

    const breakpoint = useBreakpoint()

    const [connectedWalletStorage, setConnectedWalletStorage] =
        useLocalStorageState<boolean>("@hopers/walletStatus", {
            defaultValue: false
        })

    const connectWalletBackgroundImage = useMotionValue(
        connectedWalletStorage
            ? "linear-gradient(0deg, rgb(2,226,150),rgb(2,226,150))"
            : "linear-gradient(0deg, rgb(218, 32, 73),rgb(218, 32, 73))"
    )

    useEffect(() => {
        if (walletStatus === WalletStatus.Connected) {
            setValue(address ?? "")
            animate(
                connectWalletBackgroundImage,
                "linear-gradient(0deg, rgb(2,226,150),rgb(2,226,150))",
                {
                    duration: 0.5,
                    type: "tween"
                }
            )
            setConnectedWalletStorage(true)
        } else {
            animate(
                connectWalletBackgroundImage,
                "linear-gradient(0deg, rgb(218, 32, 73),rgb(218, 32, 73))",
                {
                    duration: 0.5,
                    type: "tween"
                }
            )
            setConnectedWalletStorage(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletStatus])

    const textColor = useColorModeValue("gray.800", "gray.800")

    const isMobile = Boolean(
        breakpoint === "base" || breakpoint === "sm" || breakpoint === "md"
    )

    return (
        <Button
            _active={isWalletConnected ? {} : { filter: "brightness(120%)" }}
            _hover={
                isWalletConnected
                    ? {}
                    : { cursor: "pointer", filter: "brightness(110%)" }
            }
            alignItems="center"
            justifyItems="center"
            bgSize="100% 100%"
            color={isWalletConnected ? textColor : "white"}
            as={motion.div}
            minW={{ base: "6rem", md: "7rem", lg: "7rem" }}
            h="3rem"
            onClick={async () => {
                if (isWalletConnected) return
                openView()
            }}
            overflow="hidden"
            rounded="1em"
            shadow="md"
            px={2}
            style={{
                // @ts-expect-error "MotionValue(string) != string"
                backgroundImage: connectWalletBackgroundImage
            }}
        >
            <HStack h="full" justify="start" w="full">
                <AnimatePresence mode="wait">
                    {isWalletConnected ? (
                        <VStack
                            animate="show"
                            as={motion.div}
                            exit="hide"
                            fontSize="md"
                            w="full"
                            h="full"
                            initial="hide"
                            justify="center"
                            align="center"
                            key="walletConnected"
                            spacing={"0.2rem"}
                            variants={connectWalletVariants}
                        >
                            <Text
                                textAlign="start"
                                w="full"
                                fontSize={"sm"}
                                fontWeight="400"
                                fontFamily="heading"
                            >
                                {truncateAddress(address!, 5, 5)}
                            </Text>
                            <HStack
                                align="center"
                                animate="show"
                                as={motion.div}
                                exit="hide"
                                initial="hide"
                                spacing={1}
                                variants={walletToolbarVariants}
                                w="full"
                            >
                                <IconButton
                                    bg="rgba(255,255,255,0.4)"
                                    _hover={{
                                        background: "rgba(255,255,255,0.5)"
                                    }}
                                    _active={{
                                        background: "rgba(255,255,255,0.3)"
                                    }}
                                    aria-label="Copy wallet address to clipboard"
                                    as={motion.div}
                                    icon={<FaClipboardList size="0.8rem" />}
                                    onClick={(event) => {
                                        onCopy()
                                        toast("Copied address!")
                                    }}
                                    size="none"
                                    w="1.3rem"
                                    h="1.3rem"
                                    variants={walletToolbarItemVariants}
                                />
                                <IconButton
                                    bg="rgba(255,255,255,0.4)"
                                    _hover={{
                                        background: "rgba(255,255,255,0.5)"
                                    }}
                                    _active={{
                                        background: "rgba(255,255,255,0.3)"
                                    }}
                                    aria-label="Open Wallet Modal"
                                    as={motion.div}
                                    icon={<BiLogOut size="0.8rem" />}
                                    onClick={() => {
                                        openView()
                                    }}
                                    size="none"
                                    w="1.3rem"
                                    h="1.3rem"
                                    variants={walletToolbarItemVariants}
                                />
                            </HStack>
                        </VStack>
                    ) : (
                        <Text
                            w="full"
                            fontSize="md"
                            initial={false}
                            key="walletDisconnected"
                            animate="show"
                            textAlign="center"
                            as={motion.div}
                            exit="hide"
                            variants={connectWalletVariants}
                        >
                            Connect
                        </Text>
                    )}
                </AnimatePresence>
            </HStack>
        </Button>
    )
}

export default ConnectButton
