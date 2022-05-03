import React, { useState, useContext } from "react";
import { NotificationCtx } from "../../context/notification/state";
import { UserPost } from "../../models/user-post";
import { ConfirmDialog } from "./ConfirmDialog/ConfirmDialog";

export const ConfirmRegister = (props: any) => {
  const { postId, isOpen, setIsOpen, isOpenUnregister, isRegisterAction, fetchPostData } = props;
  const [loading, setLoading] = useState(false);
  const { setNotificationSuccess, setNotificationError } = useContext(NotificationCtx);

  const onConfirmRegister = async () => {
    try {
      setLoading(true);
      const res = await UserPost.registerPost({ postId });
      if (res.status === 200) {
        setNotificationSuccess("Đăng ký thành công");
      } else {
        setNotificationError("Đăng ký thất bại!");
      }
      await fetchPostData(postId);
    } catch (error) {
      setNotificationError("Đăng ký thất bại!");
    }
    setIsOpen(false);
  };

  const onConfirmUnRegister = async () => {
    try {
      setLoading(true);
      const res = await UserPost.unregister({ postId });
      if (res.status === 200) {
        setNotificationSuccess("Huỷ đăng kí thành công");
      } else {
        setNotificationError("Huỷ đăng kí thất bại!");
      }
      await fetchPostData(postId);
    } catch (error) {
      setNotificationError("Huỷ đăng kí thất bại!");
    }
    setIsOpen(false);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <ConfirmDialog
      dialogTitle={isRegisterAction ? "Xác nhận đăng kí giải quyết vấn đề này" : "Xác nhận huỷ đăng kí"}
      dialogContent={
        isRegisterAction
          ? "Yêu cầu đăng kí của bạn sẽ được gửi tới người đăng vấn đề này. Bạn sẽ được thông báo khi được chọn làm người support cho vấn đề này"
          : "Bạn sẽ bị xoá khỏi danh sách đăng kí của vấn đề này"
      }
      confirmAction={isRegisterAction ? onConfirmRegister : onConfirmUnRegister}
      cancelAction={onClose}
      open={isOpen | isOpenUnregister}
      onClose={onClose}
      loadingConfirm={loading}
    />
  );
};
