import { Divider, Paper, Box, Typography, Button } from "@mui/material";
import { map } from "lodash";
import * as React from "react";
import { useStyles } from "./ResultContent.style";
import moment from "moment";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function ResultContent(props: any) {
  const { data } = props;
  const classes = useStyles();
  console.log(data);
  return (
    <Paper elevation={2} sx={{ mt: 2, p: 2 }}>
      <Typography sx={{ mt: 2, color: "#000" }}>Showing {data?.length} results: </Typography>
      {map(data, (item: any) => (
        <Box sx={{ mt: 2 }}>
          <div className={classes.item}>
            <Typography variant="subtitle1">{item.postData.title.slice(0, 120)}</Typography>
            <Typography variant="subtitle2">{moment().from(item.postData.createdAt)}</Typography>
            <Button variant="contained" endIcon={<SendRoundedIcon />}>
              {"Liên hệ với người đăng bài"}
            </Button>
          </div>
          <Divider />
        </Box>
      ))}
    </Paper>
  );
}
