import React, { useContext, useEffect, useRef, useState } from "react";
import { useStyles } from "./UserProfile.style";
import { Grid, Avatar, Typography, Button, Rating, Card } from "@mui/material";
import { UserCtx } from "../../context/user/state";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import CreateIcon from "@mui/icons-material/Create";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import MessageIcon from "@mui/icons-material/Message";
import { User } from "../../models/users";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Page from "../../layout/Page";

const UserProfile = () => {
  const classes = useStyles();
  const { user }: any = useContext(UserCtx);
  const inputStory: any = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  // const [value, setValue] = useState(0);
  const [userProfile, setUserProfile]: any = useState(user);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const [story, setStory] = useState(userProfile?.sumarry);
  const [dataFeedback, setDataFeedback] = useState([]);

  // end set tab view

  // begin change story
  const handleChangeStory = (e: any) => {
    setStory(e.target.value);
    if (e.target.value !== story) {
      setIsUpdate(true);
    }
  };

  const handleUpdateStory = (e: any) => {
    // lưu lại update
    setIsUpdate(false);
    setIsEdit(false);
    setStory(story);
  };

  // end change story
  // begin message
  const handleMessage = () => {
    // tao room nhan tin giua 2 nguoi
  };
  // end message

  //begin style
  const styleColor = {
    background: "linear-gradient(to right, #430089, #82ffa1)",
  };

  console.log(dataFeedback, "dataFeedback");
  //end style
  // end edit story
  const getDataFeedback = async (userId: any) => {
    const res = await User.getUserProfile(userId);
    setDataFeedback(res.feedbackHistory);
  };
  useEffect(() => {
    if (userId) {
      User.getUserProfile(userId).then((res: any) => {
        setUserProfile(res);
      });
      if (parseInt(userId) === user?.id) {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.delete("userId");
        navigate(`/profile`, { replace: true });
      }
    } else if (user) {
      setUserProfile(user);
      getDataFeedback(user.id);
    }
  }, [userId, user]);

  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <div className={classes.header} style={styleColor}>
          <div className={classes.avatar}>
            <Avatar src={user?.avatar} className={classes.roundedAvt} />
          </div>
          {/* tom tat ca nhan */}
          <div className={classes.userSumarry}>
            <div className={classes.userName}>
              <Typography fontSize={"2rem"} className={classes.name}>
                {userProfile?.name}
              </Typography>
            </div>
            <div className={classes.userMajor}>
              <CoPresentIcon />
              {"K" + userProfile?.stdId.slice(2, 4) + "-" + userProfile?.major}
            </div>
            <div className={classes.userRanking}>
              <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
            </div>
            <div className={classes.userStory}>
              <BorderColorIcon />
              <textarea
                maxLength={60}
                ref={inputStory}
                className={classes.storyInput}
                value={userProfile?.summary}
                onChange={handleChangeStory}
                readOnly={!isEdit}></textarea>

              {isEdit && <div className={classes.countLenght}>Ký tự còn lại: {60 - story.length}/60</div>}
            </div>
          </div>
          <div className={classes.buttonFixStory}>
            {userId ? (
              <Button
                onClick={handleMessage}
                endIcon={<MessageIcon />}
                sx={{ color: "black", background: "white" }}
                variant="contained">
                Nhắn tin
              </Button>
            ) : (
              <></>
            )}

            {isUpdate && (
              <Button onClick={handleUpdateStory} endIcon={<UpgradeIcon />} sx={{ color: "white" }} variant="contained">
                Lưu chỉnh sửa
              </Button>
            )}
          </div>
        </div>
        <Page maxWidth="lg" sx={{ mt: "-64px" }}>
          <Typography variant="h5" sx={{ m: 2 }}>
            Đánh giá của người dùng
          </Typography>
          <Grid container spacing={2} sx={{ pl: 2, pr: 2 }}>
            {dataFeedback.map((item: any, index: number) => (
              <Grid
                key={index}
                item
                xs={12}
                md={6}
                lg={4}
                maxHeight="100%"
                minHeight="100%"
                sx={{ height: "maxHeight" }}>
                <Card sx={{ p: 2 }}>
                  <Typography>Tên người đánh giá : {item?.fromUserName}</Typography>
                  <Typography>Đánh giá trên vấn đề : {item?.postTitle}</Typography>
                  <Typography>
                    Nội dung đánh giá : {item?.content === "" ? "Không có nội dung" : item?.content}
                  </Typography>
                  <Typography>
                    Đánh giá dựa trên quyền : {item?.type === 1 ? "Người giải quyết vấn đề" : "Người được hỗ trợ"}
                  </Typography>
                  <Typography>Thời gian đánh giá: {moment(item?.createdAt).fromNow()}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Page>
      </div>
    </div>
  );
};

export default UserProfile;
