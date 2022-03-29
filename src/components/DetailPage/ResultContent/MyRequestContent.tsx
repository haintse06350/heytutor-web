import {
  Divider,
  Typography,
  Grid,
  Card,
  Popover,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Button,
  Tooltip,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { map } from "lodash";
import * as React from "react";
import { useStyles } from "./ResultContent.style";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { stringAvatar } from "../../UserProfile/helper";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import { renderCardImg } from "../utils";
// import moment from "moment";
// import SendRoundedIcon from "@mui/icons-material/SendRounded";
import moment from "moment";
import "moment/locale/vi";
import clsx from "classnames";
import { MessageBox } from "../../MessageBox/MessageBox";
import { MsgCtx } from "../../../context/message/message";
import { useNavigate } from "react-router-dom";
import { NotificationCtx } from "../../../context/notification/state";

export default function MyRequestContent(props: any) {
  const { tabValue, data } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openDialog, setOpenDialog]: any = React.useState(null);
  const [selectItem, setSelectItem] = React.useState<any>(null);
  const [userSelected, setUserSelected]: any = React.useState(null);
  const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false);
  const [selectedRegister, setSelectedRegister]: any = React.useState(null);
  const { onOpenMsgBox } = React.useContext(MsgCtx);
  const { setNotificationSuccess } = React.useContext(NotificationCtx);

  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const onClickPostDetail = (postId: number) => {
    navigate(`/post-detail?postId=${postId}&tab=${tabValue}`);
  };

  const onCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
  };

  const onConfirmRemoveRegister = () => {
    setNotificationSuccess(`Đã xoá ${selectedRegister?.username} khỏi danh sách người đăng kí`);
    setOpenRemoveDialog(false);
  };

  const onClickRemoveRegisterUser = () => {
    setOpenRemoveDialog(true);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
    setSelectItem(null);
  };

  const onClickOpenListRegister = (item: any) => {
    setOpenDialog(tabValue === "isActive" ? "listSupport" : "listRegister");
    setSelectItem(item);
  };

  const onOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const isNearDeadline = (deadline: string) => {
    if (deadline.includes("giờ")) {
      return true;
    }
  };

  const onOpenMsg = (user: any) => {
    onOpenMsgBox();
    setOpenDialog(false);
    setUserSelected(user);
  };

  const onClickAcceptRegisterUser = (user: any) => {
    setSelectedRegister(user);
    setNotificationSuccess(`Đã chọn ${user.username} làm supporter cho vấn đề này`);
  };

  const renderRegisterAndSupporter = (item: any) => {
    let listUsers = [];
    if (tabValue === "isActive") {
      listUsers = map(item.supporterUsers, (user: any) => {
        return user.username;
      });
    } else if (tabValue === "isPending") {
      listUsers = map(item.registerUsers, (user: any) => {
        return user.username;
      });
    }

    return (
      <div className={classes.listSupporter} onClick={() => onClickOpenListRegister(item)}>
        <div className={classes.listSupporterTitle}>
          {listUsers?.length <= 2 ? (
            <Typography variant="subtitle2" sx={{ mr: 1, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              {map(listUsers, (username: string) => (
                <span style={{ fontWeight: 600 }}>{username}</span>
              ))}{" "}
              {tabValue === "isActive" ? "hỗ trợ bạn vấn đề này" : tabValue === "isPending" ? "đăng ký hỗ trợ" : ""}
            </Typography>
          ) : (
            <>
              {
                <Typography variant="subtitle2" sx={{ mr: 0.5, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                  {map(listUsers.slice(0, 2), (username: string, index: number) => (
                    <span style={{ fontWeight: 600 }}>
                      {username} {index === 0 ? ", " : ""}
                    </span>
                  ))}
                  <span style={{ fontWeight: 600 }}>và {listUsers.length - 2} người khác </span>
                  {tabValue === "isActive" ? "hỗ trợ bạn vấn đề này" : tabValue === "isPending" ? "đăng ký hỗ trợ" : ""}
                </Typography>
              }
            </>
          )}
        </div>
        <Typography
          variant="subtitle2"
          color="primary"
          sx={{ minWidth: 50, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
          Chi tiết
        </Typography>
      </div>
    );
  };

  const renderSupporterUserDialog = () => {
    return (
      <Dialog maxWidth="sm" fullWidth open={openDialog === "listSupport"} onClose={onCloseDialog}>
        <DialogTitle>Danh sách người hỗ trợ</DialogTitle>
        <DialogContent>
          {map(selectItem?.supporterUsers, (user: any, idx: number) => (
            <Box display="flex" key={idx} sx={{ py: 1, cursor: "pointer" }}>
              <Avatar {...stringAvatar(user.username)} alt="" />
              <Box sx={{ ml: 1, flexGrow: 1 }}>
                <Typography variant="subtitle2" sx={{ fontSize: 14, lineHeight: 1.5 }}>
                  {user.username}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography variant="subtitle2" sx={{ fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>
                    {user.rankPoint}
                  </Typography>
                  <StarRoundedIcon sx={{ color: "gold", width: 16 }} />
                  <Typography variant="subtitle2" sx={{ fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>
                    / {user.voteCount} votes&nbsp;
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: 12, lineHeight: 1.5, fontWeight: 500, color: "secondary" }}>
                    | đã hoàn thành {Math.floor(Math.random() * 6) + 1} lần hỗ trợ
                  </Typography>
                </Box>
              </Box>
              <Button onClick={() => onOpenMsg(user)}>
                <ChatRoundedIcon />
              </Button>
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    );
  };

  const renderRegisterUserDialog = () => {
    return (
      <Dialog maxWidth="sm" fullWidth open={openDialog === "listRegister"} onClose={onCloseDialog}>
        <DialogTitle>Danh sách người đăng kí hỗ trợ</DialogTitle>
        <DialogContent>
          {map(selectItem?.registerUsers, (user: any, idx: number) => (
            <Box display="flex" key={idx} sx={{ py: 1, cursor: "pointer" }}>
              <Avatar {...stringAvatar(user.username)} alt="" />
              <Box sx={{ ml: 1, flexGrow: 1 }}>
                <Typography variant="subtitle2" sx={{ fontSize: 14, lineHeight: 1.5 }}>
                  {user.username}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography variant="subtitle2" sx={{ fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>
                    {user.rankPoint}
                  </Typography>
                  <StarRoundedIcon sx={{ color: "gold", width: 16 }} />
                  <Typography variant="subtitle2" sx={{ fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>
                    / {user.voteCount} votes &nbsp;
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: 12, lineHeight: 1.5, fontWeight: 500, color: "secondary" }}>
                    | đã hoàn thành {Math.floor(Math.random() * 6) + 1} lần hỗ trợ
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Tooltip title="Loại người này khỏi danh sách đăng kí">
                  <Button color="secondary" onClick={() => onClickRemoveRegisterUser()}>
                    <PersonRemoveIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Chọn người này làm supporter">
                  <Button onClick={() => onClickAcceptRegisterUser(user)}>
                    {selectedRegister?.id === user.id ? <AddTaskIcon /> : <PersonAddAlt1Icon />}
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    );
  };

  const renderConfirmRemoveDialog = () => {
    return (
      <Dialog
        open={openRemoveDialog}
        onClose={onCloseRemoveDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Xoá khỏi danh sách người đăng kí</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn loại người này khỏi danh sách đăng kí?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseRemoveDialog}>Đóng</Button>
          <Button onClick={onConfirmRemoveRegister} autoFocus>
            Chắc chắn
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ mt: 2 }}>
      {renderSupporterUserDialog()}
      {renderRegisterUserDialog()}
      {renderConfirmRemoveDialog()}
      <div className={classes.resultCountAndDisplayOption}>
        <Typography variant="subtitle1">
          Hiển thị <b style={{ fontSize: "1.25rem", padding: "0 3px" }}>{data?.length}</b> kết quả
        </Typography>
      </div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {map(data, (item: any, index: number) => (
          <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
            <Card className={classes.item}>
              <div className={classes.cardHeader}>
                <div className={classes.postTitle}>
                  <Typography variant="subtitle1" noWrap onClick={() => onClickPostDetail(item.postData.id)}>
                    {item.postData.title}
                  </Typography>
                  <Typography variant="caption" noWrap>
                    {moment(item.postData.createdAt).format("DD/MM")}
                  </Typography>
                  <div className={classes.dueDate}>
                    <AccessTimeOutlinedIcon
                      sx={{
                        color: isNearDeadline(moment(item.postData.deadline).endOf("hours").fromNow())
                          ? "#d32f2f"
                          : "#94a4c4",
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      className={clsx(
                        classes.deadline,
                        isNearDeadline(moment(item.postData.deadline).endOf("hours").fromNow()) && classes.nearDeadline
                      )}>
                      Đến hạn cần giải quyết trong {moment(item.postData.deadline).endOf("hours").fromNow()}
                    </Typography>
                  </div>
                </div>
                <div>
                  <MoreVertRoundedIcon onClick={onOpenMenu} />
                </div>
              </div>
              <div className={classes.cardContent}>
                <Divider />
                <div className={classes.userPostAvatar}>{renderRegisterAndSupporter(item)}</div>
              </div>
            </Card>
          </Grid>
        ))}
        <Popover
          open={openMenu}
          anchorEl={anchorEl}
          onClose={onCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}>
          <Box
            className={classes.actions}
            sx={{ display: "flex", alignItems: "center", flexDirection: "column", py: 1, px: 1 }}>
            <Typography variant="subtitle2" sx={{ py: 0.5, px: 2 }}>
              Chỉnh sửa
            </Typography>
            <Typography variant="subtitle2" sx={{ py: 0.5, px: 2 }}>
              Cập nhật trạng thái
            </Typography>
          </Box>
        </Popover>
        <MessageBox
          postId={selectItem?.postId}
          postTitle={selectItem?.postData.title}
          userId={userSelected?.id}
          userName={userSelected?.username}
        />
      </Grid>
    </Box>
  );
}
