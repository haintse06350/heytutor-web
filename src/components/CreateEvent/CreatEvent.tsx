import React, { useState } from "react";
import { Box, MenuItem } from "@mui/material";
import { useStyles } from "./CreateEvent.style";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const CreateEvent = () => {
  const classes = useStyles();

  const [department, setDepartmentValue] = React.useState("2");
  const handleDepartmentValue = (event: any) => {
    setDepartmentValue(event.target.value);
  };
  const [content, setContent] = useState("");

  const [subject, setSubjectValue] = React.useState("2");
  const handleSubjectValue = (event: any) => {
    setSubjectValue(event.target.value);
  };

  const current = new Date();
  const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
  const [value, setValue] = React.useState(date);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box>
        <div className={classes.title}>
          <h3>Chủ đề</h3>
        </div>
        <TextField id="filled-basic" placeholder="Nhập chủ đề của sự kiện" variant="filled" onChange={(e) => setContent(e.target.value)}/>
        <div className={classes.title}>
          <h3>Nội dung</h3>
        </div>
        <textarea
              className={classes.contentDetailPost}
              placeholder="Nhập nội dung của sự kiện"
              rows={5}
              cols={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}></textarea>
        <Box>
          <div className={classes.title}>
            <h3>Khối ngành</h3>
          </div>
          <Select
            autoFocus
            value={department}
            onChange={handleDepartmentValue}
            inputProps={{
              name: "departmentValue",
              id: "departmentValue",
            }}>
            <MenuItem value="1">SE</MenuItem>
            <MenuItem value="2">IS</MenuItem>
            <MenuItem value="3">MKT</MenuItem>
          </Select>
          <div className={classes.title}>
            <h3>Môn học</h3>
          </div>
          <Select
            autoFocus
            value={subject}
            onChange={handleSubjectValue}
            inputProps={{
              name: "subjectValue",
              id: "subjectValue",
            }}>
            <MenuItem value="1">CDS</MenuItem>
            <MenuItem value="2">MAS</MenuItem>
            <MenuItem value="3">PMG</MenuItem>
          </Select>
        </Box>
        <Box>
          <div className={classes.title}>
            <h3>Chọn thời gian của sự kiện</h3>
          </div>
          <h4>Thời gian bắt đầu</h4>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Start"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <h4>Thời gian kết thúc</h4>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="End"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <Button variant="text">Hủy</Button>
          <Button variant="contained">Tạo sự kiện</Button>
        </Box>
      </Box>
    </div>
  );
};

export default CreateEvent;
