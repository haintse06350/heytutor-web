import React, { useState, useEffect } from "react";
import { useStyles } from "./Search.style";
import { Dialog, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { isEmpty } from "lodash";

const Search = (props: any) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult]: any = useState(null);

  useEffect(() => {
    setSearchResult([]);
  }, [query]);

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
          {isEmpty(searchResult) && (
            <div className={classes.emptyResult}>
              <Typography>Search any keyword !</Typography>
              <span>Search for subjects, majors, questions and more.</span>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default Search;
