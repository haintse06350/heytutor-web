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
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded";
import Feedback from "../Feedback/Feedback";

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
  const [openFeedback, setOpenFeedback] = useState(false);

  const [selectedSupporter, setSelectedSupporter]: any = React.useState(null);

  const [listRegister, setListRegister]: any = React.useState([]);
  const [listSupporter, setListSupporter]: any = React.useState([]);
  const [postStatus, setPostStatus]: any = React.useState(null);

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

  const onConfirmDone = async () => {
    setLoading(true);
    try {
      const res = await UserPost.requestDone(postId);
      if (res) {
        onCloseConfirmDone();
        setNotificationSuccess("???? x??c nh???n ho??n th??nh!");
        const post = await Post.getPostDetail(postId);
        setPost(post);
      }
    } catch (error) {
      setNotificationError("???? x???y ra l???i!");
    }
    setLoading(false);
  };

  const onCloseReportPost = () => {
    setRepostType("");
    onClosePopoverMenu();
  };

  const onClickFeedback = () => {
    setOpenFeedback(true);
    onClosePopoverMenu();
  };

  const onCloseFeedback = () => {
    setOpenFeedback(false);
    onClosePopoverMenu();
  };

  const getPostStatus = () => {
    switch (tab) {
      case "isActive": {
        return "Ch??a c?? ng?????i ????ng k??";
      }
      case "isConfirmed": {
        return "??ang trong qu?? tr??nh h??? tr???";
      }
      case "isPending": {
        return "??ang ch??? x??c nh???n";
      }
      case "isDone": {
        return "???? ho??n th??nh";
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
    setNotificationSuccess(`???? xo?? ${userSelected?.name} kh???i danh s??ch ng?????i ????ng k??`);
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
        setNotificationSuccess(`???? h???y h??? tr??? th??nh c??ng`);
        setOpenCancelSupportDialog(false);
        await fetchPostData(postId);
      } else {
        setNotificationError("Hu??? ????ng k?? th???t b???i!");
      }
    } catch (error) {
      setNotificationError("Hu??? ????ng k?? th???t b???i!");
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
      setNotificationSuccess(`???? ch???n ${userSelected?.name} l??m supporter cho v???n ????? n??y`);

      setListSupporter([...listSupporter, userSelected]);
      setListRegister(listRegister.filter((item: any) => item.id !== userSelected.id));
    } catch (error) {
      setNotificationError("C?? l???i x???y ra, vui l??ng th??? l???i sau");
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
          <MenuItem disabled={postStatus} key={"edit"} sx={{ typography: "body2", py: 1, px: 2.5 }}>
            <EditRoundedIcon
              sx={{
                mr: 1,
                width: 20,
                height: 20,
              }}
            />
            <Typography variant="subtitle2">Ch???nh s???a b??i vi???t</Typography>
          </MenuItem>
        )}
        {!isMyPost && (
          <MenuItem
            disabled={postStatus}
            key={"report"}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
            onClick={onReportPost}>
            <ReportGmailerrorredRoundedIcon
              sx={{
                mr: 1,
                width: 20,
                height: 20,
              }}
            />
            <Typography variant="subtitle2">B??o c??o b??i vi???t</Typography>
          </MenuItem>
        )}
        {(isMyPost || isSupportingThisPost) && (
          <MenuItem
            disabled={postStatus}
            key={"confirm"}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
            onClick={onRequestDone}>
            <DoneIcon
              sx={{
                mr: 1,
                width: 20,
                height: 20,
              }}
            />
            <Typography variant="subtitle2">X??c nh???n ho??n th??nh</Typography>
          </MenuItem>
        )}
        {!isMyPost && (
          <MenuItem
            disabled={postStatus}
            key={"cancel"}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
            onClick={onOpenCancelSupportDialog}>
            <CancelPresentationRoundedIcon
              sx={{
                mr: 1,
                width: 20,
                height: 20,
              }}
            />
            <Typography variant="subtitle2">
              {isSupportingThisPost ? "Hu??? h??? tr??? v???n ????? n??y" : "Hu??? ????ng k?? h??? tr???"}
            </Typography>
          </MenuItem>
        )}
        <MenuItem
          disabled={!postStatus}
          key={"feedback"}
          sx={{ typography: "body2", py: 1, px: 2.5 }}
          onClick={onClickFeedback}>
          <FeedbackRoundedIcon
            sx={{
              mr: 1,
              width: 20,
              height: 20,
            }}
          />
          <Typography variant="subtitle2">????nh gi??</Typography>
        </MenuItem>
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
        <Typography variant="subtitle1">B???n ??ang h??? tr??? cho</Typography>
        <Box sx={{ mt: 1 }}>
          <Box sx={{ p: 0.5 }} display="flex">
            <Avatar {...stringAvatar(post?.postDetails.user.name)} style={{ width: 30, height: 30, fontSize: 14 }} />
            <Box display="flex" flexDirection="column" flexGrow={1} sx={{ ml: 1 }}>
              <Typography variant="subtitle1" onClick={() => onClickProfile(post?.user.id)}>
                {post?.postDetails.user.name}
              </Typography>
              <Typography variant="caption">???? ho??n th??nh 4/5 giao d???ch</Typography>
              <Typography display="flex" alignItems="center" variant="caption">
                4.5 <StarRoundedIcon sx={{ color: "gold" }} /> / 5 votes
              </Typography>
            </Box>
            <Tooltip title="Trao ?????i">
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
        <Typography variant="subtitle1">Danh s??ch ng?????i h??? tr???</Typography>
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
                    {parseInt(sp.rankPoint)} <StarRoundedIcon sx={{ color: !sp.rankPoint ? "gray" : "gold" }} />
                  </Typography>
                </Box>
                <Tooltip title="Trao ?????i">
                  <QuestionAnswerIcon color="primary" onClick={() => onClickContactSupporter(sp)} />
                </Tooltip>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ mt: 1 }}>
            <img src={Help1} alt="demo" />
            <Typography variant="caption">
              Hi???n t???i b???n ch??a c?? ng?????i h??? tr??? cho v???n ????? n??y. Ch???n t??? danh s??ch nh???ng ng?????i ????ng k?? ????? t??m ng?????i ph??
              h???p h??? tr??? b???n !
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
            Danh s??ch ng?????i ????ng k?? h??? tr???
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            {listRegister.slice(0, 5).length} / {listRegister.length} ng?????i ????ng k??
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
                    {parseInt(register.rankPoint)}{" "}
                    <StarRoundedIcon sx={{ width: 20, color: !register.rankPoint ? "gray" : "gold" }} />
                  </Typography>
                </Box>
                {isMyPost && (
                  <Box>
                    <Tooltip title="Lo???i kh???i danh s??ch ????ng k??">
                      <Button
                        size="small"
                        sx={{ p: 0, minWidth: "fit-content" }}
                        onClick={() => onClickRemoveRegisterUser(register)}>
                        <BlockIcon color="error" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Ch???n ng?????i h??? tr???">
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
              Hi???n t???i b???n ch??a c?? ng?????i ????ng k?? h??? tr??? b???n cho v???n ?????n n??y. H??y ki??n nh???n th??m m???t ch??t n???a nh?? !
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

  useEffect(() => {
    if (post) {
      const requestDone = post?.postDetails?.requestDone;
      if (requestDone?.length === 2 || requestDone?.includes(user?.id)) {
        setPostStatus("done");
      }
      if (requestDone?.length === 1) {
        setPostStatus("half-done");
      }
    }
  }, [post]);

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
      <Feedback
        open={openFeedback}
        onClose={onCloseFeedback}
        userName={isMyPost ? post?.supporters[0].name : post?.postDetails.user.name}
        postId={post?.postDetails["Post.id"]}
        type={isMyPost ? 1 : 2}
        receiverId={isMyPost ? post?.supporters[0].id : post?.postDetails.user.id}
      />
      <ConfirmDialog
        dialogTitle="X??c nh???n hu??? h??? tr??? v???n ????? n??y ?"
        dialogContent={
          <Box>
            <Typography sx={{ fontWeight: 500 }}>
              B???n s??? kh??ng th??? ????ng k?? h??? tr??? b??i vi???t n??y n???u b???n ???? hu??? h??? tr??? !
            </Typography>
            <RadioGroup aria-labelledby="demo-customized-radios" name="customized-radios">
              <FormControlLabel
                classes={{ label: classes.formLabel }}
                value="no-reply"
                control={<Radio />}
                label="Ch??? b??i vi???t kh??ng tr??? l???i tin nh???n"
              />
              <FormControlLabel
                classes={{ label: classes.formLabel }}
                value="no-pay"
                control={<Radio />}
                label="T??i c?? vi???c b???n"
              />
              <FormControlLabel
                classes={{ label: classes.formLabel }}
                value="change-deal"
                control={<Radio />}
                label="Thay ?????i th?? lao kh??ng gi???ng tho??? thu???n ban ?????u"
              />
            </RadioGroup>
            <TextField multiline fullWidth rows={4} sx={{ mt: 2.5 }} placeholder="L?? do kh??c" />
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
        dialogTitle="Xo?? kh???i danh s??ch ng?????i ????ng k??"
        dialogContent={
          <Box>
            <Typography>
              B???n c?? ch???c ch???n mu???n lo???i <span style={{ fontWeight: "bold" }}>{userSelected?.name}</span> kh???i danh s??ch
              ????ng k???
            </Typography>
            <Typography variant="caption" sx={{ fontSize: 12 }}>
              <span style={{ fontWeight: "bold" }}>{userSelected?.name}</span> s??? kh??ng th??? ????ng k?? h??? tr??? v???n ????? n??y
              n???a !
            </Typography>
          </Box>
        }
        confirmAction={onConfirmRemoveRegister}
        cancelAction={onCloseRemoveDialog}
        open={openRemoveDialog}
        onClose={onCloseRemoveDialog}
      />
      <ConfirmDialog
        dialogTitle="X??c nh???n ch???n ng?????i h??? tr???"
        dialogContent={
          <Typography>
            B???n c?? ch???c ch???n mu???n ch???n <span style={{ fontWeight: "bold" }}>{userSelected?.name}</span> h??? tr??? v???n ?????
            n??y?
          </Typography>
        }
        confirmAction={onConfirmSupporter}
        cancelAction={onCloseConfirmRegister}
        open={openConfirmRegister}
        onClose={onCloseConfirmRegister}
        loadingConfirm={loading}
      />
      <ConfirmDialog
        dialogTitle={isMyPost ? "X??c nh???n ???? nh???n ???????c h??? tr???" : "X??c nh???n ho??n th??nh h??? tr???"}
        dialogContent={
          <Typography>
            X??c nh???n ho??n th??nh h??? tr??? v???n ????? n??y. V???n ????? ???????c t??nh l?? ho??n th??nh khi c??? 2 ng?????i ?????u x??c nh???n ho??n th??nh
          </Typography>
        }
        confirmAction={onConfirmDone}
        cancelAction={onCloseConfirmDone}
        open={onOpenConfirmDone}
        onClose={onCloseConfirmDone}
        loadingConfirm={loading}
      />
      <ConfirmDialog
        dialogTitle="Qu?? tr??nh trao ?????i"
        maxWidth="lg"
        dialogContent={
          <Box>
            <Box display="flex" justifyContent="space-around" sx={{ maxHeight: 400, overflowY: "scroll" }}>
              <ExchangeTimeLine selectedSupporter={selectedSupporter} isMyRequest={isMyRequest} />
              <div style={{ width: "1px", height: "100%" }} />
              {isMyRequest ? (
                <Box>
                  <TextField multiline fullWidth rows={4} placeholder="N???i dung y??u c???u" />
                  <Button variant="contained" sx={{ mt: 1, float: "right" }}>
                    G???i
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography>Upload c??u tr??? l???i</Typography>
                  <Box>
                    <Typography>
                      {
                        "B???n c?? th??? upload file ???nh ?????nh dang jpg, png ho???c t??i li???u ?????nh d???ng docx, pdf v???i dung l?????ng < 1MB"
                      }
                    </Typography>
                    <TextField
                      margin="dense"
                      id="link"
                      label="Link t??i li???u"
                      type="link"
                      fullWidth
                      variant="standard"
                    />
                    <Box sx={{ mt: 2 }} display="flex" alignItems="center" justifyContent="flex-start">
                      <Typography variant="subtitle1">Ho???c</Typography>
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
                T???p ????nh k??m
              </Typography>
              <Grid sx={{ mt: 1 }} container spacing={2}>
                <Grid display="flex" alignItems="center" item xs={12} sm={6} md={3}>
                  <Box display="flex" alignItems="center">
                    <img style={{ width: 40 }} src={JpgFile} alt="" />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
                        T??i li???u c??u 1
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: 12 }}>
                        100Kb - 1 ng??y tr?????c
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
                        T??i li???u c??u 2
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: 12 }}>
                        100Kb - 1 ng??y tr?????c
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
                        T??i li???u c??u 3
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: 12 }}>
                        100Kb - 1 ng??y tr?????c
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
                        T??i li???u c??u 4
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: 12 }}>
                        100Kb - 1 ng??y tr?????c
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
              title: from === "event" ? "S??? ki???n" : isMyPost ? "V???n ????? c???a t??i" : "V???n ????? ??i h??? tr???",
              href:
                from === "event"
                  ? `/event-detail?eventid=${eventId}`
                  : isMyPost
                  ? "/my-request"
                  : "/registered-request",
            },
          ]}
          current={{ title: "Chi ti???t" }}
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
                    <Typography variant="subtitle1">???? ????ng k?? h??? tr??? v???n ????? n??y</Typography>
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
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                {postStatus && (
                  <Typography
                    display="flex"
                    alignItems="center"
                    variant="caption"
                    color="primary"
                    sx={{ fontWeight: 500 }}>
                    {postStatus === "half-done" ? (
                      <DoneRoundedIcon color="primary" />
                    ) : (
                      <DoneAllRoundedIcon color="primary" />
                    )}
                    {postStatus === "half-done"
                      ? `???? x??c nh???n ho??n th??nh t??? ph??a ${isMyPost ? "b???n" : `${post?.supporters[0].name}`}`
                      : "???? x??c nh???n ho??n th??nh h??? tr??? v???n ?????"}
                  </Typography>
                )}
                {!postStatus && (
                  <div className={clsx(classes.postStatus, `${tab}`)}>
                    <Typography variant="caption">
                      {listSupporter?.length > 0 ? "??ang trong qu?? tr??nh h??? tr???" : getPostStatus()}
                    </Typography>
                  </div>
                )}
              </Box>
              <div className={classes.deadline}>
                <div>
                  <AccessTimeOutlinedIcon color="secondary" />
                  {post.postDetails["Post.deadline"] ? (
                    <Typography variant="subtitle1" color="textSecondary" sx={{ ml: 1 }}>
                      Deadline trong{" "}
                      {moment(post.postDetails["Post.deadline"]).endOf("hours").fromNow() || "C???n x??? l?? trong h??m nay"}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle1" color="textSecondary" sx={{ ml: 1 }}>
                      Kh??ng c?? deadline cho v???n ????? n??y
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
                    {"????ng k?? h??? tr???"}
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
                          ???????c ????nh gi??: {userProfile.voteCount} l?????t
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
                      <Typography variant="subtitle1">Qu?? tr??nh trao ?????i</Typography>
                      <Box className={classes.exchangeInfo} onClick={(e: any) => onOpenPopover(e)}>
                        i
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Tooltip title="M??? r???ng">
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
