import React, { useContext, useState } from "react";
//material
import { Typography, Box, Button, Divider, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
//components
import MainTabLayout from "../../layout/MainTabLayout";
import { PostCtx } from "../../context/post/state";

import { StatItem } from "../Common/StatItem";
//icons
import ArticleIcon from "@mui/icons-material/Article";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
// import EventNoteIcon from "@mui/icons-material/EventNote";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//lodash
// import { isEmpty } from "lodash";
import { useStyles } from "./HomePage.style";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const MyPost = (props: any) => {
  const { data } = props;
  const classes = useStyles();
  const { createPost } = useContext(PostCtx);
  const theme = useTheme();
  const [onHoverElem, setOnHoverElem]: any = React.useState(null);
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  };

  const [openInformation, setOpenInformation] = useState(true);

  const renderMyPostContent = () => {
    if (!data) {
      return (
        <Box
          sx={{
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <CircularProgress />
        </Box>
      );
    } else if (data?.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            flexGrow: 1,
          }}>
          <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            T???o b??i vi???t ngay ????? t??m ng?????i gi???i quy???t c???a b???n
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              createPost();
            }}>
            T???o b??i vi???t
          </Button>
        </Box>
      );
    } else {
      return (
        <>
          {openInformation && (
            <Box
              sx={{
                // padding: "5px 0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flexGrow: 1,
              }}>
              <StatItem
                onHoverElem={onHoverElem}
                setOnHoverElem={setOnHoverElem}
                tab="pendingPost"
                icon={<PendingActionsOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
                data={data.nbOfPostHasNoRegister + "/" + data.nbOfAllPost}
                title="Ch??a c?? ng?????i ????ng k?? "
                subTitle="S??? l?????ng c??c v???n ????? ch??a c?? ng?????i ????ng k?? gi??p ?????"
                onNavigate={() => onNavigate("/my-request?detail=pending")}
              />
              <StatItem
                onHoverElem={onHoverElem}
                setOnHoverElem={setOnHoverElem}
                tab="activePost"
                icon={<AssignmentOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
                data={data.nbOfPostHasRegister + "/" + data.nbOfAllPost}
                title="???? c?? ng?????i ????ng k??"
                subTitle="S??? l?????ng c??c v???n ????? ???? c?? ng?????i ????ng k?? gi??p ?????"
                onNavigate={() => onNavigate("/my-request?detail=active")}
              />
              <StatItem
                onHoverElem={onHoverElem}
                setOnHoverElem={setOnHoverElem}
                tab="processSupportPost"
                icon={<FactCheckOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
                data={data.nbOfConfirmedPost + "/" + data.nbOfAllPost}
                title="??ang ???????c h??? tr???"
                subTitle="??ang trong qu?? tr??nh h??? tr???"
                onNavigate={() => onNavigate("/my-request?detail=processing")}
              />
            </Box>
          )}
          <Divider />
          <Box sx={{ display: "flex" }} className={classes.btnHideContentMyPost}>
            <Box sx={{ pt: 2, textAlign: "left" }}>
              <Button
                size="small"
                color="inherit"
                endIcon={openInformation ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                onClick={() => setOpenInformation(!openInformation)}>
                {openInformation ? "???n" : "Hi???n th???"}
              </Button>
            </Box>
            {openInformation && (
              <Box sx={{ pt: 2, textAlign: "right" }}>
                <Button
                  to="/my-request"
                  size="small"
                  color="inherit"
                  component={RouterLink}
                  endIcon={<ArrowForwardIosOutlinedIcon />}>
                  Xem chi ti???t
                </Button>
              </Box>
            )}
          </Box>
        </>
      );
    }
  };
  return (
    <MainTabLayout
      title={"V???n ????? t??i c???n h??? tr???"}
      content={renderMyPostContent()}
      type="myPost"
      icon={<ArticleIcon />}
    />
  );
};

export default MyPost;
