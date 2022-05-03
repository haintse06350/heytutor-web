import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Avatar,
  Grid,
  // Rating,
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
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./PostItem.style";
import { stringAvatar } from "../UserProfile/helper";
// import { useNavigate } from "react-router-dom";
import Page from "../../layout/Page";
import { Post } from "../../models/post";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import BlockIcon from "@mui/icons-material/Block";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DoneIcon from "@mui/icons-material/Done";
import { User } from "../../models/users";

import { MsgCtx } from "../../context/message/message";
import moment from "moment";
import "moment/locale/vi";
import clsx from "classnames";
import Help1 from "../../assets/illustrations/help.svg";
import Help2 from "../../assets/illustrations/help2.svg";
import { Message } from "../../models/message";
import { UserCtx } from "../../context/user/state";
import { ExchangeTimeLine } from "./ExchangeTimeLine";
import { RenderExchangeActions } from "./RenderExchangeActions";
import { MessageBox } from "../MessageBox/MessageBox";
import { map, isEmpty } from "lodash";
import { ConfirmDialog } from "../Common/ConfirmDialog/ConfirmDialog";
import { UserPost } from "../../models/user-post";
import { NotificationCtx } from "../../context/notification/state";
import BreadcrumbsTab from "../Common/Breadcrumbs/Breadcrumbs";
import JpgFile from "../../assets/file/jpg.svg";
import PdfFile from "../../assets/file/pdf.svg";
import ZipFile from "../../assets/file/zip.svg";
import RawFile from "../../assets/file/raw.svg";
import { styled } from "@mui/styles";
import { getImageUrl } from "../../utils/imageUrl";
import { ConfirmRegister } from "../Common/ConfirmRegister";
import LoadingState from "../Common/LoadingState";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded";
import { ReportDialog } from "../ListData/ListRequest/ReportDialog";

const Input = styled("input")({
  display: "none",
});

