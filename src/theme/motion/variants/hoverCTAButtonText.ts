import { type Variants } from 'framer-motion'

export const hoverCTAButtonText: Variants = {
  hide: { opacity: 0, scale: 0.2 },
  hover: {
    opacity: 1,
    scale: 1.2,
    transition: {
      bounce: 0.33,
      damping: 20,
      type: 'spring',
    },
    y: -30,
  },
  show: { opacity: 1, scale: 1 },
}
