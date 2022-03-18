import { Box, Typography, Grid, Card, Popover, Divider, Avatar, Tooltip } from "@mui/material";
import { map } from "lodash";
import * as React from "react";
import { useStyles } from "./ResultContent.style";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ConnectWithoutContactRoundedIcon from "@mui/icons-material/ConnectWithoutContactRounded";
import LibraryAddCheckRoundedIcon from "@mui/icons-material/LibraryAddCheckRounded";
import { stringAvatar } from "../../UserProfile/helper";

export default function RegisterContent(props: any) {
  const { data } = props;
  const classes = useStyles();
  const [openPostMenu, setOpenPostMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const onOpenMenu = (event: any) => {
    setOpenPostMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const onCloseMenu = () => {
    setOpenPostMenu(false);
    setAnchorEl(null);
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
                <div className={classes.postTitle}>
                  <Typography variant="subtitle1" noWrap>
                    {item.postData.title}
                  </Typography>
                </div>
                <div>
                  <MoreHorizOutlinedIcon onClick={onOpenMenu} />
                </div>
              </div>
              <div className={classes.cardContent}>
                <div className={classes.dueDate}>
                  <AccessTimeOutlinedIcon sx={{ color: "#94a4c4" }} />
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#94a4c4", fontSize: 12, fontWeight: 500, lineHeight: 1.5, ml: 1 }}>
                    Due on Nov 3
                  </Typography>
                </div>
                <Divider sx={{ mt: 8 }} />
                <div className={classes.userPostAvatar}>
                  <Avatar
                    {...stringAvatar(item.userData.name)}
                    sx={{ border: "2px solid #94a4c4", borderRadius: "50%" }}
                  />
                  <div className={classes.usernameAndRank}>
                    <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1.5, ml: 0.5 }}>
                      {item.userData.name}
                    </Typography>
                    <div className={classes.rank}>
                      <Tooltip title={`${item.rankPoint} sao trên ${item.voteCount} lượt vote`}>
                        <StarRoundedIcon sx={{ color: "#94a4c4", width: 18 }} />
                      </Tooltip>
                      <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5 }}>{item.rankPoint}</Typography>
                      <Tooltip title="Giao dịch thành công">
                        <LibraryAddCheckRoundedIcon sx={{ color: "#94a4c4", width: 18, ml: 1 }} />
                      </Tooltip>
                      <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5 }}>3</Typography>
                      {(index === 4 || index === 2) && (
                        <>
                          <Tooltip title="Liên lạc gần đây">
                            <ConnectWithoutContactRoundedIcon sx={{ color: "#94a4c4", width: 18, ml: 1 }} />
                          </Tooltip>
                          <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5 }}>2 ngày trước</Typography>
                        </>
                      )}
                    </div>
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
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", py: 2, px: 2.5 }}>
            <Typography variant="button">Huỷ đăng kí</Typography>
            <Typography variant="button">Chi tiết</Typography>
          </Box>
        </Popover>
      </Grid>
    </Box>
  );
}
