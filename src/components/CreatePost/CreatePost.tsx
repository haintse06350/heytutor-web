import React, { useContext } from "react";
import { useStyles } from "./CreatePost.style";
//component marterial
import { styled, Button, IconButton, Grid } from "@mui/material";
// icon
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
// component
import { Post as PostModel } from "../../models/post";
import { NotificationCtx } from "../../context/notification/state";
// import { UserCtx } from "../../context/user/state";
import { useLocalStorage } from "../usingLocalStorage/usingLocalStorage";

export const CreatePost = () => {
  const classes = useStyles();

  const [postItem, setPostItem] = useLocalStorage("postItem", { title: "", hashTag: "", content: "", images: [] });

  // const [openSelect, setOpenSelect] = useLocalStorage("openSelect", false);
  const [loading, setLoading] = useLocalStorage("loading", false);

  const { setNotificationSuccess, setNotificationError } = useContext(NotificationCtx);

  // const { user }: any = useContext(UserCtx);

  const onDiscard = () => {
    console.log("discard clicked");
  };

  const onInsertPhoto = () => {
    console.log("insert photo clicked");
  };

  const onPost = async () => {
    setLoading(true);
    // const params = { userId: user?.id, postItem.title, postItem.hashTag, postItem.content };
    const params = {};
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

  const handleChangeTitle = (e: any) => {
    postItem.title = e.target.value;
    setPostItem({ ...postItem, [e.target.name]: e.target.value });
    console.log(postItem);
  };

  const handleChangeHashtag = (e: any) => {
    postItem.hashTag = e.target.value;
    setPostItem({ ...postItem, [e.target.name]: e.target.value });
  };

  const handleChangeContent = (e: any) => {
    postItem.content = e.target.value;
    setPostItem({ ...postItem, [e.target.name]: e.target.value });
  };

  const onUploadImage = ({ target }: any) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e: any) => {
      const prevImages = [...postItem.images];
      prevImages.push({ src: e.target.result } as any);
      postItem.images = prevImages;
      setPostItem({ ...postItem, [e.target.name]: e.target.value });
    };
  };

  const onRemoveImage = (image: string, index: number) => {
    const newImages = postItem.images.filter((img: string, idx: number) => img !== image && idx !== index);
    postItem.images = newImages;
    setPostItem({ ...postItem });
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
              value={postItem.title}
              onChange={(e) => handleChangeTitle(e)}
            />
          </div>
          <div>
            <input
              className={classes.hashtagPost}
              placeholder="Hashtag(gắn thẻ) ..."
              value={postItem.hashTag}
              onChange={(e) => handleChangeHashtag(e)}
            />
          </div>
          {/* hashtag */}
          {/* nội dung */}
          <div>
            <textarea
              className={classes.contentDetailPost}
              placeholder="Nội dung ..."
              rows={5}
              cols={5}
              value={postItem.content}
              onChange={(e) => handleChangeContent(e)}></textarea>
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
        </div>
        {postItem.images.length > 0 && (
          <Grid container spacing={1} className={classes.listImg}>
            {postItem.images.map((img: any, index: number) => (
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
