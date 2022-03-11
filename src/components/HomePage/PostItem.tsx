import React, { useState, useContext, useEffect } from "react";
// material
import { Grid, Typography, Menu, MenuItem, Tooltip, Box, Button } from "@mui/material";
// component
import { map } from "lodash";
import clsx from "classnames";
import { UserCtx } from "../../context/user/state";
import { useStyles } from "./PostItem.style";
// icon
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

const PostItem = (props: any) => {
  const { post, onClickCommentSection, onClickHashTag } = props;
  const classes = useStyles();
  const [isResolved, setIsResolved] = useState(false);
  const [postItem, setPostItem] = useState(post);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const { user } = useContext(UserCtx);

  

  const isMyPost = (postItem: any) => {
    return postItem?.user?.id === user?.id;
  };

  const onClickResolve = (post: any) => {
    setIsResolved(!isResolved);
  };

  const renderHashTag = (hashTag: string) => {
    let hashTagArray: any = null;
    try {
      hashTagArray = JSON.parse(hashTag.replaceAll("'", ""));
    } catch (error) {
      hashTagArray = [];
    }
    const listHashTag = map(hashTagArray, (h: string) => {
      return {
        type: "hashtag",
        value: h,
      };
    });

    if (post.eventId) {
      listHashTag.push({ type: "event", value: post.eventId });
    }

    return map(listHashTag, (item: any, idx: number) => (
      <div
        className={clsx(classes.hashTagItem, item.type === "event" && classes.event)}
        key={idx}
        onClick={() => onClickHashTag(item)}>
        <Typography>{item.type === "event" ? "On Event" : item.value}</Typography>
      </div>
    ));
  };
  const handleOptionPostOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOptionOpen(true);
  };

  const handleOptionClose = () => {
    setIsOptionOpen(false);
  };

  const onRepostPost = () => {
    console.log("postID: ", post.id, "userID: ", post.user.id);
    // Post.report({ postId: post.id, userId: post.user.id });
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
      {isMyPost(post) ? (
        <>
          <MenuItem onClick={onRepostPost} value="repost">
            Xoá bài viết
          </MenuItem>
          <MenuItem value="hide">Chỉnh sửa bài viết</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={onRepostPost} value="repost">
            Báo cáo bài viết
          </MenuItem>
          <MenuItem value="hide">Ẩn bài viết</MenuItem>
        </>
      )}
    </Menu>
  );

  useEffect(() => {
    post && setPostItem(post);
  }, [post]);

  return (
    <div className={classes.wrapPostItem}>
      <Grid container className={classes.userPanel}>
        <Grid item xs={1} md={1} className={classes.userOptionPost} onClick={handleOptionPostOpen}>
          <MoreHorizIcon />
        </Grid>
      </Grid>
      {isOptionOpen && renderOption}
      <Grid>
        <Typography variant="subtitle1">{postItem?.title}</Typography>
        <Typography variant="body1">{postItem?.content}</Typography>
        <div className={classes.hashTag}>{renderHashTag(postItem?.hashtag)}</div>
      </Grid>

      <Grid container className={classes.postActions}>
        <Grid item xs={8} md={8} className={classes.leftPanel}>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Tooltip title="Số lượt xem">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <VisibilityOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                <Typography style={{ fontSize: 14 }}>15</Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Số lượt đăng kí">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <HowToRegOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                <Typography style={{ fontSize: 14 }}>5</Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Số bình luận">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <CommentOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                <Typography style={{ fontSize: 14 }}>{postItem?.commentCount}</Typography>
              </Box>
            </Tooltip>
            {/* lấy giá trị isResolved của post để thêm vào đây chứ k phải click */}
            <div className={classes.btnResolve} onClick={() => onClickResolve(postItem)}>
              {isResolved ? (
                <Tooltip title="Đã giải quyết">
                  <DoneAllIcon color="success" />
                </Tooltip>
              ) : (
                <Tooltip title="Chưa giải quyết">
                  <RemoveDoneIcon color="error" />
                </Tooltip>
              )}
            </div>
          </Box>
        </Grid>
        <Grid item xs={4} md={4}>
          <Button variant="contained" color="info" onClick={() => onClickCommentSection(postItem)}>
            Xem chi tiết
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostItem;
