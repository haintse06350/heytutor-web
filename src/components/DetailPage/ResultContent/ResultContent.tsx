import { Card, Grid } from "@mui/material";
import { map } from "lodash";
import * as React from "react";
import { useStyles } from "./ResultContent.style";

export default function ResultContent(props: any) {
  const classes = useStyles();

  return (
    <Grid container spacing={1} sx={{ mt: 2 }}>
      {map([1, 2, 3, 4, 5, 6], (item: any) => (
        <Grid item xs={12} sm={6} key={item}>
          <Card className={classes.card}></Card>
        </Grid>
      ))}
    </Grid>
  );
}
