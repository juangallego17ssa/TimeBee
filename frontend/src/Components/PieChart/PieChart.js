import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = ({ data } /* see data tab */) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 60, right: 60, bottom: 80, left: 60 }}
      innerRadius={0.5}
      startAngle={-110}
      padAngle={6}
      cornerRadius={7}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "spectral" }} //'green-blue' or 'nivo'
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      
      arcLinkLabelsSkipAngle={0}
      arcLinkLabel={(d) => `${d.id}: ${d.value} hours`}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={1}
      arcLinkLabelsDiagonalLength={4}
      arcLinkLabelsStraightLength={4}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      enableArcLabels={true}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 46,
          itemsSpacing: 35,
          itemWidth: 20,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "top-to-bottom",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default MyResponsivePie;
