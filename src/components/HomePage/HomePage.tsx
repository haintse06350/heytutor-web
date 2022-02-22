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
import SendIcon from "@mui/icons-material/Send";
import { stringAvatar } from "../UserProfile/helper";
// import { ChatEngineWrapper, ChatSocket, ChatList } from "react-chat-engine";

const HomePage = () => {
  const classes = useStyles();
  // const { user } = useContext(UserCtx);
  const [isLiked, setIsliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [currentLesson, setCurrentLesson] = useState(1);
  const user = {
    avatar: "",
    name: "Cao Duc Anh",
    userSecret: "123123",
    projectID: "de969c63-1866-429e-bfa7-b632652dbede",
    chatAccessKey: "ca-3eea076a-5113-4c34-b0e5-eb99e56472d0",
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

  const onClickCommentSection = (id: any) => {
    setOpenDialog(true);
    setCurrentLesson(id);
  };

  const onClickCommentSectionInsideDialog = () => {};

  const onClickLike = () => {
    setIsliked(!isLiked);
  };

  const onClickBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSendComment = () => {};

  useEffect(() => {
    console.log("fetch list post");
  }, []);

  // begin xu li listen comment

  useEffect(() => {
    const handleComment = () => {
      console.log("qqq");
    };

    window.addEventListener(`lesson-${currentLesson}`, handleComment);
    return () => {
      window.removeEventListener(`lesson-${currentLesson}`, handleComment);
    };
  }, [currentLesson]);

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
      <div className={classes.homeContent}>
        <div className={classes.listPost}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={classes.post}>
              <Grid container className={classes.userPanel}>
                <Grid item xs={2} className={classes.userAvatar}>
                  <Avatar {...stringAvatar(user.name)} src={user?.avatar} />
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
                  <div className={classes.commentButton} onClick={(i) => onClickCommentSection(i)}>
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
        {/* begin chat list */}
        {/* <div className={classes.chatListEngine}>
          <ChatEngineWrapper>
            <ChatSocket
              projectID={user.projectID}
              userName={user.name}
              userSecret={user.userSecret}
              senderUsername={user.name}
              chatID="97980"
              chatAccessKey="ca-3eea076a-5113-4c34-b0e5-eb99e56472d0"
            />
            <ChatList />
          </ChatEngineWrapper>
          {console.log(user)}
        </div> */}
        {/* end chat list */}
      </div>
    </div>
  );
};

export default HomePage;
