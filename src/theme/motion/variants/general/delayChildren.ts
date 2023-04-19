import { type Variants } from 'framer-motion'

const delayChildren: Variants = {
  hide: {
    scale: 1,
    transition: {
      ease: 'easeInOut',
      when: 'afterChildren',
    },
  },
  show: {
    scale: 1,
    transition: {
      ease: 'linear',
      staggerChildren: 0.5,
      when: 'beforeChildren',
    },
  },
}

export default delayChildren
