import { type Variants } from "framer-motion"

export const hoverCTAButtonLayout: Variants = {
	hide: { opacity: 0, scale: 0.2 },
	hover: {
		opacity: 1,
		transition: {
			bounce: 0.33,
			damping: 20,
			type: "spring",
		},
	},
	show: { opacity: 1, scale: 1 },
}
