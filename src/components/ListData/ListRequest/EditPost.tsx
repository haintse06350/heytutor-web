import React, { useEffect, useState, useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, Box } from "@mui/material";
import { SelectDeadline } from "../../CreatePost/SelectDeadline";
import { Post } from "../../../models/post";
import { NotificationCtx } from "../../../context/notification/state";

export const EditPost = (props: any) => {
  const { openDialog, onCloseDialog, post, setEditedPost } = props;
  const [titleEdit, setTitleEdit] = useState<string>(post?.postData.title);
  const [contentEdit, setContentEdit] = useState<string>(post?.postData.content);
  const [deadline, setDeadline] = useState<any>(post?.postData.title);
  const [loading, setLoading] = useState<boolean>(false);

  const { setNotificationSuccess, setNotificationError } = useContext(NotificationCtx);

  const onChangeTitle = (e: any) => {
    setTitleEdit(e.target.value);
  };

  const onContentTitle = (e: any) => {
    setContentEdit(e.target.value);
  };

  const onUpdatePost = async () => {
    setLoading(true);
    const input = {
      postId: post.id,
      title: titleEdit,
      content: contentEdit,
      deadline: deadline,
    };

    try {
      const edited = await Post.updatePost(input);
      setEditedPost(edited);
      setNotificationSuccess("Cập nhật bài đăng thành công");
      onCloseDialog();
    } catch (error) {
      setNotificationError("Cập nhật bài đăng thất bại");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (post) {
      setTitleEdit(post.postData.title);
      setContentEdit(post.postData.content);
      setDeadline(post.postData.deadline);
    }
  }, [post]);

  return (
    <Dialog maxWidth="md" fullWidth open={openDialog} onClose={onCloseDialog}>
      <DialogTitle>Chỉnh sửa nội dung vấn đề</DialogTitle>
      <DialogContent>
        <Box>
          <FormControl fullWidth>
            <label htmlFor="title">Tiêu đề</label>
            <TextField
              disabled={post?.supporterId}
              sx={{ mt: 0.5 }}
              id="title"
              value={titleEdit}
              onChange={onChangeTitle}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <label htmlFor="content">Nội dung</label>
            <TextField
              sx={{ mt: 0.5 }}
              id="content"
              disabled={post?.supporterId}
              value={contentEdit}
              multiline
              rows={6}
              onChange={onContentTitle}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <label htmlFor="deadline">Hạn cần giải quyết</label>
            <Box sx={{ mt: 0.5 }}>
              <SelectDeadline valueDate={deadline} setDateValue={setDeadline} />
            </Box>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onCloseDialog}>
          Huỷ
        </Button>
        <Button color="primary" variant="contained" onClick={onUpdatePost} disabled={loading}>
          Chỉnh sửa
        </Button>
      </DialogActions>
    </Dialog>
  );
};
