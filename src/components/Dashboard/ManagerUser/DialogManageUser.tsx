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
    { id: 1, name: "Hạn chế đăng bài 1 trong ngày" },
    { id: 2, name: "Hạn chế đăng bài 3 trong ngày" },
    { id: 3, name: "Hạn chế đăng bài 7 trong ngày" },
    { id: 4, name: "Hạn đăng kí giải quyết trong 1 ngày" },
    { id: 5, name: "Hạn đăng kí giải quyết trong 3 ngày" },
    { id: 6, name: "Hạn đăng kí giải quyết trong 7 ngày" },
  ];

  const renderStatus = () => {
    return (
      <Box sx={{ display: "flex" }}>
        {data?.status.map((item: any) => (
          <Box key={item} sx={{ mt: 1, mr: 1 }}>
            <Chip
              label={item}
              variant="outlined"
              sx={{
                color:
                  item === "Hoạt động"
                    ? "#00AB55"
                    : item === "Hạn chế đăng bài 1 ngày" ||
                      item === "Hạn chế đăng bài 3 ngày" ||
                      item === "Hạn chế đăng bài 7 ngày"
                    ? "#ff3a16"
                    : "#5ab4ec",
              }}
            />
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Dialog open={open} onClose={closeDialog} maxWidth="lg" fullWidth>
      <Box sx={{ p: 2 }}>
        <DialogTitle>Quản lí</DialogTitle>
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
              {typeCheckBoxs.slice(0, 3).map((item: any) => (
                <FormControlLabel
                  key={item.id}
                  sx={{ display: "block" }}
                  control={<Radio name={item.name} />}
                  value={item.name}
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
              {typeCheckBoxs.slice(3, 6).map((item: any) => (
                <FormControlLabel
                  key={item.id}
                  sx={{ display: "block" }}
                  control={<Radio name={item.name} />}
                  value={item.name}
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
          <Button onClick={closeDialog}>Hủy bỏ</Button>
          <Button>Áp dụng</Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DialogManagerUser;
