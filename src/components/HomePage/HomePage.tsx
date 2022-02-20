import React, { useEffect, useState } from "react";
import { useStyles } from "./HomePage.style";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, TextField, InputAdornment, Typography, Avatar, Dialog, Slide } from "@mui/material";
// import { UserCtx } from "../../context/user/state";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { TransitionProps } from "@mui/material/transitions";

const HomePage = () => {
  const classes = useStyles();
  // const { user } = useContext(UserCtx);
  const [isLiked, setIsliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const user = {
    avatar: "",
    name: "Nguyen Trung Hai",
  };

  const post = {
    title: "Help me with CSD",
    time: "20h",
    content: "help me please",
    hashtag: "#CSD",
    isLiked: false,
    likeCount: 23,
    commentCount: 5,
    isBookmarked: false,
  };

  const onClickSearch = () => {};

  const onClickCommentSection = () => {
    setOpenDialog(true);
  };

  const onClickCommentSectionInsideDialog = () => {};

  const onClickLike = () => {
    setIsliked(!isLiked);
  };

  const onClickBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    console.log("fetch list post");
  }, []);

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const renderPostFullScreen = () => {
    return (
      <Dialog keepMounted TransitionComponent={Transition} onClose={onCloseDialog} fullScreen open={openDialog}>
        <div className={classes.dialogContent}>
          <Grid container className={classes.dialogHeader}>
            <Grid onClick={onCloseDialog} xs={2} item className={classes.backBtn}>
              <ArrowBackIosIcon color="primary" />
            </Grid>
            <Grid xs={8} item className={classes.postTitle}>
              <Typography>{post.title}</Typography>
            </Grid>
            <Grid xs={2} item className={classes.moreBtn}>
              <MoreHorizIcon color="primary" />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.postContent}>
            <div className={classes.postContent}>
              <Typography>{post.content}</Typography>
              <Typography>{post.hashtag}</Typography>
            </div>
            <Grid container item xs={12} className={classes.simpleActions}>
              <Grid item xs={4} className={classes.likeButton} onClick={onClickLike}>
                {isLiked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon color="primary" />}
              </Grid>
              <Grid item xs={4} className={classes.commentButton} onClick={onClickCommentSectionInsideDialog}>
                <ChatBubbleOutlineOutlinedIcon color="primary" />
              </Grid>
              <Grid item xs={4} className={classes.shareButton}>
                <ShareIcon color="primary" />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    );
  };

  return (
    <div className={classes.container}>
      {openDialog && renderPostFullScreen()}
      <Grid item className={classes.searchDialog}>
        <TextField
          fullWidth
          disabled
          variant="outlined"
          onClick={onClickSearch}
          className={classes.search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            classes: { notchedOutline: classes.noBorder },
          }}
          placeholder={"Tìm kiếm trên Heytutor"}
        />
      </Grid>

      <div className={classes.content}>
        <Typography>Nổi bật</Typography>
      </div>
      <div className={classes.filterByMajor}></div>
      <div className={classes.listPost}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={classes.post}>
            <Grid container className={classes.userPanel}>
              <Grid item xs={2} className={classes.userAvatar}>
                <Avatar src={user?.avatar} />
              </Grid>
              <Grid item xs={8} className={classes.userNameAndPostTime}>
                <Typography>{user?.name}</Typography>
                <Typography>{post?.time}</Typography>
              </Grid>
              <Grid item xs={2} className={classes.userMoreActions}>
                <MoreHorizIcon color="info" />
              </Grid>
            </Grid>
            <div className={classes.postContent}>
              <Typography>{post.content}</Typography>
              <Typography>{post.hashtag}</Typography>
            </div>
            <Grid container className={classes.postActions}>
              <Grid item xs={10} className={classes.leftPanel}>
                <div className={classes.likeButton} onClick={onClickLike}>
                  {isLiked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon color="primary" />}
                  <Typography>{post.likeCount}</Typography>
                </div>
                <div className={classes.commentButton} onClick={onClickCommentSection}>
                  <ChatBubbleOutlineOutlinedIcon color="primary" />
                  <Typography>{post.commentCount}</Typography>
                </div>
                <div className={classes.shareButton}>
                  <ShareIcon color="primary" />
                </div>
              </Grid>
              <Grid item xs={2} className={classes.rightPanel}>
                <div className={classes.bookmarkButton} onClick={onClickBookmark}>
                  {isBookmarked ? <BookmarkAddedIcon color="primary" /> : <BookmarkAddOutlinedIcon color="primary" />}
                </div>
              </Grid>
            </Grid>
            <div className={classes.divider} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
