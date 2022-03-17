import { Divider, Paper, Box, Typography } from "@mui/material";
import { map } from "lodash";
import * as React from "react";
// import { useStyles } from "./ResultContent.style";
// import moment from "moment";
// import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function MyRequestContent(props: any) {
  const { data } = props;
  // const classes = useStyles();

  return (
    <Paper elevation={2} sx={{ mt: 2, p: 2 }}>
      <Typography sx={{ mt: 2, color: "#000" }}>Showing {data?.length} results: </Typography>
      {map(data, (item: any, index: number) => (
        <Box sx={{ mt: 2 }}>
          <div>
            <Typography variant="subtitle1">{item.postData.title.slice(0, 120)}</Typography>
            <Typography variant="subtitle1">Số người đăng kí: {index * 5}</Typography>
          </div>
          <Divider />
        </Box>
      ))}
    </Paper>
  );
}
