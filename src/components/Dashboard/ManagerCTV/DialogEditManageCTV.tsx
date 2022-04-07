import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import React from "react";

const DialogEditManageCTV = (props: any) => {
  const { open, onClose, title } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Quản lí sự kiện {title}</DialogTitle>
      <DialogContent>
        <Typography>Tên: Cao Duc Anh</Typography>
        <Typography>Gmail: anhcd1@gmail.com</Typography>
        <Typography>Thêm bởi: anhcdh4</Typography>
        <Typography>Trạng thái: Có hiệu lực</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditManageCTV;
