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
  Grid,
  Skeleton,
} from "@mui/material";
// import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CookieIcon from "@mui/icons-material/Cookie";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Student } from "../../models/student";
import { keys, map, filter, pick } from "lodash";
import { TERMS } from "../../constants/terms";
import { useStyles } from "./Dashboard.style";
import { Admin } from "../../models/admin";
import PostItem from "../HomePage/PostItem";
import { Post } from "../../models/post";
import PostDetail from "../HomePage/PostDetail";

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
  const [activeTab, setActiveTab] = useState("Import Data");
  const [dataStudent, setDataStudent]: any = useState(null);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useState("");
  const [listPost, setListPost]: any = useState(null);
  const [listAllPost, setAllPost]: any = useState(null);
  const [selectedPost, setSelectedPost]: any = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
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

  const getListPost = async () => {
      const [allPost] = await Post.listAllPosts();
      setAllPost(allPost);
  };

  const onClickCommentSection = (post: any) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    getListPost();
    setListPost(listAllPost);
  }, []);

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
      case "Quản lí bài đăng": {
        return renderListPost();
      }
      case "Quản lí event": {
        return <div>Quản lí event</div>;
      }
      case "Quản lí người dùng": {
        return rederUsers();
      }
    }
  };

  const renderListPost = () => {
    return (
      <>
        <div className={classes.postFilter}></div>
        {!listPost
          ? map(Array.from(Array(10)), (item: any, index: number) => renderLoadingPost(index))
          : listPost.map((post: any, i: number) => (
              <div key={i} className={classes.post}>
                <PostItem post={post} onClickCommentSection={onClickCommentSection} />
              </div>
            ))}
        {}
      </>
    );
  };

  const renderLoadingPost = (index: number) => {
    return (
      <div key={index} className={classes.post}>
        {openDialog && <PostDetail post={selectedPost} onCloseDialog={onCloseDialog} openDialog={openDialog} />}
        <Grid container className={classes.userPanel}>
          <Grid item xs={2} className={classes.userAvatar}>
            <Skeleton width={30} height={30} variant="circular" />
          </Grid>
          <Grid item xs={8} className={classes.userNameAndPostTime}>
            <Skeleton width={160} variant="text" />
            <Skeleton width={60} variant="text" />
          </Grid>
          <Grid item xs={2} className={classes.userOptionPost}>
            <Skeleton width={20} height={10} variant="rectangular" />
          </Grid>
        </Grid>
        <div className={classes.postContent}>
          <Skeleton width={200} variant="text" />
          <Skeleton width={500} variant="text" />
          <div className={classes.hashTag}>
            {map(Array.from(Array(3)), (item: any, index: number) => (
              <Skeleton
                key={index}
                width={50}
                height={26}
                style={{ marginRight: 8, borderRadius: 8 }}
                variant="rectangular"
              />
            ))}
          </div>
        </div>
        <Grid container className={classes.postActions}>
          <Grid item xs={8} className={classes.leftPanel}>
            <div className={classes.likeButton}>
              <Skeleton width={20} variant="rectangular" />
              <Skeleton width={16} style={{ marginLeft: 8 }} variant="text" />
            </div>
            <div className={classes.commentButton}>
              <Skeleton width={20} variant="rectangular" />
              <Skeleton width={16} style={{ marginLeft: 8 }} variant="text" />
            </div>
          </Grid>
          <Grid item xs={4} className={classes.rightPanel}>
            <div className={classes.btnResolve}>
              <Skeleton width={20} variant="rectangular" />
              <Skeleton width={50} style={{ marginLeft: 8 }} variant="text" />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };

  const rederUsers = () => {
    return (
      <>
        <div className={classes.postFilter}></div>
        {!listPost
          ? map(Array.from(Array(10)), (item: any, index: number) => renderLoadingPost(index))
          : listPost.map((post: any, i: number) => (
              <div key={i} className={classes.post}>
                <PostItem post={post} onClickCommentSection={onClickCommentSection} />
              </div>
            ))}
        {}
      </>
    );
  }

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
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
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
          {["Import Data", "Export Data"].map((text, index) => (
            <ListItem button key={text} onClick={() => onChangeTab(text)}>
              <ListItemIcon>{index === 0 ? <CloudDownloadIcon /> : <CloudUploadIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Quản lí bài đăng", "Quản lí event", "Quản lí người dùng"].map((text, index) => (
            <ListItem button key={text} onClick={() => onChangeTab(text)}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
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
