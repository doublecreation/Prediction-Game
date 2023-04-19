// let color mode value fit Rules of Hooks
export function handleChangeColorModeValue(
  colorMode: string,
  light: string,
  dark: string
) {
  if (colorMode === "light") return light
  if (colorMode === "dark") return dark
}

// to random an array
export function shuffledArray(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[rand]] = [arr[rand], arr[i]]
  }
  return arr
}
