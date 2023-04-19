// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { useColorModeValue } from "@chakra-ui/react"
import { linearGradientDef } from "@nivo/core"
import { ResponsiveLine } from "@nivo/line"

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SwapChart = ({ data }: { data: any }) => (
  <ResponsiveLine
    data={data}
    margin={{ bottom: 50, top: 10 }}
    xScale={{ type: "point" }}
    yScale={{
      max: "auto",
      min: "auto",
      reverse: false,
      stacked: true,
      type: "linear"
    }}
    yFormat=" >-.2f"
    curve="catmullRom"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      legendOffset: 600,
      legendPosition: "middle",
      tickPadding: 5,
      tickRotation: 0,
      tickSize: 8
    }}
    axisLeft={null}
    enableGridX={false}
    enableGridY={false}
    lineWidth={3}
    enablePoints={false}
    defs={[
      linearGradientDef("gradientA", [
        { color: "inherit", offset: 0 },
        { color: "inherit", offset: 100, opacity: 0 }
      ])
    ]}
    fill={[{ id: "gradientA", match: "*" }]}
    pointSize={0}
    pointColor={{ theme: "background" }}
    pointBorderWidth={4}
    pointBorderColor={{ from: "serieColor", modifiers: [] }}
    pointLabelYOffset={-12}
    enableArea={true}
    areaBlendMode="multiply"
    enableSlices="x"
    colors={["#02e296"]}
    theme={useColorModeValue({}, { textColor: "#fff" })}
    crosshairType="top-left"
    useMesh={true}
    legends={[]}
    motionConfig="wobbly"
  />
)
