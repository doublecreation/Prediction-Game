import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { activeRouteState } from "state/UIState"
import MotionFlex from "theme/motion/components/MotionFlex"

export const SubHeader = () => {
    const activeRoute = useRecoilValue(activeRouteState)
    return (
        <Tabs as={motion.div} w="full" pos="absolute" top="4rem" zIndex={1}>
            <AnimatePresence mode="wait">
                {activeRoute && (
                    <MotionFlex
                        as={TabList}
                        initial={{ y: -50 }}
                        exit={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ type: "tween", duration: 0.5 }}
                        bg="#474747"
                        _dark={{ bg: "#474747" }}
                        h="2.5rem"
                        w="full"
                        justifyContent="center"
                        alignItems="center"
                        borderBottom="none"
                        shadow="md"
                    >
                        {Object.entries(activeRoute).map((route, index) => {
                            return (
                                <Tab
                                    key={index}
                                    color="white"
                                    borderBottom="3px solid #00b3ff"
                                    fontWeight="400"
                                    py={"0.35rem"}
                                    fontSize="19"
                                    fontFamily="heading"
                                >
                                    <Link to={route[1]}>{route[0]}</Link>
                                </Tab>
                            )
                        })}
                    </MotionFlex>
                )}
            </AnimatePresence>
        </Tabs>
    )
}
