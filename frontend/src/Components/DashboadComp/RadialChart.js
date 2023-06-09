// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/radial-bar
import { ResponsiveRadialBar } from '@nivo/radial-bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveRadialBar = ({ data /* see data tab */ }) => (
    <ResponsiveRadialBar
        data={data}
        valueFormat=">-.2f"
        padding={0.4}
        cornerRadius={2}
        colors={{ scheme: 'spectral' }} //'green-blue' or 'nivo'
        margin={{ top: 40, right: 15, bottom: 40, left: 40 }}
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
        legends={[
            {
                anchor: 'left-top',
                direction: 'column',
                justify: false,
                translateX: -30,
                translateY: -25,
                itemsSpacing: 4,
                itemDirection: 'left-to-right',
                itemWidth: 12,
                itemHeight: 10,
                itemTextColor: '#999',
                symbolSize: 10,
                symbolShape: 'square',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

export default MyResponsiveRadialBar;