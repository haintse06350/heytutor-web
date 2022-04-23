import React, { useState, useContext } from "react";
import {
  Grid,
  Card,
  Typography,
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import moment from "moment";
import BreadcrumbsTab from "../../Common/Breadcrumbs/Breadcrumbs";

// icon
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import moment from "moment";
import { styled } from "@mui/styles";
import { useStyles } from "./CreateEvent.style";
import { UserCtx } from "../../../context/user/state";
import { CustomizedAutoCompleteHashTag } from "../../CreatePost/AutoCompleteHashTag";
import { Event } from "../../../models/event";
import { map } from "lodash";
import { NotificationCtx } from "../../../context/notification/state";
import { dataURItoBlob } from "../../../utils/convertDataUrlToFile";
import { s3Client } from "../../../models/s3";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const classes = useStyles();
  const [startDate, setstartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [images, setImages]: any = useState([]);
  const [hashTag, setHashTag]: any = useState(null);
  const [openPreviewEvent, setOpenPreviewEvent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserCtx);
  const { setNotificationSuccess, setNotificationError } = useContext(NotificationCtx);

  const navigate = useNavigate();
  const token = localStorage.getItem("heytutor-user");

  const onClickPreviewEvent = () => {
    setOpenPreviewEvent(true);
  };

  const onClosePreviewEvent = () => {
    setOpenPreviewEvent(false);
  };

  const Input = styled("input")({
    display: "none",
  });

  const onUploadImage = ({ target }: any) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e: any) => {
      const prevImages = [...images];
      prevImages.push({ src: e.target.result } as any);
      setImages(prevImages);
    };
  };

  const onCreateEvent = async () => {
    setLoading(true);
    let imagesToUpload = [];
    if (images.length > 0) {
      imagesToUpload = map(images, (img: any, index: number) => {
        const blob = dataURItoBlob(img.src);
        const resultFile = new File([blob], `event_${user.id}_${index}`);
        return resultFile;
      });

      await s3Client.upload({
        type: "post_images",
        key: "post_images",
        file: imagesToUpload,
        token,
      });
    }

    const imageLinks = map(imagesToUpload, (file: any) => file.name);
    const eventParams = {
      createId: user.id,
      viewCount: 0,
      title: eventTitle,
      description: eventDescription,
      createdAt: startDate,
      endAt: endDate,
      hashtag: JSON.stringify(map(hashTag, (item: any) => item.courseCode)),
      content: eventContent,
      image: JSON.stringify(imageLinks),
      isApproved: 0,
      approveBy: null,
      adminId: null,
    };

    const res = await Event.create(eventParams);
    if (res.id) {
      setNotificationSuccess("Create event successfully");
      navigate("/dashboard/admin/manage-event");
    } else {
      setNotificationError("Create event failed");
    }
    setLoading(false);
  };

  const onRemoveImage = (image: string, index: number) => {
    const newImages = images.filter((img: string, idx: number) => img !== image && idx !== index);
    setImages(newImages);
  };

  const ImageBox = () => {
    return (
      <Box display="flex" flexWrap="wrap">
        {images.map((image: any, index: number) => (
          <Box className={classes.image} key={index} m={1}>
            <img src={image.src} alt="img" />
            <div className={classes.overlay}>
              <DeleteIcon
                sx={{ color: "white" }}
                className={classes.removeImage}
                onClick={() => onRemoveImage(image, index)}
              />
            </div>
          </Box>
        ))}
      </Box>
    );
  };

  const PreviewEvent = () => {
    return (
      <Dialog onClose={onClosePreviewEvent} open={openPreviewEvent} maxWidth="lg" fullWidth>
        <DialogTitle>{eventTitle}</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={2}>
              {images.map((img: any, index: number) => (
                <Grid item xs={12} md={6} key={index}>
                  <img key={index} src={img.src} alt="event" />
                </Grid>
              ))}
            </Grid>
            <Typography sx={{ mt: 1 }} display="flex" alignItems="center" variant="caption">
              <AccessTimeIcon />
              {moment(startDate).format("MMM Do YY")} - {moment(endDate).format("MMM Do YY")}
            </Typography>
            <Typography sx={{ mt: 1 }} variant="subtitle1">
              {eventDescription}
            </Typography>
            <Typography sx={{ mt: 1 }} variant="body1">
              {eventContent}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClosePreviewEvent} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <BreadcrumbsTab
        history={[{ title: "Quản lí sự kiện ", href: "/dashboard/admin/manage-event" }]}
        current={{ title: "Tạo sự kiện" }}
      />
      <PreviewEvent />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8} lg={8}>
          <Card sx={{ p: 2 }}>
            <Grid container sx={{ mt: 1 }} spacing={2}>
              <Grid item xs={12} md={8} lg={8}>
                <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
                  Tiêu đề sự kiện
                  <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  value={eventTitle}
                  onChange={(e: any) => setEventTitle(e.target.value)}
                  id="short-description"
                  placeholder="Tiêu đề sự kiện"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
                  Tóm tắt sự kiện
                  <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  id="short-description"
                  value={eventDescription}
                  onChange={(e: any) => setEventDescription(e.target.value)}
                  placeholder="Nội dung tóm tắt"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
                  Thời gian <span style={{ color: "red" }}>*</span>
                </Typography>
                <Box sx={{ mb: 1.7 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Ngày bắt đầu"
                      inputFormat="dd/MM/yyyy"
                      value={startDate}
                      onChange={(newValue) => {
                        setstartDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} sx={{ background: "#fff", width: "100%" }} />}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Ngày kết thúc"
                      inputFormat="dd/MM/yyyy"
                      value={endDate}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} sx={{ background: "#fff", width: "100%" }} />}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Box sx={{ mt: 1.25, width: "100%", ml: 2.25 }}>
                <CustomizedAutoCompleteHashTag setSelectedHashTag={setHashTag} />
              </Box>
              <Box sx={{ mt: 1.25, width: "100%", ml: 2.25 }}>
                <Box>
                  <label style={{ fontSize: 14, fontWeight: 700 }} htmlFor="content">
                    Poster sự kiện
                    <span style={{ color: "red" }}>*</span>
                  </label>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ mt: 1, height: 50, border: "1px dashed #c1c7d0", borderRadius: 0.5 }}>
                  <label htmlFor="icon-button-file">
                    <Input onChange={onUploadImage} accept="image/*" id="icon-button-file" multiple type="file" />
                    <Typography variant="subtitle2">Upload ảnh</Typography>
                  </label>
                </Box>
              </Box>
              <Box sx={{ mt: 1.25, width: "100%", ml: 1.25 }}>
                <ImageBox />
              </Box>
              <Grid item xs={12} md={12} lg={12}>
                <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
                  Nội dung sự kiện
                  <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  id="short-description"
                  value={eventContent}
                  onChange={(e: any) => setEventContent(e.target.value)}
                  placeholder="Nội dung"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card sx={{ p: 2 }}>
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              fullWidth
              sx={{ mb: 2 }}
              onClick={onClickPreviewEvent}>
              Xem trước
            </Button>
            <Button disabled={loading} variant="contained" color="primary" fullWidth onClick={onCreateEvent}>
              {loading ? <CircularProgress size={20} /> : "Tạo sự kiện"}
            </Button>
            <Typography variant="caption" sx={{ fontSize: 14, fontWeight: 400 }}>
              *Lưu ý: Sự kiện sau khi tạo thành công sẽ được gửi đến admin để xét duyệt
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default CreateEvent;
