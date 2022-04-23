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
} from "@mui/material";

const DialogManagerUser = (props: any) => {
  const { open, closeDialog, data } = props;

  const typeCheckBoxs = [
    { value: "1-1", name: "Hạn chế đăng bài 1 trong ngày" },
    { value: "1-2", name: "Hạn chế đăng bài 3 trong ngày" },
    { value: "1-3", name: "Hạn chế đăng bài 5 trong ngày" },
    { value: "1-4", name: "Hạn chế đăng bài 7 trong ngày" },
    { value: "2-1", name: "Hạn chế đăng kí giải quyết 1 trong ngày" },
    { value: "2-2", name: "Hạn chế đăng kí giải quyết 3 trong ngày" },
    { value: "2-3", name: "Hạn chế đăng kí giải quyết 5 trong ngày" },
    { value: "2-4", name: "Hạn chế đăng kí giải quyết 7 trong ngày" },
    { value: "3-1", name: "Hạn chế bình luận giải quyết 1 trong ngày" },
    { value: "3-2", name: "Hạn chế bình luận giải quyết 3 trong ngày" },
    { value: "3-3", name: "Hạn chế bình luận giải quyết 5 trong ngày" },
    { value: "3-4", name: "Hạn chế bình luận giải quyết 7 trong ngày" },
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

  return (
    <Dialog open={open} onClose={closeDialog} maxWidth="lg" fullWidth>
      <Box sx={{ p: 2 }}>
        <DialogTitle>Quản lí người dùng[ {data?.userInfo.name} ]</DialogTitle>
        {/* xu li */}
        <Box>
          <Typography>Trạng thái hiện tại</Typography>
          {renderStatus()}
        </Box>
        {/* type ban */}
        <Typography>Thay đổi trạng thái</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box>
            <FormLabel id="radio-button-need-supporter">Quyền người cần trợ giúp, hỗ trợ</FormLabel>

            <RadioGroup aria-labelledby="radio-button-need-supporter">
              <FormControlLabel
                sx={{ display: "block" }}
                control={<Radio name="Bỏ hạn chế" />}
                value="Bỏ hạn chế"
                label="Bỏ hạn chế"
              />
              {typeCheckBoxs.slice(0, 4).map((item: any, index: number) => (
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

            <RadioGroup aria-labelledby="radio-button-supporter">
              <FormControlLabel
                sx={{ display: "block" }}
                control={<Radio name="Bỏ hạn chế" />}
                value="Bỏ hạn chế"
                label="Bỏ hạn chế"
              />
              {typeCheckBoxs.slice(4, 8).map((item: any, index: number) => (
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

            <RadioGroup aria-labelledby="radio-button-supporter">
              <FormControlLabel
                sx={{ display: "block" }}
                control={<Radio name="Bỏ hạn chế" />}
                value="Bỏ hạn chế"
                label="Bỏ hạn chế"
              />
              {typeCheckBoxs.slice(8, 12).map((item: any, index: number) => (
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
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={closeDialog} sx={{ color: "#94a4c4" }}>
            Hủy bỏ
          </Button>
          <Button>Áp dụng</Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DialogManagerUser;
