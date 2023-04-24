export const addZero = (number: number): string => {
    if (!number) return "00"
    if (number < 10) return `0${number}`
    return `${number}`
}

export const numberToTime = (number: number): string => {
    if (!number) return "00:00"
    return `${addZero(Math.floor(number / 60))}:${addZero(number % 60)}`
}
