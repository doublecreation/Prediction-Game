import { Icon, type IconProps } from "@chakra-ui/react"
import { motion } from "framer-motion"

// export const PredictionCardsIcon = ({ ...props }: IconProps) => (
//   <Icon
//     viewBox="0 0 700 550"
//     stroke="currentColor"
//     fill="currentColor"
//     {...props}
//   >
//     <path d="m513.99 64.82-149.49 1.6797c-10.367 0.11719-20.363 3.1641-28.945 8.5898l-69.125 18.801c-0.25781 0.074219-0.51562 0.15234-0.76562 0.24219l-23.605 8.1992-0.011719-0.023437-0.125 0.066406-2.7148 0.94141c-6.7031 2.3281-12.812 5.8984-18.078 10.457l-20.332 11.145-13.945 7.7656-0.22266-0.30078-2.2188 1.6641-6.8164 3.793c-6.0273 3.3594-11.312 7.7891-15.645 13.02l-35.297 26.414c-0.10156 0.074218-0.19141 0.14453-0.28516 0.22266-11.547 9.2305-18.801 22.398-20.434 37.078-1.6133 14.527 2.457 28.816 11.484 40.285l143.34 211.64c0.16406 0.24219 0.34766 0.48047 0.53125 0.71875 11.238 14.062 27.988 21.168 44.723 20.73 11.559-0.30859 23.109-4.2109 32.84-11.934l39.727-29.281 44.867-8.4688 22.895-4.2969-0.11719 1.793 72.402 2.0039c0.29297-0.011719 0.57031-0.015625 0.86328-0.023438 30.023-0.78906 54.098-28.699 53.762-58.75l-3.2812-258.06c-0.34375-30.504-25.477-56.441-55.977-56.105zm-285.25 75.012c1.5273-2.793 3.457-5.3125 5.6836-7.5078l16.734-9.1719 8.3477-2.9023c-4.4141 10.09-5.7852 21.375-3.7305 32.344l43.82 252.45-72.969-238.35c-0.039062-0.13281-0.085938-0.26172-0.12891-0.40234-3.0273-8.7148-2.2109-18.359 2.2422-26.461zm81.066-17.383 2.8438 225.36-34.574-199.16c-0.011719-0.054687-0.023438-0.11328-0.035157-0.16797-1.6914-8.9766 0.48047-18.324 5.9648-25.648 4.8984-6.5469 12.035-10.992 20.082-12.512l7.2031-1.3555c-1.0391 4.3711-1.543 8.8867-1.4844 13.488zm-107.45 27.535c-0.80469 7.8672 0.0625 15.902 2.6836 23.531l73.258 239.3-102.02-210.18c-0.09375-0.19141-0.19531-0.37891-0.29688-0.56641-4.5625-8.1992-5.3828-17.988-2.2227-26.852 1.0312-2.8945 2.4531-5.6016 4.2109-8.0547l18.793-14.066zm-66.949 91.102c-5.4531-6.8164-7.918-15.34-6.9492-24.008 0.95312-8.6133 5.1953-16.34 11.934-21.789l8.9023-6.6602c0.36328 8.3828 2.625 16.66 6.7422 24.16l100.53 207.12-120.62-178.1c-0.17188-0.24609-0.34766-0.48828-0.53125-0.72266zm415.12 135.37c0.19531 17.742-14.055 32.555-31.781 33.02l-150.01 1.7031c-18.016 0.19531-32.832-14.297-33.035-32.316l-3.2383-256.67c-0.085937-7.2188 2.1562-14.09 6.4609-19.863 0.57813-0.78906 1.1719-1.5195 1.7461-2.168 6.0742-6.8477 14.449-10.754 23.574-10.992l150.01-1.6914c18.016-0.20312 32.84 14.293 33.035 32.316z" />
//   </Icon>
// )

export const PredictionCardsIcon = ({ ...props }: IconProps) => (
  <Icon
    viewBox="0 0 73 52"
    padding={1}
    // stroke="currentColor"
    // fill="currentColor"
    {...props}
  >
    <path
      d="M46.8116 40.5356H26.2174C25.1736 40.5356 24.328 39.69 24.328 38.6462V1.88939C24.328 0.84559 25.1736 0 26.2174 0H46.8116C47.8554 0 48.701 0.84559 48.701 1.88939V38.648C48.701 39.69 47.8554 40.5356 46.8116 40.5356Z"
      fill="#00B3FF"
    />
    <path
      d="M36.8538 44.0252L55.4586 51.8173C56.6533 52.3174 58.0281 51.7555 58.53 50.559L72.5868 16.9991C73.0868 15.8043 72.5249 14.4296 71.3284 13.9277L52.7236 6.13551C51.5289 5.63543 50.1541 6.19734 49.6522 7.39389L35.5954 40.9538C35.0953 42.1485 35.659 43.5233 36.8538 44.0252Z"
      fill="#0084FF"
    />
    <path
      d="M37.5158 43.7142L55.6678 51.3172C56.8625 51.8173 58.2373 51.2554 58.7392 50.0588L72.5868 16.9972C73.0869 15.8025 72.525 14.4277 71.3284 13.9258L53.1765 6.32277C51.9817 5.82269 50.607 6.38459 50.1051 7.58115L36.2574 40.6428C35.7573 41.8393 36.3192 43.2141 37.5158 43.7142Z"
      fill="#00B3FF"
    />
    <path
      d="M36.8665 44.0252L18.2617 51.8173C17.067 52.3174 15.6922 51.7555 15.1903 50.559L1.13356 16.9991C0.633476 15.8043 1.19538 14.4296 2.39194 13.9277L20.9967 6.13551C22.1915 5.63543 23.5662 6.19734 24.0681 7.39389L38.1249 40.9538C38.625 42.1485 38.0613 43.5233 36.8665 44.0252Z"
      fill="#0084FF"
    />
    <path
      d="M36.2046 43.7143L18.0526 51.3173C16.8579 51.8174 15.4831 51.2555 14.9812 50.059L1.13356 16.9991C0.633476 15.8044 1.19538 14.4296 2.39194 13.9277L20.5439 6.32472C21.7387 5.82464 23.1134 6.38655 23.6153 7.5831L37.463 40.6447C37.9631 41.8395 37.4012 43.2142 36.2046 43.7143Z"
      fill="#00B3FF"
    />
  </Icon>
)
