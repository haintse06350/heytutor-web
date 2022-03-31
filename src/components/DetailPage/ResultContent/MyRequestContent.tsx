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
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
import CloseIcon from "@mui/icons-material/Close";
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

const FILTER_REGISTER = [
  {
    label: "Thời gian đăng kí",
    value: "registerTime",
  },
  {
    label: "Số lượng sao",
    value: "vote",
  },
  {
    label: "Tên",
    value: "name",
  },
];

export default function MyRequestContent(props: any) {
  const { tabValue, data } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openDialog, setOpenDialog]: any = React.useState(null);
  const [selectItem, setSelectItem] = React.useState<any>(null);
  const [userSelected, setUserSelected]: any = React.useState(null);
  const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false);
  const [selectedRegister, setSelectedRegister]: any = React.useState(null);
  const [sortListRegister, setSortListRegister] = React.useState("registerTime");
  const { onOpenMsgBox } = React.useContext(MsgCtx);
  const { setNotificationSuccess } = React.useContext(NotificationCtx);
  console.log(selectItem);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const onClickPostDetail = (postId: number) => {
    navigate(`/post-detail?postId=${postId}&tab=${tabValue}&from=my-request`);
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
    setOpenDialog(true);
    setSelectItem(item);
  };

  const onOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const onCloseMenu = (event: SelectChangeEvent) => {
    setAnchorEl(null);
  };

  const onChangeSort = (event: SelectChangeEvent) => {
    setSortListRegister(event.target.value as string);
  };

  const isNearDeadline = (deadline: string) => {
    if (deadline.includes("giờ")) {
      return true;
    }
  };

  const onOpenMsg = (user: any) => {
    onOpenMsgBox();
    setOpenDialog(false);
    setOpenRemoveDialog(false);
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
                  <span style={{ fontWeight: 600 }}>và {listUsers?.length - 2} người khác </span>
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

  const renderDialogData = () => {
    switch (tabValue) {
      case "isActive":
        return { dialogTitle: "Danh sách người hỗ trợ", dialogData: selectItem?.supporterUsers };
      case "isPending":
        return { dialogTitle: "Danh sách người đăng ký", dialogData: selectItem?.registerUsers };
      default:
        return { dialogTitle: "", dialogData: [] };
    }
  };

  const renderButton = (user: any) => {
    if (tabValue === "isActive") {
      return (
        <Button onClick={() => onOpenMsg(user)}>
          <ChatRoundedIcon />
        </Button>
      );
    } else if (tabValue === "isPending") {
      return (
        <Box>
          <Tooltip title="Loại người này khỏi danh sách đăng kí">
            <Button color="secondary" onClick={() => onClickRemoveRegisterUser()}>
              <PersonRemoveIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Chọn người này làm supporter">
            <Button
              onClick={() => (selectedRegister?.id === user.id ? onOpenMsg(user) : onClickAcceptRegisterUser(user))}>
              {selectedRegister?.id === user.id ? <ChatRoundedIcon /> : <AddTaskIcon />}
            </Button>
          </Tooltip>
        </Box>
      );
    }
  };

  const renderSupporterRegisterDialog = () => {
    const { dialogTitle, dialogData } = renderDialogData();

    return (
      <Dialog maxWidth="sm" fullWidth open={openDialog} onClose={onCloseDialog}>
        <DialogTitle classes={{ root: classes.dialogTitle }}>
          {dialogTitle}
          <CloseIcon onClick={onCloseDialog} />
        </DialogTitle>
        <Typography className={classes.postTitleOnDialog} noWrap onClick={() => onClickPostDetail(selectItem?.id)}>
          {selectItem?.postData.title}
        </Typography>

        <DialogContent sx={{ px: 3, pt: 1, pb: 3 }} dividers>
          <Box className={classes.topRegister}>
            <Typography variant="subtitle2" sx={{ fontSize: 14, fontWeight: 500 }}>
              Top 5
            </Typography>
            <FormControl sx={{ width: 1 / 3 }}>
              <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
              <Select
                classes={{ select: classes.selectRoot }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortListRegister}
                defaultValue="Thời gian đăng kí"
                onChange={onChangeSort}>
                {FILTER_REGISTER.map((filter: any, index: number) => (
                  <MenuItem sx={{ fontSize: 12 }} key={index} value={filter.value}>
                    {filter.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {map(dialogData?.slice(0, 5), (user: any, idx: number) => (
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
              {renderButton(user)}
            </Box>
          ))}
        </DialogContent>
        {dialogData?.length > 5 && (
          <DialogActions>
            <Button autoFocus>Xem tất cả {dialogData?.length} người</Button>
          </DialogActions>
        )}
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
      {renderSupporterRegisterDialog()}
      {renderConfirmRemoveDialog()}
      <div className={classes.resultCountAndDisplayOption}>
        <Typography variant="subtitle1">
          Hiển thị <b style={{ fontSize: "1.25rem", padding: "0 3px" }}>{data?.length}</b> kết quả
        </Typography>
      </div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {map(data, (item: any, index: number) => (
          <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
            <Card className={clsx(classes.item, selectItem?.id === item.id && classes.activeCard)}>
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
