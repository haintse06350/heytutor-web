import React from "react";
import { Card, Grid, Typography, Divider } from "@mui/material";
import clsx from "classnames";
import { map } from "lodash";
import { useStyles } from "./ResultContent.style";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { isNearDeadline } from "../utils";
import moment from "moment";
import "moment/locale/vi";

export const ListPost = (props: any) => {
  const { data, onClickPostDetail, selectItem, onOpenMenu, renderRegisterAndSupporter } = props;

  const classes = useStyles();
  return (
    <>
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
              <div>
                <MoreVertRoundedIcon onClick={(e: any) => onOpenMenu(e, item)} />
              </div>
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
