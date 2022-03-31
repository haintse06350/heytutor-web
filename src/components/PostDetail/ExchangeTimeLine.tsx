import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
// import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { styled } from "@mui/material/styles";

import {
  Typography,
  Box,
  Divider,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useStyles } from "./PostItem.style";

const DEMO_EXCHANGE_DATA = [
  {
    id: 1,
    userId: 2,
    postId: 2,
    conversationId: 1,
    title: "Cậu ơi cái câu thứ nhất cậu gửi tớ tài liệu được không",
    attachFile: null,
    isAccept: false,
    status: "open",
    createdAt: "at 10/30/2021 03:21",
  },
  {
    id: 1,
    userId: 2,
    postId: 2,
    conversationId: 1,
    title: "Đây mình gửi tài liệu cho câu 1 nhé",
    attachFile: "https://www.drive.com/",
    isAccept: true,
    status: "close",
    createdAt: "at 10/30/2021 03:21",
  },
  {
    id: 1,
    userId: 2,
    postId: 2,
    conversationId: 1,
    title: "Ok câu 1 xong r gửi mình nốt file tài liệu câu 2",
    attachFile: null,
    isAccept: true,
    status: "open",
    createdAt: "at 10/30/2021 03:21",
  },
  {
    id: 1,
    userId: 2,
    postId: 2,
    conversationId: 1,
    title: "File doc câu 2",
    attachFile: null,
    isAccept: false,
    status: "open",
    createdAt: "at 10/30/2021 03:21",
  },
];

const Input = styled("input")({
  display: "none",
});

export const ExchangeTimeLine = (props: any) => {
  const { role } = props;
  const classes = useStyles();
  const [exchangeData, setExchangeData] = React.useState(DEMO_EXCHANGE_DATA);
  const [openAnswerDialog, setOpenAnswerDialog] = React.useState(false);

  const addExchange = () => {
    const exchange = {
      id: 5,
      userId: 2,
      postId: 2,
      conversationId: 1,
      title: "Bạn ơi trả lời sớm giúp mình nhé",
      attachFile: null,
      isAccept: false,
      status: "open",
      createdAt: "at 10/30/2021 03:21",
    };

    setExchangeData([...exchangeData, exchange]);
  };

  const openUploadAnswerDialog = () => {
    setOpenAnswerDialog(true);
  };

  const onCloseDialog = () => {
    setOpenAnswerDialog(false);
  };

  const renderUploadAnswerDialog = () => {
    return (
      <Dialog open={openAnswerDialog} onClose={onCloseDialog}>
        <DialogTitle>Upload câu trả lời</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Bạn có thể upload file ảnh định dang jpg, png hoặc tài liệu định dạng docx, pdf với dung lượng < 1MB"}
          </DialogContentText>
          <TextField margin="dense" id="link" label="Link tài liệu" type="link" fullWidth variant="standard" />
          <Box sx={{ mt: 2 }} display="flex" alignItems="center" justifyContent="flex-start">
            <Typography variant="subtitle1">Hoặc</Typography>
            <Input accept="*" id="contained-button-file" multiple type="file" />
            <Button sx={{ ml: 2 }} variant="contained" component="span">
              Upload file
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>Huỷ</Button>
          <Button variant="contained" onClick={onCloseDialog}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      {renderUploadAnswerDialog()}
      <Box className={classes.timeLineRoot}>
        <Timeline position="right">
          {exchangeData.map((item: any, index: number) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent sx={{ flex: 0.1, py: 0.5, px: 0.75, width: 90, minWidth: 90, maxWidth: 90 }}>
                <Typography variant="caption" color="textSecondary">
                  {item.createdAt}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                {item.isAccept ? (
                  <CheckCircleOutlineRoundedIcon color="success" />
                ) : role === "register" ? (
                  <Tooltip title="Upload câu trả lời">
                    <HelpOutlineRoundedIcon color="secondary" onClick={openUploadAnswerDialog} />
                  </Tooltip>
                ) : (
                  <HelpOutlineRoundedIcon color="secondary" />
                )}
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle1">{item.title}</Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
          {role === "my-request" && (
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ flex: 0.1, p: 0, width: 90, minWidth: 90, maxWidth: 90 }}></TimelineOppositeContent>
              <TimelineSeparator>
                <AddCircleOutlineRoundedIcon color="secondary" onClick={addExchange} />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle1">Đặt thêm câu hỏi</Typography>
              </TimelineContent>
            </TimelineItem>
          )}
        </Timeline>
      </Box>
      <Divider />
    </>
  );
};
