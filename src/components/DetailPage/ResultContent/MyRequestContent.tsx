import { Divider, Typography, Grid, Card, AvatarGroup, Avatar, Popover, Box } from "@mui/material";
import { map, countBy, isEmpty, keys } from "lodash";
import * as React from "react";
import { useStyles } from "./ResultContent.style";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { stringAvatar } from "../../UserProfile/helper";
import { renderCardImg } from "../utils";
// import moment from "moment";
// import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function MyRequestContent(props: any) {
  const { tabValue, data } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [toggleItem, setToggleItem]: any = React.useState(false);

  const openMenu = Boolean(anchorEl);

  const onOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderAvatar = (item: any) => {
    const listUsers =
      tabValue === "isActive" ? item.supporterUsers : tabValue === "isPending" ? item.registerUsers : [];
    return (
      <AvatarGroup max={3}>
        {map(listUsers, (user: any, index: number) => (
          <Avatar key={index} alt="user" {...stringAvatar(user?.username)} />
        ))}
      </AvatarGroup>
    );
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

  return (
    <Box sx={{ mt: 2 }}>
      <Typography sx={{ mt: 2, color: "#000" }}>Showing {data?.length} results: </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {map(data, (item: any, index: number) => (
          <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
            <Card className={classes.item}>
              <div className={classes.cardHeader}>
                <div className={classes.cardImg}>
                  <img src={renderCardImg(index)} alt="" />
                </div>
                <div className={classes.postTitle}>
                  <Typography variant="subtitle1" noWrap>
                    {item.postData.title}
                  </Typography>
                  <div className={classes.dueDate}>
                    <AccessTimeOutlinedIcon sx={{ color: "#94a4c4" }} />
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#94a4c4", fontSize: 12, fontWeight: 500, lineHeight: 1.5, ml: 1 }}>
                      Due on Nov 3
                    </Typography>
                  </div>
                </div>
                <div>
                  <MoreVertRoundedIcon onClick={onOpenMenu} />
                </div>
              </div>

              <div className={classes.cardContent}>
                <div className={classes.shortContent}>
                  <Box>
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
                </div>
                <Divider />
                <div className={classes.userPostAvatar}>
                  {renderAvatar(item)} {tabValue === "isPending" && renderStarCount(item.registerUsers)}
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
      </Grid>
    </Box>
  );
}
