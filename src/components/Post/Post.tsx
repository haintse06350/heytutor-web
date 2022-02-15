import React, { useState } from "react";
import { useStyles } from "./Post.style";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
export const Post = () => {
  const classes = useStyles();
  const [toggleAttachFile, setToggleAttachFile] = useState(false);
  const handleAttachFilePostS = () => {
    setToggleAttachFile(!toggleAttachFile);
  };
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

  return (
    <div className={classes.post}>
      <div className={classes.headerPost}>
        {/* header post */}
        <button className={classes.buttonDiscardMobile} onClick={handleDiscard}>
          Discard
        </button>{" "}
        {/* discard */}
        <h2 className={classes.titleHeader}>Create Post</h2>
        <div className={classes.addOptionPostS} onClick={handleAttachFilePostS}>
          <AttachFileIcon fontSize="large" />
        </div>
        {toggleAttachFile && (
          <div className={classes.addOptionDetailPostS}>
            <div className={classes.attachFilePost} onClick={handleAttachFilePostL}>
              <AttachFileIcon fontSize="large" />
              <p className={classes.textIcon}>Thêm file</p>
            </div>
            <div className={classes.insertPhotoPost} onClick={handleInsertPhoto}>
              <InsertPhotoIcon fontSize="large" /> <p className={classes.textIcon}>Thêm ảnh</p>
            </div>
            <div className={classes.priceChangePost} onClick={handleChangePrice}>
              <PriceChangeIcon fontSize="large" /> <p className={classes.textIcon}>Chọn giá</p>
            </div>
          </div>
        )}
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
                <AttachFileIcon fontSize="large" />
              </div>
              <div className={classes.insertPhotoPost} onClick={handleInsertPhoto}>
                <InsertPhotoIcon fontSize="large" />
              </div>
              <div className={classes.priceChangePost} onClick={handleChangePrice}>
                <PriceChangeIcon fontSize="large" />
              </div>
            </div>
            <textarea className={classes.contentDetailPost} placeholder="Nội dung ..."></textarea>
          </div>
        </div>
        <div className={classes.button}>
          <button className={classes.buttonPost} onClick={handlePost}>
            {/* button post*/}
            Post
          </button>
          <button className={classes.buttonDiscardScreen} onClick={handleDiscard}>
            {/* button post*/}
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
