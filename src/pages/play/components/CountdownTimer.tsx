import { HStack, Icon, Text } from "@chakra-ui/react"
import { useCountDown } from "ahooks"
import { type FC, useMemo, useRef } from "react"

export type CountdownTimerProps = {
  timeTo: number
}

function toDateTime(secs: number) {
  const t = new Date(Date.UTC(1_970, 0, 1))
  t.setUTCSeconds(secs)
  return t
}

export const CountdownTimer: FC<CountdownTimerProps> = ({ timeTo }) => {
  const timerRef = useRef<Date>()

  const timerMemo = useMemo(() => {
    timerRef.current = toDateTime(timeTo)
    return timerRef.current
  }, [timeTo])

  const [, formattedResponse] = useCountDown({
    targetDate: timerMemo
  })

  const { days, hours, minutes, seconds } = formattedResponse

  return (
    <Text fontSize={{ base: 32, md: 32 }} w="full" textAlign="center">
      ~ {minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:
      {seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}
    </Text>
  )
}
