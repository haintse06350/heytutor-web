import React, { useEffect } from "react";
import { Card, Typography, Avatar, Grid, Rating } from "@mui/material";
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { User } from "../../models/users";
// import { Slide } from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";
import { MessageBox } from "../MessageBox/MessageBox";
import { MsgCtx } from "../../context/message/message";
import moment from "moment";
import "moment/locale/vi";

// const slideImages = [{ url: demoImg5 }, { url: demoImg6 }, { url: demoImg4 }];

const PostItem = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");
  const [post, setPost]: any = React.useState(null);
  const [userProfile, setUserProfile]: any = React.useState(null);
  const { onOpenMsgBox } = React.useContext(MsgCtx);
  const classes = useStyles();
  moment.locale("vi");

  // const navigate = useNavigate();

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
    }
  }, [postId]);

  if (!post || !userProfile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Page>
      {/* <Card sx={{ mt: 5 }}>
        <div className="slide-container">
          <Slide duration={5000} indicators={false} arrows={true}>
            {slideImages.map((slideImage: any, index: number) => (
              <div className="each-slide" key={index}>
                <div className={classes.slideImage} style={{ backgroundImage: `url(${slideImage.url})` }}></div>
              </div>
            ))}
          </Slide>
        </div>
      </Card> */}

      {/* no images just text*/}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Card sx={{ mt: 6, p: 4 }}>
            <div className={classes.postTitleAndAction}>
              <Typography variant="h5">[ {post.postDetails["Post.title"]} ]</Typography>
              <Typography sx={{ color: "#FF6B6B" }} variant="h6">
                Đang trong quá trình xử lí
              </Typography>
              <MoreHorizIcon />
            </div>
            <div>
              {post.postDetails["Post.content"]}
              <div className={classes.deadline}>
                <AccessTimeOutlinedIcon sx={{ color: "#d32f2f" }} />
                <Typography sx={{ ml: 1, color: "#d32f2f", fontWeight: 700 }} variant="body2">
                  Deadline trong{" "}
                  {moment(post.postDetails["Post.deadline"]).endOf("hours").fromNow() || "Cần xử lí trong hôm nay"}
                </Typography>
              </div>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <img src={demoImg6} alt="" />
              </Grid>
            </div>
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
          <Card sx={{ mt: 6, p: 4 }}>
            <Typography variant="h5">Những vấn đề liên quan</Typography>
          </Card>
        </Grid>
      </Grid>
      <MessageBox
        postId={post.postDetails["Post.id"]}
        postTitle={post.postDetails["Post.title"]}
        userId={userProfile.id}
        userName={userProfile.name}
      />
    </Page>
  );
};

export default PostItem;
