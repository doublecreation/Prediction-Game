import { type Variants } from "framer-motion"

export const hoverCTAButtonIcon: Variants = {
	hide: { opacity: 0, scale: 0.2 },
	hover: {
		opacity: 1,
		scale: 0.7,
		transition: {
			bounce: 0.33,
			damping: 20,
			type: "spring",
		},
		y: 40,
	},
	show: { opacity: 1, scale: 1 },
}
