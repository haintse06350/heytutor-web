import React, { useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import MenuPopover from "./MenuPopover";
import Scrollbar from "./Scrollbar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Notification as NotiModel } from "../../models/notification";
import { stringAvatar } from "../UserProfile/helper";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { map } from "lodash";
import moment from "moment";
import "moment/locale/vi";

// ----------------------------------------------------------------------

const translateDescription = (notification: any) => {
  switch (notification.notificationType) {
    case "accept_register":
      return "đã chấp nhận yêu cầu hỗ trợ của bạn";
    case "new_message":
      return `đã gửi tin nhắn cho bạn trong vấn đề #${notification.postId}`;
    case "cancel_register":
      return `đã huỷ yêu cầu hỗ trợ`;
    case "request_register":
      return `đã gửi yêu cầu hỗ trợ cho bạn`;
    case "request_done":
      return `đã xác nhận hoàn thành yêu cầu hỗ trợ`;
  }
};

const renderContent = (notification: any) => {
  const title = (
    <Typography variant="subtitle2">
      {notification.fromUsername}
      <Typography component="span" variant="body2" sx={{ color: "text.secondary" }}>
        &nbsp; {translateDescription(notification)}
      </Typography>
    </Typography>
  );

  if (notification.notificationType === "accept_register") {
    return {
      icon: <CheckOutlinedIcon />,
      title,
    };
  }
  if (notification.notificationType === "order_shipped") {
    return {
      icon: <AccessTimeOutlinedIcon />,
      title,
    };
  }

  return {
    avatar: <Avatar src="" />,
    title,
    icon: <NotificationsNoneOutlinedIcon />,
  };
};

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications]: any = useState(null);
  const navigate = useNavigate();

  const totalUnRead = notifications?.filter((item: any) => item.status === "unread").length;
  moment.locale("vi");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = async () => {
    setNotifications(
      notifications.map((notification: any) => ({
        ...notification,
        status: "read",
      }))
    );

    const unreadNoti = notifications.filter((notification: any) => notification.status === "unread");

    await Promise.all(
      map(unreadNoti, async (n: any) => {
        return NotiModel.readNotification({ notiId: n.id });
      })
    );
  };

  const listNotifications = async () => {
    const res = await NotiModel.listNotification();
    setNotifications(res);
  };

  const onClickNotification = async (notiId: number, postId: number) => {
    const updatedNoti = map(notifications, (n: any) => {
      if (n.id === notiId) {
        n.status = "read";
      }
      return n;
    });
    setNotifications(updatedNoti);
    setOpen(false);
    NotiModel.readNotification({ notiId });
    navigate(`/post-detail?postId=${postId}&from=notification`);
  };

  const NotificationItem = ({ notification }: any) => {
    return (
      <ListItemButton
        disableGutters
        sx={{
          py: 1.5,
          px: 2.5,
          mt: "1px",
          ...(notification.status === "unread" && {
            bgcolor: "action.selected",
          }),
        }}
        onClick={() => onClickNotification(notification.id, notification.postId)}>
        <ListItemAvatar>
          <Avatar {...stringAvatar(notification.fromUsername)} />
        </ListItemAvatar>
        <ListItemText
          primary={renderContent(notification).title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.disabled",
              }}>
              {renderContent(notification).icon} {moment(notification.createdAt).fromNow()}
            </Typography>
          }
        />
      </ListItemButton>
    );
  };

  React.useEffect(() => {
    // setInterval(() => {
    listNotifications();
    // }, 2000);
  }, []);

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}>
        <Badge badgeContent={totalUnRead} color="error">
          <NotificationsIcon color="primary" />
        </Badge>
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 360 }}>
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Thông báo</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Bạn có {totalUnRead} thông báo chưa đọc
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title="Đánh dấu đã đọc">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <DoneAllOutlinedIcon color="primary" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: "overline" }}>
                Mới
              </ListSubheader>
            }>
            {notifications?.slice(0, 2).map((notification: any) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          {notifications?.length > 0 && (
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: "overline" }}>
                  Trước đây
                </ListSubheader>
              }>
              {notifications?.slice(2, 4).map((notification: any) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </List>
          )}
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple component={RouterLink} to="#">
            Xem tất cả
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
