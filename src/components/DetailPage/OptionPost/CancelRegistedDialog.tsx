import { Box, Button, Dialog, Typography } from "@mui/material";
import React from "react";

const CancelRegistedDialog = (props: any) => {
  const [open, isClose] = props;
  return (
    <Dialog open={open} onClose={isClose}>
      {/* chưa accept support */}
      <Box>
        <Typography variant="subtitle1" component="div">
          Bạn đang thực hiện hủy đăng kí
        </Typography>
        <Typography>
          Bạn đang hủy hỗ trợ giải quyết vấn đề giúp người dùng khác. Bạn có chắc mình muốn hủy đăng kí.
        </Typography>
        <Button color="info">Hủy thao tác</Button>
        <Button color="warning">Đồng ý hủy đăng kí</Button>
      </Box>
    </Dialog>
  );
};

export default CancelRegistedDialog;
