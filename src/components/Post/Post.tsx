import React, { useState } from "react";
import { useStyles } from "./Post.style";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
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
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.post}>
      <div className={classes.headerPost}>
        {/* header post */}
        <button className={classes.buttonDiscardMobile} onClick={handleDiscard}>
          <ArrowBackIosIcon />
        </button>

        {/* discard */}
        <h2 className={classes.titleHeader}>Create Post</h2>
        <div id="menu" className={classes.addOptionPostS} onClick={handleClick}>
          <MenuIcon />
        </div>
        <Menu id="menu" open={open} anchorEl={anchorEl} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            <AddPhotoAlternateIcon />
            Thêm ảnh
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <PriceChangeIcon />
            Thêm khoảng giá
          </MenuItem>
        </Menu>
      </div>
      <div className={classes.contentPost}>
        {/* content post */}
        <div className={classes.contentDetail}>
          {/* tiêu đề */}
          <div>
            <input className={classes.titlePost} placeholder="Tiêu đề ... "></input>
          </div>
          <div>
            <input className={classes.hashtagPost} placeholder="Hashtag ..."></input>
          </div>
          {/* hashtag */}
          {/* nội dung */}
          <div>
            <div className={classes.addOptionPostL}>
              <div className={classes.attachFilePost} onClick={handleAttachFilePostL}>
                <AttachFileIcon />
              </div>
              <div className={classes.insertPhotoPost} onClick={handleInsertPhoto}>
                <InsertPhotoIcon />
              </div>
              <div className={classes.priceChangePost} onClick={handleChangePrice}>
                <PriceChangeIcon />
              </div>
            </div>
            <textarea className={classes.contentDetailPost} placeholder="Nội dung ..."></textarea>
          </div>
        </div>
        <div className={classes.button}>
          <div className={classes.buttonPost} onClick={handlePost}>
            <Button variant="contained">Post</Button>
          </div>
          <div className={classes.buttonDiscardScreen} onClick={handleDiscard}>
            <Button variant="contained">Discard</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
