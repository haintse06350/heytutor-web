import React, { useState, useEffect, useCallback } from "react";
import { useStyles } from "./Search.style";
import { Dialog, Typography, TextField, InputAdornment, Avatar, Box, Tooltip, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import { Post } from "../../../models/post";
import { map } from "lodash";
import clsx from "classnames";
import moment from "moment";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";

const Search = (props: any) => {
  const { open, onClose, searchQuery } = props;
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult]: any = useState(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const onChangeFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  const onSearch = async (searchQuery: string) => {
    if (searchQuery !== "") {
      setLoading(true);
      setSearchResult(null);
      const simplifyQuery = searchQuery.trim().replace("#", "");
      const result = await Post.search(simplifyQuery);
      setSearchResult(result);
      setLoading(false);
    }
  };

  const debounceSearch = useCallback(debounce(onSearch, 500), []);

  const renderHashTag = (hashTag: string) => {
    let hashTagArray: any = null;
    try {
      hashTagArray = JSON.parse(hashTag.replaceAll("'", ""));
    } catch (error) {
      hashTagArray = [];
    }
    return map(hashTagArray, (item: string, idx: number) => <span key={idx}>{item}</span>);
  };

  useEffect(() => {
    if (query === "") {
      setSearchResult(null);
    }
    debounceSearch(query);
  }, [query]);

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchQuery]);

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <div className={classes.searchContainer}>
        <div className={classes.searchBox}>
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={classes.search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              classes: { notchedOutline: classes.noBorder },
            }}
            placeholder={"Tìm kiếm trên Heytutor"}
          />
          <Typography onClick={onClose}>Cancel</Typography>
        </div>
        <div className={classes.searchResult}>
          {query === "" && !searchResult && (
            <div className={classes.centerView}>
              <Typography>Search any keyword !</Typography>
              <span>Search for subjects, majors, questions and more.</span>
            </div>
          )}
          {query !== "" && searchResult?.length === 0 && (
            <div className={classes.centerView}>
              <Typography>{`Couldn't find any result for keyword ${query}`}</Typography>
            </div>
          )}
          {loading && (
            <div className={classes.centerView}>
              <Typography>Searching</Typography>
            </div>
          )}
          {searchResult && (
            <div className={classes.searchResult}>
              <div className={classes.filter}>
                <div className={classes.formSelect}></div>
                <div className={classes.filterItemContainer}>
                  {map(["All", "Post", "User", "Event"], (filter: string) => (
                    <div
                      className={clsx(classes.filterItem, activeFilter === filter && classes.active)}
                      onClick={() => onChangeFilter(filter)}>
                      {filter}
                    </div>
                  ))}
                </div>
              </div>
              <div className={classes.countResult}>{searchResult?.length} results</div>
              {searchResult.map((item: any, index: number) => (
                <div key={index} className={classes.listResult}>
                  <div className={classes.resultItem}>
                    <div className={classes.postUser}>
                      <Avatar src={""} />
                    </div>
                    <div className={classes.postContent}>
                      <Typography>{item.title}</Typography>
                      <Typography>{moment().from(item.createdAt)}</Typography>
                      <Typography>
                        {item.content.slice(0, 100)} {item.content.length > 100 ? "..." : ""}
                      </Typography>
                      <div className={classes.hashTag}>{renderHashTag(item.hashtag)}</div>
                      <div className={classes.postReaction}>
                        <Tooltip title="Số lượt xem">
                          <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                            <VisibilityOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                            <Typography style={{ fontSize: 14 }}>10</Typography>
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
                            <Typography style={{ fontSize: 14 }}>15</Typography>
                          </Box>
                        </Tooltip>
                        <Tooltip title="Chưa giải quyết">
                          <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                            <RemoveDoneIcon color="error" sx={{ mr: 0.5, width: 20, height: 20 }} />
                          </Box>
                        </Tooltip>
                        <Tooltip title="Đã giải quyết">
                          <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                            <DoneAllIcon color="success" sx={{ mr: 0.5, width: 20, height: 20 }} />
                          </Box>
                        </Tooltip>
                      </div>
                      <div className={classes.button}>
                        <Button variant="contained" color="primary">
                          Đăng ký
                        </Button>
                        <Button variant="contained" color="primary">
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default Search;
