// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({ data, keys /* see data tab */ }) => (
    
    <ResponsiveBar
        data={data}
        // keys={[
        //     'unassigned',
        //     'project1',
        //     'project2',
        //     'project3']}
        keys={keys}
        indexBy="date"
        margin={{ top: 70, right: 10, bottom: 50, left: 60 }}
        padding={0.3}
        layout="vertical"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'spectral' }} //'green-blue' or 'nivo'
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 4,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Days',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickValues: 5,
            tickRotation: 0,
            legend: 'hours',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        enableGridX={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'top-right',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: -40,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'bottom-to-top',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        
        tooltip={({ id, data }) => {
            return(
                <div className='flex flex-col bg-stone-100 rounded-3xl text-zinc-600 text-sm p-2'>
                    {data.date}

                    <div className='flex text-sm text-black'>{id}: {data[id]} hours</div>
                </div>)
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        // barAriaLabel={function(e){return e.date+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
)


export default MyResponsiveBar;