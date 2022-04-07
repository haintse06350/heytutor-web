import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Avatar,
  Grid,
  Rating,
  Box,
  CardContent,
  Container,
  Divider,
  Popover,
  Tooltip,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import { User } from "../../models/users";
// import { Slide } from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";
import { MsgCtx } from "../../context/message/message";
import moment from "moment";
import "moment/locale/vi";
import clsx from "classnames";
import Help1 from "../../assets/illustrations/help.svg";
import Help2 from "../../assets/illustrations/help2.svg";
import { Message } from "../../models/message";
// import { map } from "lodash";
import { UserCtx } from "../../context/user/state";
// import InsertLinkIcon from "@mui/icons-material/InsertLink";
// import SendIcon from "@mui/icons-material/Send";
import { ExchangeTimeLine } from "./ExchangeTimeLine";
import { RenderExchangeActions } from "./RenderExchangeActions";
import { MessageBox } from "../MessageBox/MessageBox";
import { map } from "lodash";
import { ConfirmDialog } from "../Common/ConfirmDialog/ConfirmDialog";
import { UserPost } from "../../models/user-post";
import { NotificationCtx } from "../../context/notification/state";

// const slideImages = [{ url: demoImg5 }, { url: demoImg6 }, { url: demoImg4 }];

const PostItem = () => {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");
  const tab = urlParams.get("tab");
  const from = urlParams.get("from");
  const [post, setPost]: any = useState(null);
  const [messages, setMessages]: any = useState(null);
  const [userProfile, setUserProfile]: any = useState(null);
  const [isMyPost, setIsMyPost]: any = useState(false);
  const [userSelected, setUserSelected]: any = React.useState(null);

  const [openConfirmRegister, setOpenConfirmRegister] = React.useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const [selectedSupporter, setSelectedSupporter]: any = React.useState(null);

  const [listRegister, setListRegister]: any = React.useState([]);
  const [listSupporter, setListSupporter]: any = React.useState([]);

  // const [msg, setMsg] = useState("");
  const { onOpenMsgBox } = React.useContext(MsgCtx);
  const { user } = React.useContext(UserCtx);
  const { setNotificationSuccess, setNotificationError } = React.useContext(NotificationCtx);
  const navigate = useNavigate();

  moment.locale("vi");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const onClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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

  const getPostConversation = async (postId: string, userId: number) => {
    const conversation = await Message.getPostConversation(postId, userId);
    if (conversation) {
      const listMessages = await Message.listMessages({ limit: 100, offset: 0, conversationId: conversation.id });
      setMessages(listMessages.rows);
    } else {
      setMessages([]);
    }
  };

  const onClickRemoveRegisterUser = (user: any) => {
    setUserSelected(user);
    setOpenRemoveDialog(true);
  };

  const onConfirmRemoveRegister = () => {
    setNotificationSuccess(`Đã xoá ${userSelected?.name} khỏi danh sách người đăng kí`);
    setOpenRemoveDialog(false);
  };

  const onCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
  };

  const onClickConfirmRegister = (user: any) => {
    setUserSelected(user);
    setOpenConfirmRegister(true);
  };

  const onConfirmSupporter = async () => {
    try {
      setLoading(true);
      await UserPost.addSupporter({ postId, registerId: userSelected.id });
      setOpenConfirmRegister(false);
      setNotificationSuccess(`Đã chọn ${userSelected?.name} làm supporter cho vấn đề này`);

      setListSupporter([...listSupporter, userSelected]);
      setListRegister(listRegister.filter((item: any) => item.id !== userSelected.id));
    } catch (error) {
      setNotificationError("Có lỗi xảy ra, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const onCloseConfirmRegister = () => {
    setUserSelected(null);
    setOpenConfirmRegister(false);
  };

  const onClickContactSupporter = (user: any) => {
    setSelectedSupporter(user);
    onOpenMsgBox();
  };

  const howToUsePopup = () => {
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <Typography sx={{ maxWidth: 300, p: 2 }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
          sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
          nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
          aliquet nec, vulputate eget, arcu.
        </Typography>
      </Popover>
    );
  };

  const onClickProfile = (userId: number) => {
    navigate(`/profile?userId=${userId}`);
  };

  const ListSupporter = () => {
    return (
      <Box>
        <Typography variant="subtitle1">Danh sách người hỗ trợ</Typography>
        {listSupporter.length > 0 ? (
          <Box sx={{ mt: 1 }}>
            {map(listSupporter, (sp: any, idx: number) => (
              <Box sx={{ p: 0.5 }} display="flex" key={idx}>
                <Avatar {...stringAvatar(sp.name)} style={{ width: 30, height: 30, fontSize: 14 }} />
                <Box display="flex" flexDirection="column" flexGrow={1} sx={{ ml: 1 }}>
                  <Typography variant="subtitle1" onClick={() => onClickProfile(sp.id)}>
                    {sp.name}
                  </Typography>
                  <Typography display="flex" variant="subtitle1">
                    {sp.rankPoint} <StarRoundedIcon sx={{ color: "gold" }} />
                  </Typography>
                </Box>
                <Tooltip title="Trao đổi">
                  <MessageRoundedIcon color="primary" onClick={() => onClickContactSupporter(sp)} />
                </Tooltip>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ mt: 1 }}>
            <img src={Help1} alt="demo" />
            <Typography variant="caption">
              Hiện tại bạn chưa có người hỗ trợ cho vấn đề này. Chọn từ danh sách những người đăng kí để tìm người phù
              hợp hỗ trợ bạn !
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  const ListRegister = () => {
    return (
      <>
        <Box sx={{ position: "fixed" }}>
          <Typography variant="subtitle1" noWrap>
            Danh sách người đăng kí hỗ trợ
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            {listRegister.length} người đăng kí
          </Typography>
        </Box>
        {listRegister.length > 0 ? (
          <Box sx={{ mt: 6, pb: 2, maxHeight: 450, overflowY: "scroll" }}>
            {map(listRegister, (sp: any, idx: number) => (
              <Box sx={{ p: 0.5 }} display="flex" key={idx}>
                <Avatar {...stringAvatar(sp.name)} style={{ width: 30, height: 30, fontSize: 14 }} />
                <Box display="flex" flexDirection="column" flexGrow={1} sx={{ ml: 1 }}>
                  <Typography className={classes.userName} variant="subtitle1" onClick={() => onClickProfile(sp.id)}>
                    {sp.name}
                  </Typography>
                  <Typography display="flex" variant="subtitle1">
                    {sp.rankPoint} <StarRoundedIcon sx={{ color: "gold" }} />
                  </Typography>
                </Box>
                <Tooltip title="Loại khỏi danh sách đăng kí">
                  <PersonRemoveRoundedIcon color="error" onClick={() => onClickRemoveRegisterUser(sp)} />
                </Tooltip>
                <Tooltip title="Chọn người hỗ trợ">
                  <PersonAddAltRoundedIcon
                    sx={{ ml: 0.5 }}
                    color="primary"
                    onClick={() => onClickConfirmRegister(sp)}
                  />
                </Tooltip>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ mt: 1 }}>
            <img src={Help2} alt="demo" />
            <Typography variant="caption">
              Hiện tại bạn chưa có người đăng kí hỗ trợ bạn cho vấn đền này. Hãy kiên nhẫn thêm một chút nữa nhé !
            </Typography>
          </Box>
        )}
      </>
    );
  };

  useEffect(() => {
    if (postId) {
      Post.getPostDetail(postId).then((post: any) => {
        setPost(post);
        setListRegister(post.registers || []);
        setListSupporter(post.supporters || []);
        const userId = post.postDetails["Post.userId"];
        const isMyPost = userId === user?.id;
        setIsMyPost(isMyPost);
        if (!isMyPost) {
          User.getUserProfile(userId).then((res: any) => {
            setUserProfile(res);
          });
          getPostConversation(postId, userId);
        } else {
          const supporter = post.supporters[0].userData;
          setUserProfile(supporter);
          getPostConversation(post.postDetails["Post.id"], post.supporters[0].supporterId[0]);
        }
      });
    }
  }, [postId]);

  useEffect(() => {
    if (messages?.length > 0) {
      const messageBox = document.getElementById("messageBox");
      messageBox && (messageBox.scrollTop = messageBox?.scrollHeight);
    }
  }, [messages]);

  if (!post) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Page>
      {howToUsePopup()}
      <ConfirmDialog
        dialogTitle="Xoá khỏi danh sách người đăng kí"
        dialogContent={
          <Box>
            <Typography>
              Bạn có chắc chắn muốn loại <span style={{ fontWeight: "bold" }}>{userSelected?.name}</span> khỏi danh sách
              đăng kí?
            </Typography>
            <Typography variant="caption" sx={{ fontSize: 12 }}>
              <span style={{ fontWeight: "bold" }}>{userSelected?.name}</span> sẽ không thể đăng kí hỗ trợ bài viết này
              nữa !
            </Typography>
          </Box>
        }
        confirmAction={onConfirmRemoveRegister}
        cancelAction={onCloseRemoveDialog}
        open={openRemoveDialog}
        onClose={onCloseRemoveDialog}
      />
      <ConfirmDialog
        dialogTitle="Xác nhận chọn supporter"
        dialogContent={
          <Typography>
            Bạn có chắc chắn muốn chọn <span style={{ fontWeight: "bold" }}>{userSelected?.name}</span> làm supporter
            cho vấn đề này?
          </Typography>
        }
        confirmAction={onConfirmSupporter}
        cancelAction={onCloseConfirmRegister}
        open={openConfirmRegister}
        onClose={onCloseConfirmRegister}
        loadingConfirm={loading}
      />
      {/* no images just text*/}
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card sx={{ mt: 6, p: 2 }}>
              <ListSupporter />
            </Card>
            <Card sx={{ mt: 2, px: 2, pt: 2 }}>
              <ListRegister />
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card sx={{ mt: 6, px: 4, pt: 2, pb: 4 }}>
              <div className={classes.deadline}>
                <div>
                  <AccessTimeOutlinedIcon sx={{ color: "#d32f2f" }} />
                  <Typography sx={{ ml: 1, color: "#d32f2f", fontWeight: 600 }} variant="body2">
                    Deadline trong{" "}
                    {moment(post.postDetails["Post.deadline"]).endOf("hours").fromNow() || "Cần xử lí trong hôm nay"}
                  </Typography>
                </div>
                <div className={clsx(classes.postStatus, `${tab}`)}>
                  <Typography variant="caption">{getPostStatus()}</Typography>
                </div>
                {isMyPost && <Button>Chỉnh sửa</Button>}
              </div>
              <div className={classes.postTitleAndAction}>
                <Typography variant="h5">[ {post.postDetails["Post.title"]} ]</Typography>
              </div>

              {post.postDetails["Post.content"]}
              <Box sx={{ mt: 2 }}>
                <img src={demoImg6} alt="" />
              </Box>
              {!isMyPost && userProfile && (
                <div className={classes.userPanel}>
                  <div className={classes.userNameAndAvatar}>
                    <div className={classes.userStats}>
                      <Avatar {...stringAvatar(userProfile.name)} className={classes.userAvatar} />
                      <div style={{ marginLeft: 16 }}>
                        <Typography sx={{ fontWeight: 600 }}>{userProfile.name}</Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
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
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={4} sx={{ mt: 6 }}>
            <Box className={classes.positionFixed}>
              <Card elevation={20}>
                <CardContent classes={{ root: classes.exchangeBox }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Quá trình trao đổi</Typography>
                    <Box className={classes.exchangeInfo} onClick={(e: any) => onClickInfo(e)}>
                      i
                    </Box>
                  </Box>
                  <Divider sx={{ mt: 1 }} variant="fullWidth" />
                  <ExchangeTimeLine selectedSupporter={selectedSupporter} role={from} />
                </CardContent>
                <Box className={classes.actions}>
                  <RenderExchangeActions selectedSupporter={selectedSupporter} role={from} />
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
        <MessageBox postId={postId} userId={selectedSupporter?.id} userName={selectedSupporter?.name} />
      </Container>
    </Page>
  );
};

export default PostItem;
