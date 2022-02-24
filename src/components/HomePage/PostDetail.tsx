import React, { useState, useEffect } from "react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Avatar, Dialog, Grid, Typography } from "@mui/material";
import { useStyles } from "./HomePage.style";
import { Comment as CommentModel } from "../../models/comment";
import { stringAvatar } from "../UserProfile/helper";
import moment from "moment";

const PostDetail = (props: any) => {
  const { post, onCloseDialog, openDialog } = props;
  const [commentContent, setCommentContent] = useState("");
  const [listComment, setListComment]: any = useState(null);
  const classes = useStyles();
  const onClickCommentSectionInsideDialog = () => {};

  const onSendComment = () => {};

  useEffect(() => {
    CommentModel.listCommentByPost({ postId: post.id }).then((res: any) => {
      setListComment(res);
    });
  }, [post]);

  return (
    <Dialog keepMounted onClose={onCloseDialog} fullScreen open={openDialog}>
      <div className={classes.dialogContent}>
        <Grid container className={classes.dialogHeader}>
          <Grid onClick={onCloseDialog} xs={2} item className={classes.backBtn}>
            <ArrowBackIosIcon color="primary" />
          </Grid>
          <Grid xs={8} item className={classes.postTitle}>
            <Typography>{post?.title}</Typography>
          </Grid>
          <Grid xs={2} item className={classes.moreBtn}>
            <MoreHorizIcon color="primary" />
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.postContent}>
          <div className={classes.mainContent}>
            <Typography>{post?.content}</Typography>
            <Typography>{post?.hashtag}</Typography>
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

          <div className={classes.inputComment}>
            <input
              placeholder="Bình luận tại đây ..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <div onClick={onSendComment}>
              <SendIcon color="primary" />
            </div>
          </div>
        </Grid>
      </div>
    </Dialog>
  );
};

export default PostDetail;
