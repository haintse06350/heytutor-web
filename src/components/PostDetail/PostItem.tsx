import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Avatar,
  Grid,
  Rating,
  Box,
  CardContent,
  Divider,
  Popover,
  Tooltip,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
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
import BlockIcon from "@mui/icons-material/Block";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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
import BreadcrumbsTab from "../Common/Breadcrumbs/Breadcrumbs";
import JpgFile from "../../assets/file/jpg.svg";
import PdfFile from "../../assets/file/pdf.svg";
import ZipFile from "../../assets/file/zip.svg";
import RawFile from "../../assets/file/raw.svg";
import { styled } from "@mui/styles";

const Input = styled("input")({
  display: "none",
});

const PostItem = () => {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");
  const tab = urlParams.get("tab");
  const from = urlParams.get("from");
  const isMyRequest = from === "my-request";

  const [post, setPost]: any = useState(null);
  const [messages, setMessages]: any = useState(null);
  const [userProfile, setUserProfile]: any = useState(null);
  const [isMyPost, setIsMyPost]: any = useState(false);
  const [userSelected, setUserSelected]: any = React.useState(null);

  const [openConfirmRegister, setOpenConfirmRegister] = React.useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false);
  const [openCancelSupportDialog, setOpenCancelSupportDialog] = React.useState(false);
  const [openDialogListRegister, setOpenDialogListRegister] = React.useState(false);
  const [openExpandExchangeBox, setOpenExpandExchangeBox] = React.useState(false);

  console.log(openDialogListRegister);
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

  const onOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClosePopover = () => {
    setAnchorEl(null);
  };
  // const isNearDeadline = (deadline: string) => {
  //   if (deadline.includes("giờ") || deadline.includes("phút")) {
  //     return true;
  //   }
  // };
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

  const onOpenCancelSupportDialog = () => {
    setOpenCancelSupportDialog(true);
  };

  const onCloseCancelSupportDialog = () => {
    setOpenCancelSupportDialog(false);
  };

  const onConfirmCancelSupport = () => {
    setNotificationSuccess(`Đã hủy hỗ trợ thành công`);
    setOpenCancelSupportDialog(false);
    navigate(-1);
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
        onClose={onClosePopover}
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

  const onUploadFile = ({ target }: any) => {
    const fileReader = new FileReader();
    console.log("on upload");
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e: any) => {
      console.log(e.target.result);
    };
  };

  const PostOwner = () => {
    return (
      <Box>
        <Typography variant="subtitle1">Bạn đang hỗ trợ cho</Typography>
        <Box sx={{ mt: 1 }}>
          <Box sx={{ p: 0.5 }} display="flex">
            <Avatar {...stringAvatar(post?.postDetails.user.name)} style={{ width: 30, height: 30, fontSize: 14 }} />
            <Box display="flex" flexDirection="column" flexGrow={1} sx={{ ml: 1 }}>
              <Typography variant="subtitle1" onClick={() => onClickProfile(post?.user.id)}>
                {post?.postDetails.user.name}
              </Typography>
              <Typography variant="caption">Đã hoàn thành 4/5 giao dịch</Typography>
              <Typography display="flex" alignItems="center" variant="caption">
                4.5 <StarRoundedIcon sx={{ color: "gold" }} /> / 5 votes
              </Typography>
            </Box>
            <Tooltip title="Trao đổi">
              <QuestionAnswerIcon color="primary" onClick={() => onClickContactSupporter(post?.postDetails.user)} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    );
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

                  <Typography display="flex" alignItems="center" variant="subtitle1">
                    {sp.rankPoint} <StarRoundedIcon sx={{ color: !sp.rankPoint ? "gray" : "gold" }} />
                  </Typography>
                </Box>
                <Tooltip title="Trao đổi">
                  <QuestionAnswerIcon color="primary" onClick={() => onClickContactSupporter(sp)} />
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
        <Box>
          <Typography variant="subtitle1" noWrap>
            Danh sách người đăng kí hỗ trợ
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            {listRegister.slice(0, 5).length} / {listRegister.length} người đăng kí
          </Typography>
        </Box>
        {listRegister.length > 0 ? (
          <Box sx={{ mt: 1, pb: 2, maxHeight: 450, overflowY: "scroll" }}>
            {map(listRegister.slice(0, 5), (register: any, idx: number) => (
              <Box sx={{ p: 0.5 }} display="flex" key={idx}>
                <Avatar {...stringAvatar(register.name)} style={{ width: 30, height: 30, fontSize: 14 }} />
                <Box display="flex" flexDirection="column" flexGrow={1} sx={{ ml: 1 }}>
                  <Typography
                    className={classes.userName}
                    variant="subtitle1"
                    onClick={() => onClickProfile(register.id)}>
                    {register.name}
                  </Typography>
                  <Typography display="flex" alignItems="center" variant="caption">
                    {register.rankPoint}{" "}
                    <StarRoundedIcon sx={{ width: 20, color: !register.rankPoint ? "gray" : "gold" }} />
                  </Typography>
                </Box>
                {isMyPost && (
                  <Box>
                    <Tooltip title="Loại khỏi danh sách đăng kí">
                      <BlockIcon color="error" onClick={() => onClickRemoveRegisterUser(register)} />
                    </Tooltip>
                    <Tooltip title="Chọn người hỗ trợ">
                      <PersonAddAltRoundedIcon
                        sx={{ ml: 0.5 }}
                        color="primary"
                        onClick={() => onClickConfirmRegister(register)}
                      />
                    </Tooltip>
                  </Box>
                )}
              </Box>
            ))}
            {listRegister.length > 5 && (
              <Button variant="outlined" sx={{ float: "right" }} onClick={() => setOpenDialogListRegister(true)}>
                Xem thêm
              </Button>
            )}
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
        dialogTitle="Xác nhận huỷ hỗ trợ vấn đề này ?"
        dialogContent={
          <Box>
            <Typography sx={{ fontWeight: 500 }}>
              Bạn sẽ không thể đăng kí hỗ trợ bài viết này nếu bạn đã huỷ hỗ trợ !
            </Typography>
            <RadioGroup aria-labelledby="demo-customized-radios" name="customized-radios">
              <FormControlLabel
                classes={{ label: classes.formLabel }}
                value="no-reply"
                control={<Radio />}
                label="Chủ bài viết không trả lời tin nhắn"
              />
              <FormControlLabel
                classes={{ label: classes.formLabel }}
                value="no-pay"
                control={<Radio />}
                label="Tôi có việc bận"
              />
              <FormControlLabel
                classes={{ label: classes.formLabel }}
                value="change-deal"
                control={<Radio />}
                label="Thay đổi thù lao không giống thoả thuận ban đầu"
              />
            </RadioGroup>
            <TextField multiline fullWidth rows={4} sx={{ mt: 2.5 }} placeholder="Lý do khác" />
          </Box>
        }
        confirmAction={onConfirmCancelSupport}
        cancelAction={onCloseCancelSupportDialog}
        open={openCancelSupportDialog}
        onClose={onCloseCancelSupportDialog}
      />
      <ConfirmDialog
        dialogTitle="Xoá khỏi danh sách người đăng kí"
        dialogContent={
          <Box>
            <Typography>
              Bạn có chắc chắn muốn loại <span style={{ fontWeight: "bold" }}>{userSelected?.name}</span> khỏi danh sách
              đăng kí?
            </Typography>
            <Typography variant="caption" sx={{ fontSize: 12 }}>
              <span style={{ fontWeight: "bold" }}>{userSelected?.name}</span> sẽ không thể đăng kí hỗ trợ vấn đề này
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
        dialogTitle="Xác nhận chọn người hỗ trợ"
        dialogContent={
          <Typography>
            Bạn có chắc chắn muốn chọn <span style={{ fontWeight: "bold" }}>{userSelected?.name}</span> hỗ trợ vấn đề
            này?
          </Typography>
        }
        confirmAction={onConfirmSupporter}
        cancelAction={onCloseConfirmRegister}
        open={openConfirmRegister}
        onClose={onCloseConfirmRegister}
        loadingConfirm={loading}
      />
      <ConfirmDialog
        dialogTitle="Quá trình trao đổi"
        maxWidth="lg"
        dialogContent={
          <Box>
            <Box display="flex" justifyContent="space-around" sx={{ maxHeight: 400, overflowY: "scroll" }}>
              <ExchangeTimeLine selectedSupporter={selectedSupporter} isMyRequest={isMyRequest} />
              <div style={{ width: "1px", height: "100%" }} />
              {isMyRequest ? (
                <Box>
                  <TextField multiline fullWidth rows={4} placeholder="Nội dung yêu cầu" />
                  <Button variant="contained" sx={{ mt: 1, float: "right" }}>
                    Gửi
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography>Upload câu trả lời</Typography>
                  <Box>
                    <Typography>
                      {
                        "Bạn có thể upload file ảnh định dang jpg, png hoặc tài liệu định dạng docx, pdf với dung lượng < 1MB"
                      }
                    </Typography>
                    <TextField
                      margin="dense"
                      id="link"
                      label="Link tài liệu"
                      type="link"
                      fullWidth
                      variant="standard"
                    />
                    <Box sx={{ mt: 2 }} display="flex" alignItems="center" justifyContent="flex-start">
                      <Typography variant="subtitle1">Hoặc</Typography>
                      <label htmlFor="icon-button-file">
                        <Input onChange={onUploadFile} accept="*" id="icon-button-file" multiple type="file" />
                        <Button sx={{ ml: 2 }} variant="contained" component="span">
                          Upload file
                        </Button>
                      </label>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
            <Divider />
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Tệp đính kèm
              </Typography>
              <Grid sx={{ mt: 1 }} container spacing={2}>
                <Grid display="flex" alignItems="center" item xs={12} sm={6} md={3}>
                  <Box display="flex" alignItems="center">
                    <img style={{ width: 40 }} src={JpgFile} alt="" />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
                        Tài liệu câu 1
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: 12 }}>
                        100Kb - 1 ngày trước
                      </Typography>
                    </Box>
                  </Box>
                  <MoreHorizIcon sx={{ ml: 1 }} />
                </Grid>
                <Grid display="flex" alignItems="center" item xs={12} sm={6} md={3}>
                  <Box display="flex" alignItems="center">
                    <img style={{ width: 40 }} src={ZipFile} alt="" />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
                        Tài liệu câu 2
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: 12 }}>
                        100Kb - 1 ngày trước
                      </Typography>
                    </Box>
                  </Box>
                  <MoreHorizIcon sx={{ ml: 1 }} />
                </Grid>
                <Grid display="flex" alignItems="center" item xs={12} sm={6} md={3}>
                  <Box display="flex" alignItems="center">
                    <img style={{ width: 40 }} src={PdfFile} alt="" />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
                        Tài liệu câu 3
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: 12 }}>
                        100Kb - 1 ngày trước
                      </Typography>
                    </Box>
                  </Box>
                  <MoreHorizIcon sx={{ ml: 1 }} />
                </Grid>
                <Grid display="flex" alignItems="center" item xs={12} sm={6} md={3}>
                  <Box display="flex" alignItems="center">
                    <img style={{ width: 40 }} src={RawFile} alt="" />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
                        Tài liệu câu 4
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: 12 }}>
                        100Kb - 1 ngày trước
                      </Typography>
                    </Box>
                  </Box>
                  <MoreHorizIcon sx={{ ml: 1 }} />
                </Grid>
              </Grid>
            </Box>
          </Box>
        }
        cancelAction={() => setOpenExpandExchangeBox(false)}
        open={openExpandExchangeBox}
        onClose={() => setOpenExpandExchangeBox(false)}
        loadingConfirm={loading}
      />
      {/* no images just text*/}
      <>
        <BreadcrumbsTab
          history={[
            {
              title: isMyPost ? "Vấn đề đi hỗ trợ" : "Vấn đề của tôi",
              href: isMyPost ? "/my-request" : "/registered-request",
            },
          ]}
          current={{ title: "Chi tiết" }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card sx={{ mt: 2, p: 2 }}>{from === "my-request" ? <ListSupporter /> : <PostOwner />}</Card>
            <Card sx={{ mt: 2, px: 2, pt: 2 }}>
              <ListRegister />
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card sx={{ mt: 2, px: 4, pt: 2, pb: 4 }}>
              <div className={classes.deadline}>
                <div>
                  <AccessTimeOutlinedIcon sx={{ color: "#d32f2f" }} />
                  {/* <AccessTimeOutlinedIcon
                    sx={{
                      color: isNearDeadline(post.postDetails["Post.deadline"].endOf("hours").fromNow())
                        ? "#d32f2f"
                        : "#94a4c4",
                    }}
                  /> */}
                  <Typography variant="subtitle1" sx={{ ml: 1, color: "#d32f2f" }}>
                    Deadline trong{" "}
                    {moment(post.postDetails["Post.deadline"]).endOf("hours").fromNow() || "Cần xử lí trong hôm nay"}
                  </Typography>
                </div>

                {isMyPost ? (
                  <Button>Chỉnh sửa</Button>
                ) : (
                  <Button sx={{ fontSize: 12 }} color="error" variant="outlined" onClick={onOpenCancelSupportDialog}>
                    Huỷ hỗ trợ
                  </Button>
                )}
              </div>
              <div className={classes.postTitleAndAction}>
                <Typography variant="h6">
                  <div className={clsx(classes.postStatus, `${tab}`)}>
                    <Typography variant="caption">{getPostStatus()}</Typography>
                  </div>
                  [ {post.postDetails["Post.title"]} ]
                </Typography>
              </div>

              <Typography variant="subtitle1" fontWeight={400} fontSize="1rem">
                {post.postDetails["Post.content"]}
              </Typography>
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
          <Grid item xs={12} md={4} sx={{ mt: 2 }}>
            <Box className={classes.positionFixed}>
              <Card elevation={20}>
                <CardContent classes={{ root: classes.exchangeBox }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                      <Typography variant="subtitle1">Quá trình trao đổi</Typography>
                      <Box className={classes.exchangeInfo} onClick={(e: any) => onOpenPopover(e)}>
                        i
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Tooltip title="Mở rộng">
                        <OpenInFullIcon sx={{ width: 18, height: 18 }} onClick={() => setOpenExpandExchangeBox(true)} />
                      </Tooltip>
                    </Box>
                  </Box>
                  <Divider sx={{ mt: 1 }} variant="fullWidth" />
                  <ExchangeTimeLine
                    selectedSupporter={selectedSupporter}
                    isMyRequest={isMyRequest}
                    onUploadFile={onUploadFile}
                  />
                </CardContent>
                <Box className={classes.actions}>
                  <RenderExchangeActions selectedSupporter={selectedSupporter} role={from} />
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
        <MessageBox postId={postId} userId={selectedSupporter?.id} userName={selectedSupporter?.name} />
      </>
    </Page>
  );
};

export default PostItem;
