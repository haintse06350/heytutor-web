import React from "react";
import { Card, Grid, Typography, Divider, Box } from "@mui/material";
import clsx from "classnames";
import { map } from "lodash";
import { useStyles } from "./ResultContent.style";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { isNearDeadline } from "../utils";
import moment from "moment";
import "moment/locale/vi";
import LoadingState from "../../Common/LoadingState";

export const ListPost = (props: any) => {
  const { hideOption, data, onClickPostDetail, selectItem, onOpenMenu, renderRegisterAndSupporter } = props;
  const classes = useStyles();

  if (!data) {
    return <LoadingState />;
  }

  if (data?.length === 0) {
    return (
      <Box sx={{ p: 2 }} display="flex" alignItems="center" justifyContent="center">
        <Typography variant="subtitle1">Không có bài viết nào</Typography>
      </Box>
    );
  }

  return (
    <>
      {map(data, (item: any, index: number) => (
        <Grid key={index} item xs={12} sm={6}>
          <Card className={clsx(classes.item, selectItem?.id === item.id && classes.activeCard)}>
            <div className={classes.cardHeader}>
              <div className={classes.postTitle}>
                <Typography variant="subtitle1" noWrap onClick={() => onClickPostDetail(item.postId)}>
                  {item.postData.title}
                </Typography>
                <Typography variant="caption" noWrap>
                  Bài đăng từ {moment(item.createdAt).format("DD/MM")}
                </Typography>
                {item.postData.deadline ? (
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
                ) : (
                  <div className={classes.dueDate}>
                    <Typography variant="subtitle2" className={classes.deadline}>
                      Không có hạn deadline
                    </Typography>
                  </div>
                )}
              </div>
              {!hideOption && (
                <div>
                  <MoreVertRoundedIcon onClick={(e: any) => onOpenMenu(e, item)} />
                </div>
              )}
            </div>
            {renderRegisterAndSupporter && (
              <div className={classes.cardContent}>
                <Divider />
                <div className={classes.userPostAvatar}>{renderRegisterAndSupporter(item)}</div>
              </div>
            )}
          </Card>
        </Grid>
      ))}
    </>
  );
};
