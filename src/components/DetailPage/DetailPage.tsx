/* eslint-disable no-unused-vars */
import React from "react";
// import { useNavigate } from "react-router-dom";
import { useStyles } from "./DetailPage.style";
import Page from "../../layout/Page";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  Grid,
  Chip,
  InputAdornment,
  Popover,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DateRangePicker from "./DateRangePicker";
import MultiSelectUnstyled, { MultiSelectUnstyledProps } from "@mui/base/MultiSelectUnstyled";
import { selectUnstyledClasses } from "@mui/base/SelectUnstyled";
import OptionUnstyled, { optionUnstyledClasses } from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import { DateRange } from "@mui/lab/DateRangePicker";
import { TableContent } from "./TableContent";

import SearchIcon from "@mui/icons-material/Search";
import BreadcrumbsTab from "../Common/Breadcrumbs/Breadcrumbs";
import { values, map, uniq, compact, flattenDeep } from "lodash";
import moment from "moment";
import { Post } from "../../models/post";
import { filter } from "lodash";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 0.75em;
  padding: 14px 16.5px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      margin-left: 8px;
      content: '▴';
    }
  }

  &::after {
    margin-left: 8px;
    content: '▾';
    float: right;
  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 320px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const renderValue = (option: any) => {
  if (option.length === 0) {
    return <span>Select hashtag...</span>;
  }

  return <span>Select hashtag...</span>;
};
const CustomMultiSelect = React.forwardRef(function CustomMultiSelect(
  props: MultiSelectUnstyledProps<any>,
  ref: React.ForwardedRef<any>
) {
  const components: MultiSelectUnstyledProps<number>["components"] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <MultiSelectUnstyled {...props} ref={ref} components={components} />;
});

const filterOptions = [
  {
    value: "all",
    label: "Tất cả",
  },
  {
    value: "isConfirmed",
    label: "Confirmed",
  },
  {
    value: "isPending",
    label: "Pending",
  },
  {
    value: "isActive",
    label: "Active",
  },
  {
    value: "isDone",
    label: "Done",
  },
];

const timeOpts = [
  { value: "Tuần này", label: "Tuần này" },
  { value: "Tháng này", label: "Tháng này" },
  { value: "Chọn ngày", label: "Chọn ngày" },
];

export const DetailPage = () => {
  const classes = useStyles();
  // const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;
  const detail = urlParams.get("detail");

  const isMyRequest = pathname.includes("my-request");
  const isRegistered = pathname.includes("registered-request");

  const [filters, setFilters]: any = React.useState({ status: "all" });
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [finishPickDate, setFinishPickDate] = React.useState(false);
  const [postData, setPostData] = React.useState(null);
  const [listHashtag, setListHashtag]: any = React.useState(null);
  const [dateData, setDateData] = React.useState<DateRange<Date>>([null, null]);
  const [postStatus, setPostStatus] = React.useState("");

  const onChangeFilter = (event: any, type: string) => {
    if (type === "status") {
      setPostStatus(event.target.value);
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

  const onCloseDatePicker = () => {
    setOpenDatePicker(false);
    setFinishPickDate(true);
  };

  const onDeleteFilter = (type: string, item: string) => {
    if (type === "hashtag") {
      const filterHashtag = filter(filters.hashtag, (o: string) => o !== item);
      filters.hashtag = filterHashtag;
    } else {
      for (const key in filters) {
        if (filters[key] === item) {
          delete filters[key];
        }
      }
    }
    setFilters({ ...filters });
  };

  const renderHashtag = (item: any) => {
    return map(item, (tag: any) => {
      return (
        <Chip
          key={tag}
          label={tag}
          classes={{ root: classes.deleteIcon }}
          onDelete={() => onDeleteFilter("hashtag", tag)}
        />
      );
    });
  };

  React.useEffect(() => {
    if (detail) {
      const newFilter = {
        status: detail,
      };
      setFilters({ ...filters, ...newFilter });
    }
  }, [detail]);

  React.useEffect(() => {
    let time: any = null;
    const compactDateData = compact(dateData);
    if (finishPickDate) {
      if (compactDateData.length === 1) {
        time = { date: moment(compactDateData[0].toString()).format("MMM Do YY") };
      } else {
        time = {
          fromto: `
            Từ ${moment(compactDateData[0].toString()).format("MMM Do YY")} Tới ${moment(
            compactDateData[1].toString()
          ).format("MMM Do YY")}
          `,
        };
      }
      setFilters({ ...filters, ...time });
    }
  }, [finishPickDate]);

  React.useEffect(() => {
    if (postData) {
      const listHashtag = map(postData, (item: any) => {
        return JSON.parse(item["Post.hashtag"]);
      });
      const uniqHashTag = uniq(flattenDeep(listHashtag));
      setListHashtag(uniqHashTag);
    }
  }, [postData]);

  React.useEffect(() => {
    if (filters) {
      const statusFilter = filters.status;
      const hashtagFilter = filters.hashtag;
      let filterOptions = {};
      let hashtagOptions = {};

      if (statusFilter) {
        filterOptions = {
          type: statusFilter,
          value: 1,
        };
      }
      if (hashtagFilter) {
        hashtagOptions = {
          type: "hashtag",
          value: hashtagFilter,
        };
      }

      Post.getListPostByFilter({ filters: [filterOptions, hashtagOptions] }).then((res) => {
        setPostData(res);
      });
    }
  }, [filters]);

  // console.log(filters);

  const isHashTag = (item: any) => {
    if (filters["hashtag"] === item) {
      return true;
    }
  };

  return (
    <Box sx={{ mt: 10 }}>
      <Page className={classes.detailRoot}>
        <Box sx={{ pb: 5 }}>
          <BreadcrumbsTab
            history={[{ title: "Home", href: "/" }]}
            current={{ title: isMyRequest ? "My requests" : isRegistered ? "Registered Requests" : "" }}
          />
        </Box>
        <Box sx={{ pb: 3, mr: 1 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: 16,
                padding: "0px 8px",
              }}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  id="outlined-basic"
                  placeholder={`Search for a ${isRegistered ? "request" : "post"}`}
                  variant="outlined"
                />
              </Box>
            </div>
            <Grid container item xs={12} spacing={1} sx={{ width: "100%" }}>
              <Grid item xs={6} md={3} sx={{ minWidth: "20%" }}>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    id="outlined-select-currency"
                    select
                    label="Trạng thái"
                    value={filters.status}
                    onChange={(e: any) => onChangeFilter(e, "status")}>
                    {filterOptions.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={6} md={3} sx={{ minWidth: "20%" }}>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    id="outlined-select-currency"
                    select
                    label="Thời gian"
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
              <Grid item xs={12} md={3} sx={{ minWidth: "20%", "& > form": { height: "100%" } }}>
                <Box component="form" noValidate autoComplete="off">
                  <CustomMultiSelect onChange={(e: any) => onChangeFilter(e, "hashtag")} renderValue={renderValue}>
                    {listHashtag?.map((option: any, index: number) => (
                      <StyledOption key={index} value={option}>
                        {option}
                      </StyledOption>
                    ))}
                  </CustomMultiSelect>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 1, width: "100%" }}>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Đang trongg event" />
                <FormControlLabel control={<Checkbox />} label="Disabled" />
              </FormGroup>
            </Grid>

            <Grid container spacing={1} sx={{ mt: 1, width: "100%" }}>
              {map(values(filters), (item: any) => (
                <Grid item sx={{ mr: 0.5 }}>
                  {isHashTag(item) ? (
                    renderHashtag(item)
                  ) : (
                    <Chip
                      classes={{ root: classes.deleteIcon }}
                      label={item}
                      variant="outlined"
                      onDelete={() => onDeleteFilter("filter", item)}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>
        <Box sx={{ pb: 5, width: "100%" }}>
          <Paper sx={{ width: "100%" }} elevation={2}>
            <TableContent data={postData} status={postStatus} />
          </Paper>
        </Box>
      </Page>
    </Box>
  );
};
