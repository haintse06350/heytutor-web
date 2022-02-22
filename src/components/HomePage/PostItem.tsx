import React, { useState } from "react";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { Grid, Typography, Avatar } from "@mui/material";
import { useStyles } from "./HomePage.style";
import { stringAvatar } from "../UserProfile/helper";
import moment from "moment";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareIcon from "@mui/icons-material/Share";

const PostItem = (props: any) => {
  const { post, onClickCommentSection } = props;
  const classes = useStyles();
  const [isLiked, setIsliked] = useState(false);
  const [likePost, setLikedPost]: any = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const user = {
    avatar: "",
    name: "Cao Duc Anh",
    userSecret: "123123",
    projectID: "de969c63-1866-429e-bfa7-b632652dbede",
    chatAccessKey: "ca-3eea076a-5113-4c34-b0e5-eb99e56472d0",
  };

  const onClickLike = (postId: number) => {
    setLikedPost(postId);
    setIsliked(!isLiked);
  };

  const onClickBookmark = (post: any) => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <>
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
      <div className={classes.postContent}>
        <Typography>{post.content}</Typography>
        <Typography>{post.hashtag}</Typography>
        {/* {JSON.parse(post.hashtag).map((item: any, i: number) => (
          <Typography key={i}>{item}</Typography>
        ))} */}
      </div>
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
    </>
  );
};

export default PostItem;
