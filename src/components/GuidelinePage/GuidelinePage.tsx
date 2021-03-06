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
        setNotificationSuccess("Tham gia s??? ki???n th??nh c??ng");
        setJointEvent([...joitEvent, eventId]);
      }
    } catch (error) {
      setNotificationError("Tham gia s??? ki???n th???t b???i");
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
                Ch??o m???ng ?????n v???i Hey Tutor! ????
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
            H??y b???t ?????u xem qua c??c t??nh n??ng ch??nh v?? c??ch ho???t ?????ng c???a h??? th???ng
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            S??? ki???n:{" "}
            <Typography component="span" variant="subtitle1" fontWeight={400}>
              ???????c t???o ra v???i ch??? ????? c??? th???, gi??p b???n ????? d??ng ti???p c???n ho???c ????ng v???n ????? b???n mu???n ???????c h??? tr??? trong ph???m
              vi ch??? ????? c???a s??? ki???n
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
                    <Tooltip title={"S??? ng?????i tham gia"}>
                      <PeopleOutlinedIcon sx={{ width: 18 }} color="secondary" />
                    </Tooltip>
                    <Typography variant="subtitle2">{item.nbUserJoint}</Typography>
                    &nbsp;
                    <Tooltip title={"S??? ng?????i b??i vi???t"}>
                      <ArticleOutlinedIcon sx={{ width: 18 }} color="secondary" />
                    </Tooltip>
                    <Typography variant="subtitle2">{item.nbPosts}</Typography>
                    &nbsp; &nbsp;
                    <Typography variant="subtitle2" fontWeight={400}>
                      K???t th??c trong {moment(item.endAt).fromNow()}
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
                    {isJoinedEvent(item.id) ? "???? tham gia" : "Tham gia"}
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
            Xem th??m c??c s??? ki???n kh??c
          </Button>
          <Divider sx={{ mt: 7 }} />

          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                V???n ????? b???n c?? th??? gi??p:{" "}
                <Typography component="span" variant="subtitle1" fontWeight={400}>
                  C??c v???n ????? c???a m???i ng?????i c???n ???????c h??? tr???. N???u b???n c?? th??? gi??p ?????, h??y ????ng ????ng k?? tr??? th??nh ng?????i h???
                  tr??? ????? ki???m v??? cho m??nh
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
                        <Tooltip title="Th?? lao gi???i quy???t v???n ????? n??y">
                          <PaidOutlinedIcon sx={{ width: 18 }} color="secondary" />
                        </Tooltip>
                        <Typography variant="subtitle2">{item.minPrice}</Typography>
                        &nbsp;&nbsp;
                        <Typography display="flex" alignItems="center" variant="caption">
                          <AccessTimeOutlinedIcon color="secondary" sx={{ width: 18, mr: 0.5 }} />
                          H???n trong {moment().from(item.deadline)}
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
                V???n ????? b???n c???n gi??p ?????:{" "}
                <Typography component="span" variant="subtitle1" fontWeight={400}>
                  B???n c?? th??? ????ng v???n ????? c???a m??nh l??n ????? c?? th??? nh???n ???????c gi??p ????? c???a ng?????i kh??c.
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
                      ????ng v???n ????? c???a b???n
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
