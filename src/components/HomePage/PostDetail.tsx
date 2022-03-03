import React, { useState, useEffect } from "react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Avatar, Dialog, Grid, Typography } from "@mui/material";
import { useStyles } from "./HomePage.style";
import { Comment as CommentModel } from "../../models/comment";
import { stringAvatar } from "../UserProfile/helper";
import moment from "moment";
import { MenuItem, Menu, Button, Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
const PostDetail = (props: any) => {
  const { post, onCloseDialog, openDialog } = props;
  const [commentContent, setCommentContent] = useState("");
  const [listComment, setListComment]: any = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOptionCommentOpen, setOptionCommentOpen] = useState(false);
  const classes = useStyles();
  const onClickCommentSectionInsideDialog = () => {};

  const onSendComment = () => {
    console.log("comment send");
  };
  const handleClose = () => {
    setOptionCommentOpen(false);
  };

  const handleHideComent = () => {
    console.log("comment hide");
    setOptionCommentOpen(false);
  };

  const handleDeleteComment = () => {
    console.log("comment del");
    setOptionCommentOpen(false);
  };
  const handleOpenOptionComment = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOptionCommentOpen(true);
  };
  //begin render menu avatar
  const renderMenuOptionComment = (
    <Menu
      anchorEl={anchorEl}
      className={classes.headerMenu}
      id="commentOption"
      keepMounted
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOptionCommentOpen}
      onClose={handleClose}>
      <MenuItem value="hideComment" onClick={handleHideComent}>
        Ẩn bình luận
      </MenuItem>
      <MenuItem value="deleteComment" onClick={handleDeleteComment}>
        Xóa bình luận
      </MenuItem>
    </Menu>
  );

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
              <Tooltip title={"Thích"}>
                <Button>
                  <ThumbUpOutlinedIcon color="primary" />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={4} className={classes.commentButton} onClick={onClickCommentSectionInsideDialog}>
              <Tooltip title={"Bình luận"}>
                <Button>
                  <ChatBubbleOutlineOutlinedIcon color="primary" />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={4} className={classes.shareButton}>
              <Tooltip title={"Lưu bài viết"}>
                <Button>
                  <BookmarkAddedIcon color="primary" />
                </Button>
              </Tooltip>
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
                      <div onClick={handleOpenOptionComment}>
                        <MoreHorizIcon />
                      </div>

                      <Tooltip title={"Nhắn tin"}>
                        <Button aria-label="Nhắn tin">
                          <EmailIcon color="action" />
                        </Button>
                      </Tooltip>

                      {isOptionCommentOpen && renderMenuOptionComment}
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
            <TextField
              id="comment-content"
              autoFocus
              margin="dense"
              variant="outlined"
              label="Bình luận tại đây ..."
              fullWidth
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}></TextField>
            <Button variant="contained" endIcon={<SendIcon />} onClick={onSendComment}>
              Đăng bài
            </Button>
          </div>
        </Grid>
      </div>
    </Dialog>
  );
};

export default PostDetail;
