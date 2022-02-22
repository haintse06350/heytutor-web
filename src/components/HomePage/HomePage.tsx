/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useStyles } from "./HomePage.style";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, TextField, InputAdornment, Typography, Avatar, Dialog, Slide, CircularProgress } from "@mui/material";
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
import SendIcon from "@mui/icons-material/Send";
import { stringAvatar } from "../UserProfile/helper";
// import { ChatEngineWrapper, ChatSocket, ChatList } from "react-chat-engine";
import Search from "./Search/Search";
import { Posts } from "../../models/post";
import moment from "moment";
import Header from "../Header/Header";

const HomePage = () => {
  const classes = useStyles();
  // const { user } = useContext(UserCtx);
  const [isLiked, setIsliked] = useState(false);
  const [likePost, setLikedPost]: any = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  // const [currentLesson, setCurrentLesson] = useState(1);
  const [openSearch, setOpenSearch] = useState(false);
  const [listPost, setListPost]: any = useState(null);
  const [selectedPost, setSelectedPost]: any = useState(null);

  const user = {
    avatar: "",
    name: "Cao Duc Anh",
    userSecret: "123123",
    projectID: "de969c63-1866-429e-bfa7-b632652dbede",
    chatAccessKey: "ca-3eea076a-5113-4c34-b0e5-eb99e56472d0",
  };

  const onClickSearch = () => {
    setOpenSearch(true);
  };

  const onCloseSearch = () => {
    setOpenSearch(false);
  };

  const onClickCommentSection = (post: any) => {
    setSelectedPost(post);
    setOpenDialog(true);
    // setCurrentLesson(id);
    // window.dispatchEvent(new CustomEvent(`lesson-${id}`, { detail: `cmt lesson ${id}` }));
  };

  const onClickCommentSectionInsideDialog = () => {};

  const onClickLike = (postId: number) => {
    setLikedPost(postId);
    setIsliked(!isLiked);
  };

  const onClickBookmark = (post: any) => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSendComment = () => {};

  const getListPost = async () => {
    try {
      const res = await Posts.listPosts("", {});
      setListPost(res.rows);
    } catch (error) {
      setListPost([]);
    }
  };

  //end xu li listent comment
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
              <Typography>{selectedPost?.title}</Typography>
            </Grid>
            <Grid xs={2} item className={classes.moreBtn}>
              <MoreHorizIcon color="primary" />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.postContent}>
            <div className={classes.postContent}>
              <Typography>{selectedPost?.content}</Typography>
              <Typography>{selectedPost?.hashtag}</Typography>
            </div>
            <Grid container item xs={12} className={classes.simpleActions}>
              <Grid item xs={4} className={classes.likeButton} onClick={() => onClickLike(selectedPost?.id)}>
                {isLiked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon color="primary" />}
              </Grid>
              <Grid item xs={4} className={classes.commentButton} onClick={onClickCommentSectionInsideDialog}>
                <ChatBubbleOutlineOutlinedIcon color="primary" />
              </Grid>
              <Grid item xs={4} className={classes.shareButton}>
                <ShareIcon color="primary" />
              </Grid>
            </Grid>
            {/* begin comment */}
            <div className={classes.inputComment}>
              <input
                placeholder="Bình luận tại đây ..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <div onClick={handleSendComment}>
                <SendIcon />
              </div>
            </div>
            {/* end comment */}
          </Grid>
        </div>
      </Dialog>
    );
  };

  useEffect(() => {
    getListPost();
  }, []);

  // begin xu li listen comment

  // useEffect(() => {
  //   const handleComment = () => {
  //     console.log("qqq");
  //   };

  //   window.addEventListener(`lesson-${currentLesson}`, handleComment);
  //   return () => {
  //     window.removeEventListener(`lesson-${currentLesson}`, handleComment);
  //   };
  // }, [currentLesson]);

  const renderListPost = () => {
    return (
      <>
        {listPost?.map((post: any, i: number) => (
          <div key={i} className={classes.post}>
            <Grid container className={classes.userPanel}>
              <Grid item xs={2} className={classes.userAvatar}>
                <Avatar {...stringAvatar(user.name)} src={user?.avatar} />
              </Grid>
              <Grid item xs={8} className={classes.userNameAndPostTime}>
                <Typography>{user?.name}</Typography>
                <Typography>{moment().from(post?.createdAt)}</Typography>
              </Grid>
              <div className={classes.divider} />
            </Grid>
            <Grid container className={classes.postActions}>
              <Grid item xs={10} className={classes.leftPanel}>
                <div className={classes.likeButton} onClick={() => onClickLike(post.id)}>
                  {isLiked && likePost === post.id ? (
                    <ThumbUpIcon color="primary" />
                  ) : (
                    <ThumbUpOutlinedIcon color="primary" />
                  )}
                  <Typography>{post.likeCount}</Typography>
                </div>
                <div className={classes.commentButton} onClick={() => onClickCommentSection(post)}>
                  <ChatBubbleOutlineOutlinedIcon color="primary" />
                  <Typography>{post.commentCount}</Typography>
                </div>
                <div className={classes.shareButton}>
                  <ShareIcon color="primary" />
                </div>
              </Grid>
              <Grid item xs={2} className={classes.rightPanel}>
                <div className={classes.bookmarkButton} onClick={() => onClickBookmark(post)}>
                  {isBookmarked ? <BookmarkAddedIcon color="primary" /> : <BookmarkAddOutlinedIcon color="primary" />}
                </div>
              </Grid>
            </Grid>
            <div className={classes.divider} />
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Header />
      <div className={classes.container}>
        {openSearch && <Search open={openSearch} onClose={onCloseSearch} />}
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
          {!listPost ? (
            <div className={classes.loading}>
              <CircularProgress />
              Loading ...
            </div>
          ) : listPost?.length === 0 ? (
            <div className={classes.emptyData}>
              <Typography>Không có bài viết nào</Typography>
            </div>
          ) : (
            renderListPost()
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
