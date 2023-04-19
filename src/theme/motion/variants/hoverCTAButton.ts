import { type Variants } from 'framer-motion'

export const hoverCTAButton: Variants = {
  hide: {
    // backgroundSize: '100% 100%',
    // filter: 'brightness(80%)',
    opacity: 0,
    scale: 1,
  },
  hover: {
    // backgroundSize: '120% 120%',
    // filter: 'brightness(90%)',
    opacity: 1,
    scale: 1,
    transition: {
      damping: 10,
      stiffness: 400,
      type: 'spring',
    },
  },
  press: { scale: 0.9 },
  show: {
    // backgroundSize: '100% 100%',
    // filter: 'brightness(80%)',
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
      type: 'tween',
    },
  },
}
