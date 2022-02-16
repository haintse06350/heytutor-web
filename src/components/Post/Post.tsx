import React, { useState } from "react";
import { useStyles } from "./Post.style";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";

export const Post = () => {
  const classes = useStyles();
  // const [toggleAttachFile, setToggleAttachFile] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [title, setTitle] = useState("");
  const [hashTag, setHashTag] = useState("");
  const [content, setContent] = useState("");
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleAttachFilePostS = () => {
  //   setToggleAttachFile(!toggleAttachFile);
  // };
  const handleDiscard = () => {
    console.log("discard clicked");
  };
  const handleAttachFilePostL = () => {
    console.log("attach large clicked");
  };
  const handleInsertPhoto = () => {
    console.log("insert photo clicked");
  };
  const handleChangePrice = () => {
    console.log("change price clicked");
  };
  const handlePost = () => {
    console.log("Post clicked");
    console.log(title, hashTag, content);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.post}>
      <div className={classes.headerPost}>
        {/* header post */}
        <Button variant="text" size="large">
          <div className={classes.buttonDiscardMobile} onClick={handleDiscard}>
            <ArrowBackIosIcon fontSize="small" sx={{ color: "white" }} />
          </div>
        </Button>

        {/* discard */}
        <h2 className={classes.titleHeader}>Tạo bài viết</h2>
        <Button variant="text" size="large" onClick={handleClick}>
          <div id="menu" className={classes.addOptionPostS}>
            <MenuIcon sx={{ color: "white" }} />
          </div>
        </Button>
        <Menu id="menu" open={open} anchorEl={anchorEl} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            <AddPhotoAlternateIcon />
            <p className={classes.textOptionPost}>Thêm ảnh</p>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <PriceChangeIcon />
            <p className={classes.textOptionPost}>Thêm khoảng giá</p>
          </MenuItem>
        </Menu>
      </div>
      <div className={classes.contentPost}>
        {/* content post */}
        <div className={classes.contentDetail}>
          {/* tiêu đề */}
          <div>
            <input
              className={classes.titlePost}
              placeholder="Tiêu đề ... "
              value={title}
              onChange={(e) => setTitle(e.target.value)}></input>
          </div>
          <div>
            <input
              className={classes.hashtagPost}
              placeholder="Hashtag(gắn thẻ) ..."
              value={hashTag}
              onChange={(e) => setHashTag(e.target.value)}></input>
          </div>
          {/* hashtag */}
          {/* nội dung */}
          <div>
            <div className={classes.addOptionPostL}>
              <div className={classes.attachFilePost} onClick={handleAttachFilePostL}>
                <AttachFileIcon />
              </div>
              <div className={classes.insertPhotoPost} onClick={handleInsertPhoto}>
                <AddPhotoAlternateIcon />
              </div>
              <div className={classes.priceChangePost} onClick={handleChangePrice}>
                <PriceChangeIcon />
              </div>
            </div>
            <textarea
              className={classes.contentDetailPost}
              placeholder="Nội dung ..."
              rows={5}
              cols={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
        </div>
        <div className={classes.button}>
          <div className={classes.buttonPost} onClick={handlePost}>
            <Button variant="contained">Đăng bài</Button>
          </div>
          <div className={classes.buttonDiscardScreen} onClick={handleDiscard}>
            <Button variant="contained">Hủy đăng bài</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
