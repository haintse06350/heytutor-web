import { Box, Typography, Grid, Card, Popover, Divider, Avatar, Tooltip, Button } from "@mui/material";
import { map } from "lodash";
import * as React from "react";
import { useStyles } from "./ResultContent.style";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ConnectWithoutContactRoundedIcon from "@mui/icons-material/ConnectWithoutContactRounded";
import LibraryAddCheckRoundedIcon from "@mui/icons-material/LibraryAddCheckRounded";
import { stringAvatar } from "../../UserProfile/helper";
import { useNavigate } from "react-router-dom";
import NewMessageIcon from "../../../assets/new-message.svg";
import { renderCardImg } from "../utils";

export default function RegisterContent(props: any) {
  const { data } = props;
  const classes = useStyles();
  const [openPostMenu, setOpenPostMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [toggleItem, setToggleItem]: any = React.useState(false);
  const navigate = useNavigate();

  const onOpenMenu = (event: any) => {
    setOpenPostMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const onCloseMenu = () => {
    setOpenPostMenu(false);
    setAnchorEl(null);
  };

  const onClickPostDetail = (postId: number) => {
    navigate(`/post-detail?postId=${postId}`);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Showing {data?.length} results:
      </Typography>
      <Grid container spacing={2}>
        {map(data, (item: any, index: number) => (
          <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
            <Card className={classes.item}>
              <div className={classes.cardHeader}>
                <div className={classes.cardImg}>
                  <img src={renderCardImg(index)} alt="" />
                </div>
                <div className={classes.postTitle}>
                  <Typography variant="subtitle1" noWrap onClick={() => onClickPostDetail(item.postId)}>
                    {item.postData.title}
                  </Typography>
                  <div className={classes.dueDateAndNoti}>
                    <div className={classes.dueDate}>
                      <AccessTimeOutlinedIcon sx={{ color: "#94a4c4" }} />
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "#94a4c4", fontSize: 12, fontWeight: 500, lineHeight: 1.5, ml: 1 }}>
                        Due on March 20
                      </Typography>
                    </div>
                  </div>
                </div>
                {(index === 0 || index === 2 || index === 3) && (
                  <div className={classes.newMessage}>
                    <i className={classes.blink}></i>
                    <img src={NewMessageIcon} alt="" />
                  </div>
                )}
                <div>
                  <MoreVertRoundedIcon onClick={onOpenMenu} />
                </div>
              </div>
              <div className={classes.cardContent}>
                <Box sx={{ my: 3 }}>
                  {/* <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    <VisibilityOutlinedIcon sx={{ mr: 0.5, width: 18, height: 18, color: "#94a4c4" }} />
                    <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1.5 }}>
                      Số lượt xem
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1.5, ml: 0.5 }}>
                      100
                    </Typography>
                  </Box> */}
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1.5, ml: 0.5 }}>
                      {toggleItem !== item.postId ? `${item.postData.content.slice(0, 100)}...` : item.postData.content}
                      <span
                        onClick={() => (toggleItem !== item.postId ? setToggleItem(item.postId) : setToggleItem(null))}
                        style={{
                          marginLeft: 8,
                          textDecoration: "underline",
                          fontWeight: 400,
                          color: "#94a4c4",
                          cursor: "pointer",
                        }}>
                        {item.postData.content.length > 100 && (toggleItem !== item.postId ? "Xem thêm" : "Thu gọn")}
                      </span>
                    </Typography>
                  </Box>
                </Box>

                <Divider />
                <div className={classes.userPostAvatarRegister}>
                  <div className={classes.leftContent}>
                    <Avatar
                      {...stringAvatar(item.userData.name)}
                      sx={{ border: "2px solid #94a4c4", borderRadius: "50%" }}
                    />
                    <div className={classes.usernameAndRank}>
                      <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1.5, ml: 0.5 }}>
                        {item.userData.name}
                      </Typography>
                      <div className={classes.rank}>
                        <Tooltip title={`${item.userData.rankPoint} sao trên ${item.userData.voteCount} lượt vote`}>
                          <StarRoundedIcon sx={{ color: "#94a4c4", width: 18 }} />
                        </Tooltip>
                        <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5 }}>
                          {item.userData.rankPoint}
                        </Typography>
                        <Tooltip title="Giao dịch thành công">
                          <LibraryAddCheckRoundedIcon sx={{ color: "#94a4c4", width: 18, ml: 1 }} />
                        </Tooltip>
                        <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5 }}>3</Typography>
                        {(index === 4 || index === 2) && (
                          <>
                            <Tooltip title="Liên lạc gần đây">
                              <ConnectWithoutContactRoundedIcon sx={{ color: "#94a4c4", width: 18, ml: 1 }} />
                            </Tooltip>
                            <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5 }}>
                              2 ngày trước
                            </Typography>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={classes.rightContent}>
                    <Button onClick={() => onClickPostDetail(item.postId)} variant="outlined" color="primary">
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        ))}
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
            <Typography variant="subtitle2" sx={{ py: 0.5, px: 2 }}>
              Huỷ đăng kí
            </Typography>
            <Typography variant="subtitle2" sx={{ py: 0.5, px: 2 }}>
              Chi tiết
            </Typography>
          </Box>
        </Popover>
      </Grid>
    </Box>
  );
}
