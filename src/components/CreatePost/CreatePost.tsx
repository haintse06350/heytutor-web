import React, { useContext } from "react";
import { useStyles } from "./CreatePost.style";
//component marterial
import {
  styled,
  MenuItem,
  Button,
  IconButton,
  FormControl,
  Grid,
  Select,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
// icon
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
// component
import { Post as PostModel } from "../../models/post";
import { NotificationCtx } from "../../context/notification/state";
import { UserCtx } from "../../context/user/state";
import { useLocalStorage } from "../usingLocalStorage/usingLocalStorage";

export const CreatePost = () => {
  const classes = useStyles();
  const [title, setTitle] = useLocalStorage("title", "");
  const [hashTag, setHashTag] = useLocalStorage("hashTag", "");
  const [content, setContent] = useLocalStorage("content", "");

  const [openSelect, setOpenSelect] = useLocalStorage("openSelect", false);
  const [loading, setLoading] = useLocalStorage("loading", false);
  const [images, setImages]: any = useLocalStorage("images", []);
  const { setNotificationSuccess, setNotificationError } = useContext(NotificationCtx);

  const { user }: any = useContext(UserCtx);

  const onUploadImage = ({ target }: any) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e: any) => {
      const prevImages = [...images];
      prevImages.push({ src: e.target.result } as any);
      setImages(prevImages);
    };
  };

  const onRemoveImage = (image: string, index: number) => {
    const newImages = images.filter((img: string, idx: number) => img !== image && idx !== index);
    setImages(newImages);
  };

  const onClose = () => {
    setOpenSelect(false);
  };

  const onDiscard = () => {
    console.log("discard clicked");
  };

  const onInsertPhoto = () => {
    console.log("insert photo clicked");
  };

  const onChangePrice = () => {
    console.log("change price clicked");
  };

  const onPost = async () => {
    setLoading(true);
    const params = { userId: user?.id, title, hashTag, content };
    try {
      await PostModel.create(params);
      setNotificationSuccess("Post created successfully");
    } catch (error) {
      setNotificationError("Error creating post");
    }

    setLoading(false);
  };

  const Input = styled("input")({
    display: "none",
  });

  const [age, setAge] = React.useState<string | number>("");

  const onChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(event.target.value);
  };

  const onOpen = () => {
    setOpenSelect(true);
  };

  return (
    <div className={classes.post}>
      <div className={classes.contentPost}>
        {/* content post */}
        <div className={classes.contentDetail}>
          {/* tiêu đề */}
          <div>
            <input
              className={classes.titlePost}
              placeholder="Tiêu đề ... "
              value={title}
              onChange={(e) => setTitle(e.target.value)}></input>
          </div>
          <div>
            <input
              className={classes.hashtagPost}
              placeholder="Hashtag(gắn thẻ) ..."
              value={hashTag}
              onChange={(e) => setHashTag(e.target.value)}></input>
          </div>
          {/* hashtag */}
          {/* nội dung */}
          <div>
            <textarea
              className={classes.contentDetailPost}
              placeholder="Nội dung ..."
              rows={5}
              cols={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
        </div>
        <div className={classes.addOptionPostL}>
          <div className={classes.insertPhotoPost} onClick={onInsertPhoto}>
            <label htmlFor="icon-button-file">
              <Input onChange={onUploadImage} accept="image/*" id="icon-button-file" type="file" />
              <IconButton aria-label="upload picture" component="span">
                <AddPhotoAlternateIcon sx={{ color: "black" }} fontSize="large" />
              </IconButton>
            </label>
            <span>Thêm ảnh</span>
          </div>
          <div className={classes.priceChangePost} onClick={onChangePrice}>
            <FormControl sx={{ m: 0.5, minWidth: 120 }}>
              <InputLabel id="demo-controlled-open-select-label">Giá</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openSelect}
                onClose={onClose}
                onOpen={onOpen}
                value={age}
                label="Giá"
                onChange={onChange}>
                <MenuItem value="">
                  <em>Không</em>
                </MenuItem>
                <MenuItem value={1}>Không</MenuItem>
                <MenuItem value={2}>Có</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {images.length > 0 && (
          <Grid container spacing={1} className={classes.listImg}>
            {images.map((img: any, index: number) => (
              <Grid item xs={3} className={classes.imagePost} key={index}>
                <img className={classes.image} key={index} src={img.src} alt="img" />
                <div className={classes.deleteButton} onClick={() => onRemoveImage(img, index)}>
                  <CloseIcon />
                </div>
              </Grid>
            ))}
          </Grid>
        )}
        <div className={classes.button}>
          <div className={classes.buttonPostScreen}>
            <LoadingButton
              onClick={onPost}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained">
              Đăng bài
            </LoadingButton>
          </div>
          <div className={classes.buttonDiscardScreen} onClick={onDiscard}>
            <Button variant="contained" endIcon={<CloseIcon />}>
              Hủy đăng bài
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
