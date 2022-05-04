import React from "react";
import {
  Dialog,
  DialogTitle,
  Grid,
  Rating,
  Typography,
  Box,
  TextField,
  DialogActions,
  Button,
  DialogContent,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Manager } from "../../models/manager";
import { NotificationCtx } from "../../context/notification/state";

const Feedback = (props: any) => {
  const { open, onClose, userName, postId, type, receiverId } = props;
  const labels: { [index: string]: string } = {
    1: "Tệ",
    2: "Kém",
    3: "Bình thường",
    4: "Tốt",
    5: "Tuyệt vời",
  };
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const [valueFeedback, setValueFeedback] = React.useState<number | null>(5);
  const [hover, setHover] = React.useState(-1);
  const [contentFeedback, setContentFeedback] = React.useState("");
  const { setNotificationSuccess, setNotificationError } = React.useContext(NotificationCtx);

  const handleChangeContentFeedback = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentFeedback(event.target.value);
  };

  const onFeedback = async () => {
    const res = await Manager.createFeedback({
      postId: postId,
      type: type,
      score: valueFeedback,
      reason: "",
      content: contentFeedback,
      receiverId: receiverId,
    });
    if (res) {
      setNotificationSuccess("Gửi đánh giá thành công");
      onClose();
    } else {
      setNotificationError("Gửi đánh giá thất bại");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Đánh giá người dùng</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body1">Tên </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle1">{userName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Mức độ hài lòng</Typography>
          </Grid>
          <Grid item xs={8} display="flex">
            <Rating
              name="hover-feedback"
              value={valueFeedback}
              precision={1}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValueFeedback(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {valueFeedback !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : valueFeedback]}</Box>}
          </Grid>
          <Grid item xs={4}>
            <Typography>Nội dung đánh giá</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              multiline
              maxRows={4}
              variant="outlined"
              fullWidth
              value={contentFeedback}
              onChange={handleChangeContentFeedback}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="text" sx={{ color: "#94a4c4" }} onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={onFeedback} variant="contained">
          Đánh giá
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Feedback;
