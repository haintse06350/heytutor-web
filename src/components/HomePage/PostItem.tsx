import React, { useEffect } from "react";
import { Card, Box } from "@mui/material";
import { useStyles } from "./PostItem.style";
// import { stringAvatar } from "../UserProfile/helper";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
import Page from "../../layout/Page";
import { Post } from "../../models/post";
import demoImg1 from "../../assets/default_images/1.jpg";
import { User } from "../../models/users";

const PostItem = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");
  const [post, setPost]: any = React.useState(null);
  const [userProfile, setUserProfile]: any = React.useState(null);

  const classes = useStyles();
  // const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      Post.getPostDetail(postId).then((res: any) => {
        setPost(res);
        const userId = res.postDetails["Post.userId"];
        User.getUserProfile(userId).then((res: any) => {
          setUserProfile(res);
        });
      });
    }
  }, [postId]);

  console.log(userProfile, post);
  return (
    <Page>
      <Card>
        <Box className={classes.postImage}>
          <img src={demoImg1} alt="" />
        </Box>
        <Box className={classes.userPanel}>
          
        </Box>
      </Card>
    </Page>
  );
};

export default PostItem;
