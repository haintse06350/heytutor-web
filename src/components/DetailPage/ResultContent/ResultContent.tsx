import { Divider, Paper, Box, Typography } from "@mui/material";
import { map } from "lodash";
import * as React from "react";
import { useStyles } from "./ResultContent.style";

export default function ResultContent(props: any) {
  const { data } = props;
  const classes = useStyles();

  return (
    <Paper elevation={2} sx={{ mt: 2, px: 2 }}>
      <Typography sx={{ mt: 2, color: "#000" }}>Showing {data?.length} results: </Typography>
      {map([1, 2, 3, 4, 5, 6], (item: any) => (
        <Box>
          <div className={classes.item}></div>
          <Divider />
        </Box>
      ))}
    </Paper>
  );
}
