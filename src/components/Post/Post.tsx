import React, { useState } from "react";
import { useStyles } from "./Post.style";
import { styled } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CircularProgress from "@mui/material/CircularProgress";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export const Post = () => {
  const classes = useStyles();
  // const [toggleAttachFile, setToggleAttachFile] = useState(false);
  const [title, setTitle] = useState("");
  const [hashTag, setHashTag] = useState("");
  const [content, setContent] = useState("");

  const [openSelect, setOpenSelect] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages]: any = useState([]);

  const onUploadImage = ({ target }: any) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e: any) => {
      const prevImages = [...images];
      prevImages.push(e.target.result as any);
      setImages(prevImages);
    };
  };

  const onRemoveImage = (image: string, index: number) => {
    const newImages = images.filter((img: string, idx: number) => img !== image && idx !== index);
    setImages(newImages);
  };

  const handleClose = () => {
    setOpenSelect(false);
  };
  // const handleAttachFilePostS = () => {
  //   setToggleAttachFile(!toggleAttachFile);
  // };
  const handleDiscard = () => {
    console.log("discard clicked");
  };
  const handleAttachFilePostL = () => {
    console.log("attach large clicked");
  };
  const handleInsertPhoto = () => {
    console.log("insert photo clicked");
  };
  const handleChangePrice = () => {
    console.log("change price clicked");
  };
  const handlePost = () => {
    setLoading(true);

    console.log("Post clicked");
    console.log(title, hashTag, content);
  };

  const Input = styled("input")({
    display: "none",
  });

  const [age, setAge] = React.useState<string | number>("");

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(event.target.value);
  };

  const handleOpen = () => {
    setOpenSelect(true);
  };
  return (
    <div className={classes.post}>
      {/* header post */}
      <div className={classes.headerPost}>
        {/* discard */}
        <Button variant="text" size="large">
          <div className={classes.buttonDiscardMobile} onClick={handleDiscard}>
            <ArrowBackIosIcon fontSize="small" sx={{ color: "white" }} />
          </div>
        </Button>

        <h2 className={classes.titleHeader}>Tạo bài viết</h2>
        {/* post */}
        <Button variant="text" size="large">
          <div className={classes.buttonPostdMobile} onClick={handlePost}>
            {loading ? (
              <CircularProgress size={25} sx={{ color: "white" }} />
            ) : (
              <SendIcon fontSize="small" sx={{ color: "white" }} />
            )}
          </div>
        </Button>
      </div>
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
            <div className={classes.addOptionPostL}>
              <div className={classes.attachFilePost} onClick={handleAttachFilePostL}>
                <label htmlFor="icon-button-file">
                  <Input onChange={onUploadImage} accept="file/*" id="icon-button-file" type="file" />
                  <IconButton aria-label="upload picture" component="span">
                    <AttachFileIcon sx={{ color: "black" }} fontSize="large" />
                  </IconButton>
                </label>
              </div>
              <div className={classes.insertPhotoPost} onClick={handleInsertPhoto}>
                <label htmlFor="icon-button-file">
                  <Input accept="image/*" id="icon-button-file" type="file" />
                  <IconButton aria-label="upload picture" component="span">
                    <AddPhotoAlternateIcon sx={{ color: "black" }} fontSize="large" />
                  </IconButton>
                </label>
              </div>
              <div className={classes.priceChangePost} onClick={handleChangePrice}>
                <FormControl sx={{ m: 0.5, minWidth: 120 }}>
                  <InputLabel id="demo-controlled-open-select-label">Giá</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openSelect}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={age}
                    label="Giá"
                    onChange={handleChange}>
                    <MenuItem value="">
                      <em>Không</em>
                    </MenuItem>
                    <MenuItem value={1}>100k-200k</MenuItem>
                    <MenuItem value={2}>200k-500k</MenuItem>
                    <MenuItem value={3}>500k-1000k</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <textarea
              className={classes.contentDetailPost}
              placeholder="Nội dung ..."
              rows={5}
              cols={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
        </div>
        {images.length > 0 && (
          <Grid container spacing={1} className={classes.listImg}>
            {images.map((img: string, index: number) => (
              <Grid item xs={4} className={classes.imagePost} key={index}>
                <img className={classes.image} key={index} src={img} alt="img" />
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
              onClick={handlePost}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained">
              Đăng bài
            </LoadingButton>
          </div>
          <div className={classes.buttonDiscardScreen} onClick={handleDiscard}>
            <Button variant="contained" endIcon={<CloseIcon />}>
              Hủy đăng bài
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
