import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, MenuItem, Grid, InputAdornment, Popover, Typography, Paper } from "@mui/material";
import DateRangePicker from "../DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";
import { useStyles } from "./FilterAndSearch.style";

const timeOpts = [
  { value: "Tuần này", label: "Tuần này" },
  { value: "Tháng này", label: "Tháng này" },
  { value: "Chọn ngày", label: "Chọn ngày" },
];

export default function FilterAndSearchMyRequest(props: any) {
  const { postCount, tabValue, onChangeTab } = props;
  const [dateData, setDateData] = React.useState<DateRange<Date>>([null, null]);
  const [filters, setFilters]: any = React.useState({ status: "all" });
  // const [postStatus, setPostStatus] = React.useState("");
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  // const [finishPickDate, setFinishPickDate] = React.useState(false);

  const classes = useStyles();

  const onCloseDatePicker = () => {
    setOpenDatePicker(false);
    // setFinishPickDate(true);
  };

  const onChangeFilter = (event: any, type: string) => {
    if (type === "status") {
      // setPostStatus(event.target.value);
    }
    if (type === "hashtag") {
      if (event.length === 0) {
        delete filters["hashtag"];
        setFilters({ ...filters });
      } else {
        const newFilter = {
          hashtag: event,
        };
        setFilters({ ...filters, ...newFilter });
      }
    } else if (type === "time") {
      if (event.target.value === "Chọn ngày") {
        delete filters["time"];
        setOpenDatePicker(true);
      } else {
        const newFilter = {
          time: event.target.value,
        };
        setFilters({ ...filters, ...newFilter });
      }
    } else {
      const newFilter = {
        status: event.target.value,
      };
      setFilters({ ...filters, ...newFilter });
    }
  };

  const renderTabLabel = (label: string) => {
    let count = 0;
    let labelText = "";

    switch (label) {
      case "all": {
        count = postCount?.nbOfAllPost;
        labelText = "Tất cả";
        break;
      }
      case "isActive": {
        count = postCount?.nbOfActivePost;
        labelText = "Đang trao đổi";
        break;
      }
      case "isConfirmed": {
        count = postCount?.nbOfConfirmedPost;
        labelText = "Đã xác chọn người support";
        break;
      }
      case "isPending": {
        count = postCount?.nbOfPendingPost;
        labelText = "Chưa có người đăng kí";
        break;
      }
      case "isDone": {
        count = postCount?.nbOfDonePost;
        labelText = "Đã xong";
        break;
      }
    }

    return (
      <div className={classes.tab}>
        <Typography>{labelText}</Typography>
        <span>{count}</span>
      </div>
    );
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Paper elevation={2} sx={{ px: 2 }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={onChangeTab} aria-label="lab API tabs example">
              <Tab label={renderTabLabel("all")} value="all" />
              <Tab label={renderTabLabel("isActive")} value="isActive" />
              <Tab label={renderTabLabel("isConfirmed")} value="isConfirmed" />
              <Tab label={renderTabLabel("isPending")} value="isPending" />
              <Tab label={renderTabLabel("isDone")} value="isDone" />
            </TabList>
          </Box>
        </TabContext>
      </Paper>
      <Grid container item xs={12} spacing={1} sx={{ mt: 2, width: "100%" }}>
        <Grid item xs={4} md={3} sx={{ minWidth: "20%" }}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              autoFocus
              classes={{ root: classes.textField }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              id="outlined-basic"
              placeholder="Search here..."
              variant="outlined"
            />
          </Box>
        </Grid>
        <Grid item xs={4} md={3} sx={{ minWidth: "20%" }}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              classes={{ root: classes.textField }}
              id="outlined-select-currency"
              select
              label="Thời gian"
              defaultValue="Tuần này"
              value={filters.time}
              onChange={(e: any) => onChangeFilter(e, "time")}>
              {timeOpts.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Popover
            open={openDatePicker}
            onClose={onCloseDatePicker}
            anchorOrigin={{ vertical: "center", horizontal: "center" }}
            transformOrigin={{ vertical: "center", horizontal: "center" }}>
            <DateRangePicker setValue={setDateData} value={dateData} />
          </Popover>
        </Grid>
        {/* <Grid item xs={4} md={3} sx={{ minWidth: "20%" }}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              classes={{ root: classes.textField }}
              id="outlined-select-currency"
              select
              label="Thời gian"
              defaultValue="Tuần này"
              value={filters.time}
              onChange={(e: any) => onChangeFilter(e, "time")}>
              {timeOpts.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Popover
            open={openDatePicker}
            onClose={onCloseDatePicker}
            anchorOrigin={{ vertical: "center", horizontal: "center" }}
            transformOrigin={{ vertical: "center", horizontal: "center" }}>
            <DateRangePicker setValue={setDateData} value={dateData} />
          </Popover>
        </Grid> */}
      </Grid>
      {/* <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
        Lọc theo người đăng kí hỗ trợ
      </Typography>
      <Grid container spacing={1} sx={{ mt: 1, width: "100%" }}>
        {map(keys(userFilter), (label: any) => (
          <Grid key={label} item sx={{ mr: 0.5 }}>
            <Chip
              className={isSelectedHashtag(label) && classes.selectedHashtag}
              classes={{ root: classes.deleteIcon }}
              label={`${label}(${userFilter[label]})`}
              variant="outlined"
              onClick={() => onClickHashtag(label)}
            />
          </Grid>
        ))}
      </Grid> */}
    </Box>
  );
}
