import React from "react";
import { Paper, Box, Tab, Typography } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";

export const TabBarContent = ({ tabValue, isMyRequest, onChangeTab, data, postCount }: any) => {
  const renderTabMyRequestLabel = (label: string) => {
    let count = 0;
    let labelText = "";

    switch (label) {
      case "isConfirmed": {
        count = data?.postHasSupporter.length;
        labelText = "Đã có supporter";
        break;
      }
      case "isActive": {
        count = data?.postHasRegister.length;
        labelText = "Chưa chọn supporter";
        break;
      }
      case "isPending": {
        count = data?.postHasNoRegister.length;
        labelText = "Chưa có người đăng kí";
        break;
      }
      case "isOnEvent": {
        count = data?.postOnEvent.length;
        labelText = "Đang trong sự kiện";
        break;
      }
      case "isDone": {
        count = data?.postDone.length;
        labelText = "Đã xong";
        break;
      }
    }

    return (
      <Box>
        <Typography>{labelText}</Typography>
        <span>{count}</span>
      </Box>
    );
  };

  const renderTabLabel = (label: string) => {
    let count = 0;
    let labelText = "";

    switch (label) {
      case "all": {
        count = postCount?.nbOfAllPost;
        labelText = "Tất cả";
        break;
      }
      case "isConfirmed": {
        count = postCount?.nbOfConfirmedPost;
        labelText = "Đang hỗ trợ";
        break;
      }
      case "isPending": {
        count = postCount?.nbOfPendingPost;
        labelText = "Đang chờ xác nhận";
        break;
      }
      case "isDone": {
        count = postCount?.nbOfDonePost;
        labelText = "Đã xong";
        break;
      }
    }

    return (
      <Box display="flex" alignItems="center">
        <Typography variant="subtitle1">{labelText}</Typography>
        <Typography
          component="span"
          style={{
            fontSize: 12,
            textTransform: "none",
            whiteSpace: "normal",
            marginLeft: 8,
            padding: "0px 10px",
            borderRadius: 10,
            backgroundColor: "rgb(229, 234, 242)",
          }}>
          {count}
        </Typography>
      </Box>
    );
  };

  const TabBar = () => {
    if (isMyRequest) {
      return (
        <TabList onChange={onChangeTab} aria-label="lab API tabs example">
          <Tab label={renderTabMyRequestLabel("isConfirmed")} value="isConfirmed" />
          <Tab label={renderTabMyRequestLabel("isActive")} value="isActive" />
          <Tab label={renderTabMyRequestLabel("isPending")} value="isPending" />
          <Tab label={renderTabMyRequestLabel("isOnEvent")} value="isOnEvent" />
          <Tab label={renderTabMyRequestLabel("isDone")} value="isDone" />
        </TabList>
      );
    } else {
      return (
        <TabList onChange={onChangeTab} aria-label="lab API tabs example">
          <Tab label={renderTabLabel("all")} value="all" />
          <Tab label={renderTabLabel("isConfirmed")} value="isConfirmed" />
          <Tab label={renderTabLabel("isPending")} value="isPending" />
          <Tab label={renderTabLabel("isDone")} value="isDone" />
        </TabList>
      );
    }
  };

  return (
    <Paper elevation={2} sx={{ px: 2, mt: 2 }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabBar />
        </Box>
      </TabContext>
    </Paper>
  );
};
