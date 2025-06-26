// components/DoughnutChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: false
    }
  }
};


const TasksDoughnutChart = ({ completed, inProgress, notStarted }) => {
  const data = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [completed, inProgress, notStarted],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
        borderColor: ["#16a34a", "#eab308", "#b91c1c"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-900 p-5 rounded-lg shadow-md w-full max-w-sm grid place-content-center">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default TasksDoughnutChart;
