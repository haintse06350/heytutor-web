import React, { useState } from "react";
import {
  Card,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  DialogProps,
  Button,
} from "@mui/material";
//icon
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { LineStatistical } from "../HomeDashBoard/LineStatistical";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import VisibilityIcon from "@mui/icons-material/Visibility";
// help
// import moment from "moment";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// img
import img1 from "../../../assets/home_event_images/14.png";
import DialogPreviewEventDetail from "./DialogPreviewEventDetail";

const DialogDetailCTV = (props: any) => {
  const { open, onClose } = props;
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [openPreview, setOpenPreview] = useState(false);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");

  const handleClickOpenPreview = (scrollType: DialogProps["scroll"]) => () => {
    setOpenPreview(true);
    setScroll(scrollType);
  };
  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon sx={{ color: "black" }} />
        </IconButton>
      </Toolbar>
      <DialogTitle sx={{ color: "black" }}>Chi tiết quản lí CTV</DialogTitle>

      <Grid sx={{ p: 2 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Sự kiện đang quản lí" value="1" />
              <Tab label="Sự kiện đăng kí" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container>
              <Grid item xs={12} md={6} lg={6}>
                {/* title sự kiện đagn quản lí */}
                <Typography variant="subtitle1">Để có một cuối kỳ thật hoàn hảo với SSG102</Typography>

                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                  <Typography style={{ fontSize: 14 }}>Từ 12 tháng 3 năm 2022 đến 21 tháng 4 năm 2022</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <HowToRegOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20, color: "rgb(53, 162, 235)" }} />
                  Số lượt đăng kí hỗ trợ:
                  <Typography style={{ fontSize: 14 }}>999</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <EventNoteIcon sx={{ mr: 0.5, width: 20, height: 20, color: "rgb(255, 99, 132)" }} />
                  Số vấn đề đăng kí:
                  <Typography style={{ fontSize: 14 }}>999</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <DoneAllIcon sx={{ mr: 0.5, width: 20, height: 20, color: "green" }} />
                  Số vấn đề hỗ trợ thành công:
                  <Typography style={{ fontSize: 14 }}>999</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <FlagIcon sx={{ mr: 0.5, width: 20, height: 20, color: "orange" }} />
                  Số người bị báo cáo:
                  <Typography style={{ fontSize: 14 }}>999</Typography>
                  <Tooltip title="xem chi tiết">
                    <VisibilityIcon sx={{ ml: 0.5, width: 20, height: 20 }} />
                  </Tooltip>
                </Box>

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Quản lí: Cao Đức Anh
                </Typography>

                {/* Trao đổi với CTV */}
                <IconButton aria-label="Trao đổi với CTV">
                  <Tooltip title="Trao đổi">
                    <ChatIcon sx={{ color: "#1172f4" }} />
                  </Tooltip>
                </IconButton>
                {/* Ban cộng tác viên */}

                <IconButton aria-label="Chỉnh sửa cộng tác viên">
                  <Tooltip title="Chỉnh sửa">
                    <EditIcon />
                  </Tooltip>
                </IconButton>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Box sx={{ width: 400, height: 200 }}>
                  <LineStatistical />
                </Box>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} md={6} lg={6}>
                {/* title sự kiện đagn quản lí */}
                <Typography variant="subtitle1">Để có một cuối kỳ thật hoàn hảo với SSG102</Typography>

                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                  <Typography style={{ fontSize: 14 }}>Từ 12 tháng 3 năm 2022 đến 21 tháng 4 năm 2022</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <HowToRegOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20, color: "rgb(53, 162, 235)" }} />
                  Số lượt đăng kí hỗ trợ:
                  <Typography style={{ fontSize: 14 }}>999</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <EventNoteIcon sx={{ mr: 0.5, width: 20, height: 20, color: "rgb(255, 99, 132)" }} />
                  Số vấn đề đăng kí:
                  <Typography style={{ fontSize: 14 }}>999</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <DoneAllIcon sx={{ mr: 0.5, width: 20, height: 20, color: "green" }} />
                  Số vấn đề hỗ trợ thành công:
                  <Typography style={{ fontSize: 14 }}>999</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <FlagIcon sx={{ mr: 0.5, width: 20, height: 20, color: "orange" }} />
                  Số người bị báo cáo:
                  <Typography style={{ fontSize: 14 }}>999</Typography>
                  <Tooltip title="xem chi tiết">
                    <VisibilityIcon sx={{ ml: 0.5, width: 20, height: 20 }} />
                  </Tooltip>
                </Box>

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Quản lí: Cao Đức Anh, Nguyen Trung Hai
                </Typography>

                {/* Trao đổi với CTV */}
                <IconButton aria-label="Trao đổi với CTV">
                  <Tooltip title="Trao đổi">
                    <ChatIcon sx={{ color: "#1172f4" }} />
                  </Tooltip>
                </IconButton>
                {/* Ban cộng tác viên */}

                <IconButton aria-label="Chỉnh sửa cộng tác viên">
                  <Tooltip title="Chỉnh sửa">
                    <EditIcon />
                  </Tooltip>
                </IconButton>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Box sx={{ width: 400, height: 200 }}>
                  <LineStatistical />
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid container>
              <Grid item xs={12} md={6} lg={6}>
                <Card sx={{ p: 2 }}>
                  <img src={img1} alt="img event detail" />
                  <Typography variant="subtitle1">Để có một cuối kỳ thật hoàn hảo với SSG102</Typography>
                  <Button endIcon={<VisibilityIcon />} onClick={handleClickOpenPreview("paper")}>
                    Xem hiển thị
                  </Button>
                  <DialogPreviewEventDetail open={openPreview} handleClose={handleClosePreview} scroll={scroll} />
                  <Button>Phê duyệt</Button>
                  <Button>Từ chối</Button>
                  <Button>Bình luận</Button>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Card sx={{ p: 2 }}>
                  <img src={img1} alt="img event detail" />
                  <Typography variant="subtitle1">Để có một cuối kỳ thật hoàn hảo với PRJ</Typography>
                  <Button endIcon={<VisibilityIcon />} onClick={handleClickOpenPreview("paper")}>
                    Xem hiển thị
                  </Button>
                  <DialogPreviewEventDetail open={openPreview} handleClose={handleClosePreview} scroll={scroll} />
                  <Button>Phê duyệt</Button>
                  <Button>Từ chối</Button>
                  <Button>Bình luận</Button>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Grid>
    </Dialog>
  );
};
export default DialogDetailCTV;
