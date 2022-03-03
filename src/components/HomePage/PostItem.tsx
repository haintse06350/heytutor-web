import React, { useState, useContext } from "react";
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
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useNavigate } from "react-router-dom";
import { map } from "lodash";
import { Post } from "../../models/post";
import { Bookmark } from "../../models/bookmark";
import { NotificationCtx } from "../../context/notification/state";
import { Button, Tooltip } from "@mui/material";
const PostItem = (props: any) => {
  const { post, onClickCommentSection, onClickHashTag } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const rollUser = 1;
  const [isLiked, setIsliked] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(post?.isBookmarked);
  const [postItem, setPostItem] = useState(post);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const { setNotificationSuccess } = useContext(NotificationCtx);

  const onClickLike = async (post: any) => {
    setIsliked(!isLiked);
    const params = {
      postId: postItem?.id,
    };

    const res = await Post.likePost(params);
    setPostItem({ ...res, user: post.user });
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
      {rollUser === 1 ? (
        <>
          <MenuItem value="repost">Báo cáo bài viết</MenuItem>
          <MenuItem value="hide">Ẩn bài viết</MenuItem>
          <MenuItem value="save">Lưu bài viết</MenuItem>
        </>
      ) : (
        <>
          <MenuItem value="warning">Cảnh báo nội dung</MenuItem>
          <MenuItem value="del">Xóa bài viết</MenuItem>
          <MenuItem value="limitPost">Giới hạn đăng bài</MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <>
      <Grid container className={classes.userPanel}>
        <Grid item xs={2} className={classes.userAvatar} onClick={() => onClickProfile(postItem?.user?.id)}>
          <Avatar {...stringAvatar(postItem?.user?.name)} src={postItem?.user?.avatar} />
        </Grid>
        <Grid item xs={8} className={classes.userNameAndPostTime}>
          <Typography onClick={() => onClickProfile(postItem?.user?.id)}>{postItem?.user?.name}</Typography>
          <Typography>{moment().from(postItem?.createdAt)}</Typography>
        </Grid>
        <Grid item xs={2} className={classes.userOptionPost} onClick={handleOptionPostOpen}>
          <MoreHorizIcon />
        </Grid>
      </Grid>
      {isOptionOpen && renderOption}
      <div className={classes.postContent}>
        <Typography>{postItem?.content}</Typography>
        <div className={classes.hashTag}>{renderHashTag(postItem?.hashtag)}</div>
      </div>
      <Grid container className={classes.postActions}>
        <Grid item xs={8} className={classes.leftPanel}>
          <div className={classes.likeButton} onClick={() => onClickLike(postItem)}>
            {postItem?.isLiked ? (
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
          <div className={classes.commentButton} onClick={() => onClickCommentSection(postItem)}>
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
        <Grid item xs={4} className={classes.rightPanel}>
          {/* lấy giá trị isResolved của post để thêm vào đây chứ k phải click */}
          <div className={classes.btnResolve} onClick={() => onClickResolve(postItem)}>
            {isResolved ? (
              <div className={classes.isResolve}>
                <DoneAllIcon color="primary" aria-label="Đã giải quyết"></DoneAllIcon>
                <Typography>Đã giải quyết</Typography>
              </div>
            ) : (
              <div className={classes.isResolve}>
                <RemoveDoneIcon color="primary" aria-label="Chưa giải quyết"></RemoveDoneIcon>
                <Typography>Chưa giải quyết</Typography>
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
