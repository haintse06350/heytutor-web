import { Box, Typography, Grid, Card, Popover, Divider, Avatar, Tooltip, CircularProgress } from "@mui/material";
import { map } from "lodash";
import React from "react";
import { useStyles } from "./ResultContent.style";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ConnectWithoutContactRoundedIcon from "@mui/icons-material/ConnectWithoutContactRounded";
import LibraryAddCheckRoundedIcon from "@mui/icons-material/LibraryAddCheckRounded";
import { stringAvatar } from "../../UserProfile/helper";
import { useNavigate } from "react-router-dom";
import NewMessageIcon from "../../../assets/new-message.svg";
import moment from "moment";
import "moment/locale/vi";
// import { sortBy } from "lodash";
import clsx from "classnames";
import { MsgCtx } from "../../../context/message/message";
import { MessageBox } from "../../MessageBox/MessageBox";
import ViewComfyRoundedIcon from "@mui/icons-material/ViewComfyRounded";
import HorizontalSplitRoundedIcon from "@mui/icons-material/HorizontalSplitRounded";
import EmptyIllustrations from "../../../assets/illustrations/library.svg";
import { ConfirmDialog } from "../../Common/ConfirmDialog/ConfirmDialog";
import { UserPost } from "../../../models/user-post";
import { NotificationCtx } from "../../../context/notification/state";
import { ReportDialog } from "./ReportDialog";

