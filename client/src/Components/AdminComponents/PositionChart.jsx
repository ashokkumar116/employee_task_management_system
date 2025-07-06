import React from "react";
import { Chart } from "primereact/chart";

const PositionChart = ({ data }) => {
  const backgroundColors = [
    "#36A2EB", // blue
    "#FF6384", // pink
    "#FFCE56", // yellow
    "#4BC0C0", // teal
    "#9966FF", // purple
    "#FF9F40", // orange
    "#8B5CF6", // indigo
    "#10B981", // green
    "#F59E0B", // amber
    "#EF4444", // red
    "#14B8A6", // cyan
    "#EC4899", // rose
  ];

  const chartData = {
    labels: data.map((item) => item.position),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: backgroundColors.slice(0, data.length),
        borderColor: "#1f2937", // dark gray border
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display:false,
        labels: {
          color: "#ffffff", // white text
        },
      },
    },
  };

  

  return <Chart type="doughnut" data={chartData} options={options} />;
};

export default PositionChart;
