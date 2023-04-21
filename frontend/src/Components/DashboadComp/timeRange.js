// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/calendar
import { ResponsiveTimeRange } from '@nivo/calendar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveTimeRange = (data) => (

    <ResponsiveTimeRange
        data={data}
        from="2018-04-01"
        to="2018-12-12"
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                itemCount: 2,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
                translateX: -60,
                translateY: -60,
                symbolSize: 20
            }
        ]}
    />
)

export default MyResponsiveTimeRange