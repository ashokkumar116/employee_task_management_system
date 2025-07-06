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

const EmployeeDoughnutChart = ({ admins, employees }) => {
  const data = {
    labels: ["Admins", "Employees"],
    datasets: [
      {
        data: [admins,employees],
        backgroundColor: [ "#10b981","#3b82f6"],
        borderColor: [ "#047857","#1e40af"], 
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className=" p-5 rounded-lg shadow-md w-full max-w-sm grid place-content-center">
      <Doughnut data={data} options={options}/>
    </div>
  );
};

export default EmployeeDoughnutChart;
