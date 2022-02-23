import React, { useState, useEffect, useCallback } from "react";
import { useStyles } from "./Search.style";
import { Dialog, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import { Posts } from "../../../models/post";
import PostItem from "../PostItem";

const Search = (props: any) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult]: any = useState(null);

  useEffect(() => {
    if (query !== "") {
      debounceSearch(query);
    }
    if (query === "") {
      setSearchResult(null);
    }
  }, [query]);

  const onSearch = async () => {
    setLoading(true);
    setSearchResult(null);
    const result = await Posts.search(query);
    setSearchResult(result);
    setLoading(false);
  };

  const debounceSearch = useCallback(debounce(onSearch, 500), []);

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <div className={classes.searchContainer}>
        <div className={classes.searchBox}>
          <TextField
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
          {query === "" && (
            <div className={classes.centerView}>
              <Typography>Search any keyword !</Typography>
              <span>Search for subjects, majors, questions and more.</span>
            </div>
          )}
          {loading && (
            <div className={classes.centerView}>
              <Typography>Searching</Typography>
            </div>
          )}
          {searchResult && (
            <div className={classes.searchResult}>
              {searchResult.map((item: any, index: number) => (
                <div key={index} className={classes.listPost}>
                  <PostItem post={item} />
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
