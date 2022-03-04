import React, { useState, useContext, useEffect } from "react";
import { Grid, Typography, Avatar, Menu, MenuItem, Skeleton } from "@mui/material";
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
import clsx from "classnames";
import { User } from "../../models/users";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Button, Tooltip } from "@mui/material";
import { UserCtx } from "../../context/user/state";
const PostItem = (props: any) => {
  const { post, onClickCommentSection, onClickHashTag } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const [isLiked, setIsliked] = useState(post?.isLiked);
  const [isResolved, setIsResolved] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(post?.isBookmarked);
  const [postItem, setPostItem] = useState(post);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [userProfile, setUserProfile]: any = useState(null);
  const [onHover, setOnHover] = useState(false);

  const { setNotificationSuccess } = useContext(NotificationCtx);
  const { user } = useContext(UserCtx);

  const isMyPost = (postItem: any) => {
    return postItem?.user?.id === user?.id;
  };

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
    const listHashTag = map(hashTagArray, (h: string) => {
      return {
        type: "hashtag",
        value: h,
      };
    });

    if (post.isBookmarked) {
      listHashTag.push({ type: "bookmark", value: "#recentBookmark" });
    }

    if (post.eventId) {
      listHashTag.push({ type: "event", value: post.eventId });
    }

    return map(listHashTag, (item: any, idx: number) => (
      <div
        className={clsx(
          classes.hashTagItem,
          item.type === "bookmark" && classes.bookmark,
          item.type === "event" && classes.event
        )}
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

  const getUserProfile = async (userId: number | string) => {
    const profile = await User.getUserProfile(userId);
    setUserProfile(profile);
  };

  const loadingProfile = () => {
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

  const renderPreviewProfile = () => {
    return (
      <div
        className={classes.previewProfile}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}>
        {!userProfile ? (
          loadingProfile()
        ) : (
          <div className={classes.previewProfileContent}>
            <div className={classes.avatar}>
              <Avatar {...stringAvatar(userProfile.name)} />
            </div>
            <div className={classes.nameAndEmail}>
              <Typography variant="body2">{userProfile.name}</Typography>
              <Typography variant="body2">{userProfile.email}</Typography>
              <div className={classes.stats}>
                <div className={classes.statsItem}>
                  <FeedOutlinedIcon sx={{ color: "#909399" }} />
                  <span>{userProfile.postCount || 0}</span>
                </div>
                <div className={classes.statsItem}>
                  <StarBorderOutlinedIcon sx={{ color: "#909399" }} />
                  <span>{userProfile.rateCount || 0}</span>
                </div>
              </div>
            </div>
            <div className={classes.inboxButton}>
              <Typography>Nhắn tin</Typography>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (onHover) {
      getUserProfile(post.userId);
    } else {
      setUserProfile(null);
    }
  }, [onHover]);

  return (
    <div>
      <Grid container className={classes.userPanel}>
        <Grid item xs={1} md={2} className={classes.userAvatar} onClick={() => onClickProfile(postItem?.user?.id)}>
          <Avatar {...stringAvatar(postItem?.user?.name)} src={postItem?.user?.avatar} />
        </Grid>
        <Grid item xs={6} md={8} className={classes.userNameAndPostTime}>
          <Typography
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            onClick={() => onClickProfile(postItem?.user?.id)}>
            {postItem?.user?.name}
          </Typography>
          <Typography>{moment().from(postItem?.createdAt)}</Typography>
        </Grid>
        <Grid item xs={3} md={3} className={classes.userOptionPost} onClick={handleOptionPostOpen}>
          <MoreHorizIcon />
        </Grid>
        {onHover && renderPreviewProfile()}
      </Grid>
      {isOptionOpen && renderOption}
      <div className={classes.postContent}>
        <Typography>{postItem?.title}</Typography>
        <Typography>{postItem?.content}</Typography>
        <div className={classes.hashTag}>{renderHashTag(postItem?.hashtag)}</div>
      </div>
      <Grid container className={classes.postActions}>
        <Grid item xs={8} className={classes.leftPanel}>
          <div onClick={() => onClickLike(postItem)}>
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
          <div onClick={() => onClickCommentSection(postItem)}>
            <Tooltip title={"Bình luận"}>
              <Button aria-label="comment">
                <ChatBubbleOutlineOutlinedIcon color="primary" />
              </Button>
            </Tooltip>
            <Typography>{postItem?.commentCount}</Typography>
          </div>
          <div onClick={() => onClickBookmarkPost(post)}>
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
    </div>
  );
};

export default PostItem;
