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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
// component
import { Post as PostModel } from "../../models/post";
import { NotificationCtx } from "../../context/notification/state";
import { PostCtx } from "../../context/post/state";
import { CustomizedAutoCompleteHashTag } from "./AutoCompleteHashTag";
import { Event } from "../../models/event";

export const CreatePost = () => {
  const classes = useStyles();
  const { discardCreatingPost } = useContext(PostCtx);
  const [hashTag, setHashTag]: any = useState(null);
  const [eventJoint, setEventJoint]: any = useState(null);
  const [selectedEvent, setSelectedEvent]: any = useState(null);
  const [title, setTitle]: any = useState(null);
  const [content, setContent]: any = useState(null);
  const [images, setImages]: any = useState([]);
  const { setNotificationSuccess, setNotificationError } = useContext(NotificationCtx);

  const [errorInput, setErrorInput]: any = useState(null);

  const onChangeEvent = (event: any) => {
    setSelectedEvent(event.target.value);
  };

  const onCreatePost = async () => {
    try {
      if (!hashTag) {
        setErrorInput({ field: "hashtag" });
        return;
      }
      if (!title) {
        setErrorInput({ field: "title" });
        return;
      }
      if (!content) {
        setErrorInput({ field: "content" });
        return;
      }
      const input = {};
      await PostModel.create(input);
      setNotificationSuccess("Tạo bài viết thành công");
    } catch (error) {
      console.log(error);
      setNotificationError("Tạo bài viết thất bại!");
    }
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
      <DialogTitle>Tạo bài viết</DialogTitle>
      <DialogContent>
        <Box>
          <Box>
            <label style={{ fontSize: 14, fontWeight: 500 }} htmlFor="title">
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
              required
            />
          </Box>
        </Box>
        <CustomizedAutoCompleteHashTag setSelectedHashTag={setHashTag} />
        <FormControl sx={{ mt: 1.25, width: 1 / 2 }}>
          <label style={{ fontSize: 14, fontWeight: 500 }} htmlFor="event">
            Đăng trong sự kiện
          </label>
          <Select
            labelId="event"
            id="simple-select-autowidth"
            value={selectedEvent?.eventContent.title}
            onChange={onChangeEvent}
            className={classes.input}
            fullWidth
            sx={{ mt: 1 }}>
            {eventJoint?.map((option: any) => (
              <MenuItem className={classes.input} key={option.eventContent.id} value={option}>
                {option.eventContent.title.slice(0, 50)}...
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 1.25 }}>
          <Box>
            <label style={{ fontSize: 14, fontWeight: 500 }} htmlFor="content">
              Ảnh
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
        {images.length > 0 && <ImageBox />}
        <Box sx={{ mt: 1.25 }}>
          <Box>
            <label style={{ fontSize: 14, fontWeight: 500 }} htmlFor="content">
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
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 4, px: 2 }}>
        <Button color="secondary" sx={{ textTransform: "none" }} onClick={discardCreatingPost}>
          Huỷ
        </Button>
        <Button sx={{ textTransform: "none" }} variant="contained" color="primary">
          Đăng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;
