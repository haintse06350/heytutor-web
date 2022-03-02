import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useStyles } from "./Event.style";
import { Grid, Typography, Dialog, Slide, Avatar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Comment as CommentModel } from "../../models/comment";
import { stringAvatar } from "../UserProfile/helper";
import moment from "moment";

const Event = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLiked, setIsliked] = useState(false);

  // const user = {
  //   avatar: "",
  //   name: "Nguyen Trung Hai",
  // };

  const onClickLike = () => {
    setIsliked(!isLiked);
  };
  const [listComment, setListComment]: any = useState(null);

  const post = {
    title: "Lorem Ipsum",
    time: "20h",
    content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccccccccccccccccccccccccccccc",
    hashtag: "#CSD",
    isLiked: false,
    likeCount: 23,
    commentCount: 5,
    isBookmarked: false,
  };

  useEffect(() => {
    CommentModel.listCommentByPost({}).then((res: any) => {
      setListComment(res);
    });
  }, [post]);

  const onClickCommentSection = () => {
    setOpenDialog(true);
  };

  const onClickCommentSectionInsideDialog = () => {};

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
    <div className={classes.hashtag}>
      {openDialog && renderPostFullScreen()}
      <div className={classes.listPost}>
        <div key={1} className={classes.post}>
          <div className={classes.postContent}>
            <Typography>{post.content}</Typography>
            <Typography>{post.hashtag}</Typography>
          </div>
          <Grid container className={classes.postActions}>
            <Grid item xs={12} className={classes.rightPanel}>
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
          </Grid>
          <div className={classes.divider} />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className={classes.commentSection}>
                {!listComment ? (
                  <Typography>Loading comments...</Typography>
                ) : (
                  listComment?.map((comment: any) => (
                    <div key={comment.id} className={classes.commentItem}>
                      <div className={classes.userAvatar}>
                        <Avatar {...stringAvatar(comment.user.name)} />
                      </div>
                      <div className={classes.commentRow}>
                        <div className={classes.commentContent}>
                          <Typography>{comment.user.name}</Typography>
                          <Typography>{comment.comment}</Typography>
                        </div>
                        <div className={classes.commentAt}>
                          <Typography>{moment().from(comment.createdAt)}</Typography>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.commentSection}>
                {!listComment ? (
                  <Typography>Loading comments...</Typography>
                ) : (
                  listComment?.map((comment: any) => (
                    <div key={comment.id} className={classes.commentItem}>
                      <div className={classes.userAvatar}>
                        <Avatar {...stringAvatar(comment.user.name)} />
                      </div>
                      <div className={classes.commentRow}>
                        <div className={classes.commentContent}>
                          <Typography>{comment.user.name}</Typography>
                          <Typography>{comment.comment}</Typography>
                        </div>
                        <div className={classes.commentAt}>
                          <Typography>{moment().from(comment.createdAt)}</Typography>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Event;
