/* eslint-disable no-useless-concat */
const styles = {
  global: (props: { colorMode: string }) => ({
    ".swiper-pagination-bullet-active": {
      backgroundColor: "rgba(2,226,150, 1) !important",
      width: "12px",
      height: "12px",
      transition: "0.2s all"
    },
    ".swiper-pagination": {
      alignItems: "center"
    }
  })
}

export default styles