export default function RegisterContent(props: any) {
  const { data, tab, loading } = props;
  const classes = useStyles();
  const [openPostMenu, setOpenPostMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [toggleItem, setToggleItem]: any = React.useState(false);
  const [listPost, setListPost]: any = React.useState(null);
  const { onOpenMsgBox, onCloseMsgBox } = React.useContext(MsgCtx);
  const { setNotificationSuccess, setNotificationError } = React.useContext(NotificationCtx);

  const [itemClicked, setItemClicked]: any = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState("grid");
  const [openConfirmUnregister, setOpenConfirmUnregister] = React.useState(false);
  const [loadingConfirm, setLoadingConfirm] = React.useState(false);
  const [openReportType, setOpenReportType] = React.useState("");
  const [otherReason, setOtherReason] = React.useState("");

  const navigate = useNavigate();
  moment.locale("vi");

  const onOpenMenu = (event: any, item: any) => {
    setOpenPostMenu(true);
    setAnchorEl(event.currentTarget);
    setItemClicked(item);
  };

  const onCloseMenu = () => {
    setOpenPostMenu(false);
    setAnchorEl(null);
  };

  const onClickPostDetail = (postId: number) => {
    navigate(`/post-detail?postId=${postId}&tab=${tab}&from=register`);
  };

  const onClickDeadlineIcon = (item: any) => {
    setItemClicked(item);
    onOpenMsgBox();
  };

  const onConfirmUnregister = async () => {
    setLoadingConfirm(true);
    const res = await UserPost.unregister({ postId: itemClicked?.postId });
    if (res.status === 200) {
      setNotificationSuccess("???? hu??? ????ng k?? th??nh c??ng");
    } else {
      setNotificationError("???? c?? l???i x???y ra");
    }

    const newListPost = listPost.filter((item: any) => item.postId !== itemClicked?.postId);
    setListPost(newListPost);
    setLoadingConfirm(false);
    setOpenConfirmUnregister(false);
    setItemClicked(null);
    onCloseMenu();
  };

  const onCloseRemoveDialog = () => {
    setOpenConfirmUnregister(false);
    setOpenPostMenu(false);
  };

  const onChangeOtherReason = (e: any) => {
    setOtherReason(e.target.value);
  };

  const onClickUnregister = () => {
    setOpenConfirmUnregister(true);
    setOpenReportType(tab === "isActive" || tab === "isConfirmed" ? "unregister-confirm" : "unregister");
  };

  const onClickReport = () => {
    setOpenReportType("report");
  };

  //TODO:
  const onConfirmReport = async () => {};

  const onCloseReportDialog = () => {
    setOpenReportType("");
    setOpenPostMenu(false);
  };

  React.useEffect(() => {
    if (data) {
      setListPost(data);
    }
  }, [data]);

  const isNearDeadline = (deadline: string) => {
    if (deadline.includes("gi???")) {
      return true;
    }
  };

  const renderEmptyText = () => {
    switch (tab) {
      case "all":
        return "Kh??ng c?? b??i ????ng n??o";
      case "isActive":
        return "Nh???ng y??u c???u ??ang trong qu?? tr??nh trao ?????i s??? xu???t hi???n ??? ????y";
      case "isConfirmed":
        return "Nh???ng b??i ????ng n??y ???? ???????c x??c nh???n";
      case "isPending":
        return "Nh???ng b??i ????ng ???? ????ng k?? ch??? ng?????i d??ng x??c nh???n";
      case "isDone":
        return "Nh???ng b??i ????ng ???? ???????c ho??n th??nh";
    }
  };

  const gridView = () => {
    return map(listPost, (item: any, index: number) => (
      <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
        <Card className={classes.item}>
          <div className={classes.cardHeader}>
            <div className={classes.postTitle}>
              <Tooltip title={item.title}>
                <Typography variant="subtitle1" noWrap onClick={() => onClickPostDetail(item.postId)}>
                  {item.title}
                </Typography>
              </Tooltip>
              <div className={classes.dueDateAndNoti}>
                <div className={classes.dueDate}>
                  <AccessTimeOutlinedIcon
                    sx={{
                      color: isNearDeadline(moment(item.deadline).endOf("hours").fromNow()) ? "#d32f2f" : "#94a4c4",
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    className={clsx(
                      classes.deadline,
                      isNearDeadline(moment(item.deadline).endOf("hours").fromNow()) && classes.nearDeadline
                    )}>
                    ?????n h???n c???n gi???i quy???t trong {moment(item.deadline).endOf("hours").fromNow()}
                  </Typography>
                </div>
              </div>
            </div>

            <div className={classes.newMessage} onClick={() => onClickDeadlineIcon(item)}>
              {(index === 0 || index === 2 || index === 3) && <i className={classes.blink}></i>}

              <img src={NewMessageIcon} alt="" />
            </div>
            <div>
              <MoreVertRoundedIcon onClick={(e) => onOpenMenu(e, item)} />
            </div>
          </div>
          <div className={classes.cardContent}>
            <Box sx={{ my: 1.5 }}>
              <Box sx={{ mt: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5, ml: 0.5, minHeight: 54 }}>
                  {toggleItem !== item.postId ? `${item.content.slice(0, 100)}...` : item.content}
                  <span
                    onClick={() => (toggleItem !== item.postId ? setToggleItem(item.postId) : setToggleItem(null))}
                    style={{
                      marginLeft: 8,
                      textDecoration: "underline",
                      fontWeight: 400,
                      color: "#94a4c4",
                      cursor: "pointer",
                    }}>
                    {item.content.length > 100 && (toggleItem !== item.postId ? "Xem th??m" : "Thu g???n")}
                  </span>
                </Typography>
              </Box>
            </Box>

            <Divider />
            <div className={classes.userPostAvatarRegister}>
              <div className={classes.leftContent}>
                <Avatar {...stringAvatar(item.name)} className={classes.userAvatar} />
                <div className={classes.usernameAndRank}>
                  <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: 600, lineHeight: 1.5, ml: 0.5 }}>
                    {item.name}
                  </Typography>
                  <div className={classes.rank}>
                    <Tooltip
                      title={
                        item.rankPoint === undefined
                          ? `Ng?????i d??ng ch??a ???????c ????nh gi??`
                          : `${item.rankPoint} sao tr??n ${item.voteCount} l?????t vote`
                      }>
                      {item.rankPoint > 0 ? (
                        <StarRoundedIcon sx={{ color: "gold", width: 18 }} />
                      ) : (
                        <StarRoundedIcon sx={{ color: "#94a4c4", width: 18 }} />
                      )}
                    </Tooltip>
                    <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5 }}>{item.rankPoint}</Typography>
                    <Tooltip title="Nh???n ???????c h??? tr??? th??nh c??ng">
                      <LibraryAddCheckRoundedIcon sx={{ color: "green", width: 18, ml: 1 }} />
                    </Tooltip>
                    <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5 }}>3</Typography>
                    {(index === 4 || index === 2) && (
                      <>
                        <Tooltip title="Li??n l???c g???n ????y">
                          <ConnectWithoutContactRoundedIcon sx={{ color: "blue", width: 18, ml: 1 }} />
                        </Tooltip>
                        <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5 }}></Typography>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Grid>
    ));
  };

  const listView = () => {
    return map(listPost, (item: any, index: number) => (
      <Grid key={index} item xs={12}>
        <Card className={classes.item}>
          <div className={classes.cardHeader}>
            <div className={classes.postTitle}>
              <Tooltip title={item.title}>
                <Typography variant="subtitle1" noWrap onClick={() => onClickPostDetail(item.postId)}>
                  {item.title}
                </Typography>
              </Tooltip>
              <div className={classes.dueDateAndNoti}>
                <div className={classes.dueDate}>
                  <AccessTimeOutlinedIcon
                    sx={{
                      color: isNearDeadline(moment(item.deadline).endOf("hours").fromNow()) ? "#d32f2f" : "#94a4c4",
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    className={clsx(
                      classes.deadline,
                      isNearDeadline(moment(item.deadline).endOf("hours").fromNow()) && classes.nearDeadline
                    )}>
                    ?????n h???n c???n gi???i quy???t trong {moment(item.deadline).endOf("hours").fromNow()}
                  </Typography>
                </div>
              </div>
            </div>
            {(index === 0 || index === 2 || index === 3) && (
              <div className={classes.newMessage} onClick={() => onClickDeadlineIcon(item)}>
                <i className={classes.blink}></i>
                <img src={NewMessageIcon} alt="" />
              </div>
            )}
            <div>
              <MoreVertRoundedIcon onClick={(e) => onOpenMenu(e, item)} />
            </div>
          </div>
        </Card>
      </Grid>
    ));
  };

  const renderEmptyData = () => {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <img style={{ height: 350 }} src={EmptyIllustrations} alt="" />
        <Typography variant="subtitle1" sx={{ fontWeight: 400, lineHeight: "20px" }}>
          {renderEmptyText()}
        </Typography>
      </Box>
    );
  };

  if (loading) {
    return (
      <Box sx={{ height: 400 }} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
        <CircularProgress size={50} />
        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 500, lineHeight: "30px" }}>
          ??ang t???i d??? li???u
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <ReportDialog
        type={openReportType}
        itemClicked={itemClicked}
        loadingConfirm={loadingConfirm}
        otherReason={otherReason}
        onChangeOtherReason={onChangeOtherReason}
        confirmAction={onConfirmReport}
        onCloseReportDialog={onCloseReportDialog}
      />
      <ConfirmDialog
        dialogTitle={
          <Box>
            <Typography variant="h6">Hu??? ????ng k?? h??? tr??? cho</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }} noWrap>
              {itemClicked?.title}
            </Typography>
          </Box>
        }
        dialogContent="B???n c?? ch???c ch???n mu???n hu??? ????ng k?? h??? tr??? v???n ????? n??y n???a kh??ng?"
        confirmAction={onConfirmUnregister}
        cancelAction={onCloseRemoveDialog}
        open={openReportType === "unregister" && openConfirmUnregister}
        loadingConfirm={loadingConfirm}
        onClose={onCloseRemoveDialog}
      />

      {listPost?.length !== 0 && (
        <div className={classes.resultCountAndDisplayOption}>
          <Typography variant="subtitle1">
            ??ang hi???n th??? <b style={{ fontSize: "1.25rem", padding: "0 3px" }}>{listPost?.length}</b> y??u c???u ???? ????ng k??
          </Typography>
          <div className={classes.options}>
            <Tooltip title={"Hi???n th??? d???ng l?????i"}>
              <div
                className={clsx(classes.optionItem, selectedOption === "grid" && classes.activeGrid)}
                onClick={() => setSelectedOption("grid")}>
                <ViewComfyRoundedIcon sx={{ color: selectedOption === "grid" ? "#fff" : "#000" }} />
              </div>
            </Tooltip>
            <Tooltip title={"Hi???n th??? d???ng h??ng"}>
              <div
                className={clsx(classes.optionItem, selectedOption === "row" && classes.activeGrid)}
                onClick={() => setSelectedOption("row")}>
                <HorizontalSplitRoundedIcon sx={{ color: selectedOption === "row" ? "#fff" : "#000" }} />
              </div>
            </Tooltip>
          </div>
        </div>
      )}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {listPost?.length === 0 ? renderEmptyData() : selectedOption === "grid" ? gridView() : listView()}
        <Popover
          open={openPostMenu}
          anchorEl={anchorEl}
          onClose={onCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}>
          <Box
            className={classes.actions}
            sx={{ display: "flex", alignItems: "center", flexDirection: "column", py: 1, px: 1 }}>
            {/* h???y ????ng k?? */}
            <Typography variant="subtitle2" sx={{ py: 0.5, px: 2, width: "100%" }} onClick={onClickUnregister}>
              Hu??? ????ng k??
            </Typography>
            <Typography variant="subtitle2" sx={{ py: 0.5, px: 2, width: "100%" }} onClick={onClickReport}>
              B??o c??o b??i ????ng
            </Typography>
          </Box>
        </Popover>
      </Grid>
      <MessageBox
        onCloseMsgBox={onCloseMsgBox}
        postId={itemClicked?.id}
        userId={itemClicked?.userId}
        userName={itemClicked?.name}
      />
    </Box>
  );
}
