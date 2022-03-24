import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  FormControl,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  InputLabel,
  InputAdornment,
  Input,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
// import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CookieIcon from "@mui/icons-material/Cookie";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EventIcon from "@mui/icons-material/Event";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Student } from "../../models/student";
import { keys, map, filter, pick } from "lodash";
import { TERMS } from "../../constants/terms";
import { useStyles } from "./Dashboard.style";
import { Admin } from "../../models/admin";
import HomeManager from "./HomeDashBoard/HomeManager";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ManagerUser from "./ManagerUser/ManagerUser";
import PeopleIcon from "@mui/icons-material/People";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeIcon from "@mui/icons-material/Home";
import ManagePost from "./ManagePost/MangePost";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { stringAvatar } from "../UserProfile/helper";
import HomeManageCTV from "./HomeDashBoard/HomeManageCTV";

import NewspaperIcon from "@mui/icons-material/Newspaper";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import FlagIcon from "@mui/icons-material/Flag";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import ReportIcon from "@mui/icons-material/Report";
import BugReportIcon from "@mui/icons-material/BugReport";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PushPinIcon from "@mui/icons-material/PushPin";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Dashboard = () => {
  const theme = useTheme();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openTab, setOpenTab] = useState(false);
  const [activeTab, setActiveTab] = useState("manager-home");
  const [dataStudent, setDataStudent]: any = useState(null);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useState("");
  // const [progress, setProgress] = useState(0);

  const onClickFetchData = async () => {
    setLoading(true);
    await Admin.fetchFapData("", { cookie, termId: term });
  };

  const onChangeTab = (tab: string) => {
    setActiveTab(tab);
  };

  const onChangeTerm = (event: any) => {
    setTerm(event.target.value);
  };

  const onOpenDrawer = () => {
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setOpen(false);
  };

  const handleClick = (e: any) => {
    setOpenTab(!openTab);
    console.log(e.currentTarget.value);
  };

  const renderDemoData = () => {
    if (!dataStudent) return "Loading...";
    return (
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          {...dataStudent}
          pageSize={20}
          rowsPerPageOptions={[20, 40, 60]}
          loading={!dataStudent}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    );
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
      case "major": {
        return "Major";
      }
      case "imageUrl": {
        return "Image Url";
      }
    }
  };

  const renderHeaderWidth = (field: string) => {
    if (field === "imageUrl") return 300;
    return 70 + field.length * 15;
  };

  const getStudentData = async () => {
    const res: any = await Student.list({ limit: 100, offset: 0 });
    const columns = filter(
      keys(res.rows[0]),
      (key: string) => key !== "createdAt" && key !== "updatedAt" && key !== "imageUrl" && key !== "major"
    );
    const formatColumns = map(columns, (cl: any) => {
      return {
        field: cl,
        headerName: renderHeaderName(cl),
        width: renderHeaderWidth(cl),
      };
    });
    const rows = map(res.rows, (row: any) => pick(row, columns));
    setDataStudent({ columns: formatColumns, rows });
  };

  // const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  //   return (
  //     <Box sx={{ display: "flex", alignItems: "center" }}>
  //       <Box sx={{ width: "100%", mr: 1 }}>
  //         <LinearProgress variant="determinate" {...props} />
  //       </Box>
  //       <Box sx={{ minWidth: 35 }}>
  //         <Typography variant="body2" color="text.secondary">{`${props.value.toFixed(1)}%`}</Typography>
  //       </Box>
  //     </Box>
  //   );
  // };

  useEffect(() => {
    getStudentData();
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 0.1));
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  // useEffect(() => {
  //   const es = new EventSource("http://localhost:3001/fap-data");

  //   const listener = function (event: any) {
  //     const type = event.type;

  //     window.console.log(`${type}: ${event.data || es.url}`);

  //     if (type === "result") {
  //       es.close();
  //     }
  //   };

  //   es.addEventListener("open", listener);
  //   es.addEventListener("message", listener);
  //   es.addEventListener("error", listener);
  //   es.addEventListener("result", listener);
  // }, []);

  const renderContent = () => {
    console.log(activeTab);
    switch (activeTab) {
      case "Import Data": {
        return renderImportDataUI();
      }
      case "Export Data": {
        return renderDemoData();
      }
      case "manager-post": {
        return <ManagePost />;
      }

      case "Quản lí sự kiện": {
        return <div>Quản lí sự kiện</div>;
      }
      case "Quản lí người dùng": {
        return <div>Quản lí người dùng</div>;
      }
      case "manager-ctv": {
        return <ManagerUser />;
      }

      case "manager-home": {
        return <HomeManager />;
      }
      case "home-manage-ctv": {
        return <HomeManageCTV />;
      }
    }
  };

  const renderImportDataUI = () => {
    return (
      <div className={classes.importContainer}>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Paste FAP cookie here</InputLabel>
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
          disabled={!term && !cookie}
          onClick={onClickFetchData}
          loading={loading}
          loadingIndicator="Loading..."
          variant="outlined">
          Fetch data
        </LoadingButton>
        {/* {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        )} */}
      </div>
    );
  };

  const [filterName, setFilterName] = useState("manager-home");
  const [nameTab, setNameTab] = useState("Trang chủ quản lí");
  const handleClickChangeTab = (filterString: string, nameTabString: string) => {
    onChangeTab(filterString);
    setFilterName(filterString);
    setNameTab(nameTabString);
  };

  // manager post

  function task(id: number, name: string, newNofication: number, total: number) {
    return {
      id,
      name,
      newNofication,
      total,
    };
  }

  const listTask = [
    task(0, "Đăng kí ghim", 20, 320),
    task(1, "Chưa có người đăng kí", 4, 320),
    task(2, "Đã người đăng kí", 4, 320),
    task(3, "Trong quá tình hỗ trợ", 4, 320),
    task(4, "Bị báo cáo", 1, 2),
    task(5, "Đã hạn chế", 4, 12),
    task(6, "Đã đóng", 4, 120),
  ];

  const renderIcon = (index: number) => {
    switch (index) {
      case 0: {
        // ghim bai viet
        return <PushPinIcon color="error" />;
      }
      case 1: {
        // chua co nguoi dang ky
        return <AccessTimeIcon color="secondary" />;
      }
      case 2: {
        //da co nguoi dang ky
        return <CoPresentIcon color="success" sx={{ opacity: 0.5 }} />;
      }
      case 3: {
        // trong qua trinh ho tro
        return <NewspaperIcon color="success" />;
      }
      case 4: {
        // bi bao cao
        return <FlagIcon color="warning" />;
      }
      case 5: {
        // da  han che
        return <ReportIcon color="error" />;
      }

      case 6: {
        // đa dong
        return <DoneAllIcon sx={{ color: "#7edfec" }} />;
      }
      default: {
        return <BugReportIcon />;
      }
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onOpenDrawer}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Typography variant="h6" noWrap component="div">
              {nameTab}
            </Typography>
            <Avatar {...stringAvatar("Đức Anh")}></Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={onCloseDrawer}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => handleClickChangeTab("manager-home", "Trang chủ quản lí")}
            className={filterName === "manager-home" ? classes.active : ""}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Trang chủ quản lí" />
            {openTab ? <ExpandLess /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={openTab} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={(e) => handleClickChangeTab("home-manage-ctv", "Trang chủ cộng tác viên")}>
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="Cộng tác viên" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            onClick={() => handleClickChangeTab("manager-post", "Quản lí bài đăng")}
            className={filterName === "manager-post" ? classes.active : ""}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lí bài đăng" />
          </ListItem>
          <Collapse in={openTab} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {listTask.map((task, index) => (
                <ListItem key={index} button sx={{ pl: 4 }} onClick={() => handleClickChangeTab(task.name, task.name)}>
                  <ListItemIcon>{renderIcon(index)}</ListItemIcon>
                  <ListItemText className={classes.itemText}>
                    <Typography>{task.name}</Typography>
                    <Typography
                      color="red"
                      sx={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        ml: 1,
                        backgroundColor: "#fbebeb",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      {task.newNofication}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Collapse>

          <ListItem
            button
            onClick={() => handleClickChangeTab("manager-event", "Quản lí sự kiện")}
            className={filterName === "manager-event" && classes.active}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lí sự kiện" />
          </ListItem>
          <ListItem button onClick={(e) => handleClick(e)}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lí người dùng" />
            {openTab ? <ExpandLess /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={openTab} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={(e) => handleClickChangeTab("manager-ctv", "Quản lí cộng tác viên")}>
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí cộng tác viên" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lí người dùng " />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />

        <List>
          {["Import Data", "Export Data"].map((text, index) => (
            <ListItem button key={text} onClick={() => handleClick(text)}>
              <ListItemIcon>{index === 0 ? <CloudDownloadIcon /> : <CloudUploadIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {renderContent()}
      </Main>
    </Box>
  );
};

export default Dashboard;
