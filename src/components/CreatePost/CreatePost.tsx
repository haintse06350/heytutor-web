import React, { useContext, useState } from "react";
import { useStyles } from "./CreatePost.style";
//component marterial
import {
  styled,
  Button,
  IconButton,
  Grid,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  TextField,
  FormControl,
  OutlinedInput,
} from "@mui/material";
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
import Page from "../../layout/Page";
import InputAdornment from "@mui/material/InputAdornment";
// import { Event } from "../../models/event";

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

  const [isPayment, setIsPayment] = useState("1");
  const handleIsPayment = (e: any) => {
    setIsPayment(e.target.value);
    console.log(isPayment);
  };
  const [money, setMoney] = useState("100");
  // get event list user regsitered
  // const [data, setData]: any = useState(null);

  // const getListEventByUser = async () => {
  //   const data = await Event.getListEventByUser();
  //   setData(data.listEvent);
  // };
  // useEffect(() => {
  //   getListEventByUser();
  // }, []);
  return (
    <Page>
      <Box>
        <Typography variant="h4" color="primary">
          Tạo bài đăng
        </Typography>
        <Grid container>
          <Grid item xs={12} md={4} lg={4}>
            <Typography variant="h6">Chọn sự kiện đăng vấn đề</Typography>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <div className={classes.contentDetail}>
              <InputLabel id="select-event-joined">Sự kiện</InputLabel>
              <Select
                sx={{ backgroundColor: "#fff" }}
                labelId="select-event-joined"
                id="demo-simple-select"
                value={"1"}
                label="Sự kiện"
                // onChange={handleChange}
              >
                {}
                <MenuItem value={"1"}>Ten</MenuItem>
                <MenuItem value={"2"}>Twenty</MenuItem>
                <MenuItem value={"3"}>Thirty</MenuItem>
              </Select>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={4} sx={{ mt: 1 }}>
            <Typography variant="h6">Nội dung cơ bản</Typography>
          </Grid>
          <Grid item xs={12} md={8} lg={8} sx={{ mt: 1 }}>
            {/* content post */}
            <div className={classes.contentDetail}>
              {/* tiêu đề */}
              <TextField
                label="Tiêu đề ... "
                value={postItem.title}
                onChange={(e) => handleChangeTitle(e)}
                sx={{ backgroundColor: "#fff", width: 1, mb: 1 }}
              />
              {/* hashtag */}
              <TextField
                label="Gắn thẻ(hashtag) ..."
                value={postItem.hashTag}
                onChange={(e) => handleChangeHashtag(e)}
                sx={{ backgroundColor: "#fff", width: 1 }}
              />
              {/* chon gia */}

              <Box sx={{ display: "flex", mt: 1, backgroundColor: "#fff", pt: 1 }}>
                <TextField
                  select
                  sx={{ width: 1 / 2, pt: 1 }}
                  id="demo-simple-select"
                  value={isPayment}
                  onChange={(e) => handleIsPayment(e)}
                  label="Trả công">
                  <MenuItem value={"1"}>Có</MenuItem>
                  <MenuItem value={"2"}>Không</MenuItem>
                </TextField>

                {isPayment === "1" && (
                  <FormControl sx={{ m: 1, width: 1 / 2, ml: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Giá</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      value={money}
                      onChange={(e) => setMoney(e.target.value)}
                      startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                      endAdornment={<InputAdornment position="end">K</InputAdornment>}
                      label="Amount"
                    />
                  </FormControl>
                )}
              </Box>

              {/* nội dung */}

              <TextField
                label="Nội dung ..."
                value={postItem.content}
                onChange={(e) => handleChangeContent(e)}
                sx={{ backgroundColor: "#fff", width: 1, mt: 1 }}
                multiline
                rows={4}
              />
            </div>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Typography variant="h6">Thêm ảnh</Typography>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <div className={classes.addOptionPostL}>
              <div className={classes.insertPhotoPost} onClick={onInsertPhoto}>
                <label htmlFor="icon-button-file">
                  <Input onChange={onUploadImage} accept="image/*" id="icon-button-file" type="file" />
                  <Tooltip title="Hãy chọn những bức ảnh thật ý nghĩa nhé !">
                    <IconButton aria-label="upload picture" component="span">
                      <AddPhotoAlternateIcon sx={{ color: "black" }} fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </label>
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
          </Grid>
          <Grid xs={12} lg={4} md={4}></Grid>
          <Grid xs={12} lg={8} md={8} sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default CreatePost;
