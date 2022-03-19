import React from "react";
import { Dialog, DialogTitle, Grid } from "@mui/material";

const DialogAddCTV = (props: any) => {
  const { onClose, open } = props;

  const handleClickClose = () => {
    onClose(onClose);
  };
  return (
    <Dialog open={open} onClose={handleClickClose}>
      <Grid sx={{ p: 2 }}>
        <DialogTitle>Thêm cộng tác viên</DialogTitle>
      </Grid>
    </Dialog>
  );
};

export default DialogAddCTV;
