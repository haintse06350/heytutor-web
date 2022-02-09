import React, { useEffect } from "react";
import { useStyles } from "./Filter.style";

import { Chip } from "@mui/material";

export const Filter = () => {
  const classes = useStyles();
  const listFilters = ["MAS", "CSD", "PRJ321", "DBI"];

  const handleClick = (filter: any) => {
    console.log(filter);
  };

  useEffect(() => {});

  return (
    <>
      {listFilters.map((filter) => (
        <span key={filter.toString()} className={classes.filterDisplay}>
          <Chip label={filter.toString()} onClick={() => handleClick(filter)}></Chip>
        </span>
      ))}
    </>
  );
};

export default Filter;
