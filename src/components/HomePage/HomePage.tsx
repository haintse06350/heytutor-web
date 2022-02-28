/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useStyles } from "./HomePage.style";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, TextField, InputAdornment, Typography, CircularProgress } from "@mui/material";
// import { UserCtx } from "../../context/user/state";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";

// import { ChatEngineWrapper, ChatSocket, ChatList } from "react-chat-engine";
import Search from "./Search/Search";
import { Post } from "../../models/post";
import Header from "../Header/Header";
import PostItem from "./PostItem";
import PostDetail from "./PostDetail";

const HomePage = () => {
  const classes = useStyles();
  // const { user } = useContext(UserCtx);
  const [openDialog, setOpenDialog] = useState(false);
  // const [currentLesson, setCurrentLesson] = useState(1);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [listPostHighlight, setListPostHighlight]: any = useState(null);
  const [listAllPost, setAllPost]: any = useState(null);
  const [selectedPost, setSelectedPost]: any = useState(null);
  const [activeTab, setActiveTab] = useState("highlight");

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
      const [highlightPosts, allPost] = await Promise.all([Post.listPostsByUserRole({}), Post.listAllPosts({})]);
      setListPostHighlight(highlightPosts);
      setAllPost(allPost);
    } catch (error) {
      setListPostHighlight([]);
    }
  };

  const onClickHashTag = (hashTag: string) => {
    setOpenSearch(true);
    setSearchQuery(hashTag);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    getListPost();
  }, []);

  const renderListPost = (listPost: any) => {
    return (
      <>
        {listPost?.map((post: any, i: number) => (
          <div key={i} className={classes.post}>
            <PostItem post={post} onClickCommentSection={onClickCommentSection} onClickHashTag={onClickHashTag} />
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Header />
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
            <Typography onClick={() => setActiveTab("post")} className={activeTab === "post" && classes.active}>
              Bài viết
            </Typography>
          </div>
        </div>
        <div className={classes.filterByMajor}></div>
        <div className={classes.listPost}>
          {!listPostHighlight ? (
            <div className={classes.loading}>
              <CircularProgress />
              Loading ...
            </div>
          ) : listPostHighlight?.length === 0 ? (
            <div className={classes.emptyData}>
              <Typography>Không có bài viết nào</Typography>
            </div>
          ) : activeTab === "highlight" ? (
            renderListPost(listPostHighlight)
          ) : (
            renderListPost(listAllPost)
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
