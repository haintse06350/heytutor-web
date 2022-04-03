import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import React from "react";

export const ConfirmDialog = (props: any) => {
  const { dialogTitle, dialogContent, confirmAction, cancelAction, open, onClose, loadingConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelAction} color="secondary">
          Huỷ
        </Button>
        <Button
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          disabled={loadingConfirm}
          onClick={confirmAction}
          autoFocus>
          {loadingConfirm ? <CircularProgress size={20} /> : "Xác nhận"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
