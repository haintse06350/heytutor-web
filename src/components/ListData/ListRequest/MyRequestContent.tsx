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
// import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import BlockIcon from "@mui/icons-material/Block";
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
import { ConfirmDialog } from "../../Common/ConfirmDialog/ConfirmDialog";
import { UserPost } from "../../../models/user-post";

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
  const [openListRegisterDialog, setOpenListRegisterDialog]: any = React.useState(false);
  const [selectItem, setSelectItem] = React.useState<any>(null);
  const [userSelected, setUserSelected]: any = React.useState(null);
  const [openBlockDialog, setOpenBlockDialog] = React.useState(false);
  const [openConfirmRegister, setOpenConfirmRegister] = React.useState(false);
  const [selectedRegister, setSelectedRegister]: any = React.useState(null);
  const [sortListRegister, setSortListRegister] = React.useState("registerTime");
  const [loading, setLoading] = React.useState(false);

  const { onOpenMsgBox } = React.useContext(MsgCtx);
  const { setNotificationSuccess, setNotificationError } = React.useContext(NotificationCtx);

  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const onClickPostDetail = (postId: number) => {
    navigate(`/post-detail?postId=${postId}&tab=${tabValue}&from=my-request`);
  };

  const onCloseRemoveDialog = () => {
    setOpenBlockDialog(false);
  };

  const onCloseConfirmRegister = () => {
    setUserSelected(null);
    setOpenConfirmRegister(false);
  };

  const onConfirmRemoveRegister = () => {
    setNotificationSuccess(`Đã xoá ${userSelected?.username} khỏi danh sách người đăng kí`);
    setOpenBlockDialog(false);
  };

  const onClickRemoveRegisterUser = (user: any) => {
    setUserSelected(user);
    setOpenBlockDialog(true);
  };

  const onClickConfirmRegister = (user: any) => {
    setUserSelected(user);
    setOpenConfirmRegister(true);
  };

  const onCloseDialog = () => {
    setOpenListRegisterDialog(false);
    setSelectItem(null);
  };

  const onClickOpenListRegister = (item: any) => {
    setOpenListRegisterDialog(true);
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
    if (deadline.includes("giờ") || deadline.includes("phút")) {
      return true;
    }
  };

  const onOpenMsg = (user: any) => {
    onOpenMsgBox();
    setOpenListRegisterDialog(false);
    setOpenBlockDialog(false);
    setUserSelected(user);
  };

  const onConfirmSupporter = async () => {
    try {
      setLoading(true);
      await UserPost.addSupporter({ postId: selectItem.id, registerId: userSelected.id });
      setOpenConfirmRegister(false);
      setOpenListRegisterDialog(false);
      setSelectedRegister(userSelected);
      setNotificationSuccess(`Đã chọn ${userSelected?.username} làm supporter cho vấn đề này`);
    } catch (error) {
      setNotificationError("Có lỗi xảy ra, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const renderRegisterAndSupporter = (item: any) => {
    let listUsers = [];
    if (tabValue === "isConfirmed") {
      listUsers = map(item.supporterUsers, (user: any) => {
        return user.username;
      });
    } else if (tabValue === "isActive" || tabValue === "isPending") {
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
          Xem chi tiết
        </Typography>
      </div>
    );
  };

  const renderDialogData = () => {
    switch (tabValue) {
      case "isConfirmed":
        return { dialogTitle: "Danh sách người hỗ trợ", dialogData: selectItem?.supporterUsers };
      case "isActive":
        return { dialogTitle: "Danh sách người đăng ký", dialogData: selectItem?.registerUsers };
      default:
        return { dialogTitle: "", dialogData: [] };
    }
  };

  const renderButton = (user: any) => {
    if (tabValue === "isConfirmed") {
      return (
        <Button onClick={() => onOpenMsg(user)}>
          <ChatRoundedIcon />
        </Button>
      );
    } else if (tabValue === "isActive") {
      return (
        <Box>
          <Tooltip title="Loại người này khỏi danh sách đăng kí">
            <Button color="error" onClick={() => onClickRemoveRegisterUser(user)}>
              <BlockIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Chọn người này làm supporter">
            <Button onClick={() => (selectedRegister?.id === user.id ? onOpenMsg(user) : onClickConfirmRegister(user))}>
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
      <Dialog maxWidth="sm" fullWidth open={openListRegisterDialog} onClose={onCloseDialog}>
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
            <Button autoFocus onClick={() => onClickPostDetail(selectItem?.id)}>
              Xem tất cả {dialogData?.length} người
            </Button>
          </DialogActions>
        )}
      </Dialog>
    );
  };

  return (
    <Box sx={{ mt: 2 }}>
      {renderSupporterRegisterDialog()}
      <ConfirmDialog
        dialogTitle="Xoá khỏi danh sách người đăng kí"
        dialogContent="Bạn có chắc chắn muốn loại người này khỏi danh sách đăng kí?"
        confirmAction={onConfirmRemoveRegister}
        cancelAction={onCloseRemoveDialog}
        open={openBlockDialog}
        onClose={onCloseRemoveDialog}
      />
      <ConfirmDialog
        dialogTitle="Xác nhận chọn người hỗ trợ"
        dialogContent={`Bạn có chắc chắn muốn chọn ${userSelected?.username} hỗ trợ cho vấn đề này?`}
        confirmAction={onConfirmSupporter}
        cancelAction={onCloseConfirmRegister}
        open={openConfirmRegister}
        onClose={onCloseConfirmRegister}
        loadingConfirm={loading}
      />
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
                  <Typography variant="subtitle1" noWrap onClick={() => onClickPostDetail(item.id)}>
                    {item.postData.title}
                  </Typography>
                  <Typography variant="caption" noWrap>
                    Bài đăng từ {moment(item.createdAt).format("DD/MM")}
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
        <MessageBox postId={selectItem?.postId} userId={userSelected?.id} userName={userSelected?.username} />
      </Grid>
    </Box>
  );
}
