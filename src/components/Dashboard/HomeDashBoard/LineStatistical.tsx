import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Tương tác người dùng",
    },
  },
};

const labels = ["January", "February", "March", "April", "May"];

export const data = {
  labels,
  datasets: [
    {
      label: "Người có nhu cầu giúp đỡ",
      data: labels.map(() => Math.floor(Math.random() * 1000) + 1),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Người đi hỗ trợ",
      data: labels.map(() => Math.floor(Math.random() * 1000) + 1),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Vấn đề hỗ trợ thành công",
      data: labels.map(() => Math.floor(Math.random() * 1000) + 1),
      borderColor: "rgb(0, 128, 0)",
      backgroundColor: "rgba(0, 128, 0, 0.5)",
    },
  ],
};

export function LineStatistical() {
  return <Line options={options} data={data} />;
}
