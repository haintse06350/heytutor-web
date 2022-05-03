import React, { useContext, useEffect, useState } from "react";
import { UserCtx } from "../../context/user/state";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Grid,
  Card,
  Chip,
  Button,
  Tooltip,
  Divider,
} from "@mui/material";
import { map } from "lodash";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { Home } from "../../models/home";
// import { useNavigate } from "react-router-dom";
import { useStyles } from "./GuidelinePage.style";
import moment from "moment";
import "moment/locale/vi";
import { Event } from "../../models/event";
import { NotificationCtx } from "../../context/notification/state";
import { PostCtx } from "../../context/post/state";

export const GuidelinePage = () => {
  const { user, openGuideline, onCloseGuideline } = useContext(UserCtx);
  const [openDialog, setOpenDialog] = useState(false);
  const [listEvent, setListEvent]: any = useState(null);
  const [listPost, setListPost]: any = useState(null);
  console.log("listEvent", listEvent);
  const [joitEvent, setJointEvent]: any = useState([]);

  const { setNotificationSuccess, setNotificationError } = useContext(NotificationCtx);
  const { createPost } = useContext(PostCtx);

  // const navigate = useNavigate();
  const classes = useStyles();

  const onViewDetail = (eventId: any) => {
    window.location.href = `http://localhost:3000/event-detail?eventid=${eventId}`;
  };

  const onClickPost = (postId: any) => {
    window.location.href = `http://localhost:3000/post-detail?postId=${postId}`;
  };

  const onClickJoinEvent = async (eventId: number) => {
    try {
      const res = await Event.joinEvent(eventId);
      if (res.status === 200) {
        setNotificationSuccess("Tham gia sự kiện thành công");
        setJointEvent([...joitEvent, eventId]);
      }
    } catch (error) {
      setNotificationError("Tham gia sự kiện thất bại");
    }
  };

  useEffect(() => {
    if (user.firstTimeLogin) {
      setTimeout(() => {
        setOpenDialog(true);
      });
    }
  }, [user]);

  useEffect(() => {
    const getSuggestData = async () => {
      const data = await Home.getSuggestData();
      setListEvent(data.top3EventByMajor);
      setListPost(data.top3Post);
    };

    getSuggestData();
  }, []);

  const onCloseDialog = () => {
    onCloseGuideline();
    setOpenDialog(false);
  };

  const isJoinedEvent = (eventId: string) => {
    return joitEvent.includes(eventId);
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      maxWidth="lg"
      fullWidth
      open={openDialog || openGuideline}
      onClose={onCloseDialog}>
      <Box sx={{ padding: 0, margin: 0, width: "100%", height: 70 }}>
        <DialogTitle>
          <Box display="flex" flexDirection="column" sx={{ mt: 1 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Chào mừng đến với Hey Tutor! 🎉
              </Typography>
              <CloseOutlinedIcon onClick={onCloseDialog} />
            </Box>
          </Box>
        </DialogTitle>
        <Divider />
      </Box>
      <DialogContent>
        <Box sx={{ height: "fit-content", pt: 0, px: 3 }}>
          <Typography sx={{ mb: 1 }} variant="h5" color="textSecondary" fontWeight={600}>
            Hãy bắt đầu xem qua các tính năng chính và cách hoạt động của hệ thống
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Sự kiện:{" "}
            <Typography component="span" variant="subtitle1" fontWeight={400}>
              Được tạo ra với chủ đề cụ thể, giúp bạn đễ dàng tiếp cận hoặc đăng vấn đề bạn muốn được hỗ trợ trong phạm
              vi chủ đề của sự kiện
            </Typography>
          </Typography>
          <Grid container spacing={3}>
            {map(listEvent?.slice(0, 3), (item: any, index: number) => (
              <Grid item xs={12} sm={12} md={4} lg={4} key={index}>
                <Card sx={{ p: 2, boxShadow: "rgb(0 0 0 / 7%) 0px 0px 21px 1px" }}>
                  <Tooltip title={item.title}>
                    <Typography
                      className={classes.link}
                      variant="subtitle1"
                      noWrap
                      onClick={() => onViewDetail(item.id)}>
                      {item.title}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={item.description}>
                    <Typography variant="subtitle2" fontWeight={400} noWrap>
                      {item.description}
                    </Typography>
                  </Tooltip>
                  <Box display="flex" alignItems="center">
                    <Tooltip title={"Số người tham gia"}>
                      <PeopleOutlinedIcon sx={{ width: 18 }} color="secondary" />
                    </Tooltip>
                    <Typography variant="subtitle2">{item.nbUserJoint}</Typography>
                    &nbsp;
                    <Tooltip title={"Số người bài viết"}>
                      <ArticleOutlinedIcon sx={{ width: 18 }} color="secondary" />
                    </Tooltip>
                    <Typography variant="subtitle2">{item.nbPosts}</Typography>
                    &nbsp; &nbsp;
                    <Typography variant="subtitle2" fontWeight={400}>
                      Kết thúc trong {moment(item.endAt).fromNow()}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1 }} display="flex" alignItems="center">
                    {map(JSON.parse(item.hashtag), (hashtag: any, index: number) => (
                      <Chip key={index} label={hashtag} variant="outlined" size="small" sx={{ mr: 0.5 }} />
                    ))}
                  </Box>
                  <Button
                    disabled={isJoinedEvent(item.id)}
                    variant="contained"
                    sx={{ float: "right", mt: 1.25, py: 0.5, px: 1, fontSize: 10 }}
                    onClick={() => onClickJoinEvent(item.id)}>
                    {isJoinedEvent(item.id) ? "Đã tham gia" : "Tham gia"}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button
            href="/event-list"
            endIcon={<ArrowForwardOutlinedIcon sx={{ width: 16 }} />}
            variant="contained"
            sx={{ float: "right", mt: 1.25, py: 0.5, px: 1, fontSize: 10 }}>
            Xem thêm các sự kiện khác
          </Button>
          <Divider sx={{ mt: 7 }} />

          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Vấn đề bạn có thể giúp:{" "}
                <Typography component="span" variant="subtitle1" fontWeight={400}>
                  Các vấn đề của mọi người cần được hỗ trợ. Nếu bạn có thể giúp đỡ, hãy đăng đăng kí trở thành người hỗ
                  trợ để kiếm về cho mình
                </Typography>
              </Typography>
              <Grid container spacing={3}>
                {map(listPost?.slice(0, 3), (item: any, index: number) => (
                  <Grid item xs={12} key={index}>
                    <Card sx={{ p: 2, boxShadow: "rgb(0 0 0 / 7%) 0px 0px 21px 1px" }}>
                      <Typography className={classes.link} variant="subtitle2" onClick={() => onClickPost(item.id)}>
                        {item.title}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Tooltip title="Thù lao giải quyết vấn đề này">
                          <PaidOutlinedIcon sx={{ width: 18 }} color="secondary" />
                        </Tooltip>
                        <Typography variant="subtitle2">{item.minPrice}</Typography>
                        &nbsp;&nbsp;
                        <Typography display="flex" alignItems="center" variant="caption">
                          <AccessTimeOutlinedIcon color="secondary" sx={{ width: 18, mr: 0.5 }} />
                          Hạn trong {moment().from(item.deadline)}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 1 }} display="flex" alignItems="center">
                        {map(JSON.parse(item.hashtag), (hashtag: any, index: number) => (
                          <Chip key={index} label={hashtag} variant="outlined" size="small" sx={{ mr: 0.5 }} />
                        ))}
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Vấn đề bạn cần giúp đỡ:{" "}
                <Typography component="span" variant="subtitle1" fontWeight={400}>
                  Bạn có thể đăng vấn đề của mình lên để có thể nhận được giúp đỡ của người khác.
                </Typography>
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      p: 2,
                      height: 160,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      boxShadow: "rgb(0 0 0 / 7%) 0px 0px 21px 1px",
                    }}>
                    <AddCircleOutlineOutlinedIcon
                      sx={{ width: 40, height: 40 }}
                      color="secondary"
                      onClick={() => {
                        createPost();
                      }}
                    />
                    <Typography variant="subtitle2" onClick={() => createPost()}>
                      Đăng vấn đề của bạn
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
