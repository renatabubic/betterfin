import React from "react";
import CanvasJSReact from "../../canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function MonthlyGraph(props) {
  const balances = props.balances;
  let dataArray = [];

  for (let i = 0; i < balances.months.length; i++) {
    dataArray.push({ label: balances.months[i], y: balances.values[i] });
  }

  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Monthly Balance Overview",
    },
    axisY: {
      includeZero: false,
    },
    data: [
      {
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: dataArray,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default MonthlyGraph;
