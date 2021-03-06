import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  Chip,
  InputAdornment,
  Popover,
  Typography,
  Paper,
  FormGroup,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import DateRangePicker from "../DateTimePicker/DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";
import { map, keys } from "lodash";
import { useStyles } from "./FilterAndSearch.style";
import moment from "moment";

const timeOpts = [
  { value: "semester", label: "Kì này" },
  { value: "week", label: "Tuần này" },
  { value: "month", label: "Tháng này" },
  { value: "day", label: "Chọn ngày" },
];

const sortOpts = [
  { value: "deadline", label: "Gần tới deadline nhất" },
  { value: "rate", label: "Rate của người dùng" },
  { value: "contact", label: "Trao đổi gần đây" },
];

export default function FilterAndSearch(props: any) {
  const {
    isMyRequest,
    postCount,
    hashtagCount,
    tabValue,
    onChangeTab,
    onClickHashtag,
    isSelectedHashtag,
    setRegisterDataFilter,
    setMyRequestFilter,
    data,
    filters,
    setFilters,
    setSortBy,
    sortBy,
    resetData,
    onListEvent,
    rawMyRequestData,
  } = props;
  const [dateData, setDateData] = React.useState<DateRange<Date>>([null, null]);
  // const [postStatus, setPostStatus] = React.useState("");
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [finishPickDate, setFinishPickDate] = React.useState(false);
  const [searchBy, setSearchBy] = React.useState("title");
  const [query, setQuery] = React.useState("");

  const onChangeSearchBy = (e: SelectChangeEvent) => {
    setSearchBy(e.target.value);
  };

  const classes = useStyles();
  const hashtagLabels = keys(hashtagCount);

  const onCloseDatePicker = () => {
    setOpenDatePicker(false);
    setFinishPickDate(true);
  };

  const onChangeFilter = (event: any, type: string) => {
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
      if (event.target.value === "day") {
        delete filters["time"];
        setOpenDatePicker(true);
      } else {
        const newFilter = {
          time: event.target.value,
        };
        setFilters({ ...filters, ...newFilter });
      }
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
      case "isConfirmed": {
        count = postCount?.nbOfConfirmedPost;
        labelText = "Đang hỗ trợ";
        break;
      }
      case "isPending": {
        count = postCount?.nbOfPendingPost;
        labelText = "Đang chờ xác nhận";
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

  const renderTabMyRequestLabel = (label: string) => {
    let count = 0;
    let labelText = "";

    switch (label) {
      case "isConfirmed": {
        count = rawMyRequestData?.postHasSupporter.length;
        labelText = "Đã có supporter";
        break;
      }
      case "isActive": {
        count = rawMyRequestData?.postHasRegister.length;
        labelText = "Chưa chọn supporter";
        break;
      }
      case "isPending": {
        count = rawMyRequestData?.postHasNoRegister.length;
        labelText = "Chưa có người đăng kí";
        break;
      }
      case "isOnEvent": {
        count = rawMyRequestData?.postOnEvent.length;
        labelText = "Đang trong sự kiện";
        break;
      }
      case "isDone": {
        count = rawMyRequestData?.postDone.length;
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

  const [viewMoreHashtag, setViewMoreHashtag] = useState(3);

  const handleViewMoreHashtag = () => {
    setViewMoreHashtag(viewMoreHashtag + 3);
  };

  React.useEffect(() => {
    if (query === "") {
      resetData();
    } else {
      let filterData;
      let dataToSearch: any;
      if (searchBy === "title") {
        switch (tabValue) {
          case "isConfirmed": {
            dataToSearch = data?.postHasSupporter;
            break;
          }
          case "isActive": {
            dataToSearch = data?.postHasRegister;
            break;
          }
          case "isPending": {
            dataToSearch = data?.postHasNoRegister;
            break;
          }
          case "isOnEvent": {
            dataToSearch = data?.postOnEvent;
            break;
          }
          case "isDone": {
            dataToSearch = data?.postDone;
            break;
          }
        }
        filterData = dataToSearch?.filter((item: any) => {
          return item.postData.title.toLowerCase().includes(query.toLowerCase());
        });
      }
      if (searchBy === "content") {
        filterData = dataToSearch?.postData.filter((item: any) => {
          return item.postData.content.toLowerCase().includes(query.toLowerCase());
        });
      }

      if (searchBy === "user") {
        filterData = dataToSearch?.postData.filter((item: any) => {
          return item.postData.name.toLowerCase().includes(query.toLowerCase());
        });
      }

      setRegisterDataFilter(filterData);
      setMyRequestFilter(filterData);
    }
  }, [query, searchBy]);

  React.useEffect(() => {
    if (finishPickDate) {
      const date = {
        time: `BETWEEN '${moment(dateData[0]).format("YYYY-MM-DD")}' AND '${moment(dateData[1]).format("YYYY-MM-DD")}'`,
      };
      setFilters({ ...filters, ...date });
    }
  }, [finishPickDate]);

  const TabBar = () => {
    if (isMyRequest) {
      return (
        <TabList onChange={onChangeTab} aria-label="lab API tabs example">
          <Tab label={renderTabMyRequestLabel("isConfirmed")} value="isConfirmed" />
          <Tab label={renderTabMyRequestLabel("isActive")} value="isActive" />
          <Tab label={renderTabMyRequestLabel("isPending")} value="isPending" />
          <Tab label={renderTabMyRequestLabel("isOnEvent")} value="isOnEvent" />
          <Tab label={renderTabMyRequestLabel("isDone")} value="isDone" />
        </TabList>
      );
    } else {
      return (
        <TabList onChange={onChangeTab} aria-label="lab API tabs example">
          <Tab label={renderTabLabel("all")} value="all" />
          <Tab label={renderTabLabel("isConfirmed")} value="isConfirmed" />
          <Tab label={renderTabLabel("isPending")} value="isPending" />
          <Tab label={renderTabLabel("isDone")} value="isDone" />
        </TabList>
      );
    }
  };

  const SearchBasic = () => {
    return (
      <FormGroup>
        <TextField
          classes={{ root: classes.textField }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <Select className={classes.select} value={searchBy} defaultValue="title" onChange={onChangeSearchBy}>
                <MenuItem value="title">Tiêu đề</MenuItem>
                <MenuItem value="user">Người đăng yêu cầu</MenuItem>
                <MenuItem value="content">Nội dung yêu cầu</MenuItem>
              </Select>
            ),
          }}
          id="outlined-basic"
          placeholder="Tìm kiếm yêu cầu theo..."
          variant="outlined"
        />
      </FormGroup>
    );
  };

  if (onListEvent) {
    return <SearchBasic />;
  }

  return (
    <Box className={classes.searchAndFilter} sx={{ width: "100%", typography: "body1" }}>
      <Paper elevation={2} sx={{ px: 2 }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabBar />
          </Box>
        </TabContext>
      </Paper>
      <Grid container item xs={12} spacing={1} sx={{ mt: 2, width: "100%" }}>
        <Grid item xs={6} md={6} sx={{ minWidth: "20%" }}>
          <SearchBasic />
        </Grid>
        <Grid item xs={6} md={3} sx={{ minWidth: "20%" }}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              classes={{ root: classes.textField }}
              id="outlined-select-currency"
              select
              label="Hiển thị theo"
              defaultValue="Kì này"
              value={filters?.time?.includes("BETWEEN") ? "day" : filters.time}
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
        <Grid item xs={4} md={3} sx={{ minWidth: "20%" }}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              classes={{ root: classes.textField }}
              id="outlined-select-currency"
              select
              label="Sắp xếp"
              defaultValue="recent"
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}>
              {sortOpts.map((option: any) => (
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
      </Grid>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
        Lọc theo hashtag
      </Typography>
      <Grid container spacing={1} sx={{ mt: 1, width: "100%" }}>
        {map(hashtagLabels.slice(0, viewMoreHashtag), (label: any) => (
          <Grid key={label} item sx={{ mr: 0.5 }}>
            <Chip
              className={isSelectedHashtag(label) && classes.selectedHashtag}
              classes={{ root: classes.deleteIcon }}
              label={`${label}(${hashtagCount[label]})`}
              variant="outlined"
              onClick={() => onClickHashtag(label)}
            />
          </Grid>
        ))}
        {viewMoreHashtag < hashtagLabels.length && (
          <Grid item sx={{ mr: 0.5 }}>
            <Chip
              classes={{ root: classes.moreFilter }}
              label={`${hashtagLabels.length - viewMoreHashtag}+`}
              variant="outlined"
              onClick={handleViewMoreHashtag}
            />
          </Grid>
        )}
        {viewMoreHashtag === hashtagLabels.length && (
          <Grid item sx={{ mr: 0.5 }}>
            <Chip
              classes={{ root: classes.moreFilter }}
              label="Thu gọn"
              variant="outlined"
              onClick={() => setViewMoreHashtag(3)}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
