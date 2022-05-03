import {
  Typography,
  Grid,
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
import "moment/locale/vi";
import { MessageBox } from "../../MessageBox/MessageBox";
import { MsgCtx } from "../../../context/message/message";
import { useNavigate } from "react-router-dom";
import { NotificationCtx } from "../../../context/notification/state";
import { ConfirmDialog } from "../../Common/ConfirmDialog/ConfirmDialog";
import { UserPost } from "../../../models/user-post";
import { ListPost } from "./ListPost";
import { EditPost } from "./EditPost";

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
  const { tabValue, data, setData } = props;
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
  const [editedPost, setEditedPost] = React.useState<any>(null);

  const [openEdit, setOpenEdit] = React.useState(false);
  console.log("data", data);
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

  const onConfirmRemoveRegister = async () => {
    try {
      setLoading(true);
      await UserPost.removeRegister({ postId: selectItem.postId, registerId: userSelected.id });
      setSelectedRegister(userSelected);
      setOpenBlockDialog(false);
      const newListRegisterUser = selectItem.registerUsers.filter((item: any) => item.id !== userSelected.id);
      if (newListRegisterUser.length === 0) {
        setOpenListRegisterDialog(false);
      }
      const updatedItem = { ...selectItem, registerUsers: newListRegisterUser };
      setSelectItem(updatedItem);
      setNotificationSuccess(`Đã xoá ${userSelected?.username} khỏi danh sách người đăng kí`);
    } catch (error) {
      console.log(error);
      setNotificationError("Có lỗi xảy ra, vui lòng thử lại sau");
    }
    setLoading(false);
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

  const onOpenMenu = (event: any, item: any) => {
    setAnchorEl(event.currentTarget);
    setSelectItem(item);
  };

  const onCloseMenu = (event: SelectChangeEvent) => {
    setAnchorEl(null);
    setSelectItem(null);
  };

  const onChangeSort = (event: SelectChangeEvent) => {
    setSortListRegister(event.target.value as string);
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
      await UserPost.addSupporter({ postId: selectItem.postId, registerId: userSelected.id });
      setOpenConfirmRegister(false);
      setOpenListRegisterDialog(false);
      setSelectedRegister(userSelected);
      navigate(`/post-detail?postId=${selectItem.postId}&tab=isActive&from=my-request`);
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

    const renderPostStatus = () => {
      if (tabValue === "isOnEvent") {
        return "Đang trong sự kiện";
      }
      if (tabValue === "isConfirmed") {
        return "hỗ trợ bạn vấn đề này";
      } else if (tabValue === "isActive" && listUsers?.length > 0) {
        return "đăng ký hỗ trợ";
      } else if (tabValue === "isPending") {
        return "chưa có người đăng ký hỗ trợ";
      } else if (tabValue === "isDone") {
        return "đã hoàn thành";
      }
    };

    return (
      <div className={classes.listSupporter} onClick={() => listUsers?.length > 0 && onClickOpenListRegister(item)}>
        <div className={classes.listSupporterTitle}>
          {listUsers?.length <= 2 ? (
            <Typography
              variant="subtitle2"
              sx={{
                mr: 1,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                textDecoration: tabValue === "isOnEvent" ? "underline" : "none",
              }}
              onClick={() => tabValue === "isOnEvent" && navigate(`/event-detail?eventid=${item.eventId}`)}>
              {map(listUsers, (username: string) => (
                <span style={{ fontWeight: 600 }}>{username}</span>
              ))}{" "}
              {renderPostStatus()}
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
        {listUsers?.length > 0 && (
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{ minWidth: 50, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
            Xem chi tiết
          </Typography>
        )}
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
        <Typography className={classes.postTitleOnDialog} noWrap onClick={() => onClickPostDetail(selectItem?.postId)}>
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
            <Button autoFocus onClick={() => onClickPostDetail(selectItem?.postId)}>
              Xem tất cả {dialogData?.length} người
            </Button>
          </DialogActions>
        )}
      </Dialog>
    );
  };

  React.useEffect(() => {
    if (editedPost) {
      data?.map((item: any) => {
        if (item.id === editedPost.id) {
          item.postData = editedPost;
        }
        return item;
      });
      setData(data);
      setAnchorEl(null);
      setSelectItem(null);
    }
  }, [editedPost]);

  return (
    <Box sx={{ mt: 2 }}>
      {renderSupporterRegisterDialog()}
      <EditPost
        openDialog={openEdit}
        onCloseDialog={() => setOpenEdit(false)}
        post={selectItem}
        setEditedPost={setEditedPost}
      />
      <ConfirmDialog
        dialogTitle="Xoá khỏi danh sách người đăng kí"
        dialogContent="Bạn có chắc chắn muốn loại người này khỏi danh sách đăng kí?"
        confirmAction={onConfirmRemoveRegister}
        cancelAction={onCloseRemoveDialog}
        open={openBlockDialog}
        onClose={onCloseRemoveDialog}
        loadingConfirm={loading}
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
        <ListPost
          data={data}
          onClickPostDetail={onClickPostDetail}
          selectItem={selectItem}
          onOpenMenu={onOpenMenu}
          renderRegisterAndSupporter={renderRegisterAndSupporter}
        />
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
            <Typography variant="subtitle2" sx={{ py: 0.5, px: 2 }} onClick={() => setOpenEdit(true)}>
              Chỉnh sửa
            </Typography>
          </Box>
        </Popover>
        <MessageBox postId={selectItem?.postId} userId={userSelected?.id} userName={userSelected?.username} />
      </Grid>
    </Box>
  );
}