const PostItem = () => {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");
  const tab = urlParams.get("tab");
  const from = urlParams.get("from");
  const eventId = urlParams.get("eventId");
  const isMyRequest = from === "my-request";

  const [post, setPost]: any = useState(null);
  const [messages, setMessages]: any = useState(null);
  const [userProfile, setUserProfile]: any = useState(null);
  const [isMyPost, setIsMyPost]: any = useState(false);
  const [userSelected, setUserSelected]: any = React.useState(null);

  const [openConfirmRegister, setOpenConfirmRegister] = React.useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false);
  const [openCancelSupportDialog, setOpenCancelSupportDialog] = React.useState(false);
  const [openExpandExchangeBox, setOpenExpandExchangeBox] = React.useState(false);
  const [onOpenConfirmDone, setOnOpenConfirmDone] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isOpenUnregister, setIsOpenUnregister] = useState(false);

  const [selectedSupporter, setSelectedSupporter]: any = React.useState(null);

  const [listRegister, setListRegister]: any = React.useState([]);
  const [listSupporter, setListSupporter]: any = React.useState([]);

  const postImages = !isEmpty(post?.postDetails["Post.images"]) ? JSON.parse(post?.postDetails["Post.images"]) : null;
  // const [msg, setMsg] = useState("");
  const { onOpenMsgBox } = React.useContext(MsgCtx);
  const { user } = React.useContext(UserCtx);
  const { setNotificationSuccess, setNotificationError } = React.useContext(NotificationCtx);
  const navigate = useNavigate();
  const [repostType, setRepostType] = useState("");

  moment.locale("vi");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const openMenu = Boolean(anchorElMenu);

  const onOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onOpenPopoverMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const onClosePopover = () => {
    setAnchorEl(null);
  };

  const onClosePopoverMenu = () => {
    setAnchorElMenu(null);
  };

  const onReportPost = () => {
    setRepostType("report");
    onClosePopoverMenu();
  };

  const onRequestDone = () => {
    setOnOpenConfirmDone(true);
    onClosePopoverMenu();
  };

  const onCloseConfirmDone = () => {
    setOnOpenConfirmDone(false);
    onClosePopoverMenu();
  };

  const onConfirmDone = () => {
    console.log("onConfirmDone");
  };

  const onCloseReportPost = () => {
    setRepostType("");
    onClosePopoverMenu();
  };
  // const isNearDeadline = (deadline: string) => {
  //   if (deadline.includes("giờ") || deadline.includes("phút")) {
  //     return true;
  //   }
  // };
  const getPostStatus = () => {
    switch (tab) {
      case "isActive": {
        return "Chưa có người đăng ký";
      }
      case "isConfirmed": {
        return "Đang trong quá trình hỗ trợ";
      }
      case "isPending": {
        return "Đang chờ xác nhận";
      }
      case "isDone": {
        return "Đã hoàn thành";
      }
    }
  };

  const isRegisterThisPost = post?.registers?.find((register: any) => register.id === user?.id);
  const isSupportingThisPost = post?.supporters?.find((sp: any) => sp.id === user?.id);

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
    isSupportingThisPost ? setOpenCancelSupportDialog(true) : setIsOpenUnregister(true);
    onClosePopoverMenu();
  };

  const onRegisterPost = () => {
    setIsOpenConfirm(true);
  };

  const onCloseCancelSupportDialog = () => {
    setOpenCancelSupportDialog(false);
  };

  const onConfirmCancelSupport = async () => {
    try {
      const res = await UserPost.unsupport({ postId });
      if (res.status === 200) {
        setNotificationSuccess(`Đã hủy hỗ trợ thành công`);
        setOpenCancelSupportDialog(false);
        await fetchPostData(postId);
      } else {
        setNotificationError("Huỷ đăng kí thất bại!");
      }
    } catch (error) {
      setNotificationError("Huỷ đăng kí thất bại!");
    }
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

  const PostOptions = () => {
    return (
      <Popover
        open={openMenu}
        anchorEl={anchorElMenu}
        onClose={onClosePopoverMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        {isMyPost && (
          <MenuItem key={"edit"} sx={{ typography: "body2", py: 1, px: 2.5 }}>
            <EditRoundedIcon
              sx={{
                mr: 1,
                width: 20,
                height: 20,
              }}
            />
            <Typography variant="subtitle2">Chỉnh sửa bài viết</Typography>
          </MenuItem>
        )}
        {!isMyPost && (
          <MenuItem key={"edit"} sx={{ typography: "body2", py: 1, px: 2.5 }} onClick={onReportPost}>
            <ReportGmailerrorredRoundedIcon
              sx={{
                mr: 1,
                width: 20,
                height: 20,
              }}
            />
            <Typography variant="subtitle2">Báo cáo bài viết</Typography>
          </MenuItem>
        )}
        <MenuItem key={"confirm"} sx={{ typography: "body2", py: 1, px: 2.5 }} onClick={onRequestDone}>
          <DoneIcon
            sx={{
              mr: 1,
              width: 20,
              height: 20,
            }}
          />
          <Typography variant="subtitle2">
            {isMyPost ? "Xác nhận hoàn thành" : "Yêu cầu xác nhận đã hoàn thành"}
          </Typography>
        </MenuItem>
        {!isMyPost && (
          <MenuItem key={"cancel"} sx={{ typography: "body2", py: 1, px: 2.5 }} onClick={onOpenCancelSupportDialog}>
            <CancelPresentationRoundedIcon
              sx={{
                mr: 1,
                width: 20,
                height: 20,
              }}
            />
            <Typography variant="subtitle2">
              {isSupportingThisPost ? "Huỷ hỗ trọ vấn đề này" : "Huỷ đăng kí hỗ trợ"}
            </Typography>
          </MenuItem>
        )}
      </Popover>
    );
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
            {map(listRegister, (register: any, idx: number) => (
              <Box sx={{ p: 0.5 }} display="flex" key={idx}>
                <Avatar {...stringAvatar(register.name)} style={{ width: 30, height: 30, fontSize: 14 }} />
                <Box display="flex" flexDirection="column" flexGrow={1} sx={{ ml: 1 }}>
                  <Typography
                    className={classes.userName}
                    variant="subtitle1"
                    onClick={() => onClickProfile(register.id)}>
                    {register.name}
                  </Typography>
                  <Typography display="flex" alignItems="center" variant="subtitle1">
                    {register.rankPoint}{" "}
                    <StarRoundedIcon sx={{ width: 20, color: !register.rankPoint ? "gray" : "gold" }} />
                  </Typography>
                </Box>
                {isMyPost && (
                  <Box>
                    <Tooltip title="Loại khỏi danh sách đăng kí">
                      <Button
                        size="small"
                        sx={{ p: 0, minWidth: "fit-content" }}
                        onClick={() => onClickRemoveRegisterUser(register)}>
                        <BlockIcon color="error" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Chọn người hỗ trợ">
                      <Button
                        disabled={listSupporter?.length > 0}
                        size="small"
                        sx={{ p: 0, ml: 0.5, minWidth: "fit-content" }}
                        onClick={() => onClickConfirmRegister(register)}>
                        <PersonAddAltRoundedIcon
                          sx={{ ml: 0.5 }}
                          color={listSupporter?.length === 0 ? "primary" : "disabled"}
                        />
                      </Button>
                    </Tooltip>
                  </Box>
                )}
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

  const fetchPostData = async (postId: any) => {
    try {
      const post = await Post.getPostDetail(postId);
      setPost(post);
      setListRegister(post.registers || []);
      setListSupporter(post.supporters || []);
      const userPostId = post.postDetails["Post.userId"];
      const isMyPost = userPostId === user?.id;
      setIsMyPost(isMyPost);
      if (!isMyPost) {
        User.getUserProfile(userPostId)
          .then((res: any) => {
            setUserProfile(res);
          })
          .catch((err) => console.log(err));

        getPostConversation(postId, userPostId);
      } else {
        const supporter = post?.supporters ? post?.supporters[0] : null;
        setUserProfile(supporter);
        post?.supporters && getPostConversation(post?.postDetails["Post.id"], post?.supporters[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostData(postId);
    }
  }, [postId]);

  useEffect(() => {
    if (messages?.length > 0) {
      const messageBox = document.getElementById("messageBox");
      messageBox && (messageBox.scrollTop = messageBox?.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    if (from === "notification" && listSupporter) {
      if (isMyPost) {
        setSelectedSupporter({ id: listSupporter[0]?.id, name: listSupporter[0]?.name });
      } else {
        setSelectedSupporter({ id: post?.postDetails.user.id, name: post?.postDetails.user.name });
      }
      onOpenMsgBox();
    }
  }, [isMyPost, from, listSupporter]);

  if (!post) {
    return <LoadingState />;
  }

  return (
    <Page>
      {howToUsePopup()}
      <ReportDialog
        type={repostType}
        itemClicked={post}
        confirmAction={() => {}}
        onCloseReportDialog={onCloseReportPost}
      />
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
      <ConfirmRegister
        postId={postId}
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        fetchPostData={fetchPostData}
        isRegisterAction={true}
      />
      <ConfirmRegister
        postId={postId}
        isOpen={isOpenUnregister}
        setIsOpen={setIsOpenUnregister}
        fetchPostData={fetchPostData}
        isRegisterAction={false}
      />
      <PostOptions />
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
        dialogTitle={isMyPost ? "Xác nhận đã nhận được hỗ trợ" : "Xác nhận hoàn thành hỗ trợ"}
        dialogContent={
          <Typography>
            Xác nhận hoàn thành hỗ trợ vấn đề này. Vấn đề được tính là hoàn thành khi cả 2 người đều xác nhận hoàn thành
          </Typography>
        }
        confirmAction={onConfirmDone}
        cancelAction={onCloseConfirmDone}
        open={onOpenConfirmDone}
        onClose={onCloseConfirmDone}
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
              title: from === "event" ? "Sự kiện" : isMyPost ? "Vấn đề của tôi" : "Vấn đề đi hỗ trợ",
              href:
                from === "event"
                  ? `/event-detail?eventid=${eventId}`
                  : isMyPost
                  ? "/my-request"
                  : "/registered-request",
            },
          ]}
          current={{ title: "Chi tiết" }}
        />
        <Grid container spacing={2}>
          {(isSupportingThisPost || isRegisterThisPost || isMyPost) && (
            <Grid item xs={12} md={3}>
              <Card sx={{ mt: 2, p: 2 }}>
                {isMyPost ? (
                  <ListSupporter />
                ) : isSupportingThisPost ? (
                  <PostOwner />
                ) : (
                  <>
                    <Typography>Đã đăng kí hỗ trợ vấn đề này</Typography>
                  </>
                )}
              </Card>
              <Card sx={{ mt: 2, px: 2, pt: 2 }}>
                <ListRegister />
              </Card>
            </Grid>
          )}
          <Grid item xs={12} md={isRegisterThisPost || isMyPost || isSupportingThisPost ? 5 : 8}>
            <Card sx={{ mt: 2, px: 4, pt: 2, pb: 4 }}>
              <div className={clsx(classes.postStatus, `${tab}`)}>
                <Typography variant="caption">
                  {listSupporter?.length > 0 ? "Đang trong quá trình hỗ trợ" : getPostStatus()}
                </Typography>
              </div>
              <div className={classes.deadline}>
                <div>
                  <AccessTimeOutlinedIcon color="secondary" />
                  {post.postDetails["Post.deadline"] ? (
                    <Typography variant="subtitle1" color="textSecondary" sx={{ ml: 1 }}>
                      Deadline trong{" "}
                      {moment(post.postDetails["Post.deadline"]).endOf("hours").fromNow() || "Cần xử lí trong hôm nay"}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle1" color="textSecondary" sx={{ ml: 1 }}>
                      Không có deadline cho vấn đề này
                    </Typography>
                  )}
                </div>

                {!isRegisterThisPost && !isSupportingThisPost && !isMyPost ? (
                  <Button
                    sx={{ fontSize: 12 }}
                    size="small"
                    color={"primary"}
                    variant={"contained"}
                    onClick={onRegisterPost}>
                    {"Đăng kí hỗ trợ"}
                  </Button>
                ) : (
                  <MoreVertRoundedIcon onClick={(e: any) => onOpenPopoverMenu(e)} />
                )}
              </div>
              <div className={classes.postTitleAndAction}>
                <Typography variant="h6">[ {post.postDetails["Post.title"]} ]</Typography>
              </div>

              <Typography variant="subtitle1" fontWeight={400} fontSize="1rem">
                {post.postDetails["Post.content"]}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Grid display="flex" alignItems="center" container spacing={1}>
                  {!isEmpty(postImages) &&
                    map(postImages, (image: string, index: number) => (
                      <Grid item xs={postImages.length > 1 ? 6 : 12}>
                        <img
                          key={index}
                          src={getImageUrl(image)}
                          alt=""
                          style={{ width: "100%", height: "100%", borderRadius: 4 }}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>
              {!isMyPost && userProfile && isRegisterThisPost && (
                <div className={classes.userPanel}>
                  <div className={classes.userNameAndAvatar}>
                    <div className={classes.userStats}>
                      <Avatar {...stringAvatar(userProfile.name)} className={classes.userAvatar} />
                      <div style={{ marginLeft: 16 }}>
                        <Typography sx={{ fontWeight: 600 }}>{userProfile.name}</Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
                          Được đánh giá: {userProfile.voteCount} lượt
                        </Typography>
                        {userProfile.rankPoint} <StarRoundedIcon sx={{ color: "gold" }} />
                      </div>
                    </div>
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
