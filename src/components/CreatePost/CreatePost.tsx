import React, { useEffect, useState, useContext } from "react";
import { useStyles } from "./CreatePost.style";
//component marterial
import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
// component
import { Post as PostModel } from "../../models/post";
import { NotificationCtx } from "../../context/notification/state";
import { PostCtx } from "../../context/post/state";
import { CustomizedAutoCompleteHashTag } from "./AutoCompleteHashTag";
import { Event } from "../../models/event";
import { isEmpty, map } from "lodash";
import { SelectDeadline } from "./SelectDeadline";
import { s3Client } from "../../models/s3";
import { dataURItoBlob } from "../../utils/convertDataUrlToFile";
import { UserCtx } from "../../context/user/state";
import { v4 as uuidv4 } from "uuid";
// import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("heytutor-user");

export const CreatePost = () => {
  const classes = useStyles();
  const { discardCreatingPost, viewPost } = useContext(PostCtx);
  const { user } = useContext(UserCtx);
  // const navigate = useNavigate();

  const [hashTag, setHashTag]: any = useState(null);
  const [eventJoint, setEventJoint]: any = useState(null);
  const [selectedEvent, setSelectedEvent]: any = useState(null);
  const [title, setTitle]: any = useState(null);
  const [content, setContent]: any = useState(null);
  const [images, setImages]: any = useState([]);
  const [valueDate, setDateValue] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [postSuccess, setPostSuccess]: any = useState(null);
  const [customHashtag, setCustomHashtag]: any = useState(null);

  const { setNotificationSuccess, setNotificationError } = useContext(NotificationCtx);

  const [errorInput, setErrorInput]: any = useState(null);

  const onChangeEvent = (event: any) => {
    if (event.target.value === "none") {
      setSelectedEvent(null);
      setEventJoint(null);
    } else {
      setSelectedEvent(event.target.value);
    }
  };

  const onViewPost = () => {
    // navigate(`/post-detail?postId=${postSuccess?.id}`);
  };

  const onCreatePost = async () => {
    try {
      if (isEmpty(title)) {
        setErrorInput({ field: "title" });
        return;
      }
      if (isEmpty(hashTag) && isEmpty(customHashtag)) {
        setErrorInput({ field: "hashtag" });
        return;
      }
      if (isEmpty(content)) {
        setErrorInput({ field: "content" });
        return;
      }
      const isValidDate = new Date(valueDate as any).getTime() > new Date().getTime();
      if (valueDate && !isValidDate) {
        setErrorInput({ field: "deadline" });
        return;
      }
      setLoading(true);

      let imagesToUpload = [];
      if (images.length > 0) {
        imagesToUpload = map(images, (img: any, index: number) => {
          const blob = dataURItoBlob(img.src);
          const resultFile = new File([blob], `${user.id}_${uuidv4()}_${index}`);
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
      const hashtagSelect = !isEmpty(hashTag) ? map(hashTag, (item: any) => item.courseCode) : [];
      const cusHashtag = !isEmpty(customHashtag) ? customHashtag.split(",") : [];
      const concatHashtag = [...hashtagSelect, ...cusHashtag];

      const input = {
        title,
        hashtag: JSON.stringify(concatHashtag),
        content,
        images: JSON.stringify(imageLinks),
        eventId: selectedEvent?.eventContent.id || null,
        deadline: valueDate,
      };

      const post = await PostModel.create(input);
      if (post) {
        setNotificationSuccess("Đăng vấn đề thành công");
        setPostSuccess(post);
        viewPost(post.id);
        discardCreatingPost();
      }
    } catch (error) {
      console.log(error);
      setNotificationError("Đăng vấn đề thất bại!");
    }
    setLoading(false);
  };

  const isRequired = (field: string) => {
    return errorInput?.field === field;
  };

  useEffect(() => {
    Event.getListEventByUser().then((res) => {
      setEventJoint(res);
    });
  }, []);

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

  const onRemoveImage = (image: string, index: number) => {
    const newImages = images.filter((img: string, idx: number) => img !== image && idx !== index);
    setImages(newImages);
  };

  return (
    <Dialog onClose={discardCreatingPost} open={true} maxWidth="xl" fullWidth>
      <DialogTitle>Đăng vấn đề bạn muốn được hỗ trợ</DialogTitle>
      <DialogContent>
        <Box>
          <Box>
            <label style={{ fontSize: 14, fontWeight: 700 }} htmlFor="title">
              Tiêu đề
            </label>
            <span style={{ color: "red" }}>*</span>
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField
              value={title}
              className={classes.input}
              onChange={(e: any) => setTitle(e.target.value)}
              id="title"
              variant="outlined"
              sx={{ width: 1 / 2, fontSize: 14, fontWeight: 500 }}
              placeholder="Nhập tiêu đề"
              required
            />
          </Box>
          {isRequired("title") && (
            <Typography variant="caption" sx={{ color: "red" }}>
              Vui lòng nhập tiêu đề
            </Typography>
          )}
        </Box>
        <Box display="flex" sx={{ mt: 1.25 }}>
          <CustomizedAutoCompleteHashTag hashTag={hashTag} setSelectedHashTag={setHashTag} />
          <FormControl sx={{ ml: 2, width: 1 / 2 }}>
            <label style={{ fontSize: 14, fontWeight: 700 }} htmlFor="event">
              Hashtag tuỳ chỉnh
            </label>
            <Box sx={{ mt: 1 }}>
              <TextField
                value={customHashtag}
                className={classes.input}
                onChange={(e: any) => setCustomHashtag(e.target.value)}
                id="title"
                variant="outlined"
                sx={{ width: 1, fontSize: 14, fontWeight: 500 }}
                placeholder="Bắt đầu bằng dấu # và cách nhau bằng dấu , (ví dụ #assignment)"
                required
              />
            </Box>
          </FormControl>
          {isRequired("hashtag") && (
            <Typography variant="caption" sx={{ color: "red" }}>
              Vui lòng chọn hashtag
            </Typography>
          )}
        </Box>
        <FormControl sx={{ mt: 1.25, width: 1 / 2 }}>
          <label style={{ fontSize: 14, fontWeight: 700 }} htmlFor="event">
            Đăng trong sự kiện
          </label>
          <Select
            labelId="event"
            id="simple-select-autowidth"
            defaultValue={"none"}
            value={selectedEvent?.eventContent.title}
            onChange={onChangeEvent}
            className={!selectedEvent ? classes.selectPlaceholder : classes.input}
            fullWidth
            sx={{ mt: 1 }}>
            <MenuItem className={classes.selectPlaceholder} value={"none"}>
              Chọn đăng vào sự kiện bạn đang tham gia
            </MenuItem>
            {eventJoint?.map((option: any) => (
              <MenuItem className={classes.input} key={option.eventContent.id} value={option}>
                {option.eventContent.title.slice(0, 50)}...
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 1.25 }}>
          <Box>
            <label style={{ fontSize: 14, fontWeight: 700 }} htmlFor="content">
              Ảnh
            </label>
          </Box>
          <label htmlFor="icon-button-file">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 1, height: 50, border: "1px dashed #c1c7d0", borderRadius: 0.5 }}>
              <Input onChange={onUploadImage} accept="image/*" id="icon-button-file" multiple type="file" />
              <Typography variant="subtitle2">Thêm ảnh</Typography>
            </Box>
          </label>
        </Box>
        {images.length > 0 && <ImageBox />}
        <FormControl sx={{ mt: 1.25, width: 1 / 2 }}>
          <label style={{ fontSize: 14, fontWeight: 700 }} htmlFor="event">
            Ngày cần giải quyết
          </label>
          <Box sx={{ mt: 1 }}>
            <SelectDeadline valueDate={valueDate} setDateValue={setDateValue} />
          </Box>
          {isRequired("deadline") && (
            <Typography variant="caption" sx={{ color: "red" }}>
              Ngày cần giải quyết không hợp lệ
            </Typography>
          )}
        </FormControl>
        <Box sx={{ mt: 1.25 }}>
          <Box>
            <label style={{ fontSize: 14, fontWeight: 700 }} htmlFor="content">
              Nội dung vấn đề
            </label>
            <span style={{ color: "red" }}>*</span>
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField
              value={content}
              onChange={(e: any) => setContent(e.target.value)}
              className={classes.input}
              multiline
              rows={4}
              id="content"
              variant="outlined"
              fullWidth
              required
            />
          </Box>
          {isRequired("content") && (
            <Typography variant="caption" sx={{ color: "red" }}>
              Vui lòng nhập nội dung vấn đề
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 4, px: 2 }}>
        <Button color="secondary" sx={{ textTransform: "none" }} onClick={discardCreatingPost}>
          Huỷ
        </Button>
        {postSuccess ? (
          <Button variant="contained" sx={{ textTransform: "none" }} color="primary" onClick={onViewPost}>
            Xem bài viết
          </Button>
        ) : (
          <Button
            disabled={loading}
            sx={{ textTransform: "none" }}
            variant="contained"
            color="primary"
            onClick={onCreatePost}>
            {loading ? <CircularProgress size={20} /> : "Đăng"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;
