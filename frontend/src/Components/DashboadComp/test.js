import {TimeRange} from "@nivo/calendar";


const MyTimeRange = () => {

const data = [
  {
    id: 'response time',
    data: [
      { x: '2023-04-18', y: 1500 },
      { x: '2023-04-19', y: -100 },
      { x: '2023-04-20', y: 200 },
      { x: '2023-04-21', y: -50 },
      { x: '2023-04-22', y: 100 },
    ],
  },
]

    const getColor = (value) => value >= 0 ? 'green' : 'red';


    return(
<TimeRange
  data={data}
  xScale={{
    type: 'time',
    format: 'yyyy-MM-dd',
    useUTC: false,
    precision: 'day',
  }}
  yScale={{
    type: 'linear',
    min: -300,
    max: 300,
    stacked: false,
    reverse: false,
  }}
  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
  colors={getColor}
  enableSlices={false}
  axisTop={null}
  axisRight={null}
  axisBottom={{
    format: '%b %d',
    tickValues: 'every day',
    legend: 'Date',
    legendOffset: 40,
  }}
  axisLeft={{
    tickValues: [-300, -200, -100, 0, 100, 200, 300],
    legend: 'Response Time',
    legendOffset: -50,
  }}
/>
    )
}

export default MyTimeRange