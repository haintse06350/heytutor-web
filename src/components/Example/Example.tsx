import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useStyles } from "./Example.style";
import { useNavigate } from "react-router-dom";

export const Example = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://qweqweqweqwe.com")
      .then((response) => response.json())
      .then((data) => setName(data.name))
      .catch((e) => {
        console.error(e);
        setName("Unknown");
      });
  }, []);

  const redirectHomePage = React.useCallback(() => {
    navigate("/example-page");
  }, []);

  if (name === "") {
    return <div>Loading</div>;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography data-testid="hello" className={classes.helloParagraph} onClick={redirectHomePage}>
          Hello {name}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Example;
