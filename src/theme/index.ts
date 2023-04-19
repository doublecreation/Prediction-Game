import { extendTheme } from "@chakra-ui/react"
import colors from "./colors"
import styles from "./styles"

import { config } from "./config"
import { Progress } from "./components/Progress"

export const theme = extendTheme({
  fonts: {
    heading: "Archivo Black, sans-serif",
    body: "Poppins, sans-serif"
    // heading: "Poppins, sans-serif"
  },
  components: {
    Progress
  },
  shadows: {
    heading: `0px -4px 0 #212121,  
                0px -4px 0 #212121,
                0px  4px 0 #212121,
                0px  4px 0 #212121,
                -4px  0px 0 #212121,  
                4px  0px 0 #212121,
                -4px  0px 0 #212121,
                4px  0px 0 #212121,
                -4px -4px 0 #212121,  
                4px -4px 0 #212121,
                -4px  4px 0 #212121,
                 4px  4px 0 #212121,
                -4px  8px 0 #212121,
                 0px  8px 0 #212121,
                 4px  8px 0 #212121,
                 0 19px 1px rgba(0,0,0,.1),
                 0 0 6px rgba(0,0,0,.1),
                 0 6px 3px rgba(0,0,0,.3),
                 0 12px 6px rgba(0,0,0,.2),
                 0 18px 18px rgba(0,0,0,.25),
                 0 24px 24px rgba(0,0,0,.2),
                 0 36px 36px rgba(0,0,0,.15)
                 `,
    body: `1px 1px 0 #212121`
  },
  config,
  colors,
  styles
})
