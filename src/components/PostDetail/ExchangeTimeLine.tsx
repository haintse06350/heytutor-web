import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { styled } from "@mui/material/styles";
import Study1 from "../../assets/illustrations/study1.svg";

import {
  Typography,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Popover,
} from "@mui/material";
import { useStyles } from "./PostItem.style";
import { NotificationCtx } from "../../context/notification/state";

const DEMO_EXCHANGE_DATA = [
  {
    id: 1,
    userId: 2,
    postId: 2,
    conversationId: 1,
    title: "Câu hỏi 1",
    attachFile: null,
    isAccept: false,
    status: "open",
    createdAt: "at 10/30/2021 03:21",
  },
  {
    id: 2,
    userId: 2,
    postId: 2,
    conversationId: 1,
    title: "Câu hỏi 2",
    attachFile: null,
    isAccept: true,
    status: "close",
    createdAt: "at 10/30/2021 03:21",
  },
  {
    id: 3,
    userId: 2,
    postId: 2,
    conversationId: 1,
    title: "Câu hỏi 3",
    attachFile: null,
    isAccept: true,
    status: "open",
    createdAt: "at 10/30/2021 03:21",
  },
  {
    id: 4,
    userId: 2,
    postId: 2,
    conversationId: 1,
    title: "File doc câu 2",
    attachFile: "https://www.drive.com/",
    isAccept: false,
    status: "open",
    createdAt: "at 10/30/2021 03:21",
  },
];

const Input = styled("input")({
  display: "none",
});

export const ExchangeTimeLine = (props: any) => {
  const { role, selectedSupporter } = props;
  const classes = useStyles();
  const [exchangeData, setExchangeData] = React.useState(DEMO_EXCHANGE_DATA);
  const [openAnswerDialog, setOpenAnswerDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [updateItem, setUpdateItem]: any = React.useState();
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [isRejected, setIsRejected] = React.useState(false);
  const { setNotificationSuccess } = React.useContext(NotificationCtx);

  const onClickQuestion = (event: React.MouseEvent<HTMLButtonElement>, item: number) => {
    setUpdateItem(item);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const onConfirm = () => {
    setIsConfirmed(true);
    setAnchorEl(null);
    setNotificationSuccess("Đã xác nhận câu trả lời này");
  };

  const onSetIsRejected = () => {
    setIsRejected(true);
    setAnchorEl(null);
    setNotificationSuccess("Đã từ trối câu trả lời này");
  };

  const open = Boolean(anchorEl);

  const renderPopover = () => {
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <Box sx={{ p: 2 }} display="flex" flexDirection="column">
          <Button color="primary" startIcon={<VisibilityOutlinedIcon color="primary" />} sx={{ p: 1 }}>
            Xem chi tiết
          </Button>
          {updateItem?.attachFile && (
            <Button color="info" startIcon={<DownloadForOfflineOutlinedIcon color="info" />} sx={{ p: 1 }}>
              Download file
            </Button>
          )}
          <Button
            color="error"
            startIcon={<HighlightOffRoundedIcon color="error" />}
            sx={{ p: 1 }}
            onClick={onSetIsRejected}>
            Reject the answer
          </Button>
          <Button variant="contained" sx={{ p: 1, mt: 1.5 }} onClick={onConfirm}>
            Confirm the answer
          </Button>
        </Box>
      </Popover>
    );
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
      {renderPopover()}
      {renderUploadAnswerDialog()}
      <Box className={classes.timeLineRoot}>
        {selectedSupporter ? (
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
                  ) : updateItem?.id === item.id && isConfirmed ? (
                    <CheckCircleOutlineRoundedIcon color="success" />
                  ) : item.attachFile ? (
                    <FilePresentRoundedIcon onClick={(e: any) => onClickQuestion(e, item)} />
                  ) : updateItem?.id === item.id && isRejected ? (
                    <HighlightOffRoundedIcon color="error" />
                  ) : (
                    <HelpOutlineRoundedIcon color="secondary" onClick={(e: any) => onClickQuestion(e, item)} />
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
        ) : (
          <Box>
            <img src={Study1} alt="" />
            <Typography variant="subtitle1" sx={{ fontWeight: 400 }} color="textSecondary">
              {role === "my-request"
                ? `Quá trình trao đổi giữa bạn và người hỗ trợ bạn sẽ diễn ra ở đây. Bạn có thể đặt câu hỏi sau đó người hỗ
              trợ của bạn sẽ trả lời bằng cách đăng tải tài liệu hoặc đường dẫn tới tài liệu.`
                : `Bạn sẽ nhận được cầu hỏi yêu cầu hỗ trợ và đây sẽ là nơi bạn gửi câu trả lời bằng cách đăng tải hình ảnh, tài liệu hoặc link đến tài liệu`}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};
