import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import img1 from "../../../../assets/home_event_images/14.png";

const DialogPreviewEventDetail = (props: any) => {
  const { open, handleClose, scroll } = props;

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="md">
      <DialogTitle id="scroll-dialog-title">Title name</DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
          <img src={img1} alt="img1" />
          <Typography variant="subtitle1">Thời gian từ 24/3/2022 đến 4/5/2022</Typography>
          <Typography variant="h5"> Để có một cuối kỳ thật hoàn hảo với PRJ </Typography>
          <Typography variant="body1">
            Một môn học hoàn hảo là sau thi PE phải PASSED. Tham gia ngay để có một kỳ thật hoàn hảo với SSG102 nào.
          </Typography>
          <Typography variant="body1">
            💌 Trong suốt thời gian qua, Heytutor đã đón chào rất nhiều thành viên nữ tham gia, và các bạn là một phần
            không thể thiếu đối với sự phát triển của Heytutor. Sự ghi nhận này không chỉ trong riêng ngày 8/3, mà trong
            364 ngày còn lại của năm, Heytutor đều rất biết ơn và cảm kích trước sự nhiệt huyết và tinh thần cống hiến
            không quản ngại của các bạn, thông qua những bài viết giá trị, tâm huyết và bổ ích.💌 Trong suốt thời gian
            qua, Heytutor đã đón chào rất nhiều thành viên nữ tham gia, và các bạn là một phần không thể thiếu đối với
            sự phát triển của Heytutor. Sự ghi nhận này không chỉ trong riêng ngày 8/3, mà trong 364 ngày còn lại của
            năm, Heytutor đều rất biết ơn và cảm kích trước sự nhiệt huyết và tinh thần cống hiến không quản ngại của
            các bạn, thông qua những bài viết giá trị, tâm huyết và bổ ích.💌 Trong suốt thời gian qua, Heytutor đã đón
            chào rất nhiều thành viên nữ tham gia, và các bạn là một phần không thể thiếu đối với sự phát triển của
            Heytutor. Sự ghi nhận này không chỉ trong riêng ngày 8/3, mà trong 364 ngày còn lại của năm, Heytutor đều
            rất biết ơn và cảm kích trước sự nhiệt huyết và tinh thần cống hiến không quản ngại của các bạn, thông qua
            những bài viết giá trị, tâm huyết và bổ ích.💌 Trong suốt thời gian qua, Heytutor đã đón chào rất nhiều
            thành viên nữ tham gia, và các bạn là một phần không thể thiếu đối với sự phát triển của Heytutor. Sự ghi
            nhận này không chỉ trong riêng ngày 8/3, mà trong 364 ngày còn lại của năm, Heytutor đều rất biết ơn và cảm
            kích trước sự nhiệt huyết và tinh thần cống hiến không quản ngại của các bạn, thông qua những bài viết giá
            trị, tâm huyết và bổ ích.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#94a4c4" }} onClick={handleClose}>
          Trở lại
        </Button>
        <Button onClick={handleClose} color="error">
          Từ chối{" "}
        </Button>
        <Button onClick={handleClose} color="primary">
          Phê duyệt
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogPreviewEventDetail;
