import React, { useContext, useEffect, useState } from "react";
import { UserCtx } from "../../context/user/state";
import { Dialog, DialogTitle, DialogContent, Typography, Box, Grid, Card, Chip, Button, Tooltip } from "@mui/material";
import { map } from "lodash";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { Home } from "../../models/home";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./FirstTimeLoginPopup.style";
import moment from "moment";
import "moment/locale/vi";
import { Event } from "../../models/event";
import { NotificationCtx } from "../../context/notification/state";
import { PostCtx } from "../../context/post/state";

export const FirstTimeLoginPopup = () => {
  const { user } = useContext(UserCtx);
  const [openDialog, setOpenDialog] = useState(false);
  const [listEvent, setListEvent]: any = useState(null);
  const [listPost, setListPost]: any = useState(null);

  const [joitEvent, setJointEvent]: any = useState([]);

  const { setNotificationSuccess, setNotificationError } = useContext(NotificationCtx);
  const { createPost } = useContext(PostCtx);
  const navigate = useNavigate();
  const classes = useStyles();

  const onViewDetail = (eventId: any) => {
    navigate(`/event-detail?eventid=${eventId}`);
  };

  const onClickPost = (postId: any) => {
    navigate(`/post-detail?postId=${postId}`);
  };

  const onClickJoinEvent = async (eventId: string) => {
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
      setListEvent(data.top3EventBySubjects);
      setListPost(data.top3Post);
    };

    getSuggestData();
  }, []);

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const isJoinedEvent = (eventId: string) => {
    return joitEvent.includes(eventId);
  };

  return (
    <Dialog maxWidth="lg" fullWidth open={openDialog} onClose={onCloseDialog}>
      <DialogTitle>
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            Chào mừng {user.fullName}
            <CloseOutlinedIcon onClick={onCloseDialog} />
          </Box>
          <Typography variant="subtitle2" fontWeight={400} color="textSecondary">
            Dựa trên thông tin về ngành học và các môn bạn đang học trong kì của bạn chúng tôi gợi ý cho bạn tham gia
            vào các sự kiện dưới đây
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ height: "fit-content" }}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            Các sự kiện có thể bạn quan tâm
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
            endIcon={<ArrowForwardOutlinedIcon sx={{ width: 16 }} />}
            variant="contained"
            sx={{ float: "right", mt: 1.25, py: 0.5, px: 1, fontSize: 10 }}>
            Xem thêm
          </Button>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ mt: 1.25, mb: 0.5 }}>
                Top 3 vấn đề nổi bật
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
              <Typography variant="subtitle2" sx={{ mt: 1.25, mb: 1 }}>
                Bạn cũng có chia sẻ vấn đề của mình để tìm sự trợ giúp tốt nhất
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Card
                    sx={{
                      p: 2,
                      height: 160,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      boxShadow: "rgb(0 0 0 / 7%) 0px 0px 21px 1px",
                    }}
                    onClick={createPost}>
                    <AddCircleOutlineOutlinedIcon sx={{ width: 40, height: 40 }} color="secondary" />
                    <Typography variant="subtitle2">Tạo bài viết</Typography>
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
