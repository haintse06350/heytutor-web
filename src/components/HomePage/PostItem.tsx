import React, { useEffect } from "react";
import { Card, Typography, Avatar, Grid, Rating, Box, CardContent, Container, Divider, Button } from "@mui/material";
import { useStyles } from "./PostItem.style";
import { stringAvatar } from "../UserProfile/helper";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
import Page from "../../layout/Page";
import { Post } from "../../models/post";
// import demoImg5 from "../../assets/default_images/5.jpg";
import demoImg6 from "../../assets/default_images/6.jpg";
// import demoImg4 from "../../assets/default_images/4.jpg";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import { User } from "../../models/users";
// import { Slide } from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";
import { MsgCtx } from "../../context/message/message";
import moment from "moment";
import "moment/locale/vi";
import clsx from "classnames";
import Ill1 from "../../assets/illustrations/1.svg";
import { Message } from "../../models/message";
import { map } from "lodash";

// const slideImages = [{ url: demoImg5 }, { url: demoImg6 }, { url: demoImg4 }];

const PostItem = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");
  const tab = urlParams.get("tab");
  const [post, setPost]: any = React.useState(null);
  const [messages, setMessages]: any = React.useState(null);

  const [userProfile, setUserProfile]: any = React.useState(null);
  const { onOpenMsgBox } = React.useContext(MsgCtx);
  const classes = useStyles();
  moment.locale("vi");

  // const navigate = useNavigate();

  const getPostStatus = () => {
    switch (tab) {
      case "isActive": {
        return "Đang xử lí";
      }
      case "isConfirmed": {
        return "Đã xác nhận";
      }
      case "isPending": {
        return "Đang chờ xác nhận";
      }
      case "isDone": {
        return "Đã hoàn thành";
      }
    }
  };

  const getPostConversation = async (postId: string) => {
    const conversation = await Message.getPostConversation(postId);
    const listMessages = await Message.listMessages({ limit: 10, offset: 0, conversationId: conversation.id });
    setMessages(listMessages.rows);
  };

  useEffect(() => {
    if (postId) {
      onOpenMsgBox();
      Post.getPostDetail(postId).then((res: any) => {
        setPost(res);
        const userId = res.postDetails["Post.userId"];
        User.getUserProfile(userId).then((res: any) => {
          setUserProfile(res);
        });
      });
      getPostConversation(postId);
    }
  }, [postId]);

  if (!post || !userProfile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Page>
      {/* no images just text*/}
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Card sx={{ mt: 6, px: 4, pt: 2, pb: 4 }}>
              <div className={classes.deadline}>
                <div>
                  <AccessTimeOutlinedIcon sx={{ color: "#d32f2f" }} />
                  <Typography sx={{ ml: 1, color: "#d32f2f", fontWeight: 700 }} variant="body2">
                    Deadline trong{" "}
                    {moment(post.postDetails["Post.deadline"]).endOf("hours").fromNow() || "Cần xử lí trong hôm nay"}
                  </Typography>
                </div>
                <div className={clsx(classes.postStatus, `${tab}`)}>
                  <Typography variant="subtitle2">{getPostStatus()}</Typography>
                </div>
              </div>
              <div className={classes.postTitleAndAction}>
                <Typography variant="h5">[ {post.postDetails["Post.title"]} ]</Typography>
              </div>

              {post.postDetails["Post.content"]}
              <Box sx={{ mt: 2 }}>
                <img src={demoImg6} alt="" />
              </Box>
              <div className={classes.userPanel}>
                <div className={classes.userNameAndAvatar}>
                  <div className={classes.userStats}>
                    <Avatar {...stringAvatar(userProfile.name)} className={classes.userAvatar} />
                    <div style={{ marginLeft: 16 }}>
                      <Typography sx={{ fontWeight: 600 }}>{userProfile.name}</Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                        Được đánh giá: {userProfile.voteCount} lượt
                      </Typography>
                      <Rating name="read-only" value={userProfile.rankPoint} readOnly />
                    </div>
                  </div>
                </div>
                <div className={classes.userPostDetail}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Đã được giải quyết 3 yêu cầu trên 6 yêu cầu
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 400, fontStyle: "italic" }}>
                    Bạn chưa từng giải quyết yêu cầu nào từ người dùng này
                  </Typography>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className={classes.messageBox} sx={{ mt: 6 }} elevation={10}>
              <CardContent>
                <Typography variant="h6">Message</Typography>
                <Divider sx={{ mt: 1 }} variant="fullWidth" />
                {messages?.length === 0 ? (
                  <Box className={classes.noConversation}>
                    <img src={Ill1} alt="" />
                    <Button variant="outlined">Bắt đầu trò chuyện</Button>
                  </Box>
                ) : (
                  <Box className={classes.messageContent}>
                    {map(messages, (message: any) => (
                      <Box
                        className={classes.messageRow}
                        display="flex"
                        alignItems="center"
                        justifyContent={message.senderId === 2 ? "flex-end" : "flex-start"}>
                        {message.senderId !== 2 && (
                          <Avatar
                            {...stringAvatar(message.senderId === 2 ? "Trung Hai" : "Pham Hoang")}
                            className={classes.senderAvatar}
                          />
                        )}
                        <Box className={classes.message} display="flex" flexDirection="column" sx={{ ml: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {message.message}
                          </Typography>
                          {/* <Typography variant="caption" sx={{ fontWeight: 400, fontSize: 10, fontStyle: "italic" }}>
                            {moment(message.createdAt).fromNow()}
                          </Typography> */}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default PostItem;
