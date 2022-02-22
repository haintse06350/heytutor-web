/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useStyles } from "./HomePage.style";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, TextField, InputAdornment, Typography, Dialog, Slide, CircularProgress } from "@mui/material";
// import { UserCtx } from "../../context/user/state";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { TransitionProps } from "@mui/material/transitions";
import SendIcon from "@mui/icons-material/Send";
// import { ChatEngineWrapper, ChatSocket, ChatList } from "react-chat-engine";
import Search from "./Search/Search";
import { Posts } from "../../models/post";
import moment from "moment";
import Header from "../Header/Header";
import PostItem from "./PostItem";

const HomePage = () => {
  const classes = useStyles();
  // const { user } = useContext(UserCtx);
  const [openDialog, setOpenDialog] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  // const [currentLesson, setCurrentLesson] = useState(1);
  const [openSearch, setOpenSearch] = useState(false);
  const [listPost, setListPost]: any = useState(null);
  const [selectedPost, setSelectedPost]: any = useState(null);

  const onClickSearch = () => {
    setOpenSearch(true);
  };

  const onCloseSearch = () => {
    setOpenSearch(false);
  };

  const onClickCommentSection = (post: any) => {
    setSelectedPost(post);
    setOpenDialog(true);
    setCurrentLesson(id);
  };

  const onClickCommentSectionInsideDialog = () => {};

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
              <Grid item xs={4} className={classes.likeButton}>
                {/* {isLiked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon color="primary" />} */}
                <ThumbUpOutlinedIcon color="primary" />
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
            <PostItem onClickCommentSection={onClickCommentSection} post={post} />
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
