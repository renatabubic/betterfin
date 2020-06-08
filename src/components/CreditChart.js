import React from "react";
import CanvasJSReact from "../canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const findPercentage = (amount, total) => {
  const num = (amount / total) * 100;
  return Number(num.toFixed(2));
};

function CreditChart(props) {
  const creditAmount = props.creditAmount;
  const total = creditAmount.all;
  const refundsPerc = findPercentage(creditAmount.refunds, total);
  const salaryPerc = findPercentage(creditAmount.salary, total);

  const options = {
    animationEnabled: true,
    title: {
      text: "Your Income",
      fontSize: 20,
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "Refunds", y: refundsPerc },
          { name: "Salary", y: salaryPerc },
        ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default CreditChart;
