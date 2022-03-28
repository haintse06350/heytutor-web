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
} from "@mui/material";
import { map, countBy, isEmpty, keys } from "lodash";
import * as React from "react";
import { useStyles } from "./ResultContent.style";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { stringAvatar } from "../../UserProfile/helper";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
// import { renderCardImg } from "../utils";
// import moment from "moment";
// import SendRoundedIcon from "@mui/icons-material/SendRounded";
import moment from "moment";
import "moment/locale/vi";
import clsx from "classnames";
import { MessageBox } from "../../MessageBox/MessageBox";
import { MsgCtx } from "../../../context/message/message";
import { useNavigate } from "react-router-dom";

export default function MyRequestContent(props: any) {
  const { tabValue, data } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState<any>(null);
  const [userSelected, setUserSelected]: any = React.useState(null);
  const { onOpenMsgBox } = React.useContext(MsgCtx);

  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const onClickPostDetail = (postId: number) => {
    navigate(`/post-detail?postId=${postId}&tab=${tabValue}`);
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
  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderStarCount = (listRegister: any) => {
    const groupUserByRating = countBy(listRegister, (user: any) => Math.round(user.rankPoint));
    const starCount = keys(groupUserByRating);

    if (!isEmpty(starCount)) {
      return (
        <div className={classes.starCount}>
          {map(starCount, (count: string) => {
            return (
              <div key={count} className={classes.starCountItem}>
                {parseInt(count) === 0 && <StarBorderRoundedIcon sx={{ color: "#94a4c4", width: 16 }} />}
                {map(Array.from(new Array(parseInt(count))), (o: number, index: number) => (
                  <StarRoundedIcon key={`${o}-${index}`} sx={{ color: "#94a4c4", width: 16 }} />
                ))}
                <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5, ml: 1 }}>
                  : {groupUserByRating[count]}
                </Typography>
              </div>
            );
          })}
        </div>
      );
    }
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

  const renderRegisterAndSupporter = (item: any) => {
    if (tabValue === "isActive") {
      const supporterNames = map(item.supporterUsers, (user: any) => {
        return user.username;
      });

      return (
        <div className={classes.listSupporter}>
          {supporterNames?.length <= 2 ? (
            <Typography
              variant="subtitle2"
              sx={{ mr: 0.5, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
              onClick={() => onClickOpenListRegister(item)}>
              {map(supporterNames, (username: string) => (
                <span style={{ fontWeight: 900 }}>{username}</span>
              ))}{" "}
              hỗ trợ bạn vấn đề này
            </Typography>
          ) : (
            <>
              {
                <Typography
                  variant="subtitle2"
                  sx={{ mr: 0.5, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
                  onClick={() => onClickOpenListRegister(item)}>
                  {map(supporterNames.slice(0, 2), (username: string, index: number) => (
                    <span style={{ fontWeight: 900 }}>
                      {username} {index === 0 ? ", " : ""}
                    </span>
                  ))}
                  <span style={{ fontWeight: 900 }}>và {supporterNames.length - 2} người khác </span>
                  hỗ trợ bạn vấn đề này
                </Typography>
              }
            </>
          )}
        </div>
      );
    }
  };

  const renderRegisterUserDialog = () => {
    return (
      <Dialog maxWidth="sm" fullWidth open={openDialog} onClose={onCloseDialog}>
        <DialogTitle>Danh sách người đăng kí hỗ trợ</DialogTitle>
        <DialogContent>
          {map(selectItem?.supporterUsers, (user: any, idx: number) => (
            <Box display="flex" key={idx} sx={{ py: 1, cursor: "pointer" }}>
              <Avatar {...stringAvatar(user.username)} alt="" />
              <Box sx={{ ml: 1, flexGrow: 1 }}>
                <Typography variant="subtitle2" sx={{ fontSize: 14, lineHeight: 1.5 }}>
                  {user.username}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography variant="subtitle2" sx={{ fontSize: 14, lineHeight: 1.5 }}>
                    {user.rankPoint}
                  </Typography>
                  <StarRoundedIcon sx={{ color: "gold", width: 16 }} />
                  <Typography variant="subtitle2" sx={{ fontSize: 14, lineHeight: 1.5 }}>
                    / {user.voteCount} votes
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

  return (
    <Box sx={{ mt: 2 }}>
      {renderRegisterUserDialog()}
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
                <div className={classes.userPostAvatar}>
                  {renderRegisterAndSupporter(item)} {tabValue === "isPending" && renderStarCount(item.registerUsers)}
                </div>
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
