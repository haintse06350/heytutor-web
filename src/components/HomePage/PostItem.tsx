import React, { useState } from "react";
import { Grid, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import { useStyles } from "./HomePage.style";
import { stringAvatar } from "../UserProfile/helper";
import moment from "moment";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { map } from "lodash";
import { Post } from "../../models/post";

const PostItem = (props: any) => {
  const { post, onClickCommentSection, onClickHashTag } = props;
  const classes = useStyles();
  const [isLiked, setIsliked] = useState(false);
  const [likePost, setLikedPost]: any = useState(null);
  const [isResolved, setIsResolved] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const onClickLike = async (postId: number) => {
    setLikedPost(postId);
    setIsliked(!isLiked);
    const params = {
      postId,
      isLiked: !isLiked,
      likeCount: isLiked ? post?.likeCount - 1 : post?.likeCount + 1,
    };
    await Post.updatePost(params);
  };

  const onClickResolve = (post: any) => {
    setIsResolved(!isResolved);
  };

  const onClickProfile = (userId: number) => {
    navigate(`/profile/?userId=${userId}`);
  };

  const renderHashTag = (hashTag: string) => {
    let hashTagArray: any = null;
    try {
      hashTagArray = JSON.parse(hashTag.replaceAll("'", ""));
    } catch (error) {
      hashTagArray = [];
    }
    return map(hashTagArray, (item: string, idx: number) => (
      <Typography key={idx} onClick={() => onClickHashTag(item)}>
        {item}
      </Typography>
    ));
  };
  const handleOptionPostOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOptionOpen(true);
  };

  const handleOptionClose = () => {
    setIsOptionOpen(false);
  };

  const renderOption = (
    <Menu
      anchorEl={anchorEl}
      id={"menuOption"}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOptionOpen}
      onClose={handleOptionClose}>
      <MenuItem value="repost">Báo cáo bài viết</MenuItem>
      <MenuItem value="hide">Ẩn bài viết</MenuItem>
      <MenuItem value="save">Lưu bài viết</MenuItem>
    </Menu>
  );

  return (
    <>
      <Grid container className={classes.userPanel}>
        <Grid item xs={2} className={classes.userAvatar} onClick={() => onClickProfile(post.user.id)}>
          <Avatar {...stringAvatar(post.user.name)} src={post.user?.avatar} />
        </Grid>
        <Grid item xs={8} className={classes.userNameAndPostTime}>
          <Typography onClick={() => onClickProfile(post.user.id)}>{post.user?.name}</Typography>
          <Typography>{moment().from(post?.createdAt)}</Typography>
        </Grid>
        <Grid item xs={2} className={classes.userOptionPost} onClick={handleOptionPostOpen}>
          <MoreHorizIcon />
        </Grid>
      </Grid>
      {isOptionOpen && renderOption}
      <div className={classes.postContent}>
        <Typography>{post.content}</Typography>
        <div className={classes.hashTag}>{renderHashTag(post.hashtag)}</div>
      </div>
      <Grid container className={classes.postActions}>
        <Grid item xs={8} className={classes.leftPanel}>
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
        </Grid>
        <Grid item xs={4} className={classes.rightPanel}>
          <div className={classes.btnResolve} onClick={() => onClickResolve(post)}>
            {isResolved ? (
              <div className={classes.isResolve}>
                <DoneAllIcon color="primary" aria-label="Đã giải quyết"></DoneAllIcon>
                <Typography>Đã giải quyết</Typography>
              </div>
            ) : (
              <div className={classes.isResolve}>
                <RemoveDoneIcon color="primary" aria-label="Chưa giải quyết"></RemoveDoneIcon>
                <Typography>Chưa giải quyết</Typography>{" "}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
      <div className={classes.divider} />
    </>
  );
};

export default PostItem;
