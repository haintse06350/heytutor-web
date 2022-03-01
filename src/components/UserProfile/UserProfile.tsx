import React, { useContext, useEffect, useRef, useState } from "react";
import { useStyles } from "./UserProfile.style";
import { stringAvatar } from "./helper";
import { Grid, Avatar, Typography, Button } from "@mui/material";
import { UserCtx } from "../../context/user/state";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import StarsIcon from "@mui/icons-material/Stars";
import CreateIcon from "@mui/icons-material/Create";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import MessageIcon from "@mui/icons-material/Message";
import ListPost from "./ListPost";
import { User } from "../../models/users";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const classes = useStyles();
  const { user }: any = useContext(UserCtx);
  const inputStory: any = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [value, setValue] = useState(0);
  const [userProfile, setUserProfile]: any = useState(user);
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");

  //information of user
  // const userRoll = true;
  // const userRanking = 100;
  // const userStory = "Thích tìm hiểu những cái mới lạ";
  // const userName = "Cao Duc Anh";
  const userMajor = "SE";
  const userSemester = 13;

  const [story, setStory] = useState(userProfile?.sumarry);
  // begin set tab view

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // end set tab view

  // begin edit story
  const handleEditStory = () => {
    inputStory && inputStory?.current?.focus();
    setIsEdit(true);
    console.log(isEdit);
  };

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
  //end style
  // end edit story

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
    }
  }, [userId, user]);

  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <Grid item className={classes.userHeader}>
          <div className={classes.header} style={styleColor}>
            <div className={classes.avatar}>
              <Avatar {...stringAvatar(userProfile?.name)} className={classes.roundedAvt} />
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
                {"K" + userSemester + "-" + userMajor}
              </div>
              <div className={classes.userRanking}>
                <StarsIcon /> Điểm uy tín hiện tại: {userProfile?.rateCount}/100
              </div>
              <div className={classes.userStory}>
                <BorderColorIcon />
                <textarea
                  maxLength={60}
                  ref={inputStory}
                  className={classes.storyInput}
                  value={userProfile?.sumarry}
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
                <>
                  <Button
                    onClick={handleEditStory}
                    endIcon={<CreateIcon />}
                    sx={{ color: "black", background: "white" }}
                    variant="contained">
                    Chỉnh sửa
                  </Button>
                  <Button
                    onClick={() => {
                      localStorage.removeItem("heytutor-user");
                      window.location.reload();
                    }}
                    sx={{ color: "black", background: "white" }}
                    variant="contained">
                    Logout
                  </Button>
                </>
              )}

              {isUpdate && (
                <Button
                  onClick={handleUpdateStory}
                  endIcon={<UpgradeIcon />}
                  sx={{ color: "white" }}
                  variant="contained">
                  Lưu chỉnh sửa
                </Button>
              )}
            </div>
          </div>
          {/* chuyen tab */}
          <div className={classes.userView}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Bài đăng" {...a11yProps(0)} />
                  <Tab label="Đánh giá" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <ListPost userProfile={userProfile} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                Đánh giá
              </TabPanel>
            </Box>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default UserProfile;
