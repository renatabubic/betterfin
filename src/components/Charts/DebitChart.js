import React from "react";
import CanvasJSReact from "../../canvasjs.react";
import { findPercentage } from "../../helperFunctions";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DebitChart(props) {
  const debitAmount = props.debitAmount;
  const total = debitAmount.all;
  const insurancePerc = findPercentage(debitAmount.insurance, total);
  const otherPerc = findPercentage(debitAmount.other, total);
  const utilitiesPerc = findPercentage(debitAmount.utilities, total);
  const transfersPerc = findPercentage(debitAmount.transfers, total);
  const onlineServicesPerc = findPercentage(debitAmount.onlineServices, total);

  const options = {
    animationEnabled: true,
    title: {
      text: "Your Expenses",
      fontSize: 20,
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "Insurance", y: insurancePerc },
          { name: "Transfers", y: transfersPerc },
          { name: "Online Services", y: onlineServicesPerc },
          { name: "Utilities", y: utilitiesPerc },
          { name: "Other", y: otherPerc },
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

export default DebitChart;
