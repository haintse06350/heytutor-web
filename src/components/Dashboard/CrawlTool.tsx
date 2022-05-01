import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Typography,
  InputLabel,
  InputAdornment,
  Input,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import CookieIcon from "@mui/icons-material/Cookie";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Fap } from "../../models/fap";
import { keys, map, filter, pick } from "lodash";
import { TERMS } from "../../constants/terms";
import { useStyles } from "./Dashboard.style";
import { Admin } from "../../models/admin";

const CrawlTool = () => {
  const classes = useStyles();
  const [dataStudent, setDataStudent]: any = useState(null);
  const [dataCourse, setDatacourse]: any = useState(null);
  const [dataClass, setDataClass]: any = useState(null);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie]: any = useState(null);
  const [progress, setProgress] = useState(0);
  const [dataTab, setDataTab] = useState(1);

  const [countStudents, setCountStudent] = useState(0);
  const [countCourse, setCountCourse] = useState(0);
  const [countClass, setCountClass] = useState(0);

  const [isStartedFetchingData, setIsStartedFetchingData] = useState(false);
  const [isFinishedFetchingData, setIsFinishedFetchingData] = useState(false);

  const onClickFetchData = async () => {
    setLoading(true);
    await Admin.fetchFapData("", { cookie, termId: term });
    setProgress(100);
    setIsFinishedFetchingData(true);
  };

  const onChangeDataTab = (tab: number) => {
    setDataTab(tab);
  };

  const onChangeTerm = (event: any) => {
    setTerm(event.target.value);
  };

  const renderHeaderName = (field: string) => {
    switch (field) {
      case "id": {
        return "Id";
      }
      case "stdId": {
        return "Student Id";
      }
      case "stdCode": {
        return "Student Code";
      }
      case "fullName": {
        return "Full Name";
      }
      case "classId": {
        return "Class Id";
      }
      case "className": {
        return "Class Name";
      }
      case "semester": {
        return "Semester";
      }
      case "subject": {
        return "Subject";
      }
    }
  };

  const renderHeaderClassName = (field: string) => {
    switch (field) {
      case "id": {
        return "Id";
      }
      case "classId": {
        return "Class Id";
      }
      case "className": {
        return "Class Name";
      }
      case "deptId": {
        return "Department Id";
      }
      case "courseId": {
        return "Course Id";
      }
    }
  };

  const renderHeaderCourseName = (field: string) => {
    switch (field) {
      case "id": {
        return "Id";
      }
      case "courseId": {
        return "Course Id";
      }
      case "courseCode": {
        return "Course Code";
      }
      case "courseName": {
        return "Course Name";
      }
      case "deptId": {
        return "Department Id";
      }
    }
  };

  const loadingData = !dataStudent && !dataCourse && !dataClass;

  const renderHeaderWidth = (field: string) => {
    if (field === "courseName") return 500;
    if (field === "fullName") return 250;
    return 70 + field.length * 15;
  };

  const getStudentData = async () => {
    const [students, classes, courses] = await Promise.all([
      Fap.listStudents({ limit: 10000, offset: 0 }),
      Fap.listClass({ limit: 10000, offset: 0 }),
      Fap.listCourse({ limit: 10000, offset: 0 }),
    ]);

    const columnsStd = filter(
      keys(students.rows[0]),
      (key: string) => key !== "createdAt" && key !== "updatedAt" && key !== "imageUrl" && key !== "major"
    );
    const columnsClass = filter(keys(classes.rows[0]), (key: string) => key !== "createdAt" && key !== "updatedAt");
    const columnsCourse = filter(keys(courses.rows[0]), (key: string) => key !== "createdAt" && key !== "updatedAt");

    const formatStdColumns = map(columnsStd, (cl: any) => {
      return {
        field: cl,
        headerName: renderHeaderName(cl),
        width: renderHeaderWidth(cl),
      };
    });
    const formatClassColumns = map(columnsClass, (cl: any) => {
      return {
        field: cl,
        headerName: renderHeaderClassName(cl),
        width: renderHeaderWidth(cl),
      };
    });
    const formatCourseColumns = map(columnsCourse, (cl: any) => {
      return {
        field: cl,
        headerName: renderHeaderCourseName(cl),
        width: renderHeaderWidth(cl),
      };
    });

    const rowsStd = map(students.rows, (row: any) => pick(row, columnsStd));
    const rowsClass = map(classes.rows, (row: any) => pick(row, columnsClass));
    const rowsCourse = map(courses.rows, (row: any) => pick(row, columnsCourse));

    setDataStudent({ columns: formatStdColumns, rows: rowsStd });
    setDataClass({ columns: formatClassColumns, rows: rowsClass });
    setDatacourse({ columns: formatCourseColumns, rows: rowsCourse });
  };

  const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="h5" color="primary">{`${props.value.toFixed(1)}%`}</Typography>
        </Box>
      </Box>
    );
  };

  const renderData = () => {
    let data: any = null;
    if (dataTab === 1) {
      data = dataStudent;
    } else if (dataTab === 2) {
      data = dataClass;
    } else if (dataTab === 3) {
      data = dataCourse;
    }

    return (
      <DataGrid
        {...data}
        pageSize={20}
        rowsPerPageOptions={[20, 40, 60]}
        loading={!dataStudent}
        components={{ Toolbar: GridToolbar }}
      />
    );
  };

  const loadingState = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          height: 400,
        }}>
        <CircularProgress size={45} />
        <Typography sx={{ mt: 1 }} variant="h5" color="primary">
          Fetching...
        </Typography>
      </Box>
    );
  };

  useEffect(() => {
    let timer: any = null;
    if (loading) {
      timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 0.1));
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setIsStartedFetchingData(true);
      }, 3000);
    }
  }, [loading]);

  const renderImportDataUI = () => {
    return (
      <div className={classes.importContainer}>
        <FormControl variant="standard" sx={{ width: "80%" }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            Paste FAP cookie here (use FPT edu account login to FAP to get cookie)
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            onChange={(e) => setCookie(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <CookieIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={classes.selectTerm}>
          <InputLabel id="select-term">Term</InputLabel>
          <Select
            labelId="select-term"
            id="simple-select-autowidth"
            value={term}
            onChange={onChangeTerm}
            autoWidth
            label="Term">
            {TERMS.map((option) => (
              <MenuItem key={option.termId} value={option.termId}>
                {option.termName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LoadingButton
          classes={{ root: classes.buttonFetch }}
          fullWidth
          disabled={Boolean(cookie) === false}
          onClick={onClickFetchData}
          loading={loading}
          loadingIndicator="Fetching..."
          variant="outlined">
          Fetch data
        </LoadingButton>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        )}
        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", mt: 4 }}>
          <Box sx={{ width: "40%" }} display="flex" justifyContent="flex-start">
            <Typography
              className={dataTab === 1 && classes.activeTab}
              onClick={() => onChangeDataTab(1)}
              align="left"
              variant="subtitle1"
              color={dataTab === 1 ? "primary" : "textSecondary"}>
              Students
            </Typography>
            <Typography
              className={dataTab === 2 && classes.activeTab}
              onClick={() => onChangeDataTab(2)}
              sx={{ ml: 2 }}
              align="left"
              variant="subtitle1"
              color={dataTab === 2 ? "primary" : "textSecondary"}>
              Courses
            </Typography>
            <Typography
              className={dataTab === 3 && classes.activeTab}
              onClick={() => onChangeDataTab(3)}
              sx={{ ml: 2 }}
              align="left"
              variant="subtitle1"
              color={dataTab === 3 ? "primary" : "textSecondary"}>
              Classes
            </Typography>
          </Box>
          <Box sx={{ width: "60%" }} display="flex" alignItems="center" justifyContent="flex-end">
            <Typography variant="subtitle1" color="textSecondary">
              Student count:{" "}
              <Typography component={"span"} variant="h4" color="primary" sx={{ ml: 1 }}>
                {countStudents}
              </Typography>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" sx={{ ml: 2 }}>
              Course count:{" "}
              <Typography component={"span"} variant="h4" color="primary" sx={{ ml: 1 }}>
                {countCourse}
              </Typography>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" sx={{ ml: 2 }}>
              Class count:{" "}
              <Typography component={"span"} variant="h4" color="primary" sx={{ ml: 1 }}>
                {countClass}
              </Typography>
            </Typography>
          </Box>
        </Box>
        <div style={{ height: 700, width: "100%", marginTop: 20, backgroundColor: "#919eab1f" }}>
          {!loadingData ? renderData() : loadingState()}
        </div>
      </div>
    );
  };

  useEffect(() => {
    let intervalFetchingData: any = null;

    intervalFetchingData = setInterval(() => {
      isStartedFetchingData && getStudentData() && countData();
    }, 3000);

    if (isFinishedFetchingData) {
      clearInterval(intervalFetchingData);
    }

    return () => {
      clearInterval(intervalFetchingData);
    };
  }, [isStartedFetchingData, isFinishedFetchingData]);

  const countData = async () => {
    const [studentData, courseData, classData] = await Promise.all([
      Fap.countStudents(),
      Fap.countCourse(),
      Fap.countClass(),
    ]);

    setCountStudent(studentData);
    setCountClass(classData);
    setCountCourse(courseData);
  };

  useEffect(() => {
    countData();
    getStudentData();
  }, []);

  return <Box sx={{ display: "flex", width: "100%" }}>{renderImportDataUI()}</Box>;
};

export default CrawlTool;
