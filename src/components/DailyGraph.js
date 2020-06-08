import React from "react";
import CanvasJSReact from "../canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DailyGraph(props) {
  const balances = props.balances;
  let dataArray = [];

  for (let i = 0; i < balances.dates.length; i++) {
    dataArray.push({ label: balances.dates[i], y: balances.values[i] });
  }

  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Daily Balance Overview",
    },
    axisY: {
      includeZero: false,
    },
    data: [
      {
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: dataArray,
        backgroundcolor: "#f66652",
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default DailyGraph;
