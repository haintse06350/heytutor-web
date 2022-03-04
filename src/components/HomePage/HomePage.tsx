/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import { useStyles } from "./HomePage.style";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, TextField, InputAdornment, Typography, Skeleton } from "@mui/material";
// import { UserCtx } from "../../context/user/state";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";

// import { ChatEngineWrapper, ChatSocket, ChatList } from "react-chat-engine";
import Search from "./Search/Search";
import { Post } from "../../models/post";
import Header from "../Header/Header";
import PostItem from "./PostItem";
import PostDetail from "./PostDetail";
import { Bookmark } from "../../models/bookmark";
import { map, findIndex } from "lodash";
import { sortBy } from "lodash";
import { CreatePost } from "../Post2/Post";
import { PostCtx } from "../../context/post/state";

const HomePage = () => {
  const classes = useStyles();
  // const { user } = useContext(UserCtx);
  const [openDialog, setOpenDialog] = useState(false);
  // const [currentLesson, setCurrentLesson] = useState(1);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [listPostHighlight, setListPostHighlight]: any = useState(null);
  const [listAllPost, setAllPost]: any = useState(null);
  const [listPost, setListPost]: any = useState(null);

  const [selectedPost, setSelectedPost]: any = useState(null);
  const [activeTab, setActiveTab] = useState("highlight");
  const { isCreatingPost } = useContext(PostCtx);

  const onClickSearch = () => {
    setOpenSearch(true);
  };

  const onCloseSearch = () => {
    setSearchQuery("");
    setOpenSearch(false);
  };

  const onClickCommentSection = (post: any) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const getListPost = async () => {
    try {
      const [highlightPosts, allPost, bookMarkedPost] = await Promise.all([
        Post.listPostsByUserRole(),
        Post.listAllPosts(),
        Bookmark.listBookmarksLite(),
      ]);

      const mapBookmarkPost = map(highlightPosts, (post: any) => {
        const isBookmarked = findIndex(bookMarkedPost, (item: any) => item.postId === post.id) !== -1;
        return { ...post, isBookmarked };
      });

      const orderByBookmarkPost = sortBy(mapBookmarkPost, "isBookmarked").reverse();

      setListPostHighlight(orderByBookmarkPost);
      setAllPost(allPost);
    } catch (error) {
      setListPostHighlight([]);
    }
  };

  const onClickHashTag = (hashTag: any) => {
    setOpenSearch(true);
    setSearchQuery(hashTag.value);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    getListPost();
  }, []);

  useEffect(() => {
    if (activeTab === "highlight") {
      if (listPostHighlight) {
        setListPost(listPostHighlight);
      } else {
        setActiveTab("all");
      }
    } else if (activeTab === "all" && listAllPost) {
      setListPost(listAllPost);
    }
  }, [activeTab, listPostHighlight, listAllPost]);

  const renderLoadingPost = (index: number) => {
    return (
      <div key={index} className={classes.post}>
        <Grid container className={classes.userPanel}>
          <Grid item xs={2} className={classes.userAvatar}>
            <Skeleton width={30} height={30} variant="circular" />
          </Grid>
          <Grid item xs={8} className={classes.userNameAndPostTime}>
            <Skeleton width={160} variant="text" />
            <Skeleton width={60} variant="text" />
          </Grid>
          <Grid item xs={2} className={classes.userOptionPost}>
            <Skeleton width={20} height={10} variant="rectangular" />
          </Grid>
        </Grid>
        <div className={classes.postContent}>
          <Skeleton width={200} variant="text" />
          <Skeleton width={500} variant="text" />
          <div className={classes.hashTag}>
            {map(Array.from(Array(3)), (item: any, index: number) => (
              <Skeleton
                key={index}
                width={50}
                height={26}
                style={{ marginRight: 8, borderRadius: 8 }}
                variant="rectangular"
              />
            ))}
          </div>
        </div>
        <Grid container className={classes.postActions}>
          <Grid item xs={8} className={classes.leftPanel}>
            <div className={classes.likeButton}>
              <Skeleton width={20} variant="rectangular" />
              <Skeleton width={16} style={{ marginLeft: 8 }} variant="text" />
            </div>
            <div className={classes.commentButton}>
              <Skeleton width={20} variant="rectangular" />
              <Skeleton width={16} style={{ marginLeft: 8 }} variant="text" />
            </div>
            <div className={classes.bookmarkBtn}>
              <Skeleton width={20} variant="rectangular" />
            </div>
          </Grid>
          <Grid item xs={4} className={classes.rightPanel}>
            <div className={classes.btnResolve}>
              <Skeleton width={20} variant="rectangular" />
              <Skeleton width={50} style={{ marginLeft: 8 }} variant="text" />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };

  const renderListPost = () => {
    return (
      <>
        <div className={classes.postFilter}></div>
        {!listPost
          ? map(Array.from(Array(10)), (item: any, index: number) => renderLoadingPost(index))
          : listPost.map((post: any, i: number) => (
              <div key={i} className={classes.post}>
                <PostItem post={post} onClickCommentSection={onClickCommentSection} onClickHashTag={onClickHashTag} />
              </div>
            ))}
        {}
      </>
    );
  };

  return (
    <>
      <Header />
      {isCreatingPost && <CreatePost />}
      <div className={classes.container}>
        {openSearch && <Search searchQuery={searchQuery} open={openSearch} onClose={onCloseSearch} />}
        {openDialog && <PostDetail post={selectedPost} onCloseDialog={onCloseDialog} openDialog={openDialog} />}
        <Grid item className={classes.searchDialogScreen}>
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
          <div className={classes.tabContent}>
            <Typography
              onClick={() => setActiveTab("highlight")}
              className={activeTab === "highlight" && classes.active}>
              Nổi bật
            </Typography>
            <Typography onClick={() => setActiveTab("all")} className={activeTab === "all" && classes.active}>
              Bài viết
            </Typography>
          </div>
        </div>
        <div className={classes.filterByMajor}></div>
        <div className={classes.listPost}>
          {listPost?.length === 0 ? (
            <div className={classes.emptyData}>
              <Typography>Không có bài viết nào</Typography>
            </div>
          ) : (
            renderListPost()
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
