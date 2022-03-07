import React, { useState, useEffect, useContext } from "react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Avatar, Dialog, Grid, Typography, MenuItem, Menu, Button, Tooltip, Skeleton, Popover } from "@mui/material";
import { useStyles } from "./HomePage.style";
import { Comment as CommentModel } from "../../models/comment";
import { stringAvatar } from "../UserProfile/helper";
import moment from "moment";
import TextField from "@mui/material/TextField";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Post } from "../../models/post";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { Bookmark } from "../../models/bookmark";
import { NotificationCtx } from "../../context/notification/state";
import { UserCtx } from "../../context/user/state";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { useNavigate } from "react-router-dom";
// import { User } from "../../models/users";
const PostDetail = (props: any) => {
  const { post, onCloseDialog, openDialog } = props;
  const [commentContent, setCommentContent] = useState("");
  const [listComment, setListComment]: any = useState(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOptionCommentOpen, setOptionCommentOpen] = useState(false);
  const classes = useStyles();
  const onClickCommentSectionInsideDialog = () => {};
  const [postItem, setPostItem] = useState(post);
  const [isLiked, setIsliked] = useState(post?.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post?.isBookmarked);
  const { setNotificationSuccess } = useContext(NotificationCtx);
  const { user } = useContext(UserCtx);
  const [onHoverDetail, setOnHoverDetail] = useState(false);
  const [userProfileDetail, setUserProfileDetail]: any = useState(null);
  const navigate = useNavigate();
  const isMyPost = (postItem: any) => {
    return postItem?.user?.id === user.id;
  };

  const onClickLike = async (post: any) => {
    setIsliked(!isLiked);
    const params = {
      postId: postItem?.id,
    };

    const res = await Post.likePost(params);
    setPostItem({ ...res, user: post.user });
  };
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

  const onClickBookmarkPost = async (post: any) => {
    if (isBookmarked) {
      await Bookmark.removeBookmark({ postId: post.id });
      setNotificationSuccess("Removed from your bookmarks !");
    } else {
      const res = await Bookmark.addBookmark({ postId: post.id });
      if (res.id) {
        setNotificationSuccess("Add bookmark successfully !");
      }
    }
    setIsBookmarked(!isBookmarked);
  };

  //begin render menu avatar
  const renderMenuOptionComment = (
    <Menu
      className={classes.headerMenu}
      id="commentOption"
      keepMounted
      anchorEl={anchorEl}
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
  const onClickProfile = (userId: number) => {
    navigate(`/profile/?userId=${userId}`);
  };

  const loadingProfileDetail = () => {
    return (
      <div className={classes.previewProfileContent}>
        <div className={classes.avatar}>
          <Skeleton width={50} height={50} variant="circular" />
        </div>
        <div className={classes.nameAndEmail}>
          <Skeleton width={100} variant="text" />
          <Skeleton width={200} variant="text" />
          <div className={classes.stats}>
            <div className={classes.statsItem}>
              <Skeleton width={16} variant="rectangular" />
              <Skeleton width={12} style={{ marginLeft: 12 }} variant="text" />
            </div>
            <div className={classes.statsItem}>
              <Skeleton width={16} variant="rectangular" />
              <Skeleton width={12} style={{ marginLeft: 12 }} variant="text" />
            </div>
          </div>
        </div>
        <div className={classes.inboxButton}>
          <Skeleton width={60} variant="text" />
        </div>
      </div>
    );
  };

  const renderPreviewProfileDetail = () => {
    return (
      <Popover
        open={onHoverDetail}
        anchorEl={anchorEl}
        className={classes.previewProfile}
        onMouseEnter={() => setOnHoverDetail(true)}
        onMouseLeave={() => setOnHoverDetail(false)}>
        {!userProfileDetail ? (
          loadingProfileDetail()
        ) : (
          <div className={classes.previewProfileContent}>
            <div className={classes.avatar}>
              <Avatar {...stringAvatar(userProfileDetail.name)} />
            </div>
            <div className={classes.nameAndEmail}>
              <Typography variant="body2">{userProfileDetail.name}</Typography>
              <Typography variant="body2">{userProfileDetail.email}</Typography>
              <div className={classes.stats}>
                <div className={classes.statsItem}>
                  <FeedOutlinedIcon sx={{ color: "#909399" }} />
                  <span>{userProfileDetail.postCount || 0}</span>
                </div>
                <div className={classes.statsItem}>
                  <StarBorderOutlinedIcon sx={{ color: "#909399" }} />
                  <span>{userProfileDetail.rateCount || 0}</span>
                </div>
              </div>
            </div>
            <div className={classes.inboxButton}>
              <Typography>Nhắn tin</Typography>
            </div>
          </div>
        )}
      </Popover>
    );
  };

  const handleHover = (user: NumberConstructor, e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
    setUserProfileDetail(user);
    setOnHoverDetail(true);
  };

  const handleHoverClose = () => {
    setUserProfileDetail(null);
    setAnchorEl(null);
    setOnHoverDetail(false);
  };

  useEffect(() => {
    CommentModel.listCommentByPost({ postId: post.id }).then((res: any) => {
      setListComment(res);
    });
  }, [post]);

  // useEffect(() => {
  //   setAnchorEl(divRef.current);
  // }, [divRef]);

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
        </Grid>
        <Grid item xs={12} className={classes.postContent}>
          <div className={classes.mainContent}>
            <Typography>{post?.content}</Typography>
            <Typography>{post?.hashtag}</Typography>
          </div>
          <Grid container item xs={12} className={classes.simpleActions}>
            <div className={classes.likeButton} onClick={() => onClickLike(postItem)}>
              {isLiked ? (
                <Tooltip title={"Thích"}>
                  <Button aria-label="like">
                    <ThumbUpIcon color="primary" />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title={"Không thích"}>
                  <Button aria-label="dislike">
                    <ThumbUpOutlinedIcon color="primary" />
                  </Button>
                </Tooltip>
              )}
              <Typography>{postItem?.likeCount}</Typography>
            </div>

            <div className={classes.commentButton} onClick={onClickCommentSectionInsideDialog}>
              <Tooltip title={"Bình luận"}>
                <Button aria-label="comment">
                  <ChatBubbleOutlineOutlinedIcon color="primary" />
                </Button>
              </Tooltip>
              <Typography>{postItem?.commentCount}</Typography>
            </div>

            <div className={classes.bookmarkBtn} onClick={() => onClickBookmarkPost(post)}>
              {isBookmarked ? (
                <Tooltip title={"Lưu bài"}>
                  <Button aria-label="Bookmark">
                    <BookmarkAddedIcon color="primary" />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title={"Không lưu bài"}>
                  <Button>
                    <BookmarkAddOutlinedIcon color="primary" />
                  </Button>
                </Tooltip>
              )}
            </div>
          </Grid>

          <div className={classes.commentSection}>
            {onHoverDetail && renderPreviewProfileDetail()}
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
                      <div className={classes.commentContentHeader}>
                        <Typography
                          onMouseEnter={(e: any) => handleHover(comment.user, e)}
                          onMouseLeave={() => handleHoverClose}
                          onClick={() => onClickProfile(comment.user.id)}>
                          {comment.user.name}
                        </Typography>

                        {isMyPost(post) && (
                          <div onClick={handleOpenOptionComment}>
                            <MoreHorizIcon />
                          </div>
                        )}
                      </div>

                      <Typography>{comment.comment}</Typography>

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
            <Button variant="contained" endIcon={<SendIcon />} onClick={onSendComment} />
          </div>
        </Grid>
      </div>
    </Dialog>
  );
};

export default PostDetail;
