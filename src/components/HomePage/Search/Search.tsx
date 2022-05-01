import React, { useState, useEffect, useCallback } from "react";
import { useStyles } from "./Search.style";
import { Typography, TextField, InputAdornment, Box, Avatar, Chip, Tooltip, Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import { Post } from "../../../models/post";
import { map, compact, uniq, filter, debounce, flattenDeep } from "lodash";
import clsx from "classnames";
import moment from "moment";
import "moment/locale/vi";

import Page from "../../../layout/Page";
import { useNavigate } from "react-router-dom";

const Search = (props: any) => {
  moment.locale("vi");
  const { searchQuery } = props;
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult]: any = useState(null);
  const [activeTab, setActiveTab] = useState<string>("Vấn đề");

  const [postResult, setPostResult] = useState<any>(null);
  const [listHashTag, setListHashTag] = useState<any>(null);

  const [listFilterHashTag, setListFilterHashTag] = useState<any>([]);

  const onChangeFilterHashTag = (value: any) => {
    if (listFilterHashTag.includes(value)) {
      setListFilterHashTag(listFilterHashTag.filter((item: any) => item !== value));
    } else {
      setListFilterHashTag([...listFilterHashTag, value]);
    }
  };

  const isActiveFilter = (value: any) => {
    return listFilterHashTag.includes(value);
  };

  const navigate = useNavigate();

  const onChangeTab = (filter: string) => {
    setActiveTab(filter);
  };

  const onSearch = async (searchQuery: string) => {
    if (searchQuery !== "") {
      setLoading(true);
      setSearchResult(null);
      const simplifyQuery = searchQuery.trim().replace("#", "");
      const result = await Post.search(simplifyQuery);
      setSearchResult(result);
      setPostResult(result.postResult);
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
    return map(hashTagArray, (item: string, idx: number) => <Chip sx={{ ml: 0.75 }} key={idx} label={item} />);
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

  useEffect(() => {
    if (postResult) {
      const listHashTag = map(searchResult.postResult, (item: any) => item.hashtag);
      const listHashTagFilter = compact(listHashTag);
      const parsedListHashTag = map(listHashTagFilter, (item: any) => JSON.parse(item)[0]);
      const uniqTags = uniq(parsedListHashTag);
      setListHashTag(uniqTags);
    }
  }, [postResult]);

  useEffect(() => {
    if (listFilterHashTag) {
      if (listFilterHashTag.length > 0) {
        const filteredData = map(listFilterHashTag, (tag: string) => {
          const filterPost = filter(searchResult.postResult, (item: any) => item.hashtag && item.hashtag.includes(tag));
          return filterPost;
        });
        setPostResult(flattenDeep(filteredData));
      } else if (listFilterHashTag.length === 0) {
        setPostResult(searchResult?.postResult);
      }
    }
  }, [listFilterHashTag]);

  const onClickPost = (postId: number) => {
    navigate(`/post-detail/?postId=${postId}`);
  };

  const renderHashTagFilter = () => {
    return map(listHashTag, (item: any, idx: number) => (
      <Chip
        className={isActiveFilter(item) && classes.active}
        sx={{ mr: 0.75 }}
        key={idx}
        label={item}
        onClick={() => onChangeFilterHashTag(item)}
      />
    ));
  };

  const renderSearchResult = () => {
    return (
      <>
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 1, width: 1 }}>
          <Typography variant="subtitle1" className={classes.countResult}>
            Kết quả cho từ khoá <span>&#39;{query}&#39;</span>&nbsp;:
          </Typography>
          <Box>
            <Typography align="right" variant="subtitle1" className={classes.countResult}>
              Lọc bài viết theo hashtag
            </Typography>
            {renderHashTagFilter()}
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box className={classes.searchResult}>
          {map(postResult, (item: any) => (
            <Box className={classes.searchResultItem} key={item.id} onClick={() => onClickPost(item.id)}>
              <Box className={classes.left}>
                <img src="https://via.placeholder.com/300x180" alt="avatar" />
              </Box>
              <Box className={classes.right}>
                <Tooltip title={item.title} placement="bottom-start">
                  <Typography variant="subtitle1">
                    {item.title.slice(0, 120)} {item.title.length > 120 && "..."}
                  </Typography>
                </Tooltip>
                <Box display="flex" alignItems="center">
                  <AccessTimeIcon sx={{ width: 16 }} />
                  {item.deadline ? (
                    <Typography variant="subtitle2" sx={{ ml: 0.75 }}>
                      {moment(item.deadline).endOf("hours").fromNow()}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle2" sx={{ ml: 0.75 }}>
                      không có deadline
                    </Typography>
                  )}
                </Box>
                <Box className={classes.userBox}>
                  <Avatar
                    src={item.user.avatar ? item.user.avatar : "https://via.placeholder.com/20x20"}
                    alt="avatar"
                  />
                  <Typography sx={{ ml: 1 }} variant="body2">
                    {item.user.name}
                  </Typography>
                </Box>
                <Tooltip title={item.content} placement="bottom-start">
                  <Typography variant="body2">
                    {item.content.slice(0, 400)}
                    {item.content.length > 400 && "..."}
                  </Typography>
                </Tooltip>
                <Box className={classes.hashtag}>{renderHashTag(item.hashtag)}</Box>
              </Box>
            </Box>
          ))}
        </Box>
      </>
    );
  };

  return (
    <Page>
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
        </div>
        <div className={classes.searchResult}>
          {query === "" && !searchResult && (
            <div className={classes.centerView}>
              <Typography>Nhập từ khoá để tìm kiếm !</Typography>
              <span>Search for subjects, majors, questions and more.</span>
            </div>
          )}
          {query !== "" && searchResult?.postResult.length === 0 && (
            <div className={classes.centerView}>
              <Typography>
                {`Không tìm thấy bất kì kết quả nào với từ khoá`}
                <span style={{ fontWeight: 700, fontStyle: "italic" }}> `{query}`</span>
              </Typography>
            </div>
          )}
          {loading && (
            <div className={classes.centerView}>
              <Typography>Đang tìm kiếm</Typography>
            </div>
          )}
          {searchResult && (
            <div className={classes.searchResult}>
              <div className={classes.filter}>
                <div className={classes.formSelect}></div>
                <div className={classes.filterItemContainer}>
                  {map(["Vấn đề", "Sự kiện", "Người dùng"], (tab: string) => (
                    <Typography
                      variant="body2"
                      className={clsx(classes.filterItem, activeTab === tab && classes.active)}
                      onClick={() => onChangeTab(tab)}>
                      {tab}
                    </Typography>
                  ))}
                </div>
              </div>
              <Divider sx={{ my: 2 }} />
              {postResult && renderSearchResult()}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default Search;
