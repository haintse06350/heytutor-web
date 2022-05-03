import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Typography,
  Chip,
  TextField,
  Button,
  DialogContent,
  DialogActions,
  // CircularProgress,
} from "@mui/material";
import { NotificationCtx } from "../../../context/notification/state";
// import { NotificationCtx } from "../../../context/notification/state";
import { Manager } from "../../../models/manager";

const DialogManagerUser = (props: any) => {
  const { open, closeDialog, data } = props;

  const { setNotificationSuccess, setNotificationError } = React.useContext(NotificationCtx);
  const [type1Ban, setType1Ban] = React.useState("1-0");
  const [type2Ban, setType2Ban] = React.useState("2-0");
  const [type3Ban, setType3Ban] = React.useState("3-0");
  const [userBan, setUserBan] = React.useState({
    userId: data?.userInfo.id,
    eventId: data?.eventInfo.id,
    type: "",
    postId: "",
    commentId: "",
  });

  const onChangeType1Ban = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType1Ban(event.target.value);
    setUserBan({ ...userBan, type: event.target.value });
  };
  const onChangeType2Ban = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType2Ban(event.target.value);
    setUserBan({ ...userBan, type: event.target.value });
  };
  const onChangeType3Ban = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType3Ban(event.target.value);
    setUserBan({ ...userBan, type: event.target.value });
  };
  const typeCheckBoxs = [
    { value: "1-0", name: "Bỏ hạn chế đăng bài" },
    { value: "1-1", name: "Hạn chế đăng bài 1 trong ngày" },
    { value: "1-2", name: "Hạn chế đăng bài 3 trong ngày" },
    { value: "1-3", name: "Hạn chế đăng bài 5 trong ngày" },
    { value: "1-4", name: "Hạn chế đăng bài 7 trong ngày" },
    { value: "2-0", name: "Bỏ Hạn chế đăng kí giải quyết" },
    { value: "2-1", name: "Hạn chế đăng kí giải quyết 1 trong ngày" },
    { value: "2-2", name: "Hạn chế đăng kí giải quyết 3 trong ngày" },
    { value: "2-3", name: "Hạn chế đăng kí giải quyết 5 trong ngày" },
    { value: "2-4", name: "Hạn chế đăng kí giải quyết 7 trong ngày" },
    { value: "3-0", name: "Bỏ hạn chế bình luận" },
    { value: "3-1", name: "Hạn chế bình luận 1 trong ngày" },
    { value: "3-2", name: "Hạn chế bình luận 3 trong ngày" },
    { value: "3-3", name: "Hạn chế bình luận 5 trong ngày" },
    { value: "3-4", name: "Hạn chế bình luận 7 trong ngày" },
  ];

  const renderLabelStatus = (item: string) => {
    switch (item) {
      case "1-1":
        return "Hạn chế người dùng đăng bài trong 1 ngày";
      case "1-2":
        return "Hạn chế người dùng đăng bài trong 3 ngày";
      case "1-3":
        return "Hạn chế người dùng đăng bài trong 5 ngày";
      case "1-4":
        return "Hạn chế người dùng đăng bài trong 7 ngày";
      case "2-1":
        return "Hạn chế người dùng đăng ký trong 1 ngày";
      case "2-2":
        return "Hạn chế người dùng đăng ký trong 3 ngày";
      case "2-3":
        return "Hạn chế người dùng đăng ký trong 5 ngày";
      case "2-4":
        return "Hạn chế người dùng đăng ký trong 7 ngày";
      case "3-1":
        return "Hạn chế người dùng comment trong 1 ngày";
      case "3-2":
        return "Hạn chế người dùng comment trong 3 ngày";
      case "3-3":
        return "Hạn chế người dùng comment trong 5 ngày";
      case "3-4":
        return "Hạn chế người dùng comment trong 7 ngày";
      case "4":
        return "Hạn chế người dùng vĩnh viễn";
      default:
        return "Hoạt động";
    }
  };

  const renderColorStatus = (item: string) => {
    if (item === null) {
      return "primary";
    } else {
      return "error";
    }
  };

  const renderStatus = () => {
    if (data?.userBanInfo.length === 0) {
      return <Chip label="Hoạt động" color="primary" />;
    } else {
      return data?.userBanInfo.map((item: any, index: number) => (
        <Box key={index} sx={{ mt: 1 }}>
          <Chip label={renderLabelStatus(item?.type || null)} color={renderColorStatus(item?.type)}></Chip>
        </Box>
      ));
    }
  };

  const onBanUser = async () => {
    const res = await Manager.createBanUser(userBan);
    if (res) {
      setNotificationSuccess("Xử lí thành công");
    } else {
      setNotificationError("Xử lí thất bại");
    }
  };
  console.log(data, "dataa");
  return (
    <Dialog open={open} maxWidth="lg" fullWidth>
      {!data ? (
        <Typography variant="h5" align="center">
          Đang tải
        </Typography>
      ) : (
        <Box sx={{ p: 2 }}>
          <DialogTitle>Quản lí người dùng[ {data?.userInfo.name} ]</DialogTitle>
          {/* xu li */}
          <DialogContent>
            <Box>
              <Typography>Trạng thái hiện tại</Typography>
              {renderStatus()}
            </Box>
            {/* type ban */}
            <Typography>Thay đổi trạng thái</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Box>
                <FormLabel id="radio-button-need-supporter">Quyền người cần trợ giúp, hỗ trợ</FormLabel>
                <RadioGroup
                  id="radio-button-need-supporter"
                  aria-labelledby="radio-button-need-supporter"
                  // value={selectedTypeBan?.type1}
                  value={type1Ban}
                  onChange={onChangeType1Ban}>
                  {typeCheckBoxs.slice(0, 5).map((item: any, index: number) => (
                    <FormControlLabel
                      key={index}
                      sx={{ display: "block" }}
                      control={<Radio name={item.name} />}
                      value={item.value}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </Box>
              <Box>
                <FormLabel id="radio-button-supporter">Quyền người hỗ trợ</FormLabel>
                <RadioGroup
                  id="radio-button-supporter"
                  aria-labelledby="radio-button-supporter"
                  value={type2Ban}
                  onChange={onChangeType2Ban}>
                  {typeCheckBoxs.slice(5, 10).map((item: any, index: number) => (
                    <FormControlLabel
                      key={index}
                      sx={{ display: "block" }}
                      control={<Radio name={item.name} />}
                      value={item.value}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </Box>
              <Box>
                <FormLabel id="radio-button-supporter">Quyền người hỗ trợ</FormLabel>

                <RadioGroup
                  id="radio-button-supporter-comment"
                  aria-labelledby="radio-button-supporter"
                  value={type3Ban}
                  onChange={onChangeType3Ban}>
                  {typeCheckBoxs.slice(10, 15).map((item: any, index: number) => (
                    <FormControlLabel
                      key={index}
                      sx={{ display: "block" }}
                      control={<Radio name={item.name} />}
                      value={item.value}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                id="outlined-multiline-static"
                label="Nội dung thông báo cho người dùng"
                multiline
                rows={4}
                fullWidth
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={closeDialog} sx={{ color: "#94a4c4" }}>
                Hủy bỏ
              </Button>
              <Button
                // disabled={loading}
                onClick={onBanUser}>
                {/* {loading ? <CircularProgress size={20} /> : "Áp dụng"} */}
                Áp dụng
              </Button>
            </Box>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  );
};

export default DialogManagerUser;
