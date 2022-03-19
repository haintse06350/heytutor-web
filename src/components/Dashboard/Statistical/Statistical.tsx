import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Grid, InputLabel, Select, MenuItem } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Thống kê người dùng",
    },
  },
};
const labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"];
export const data = {
  labels,
  datasets: [
    {
      label: "Người có vấn đề cần giúp đỡ",
      data: labels.map(() => Math.floor(Math.random() * 1000) + 1),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Người đi giúp đỡ",
      data: labels.map(() => Math.floor(Math.random() * 1000) + 1),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const Statistical = () => {
  const [selectRoleUser, setSelectRoleUser] = useState(1);
  const [selectTime, setSelectTime] = useState(1);

  useEffect(() => {}, []);
  return (
    <>
      <Grid container>
        <Grid item lg={4} md={6} xs={12}>
          <InputLabel id="select-role-user">Hiện thị theo</InputLabel>
          <Select value={selectRoleUser} onChange={(e) => setSelectRoleUser(e.target.value as number)}>
            <MenuItem value={1}>Số lượng người dùng</MenuItem>
            <MenuItem value={2}>Số lượng bài đăng</MenuItem>
            <MenuItem value={3}>Số lượng Event</MenuItem>
          </Select>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <InputLabel id="select-role-user">Thời gian</InputLabel>
          <Select value={selectTime} onChange={(e) => setSelectTime(e.target.value as number)}>
            <MenuItem value={1}>Hôm nay</MenuItem>
            <MenuItem value={2}>Tuần này</MenuItem>
            <MenuItem value={3}>Tháng này</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Bar options={options} data={data} />
    </>
  );
};

export default Statistical;
