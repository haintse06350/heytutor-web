import React, { useState } from "react";
import { useStyles } from "./Post.style";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { styled } from "@mui/material/styles";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// begin change font
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
// end change font

export const Post = (props: any) => {
  const { openDialog, closeDialog } = props;
  const classes = useStyles();
  // const [open, setOpen] = useState(true);
  const [typePost, setTypePost] = useState();
  const [titlePost, setTitlePost] = useState("");
  const [contentPost, setContentPost] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [images, setImages]: any = useState([]);
  // begin change font event

  const [formats, setFormats] = React.useState(() => ["italic"]);

  const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setFormats(newFormats);
  };

  //   end change font event

  const handleClose = () => {
    // setOpen(false);
  };
  const handleChangeTypePost = (e: any) => {
    setTypePost(e.target.value);
  };

  const Input = styled("input")({
    display: "none",
  });

  const onUploadImage = ({ target }: any) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e: any) => {
      const prevImages = [...images];
      prevImages.push({ src: e.target.result } as any);
      setImages(prevImages);
    };
  };

  const onRemoveImage = (image: string, index: number) => {
    const newImages = images.filter((img: string, idx: number) => img !== image && idx !== index);
    setImages(newImages);
  };

  return (
    <Dialog open={openDialog} onClose={closeDialog} maxWidth="lg" fullWidth={true}>
      <DialogTitle>Tạo bài viết</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, minWidth: 200 }} className={classes.selectTypePost}>
          <InputLabel id="type-post">Kiểu bài đăng</InputLabel>
          <Select
            labelId="type-post"
            id="select-type-post"
            autoWidth
            value={typePost}
            onChange={(e) => handleChangeTypePost(e)}
            label="Kiểu bài đăng"
            required>
            <MenuItem value={1}>Hỏi bài</MenuItem>
            <MenuItem value={2}>Giúp đỡ người khác</MenuItem>
          </Select>
        </FormControl>
        <div className={classes.inputTitle}>
          <TextField
            autoFocus
            margin="dense"
            id="title-post"
            label="Tiêu đề"
            type="text"
            fullWidth
            variant="standard"
            value={titlePost}
            onChange={(e) => setTitlePost(e.target.value)}
          />
        </div>
        <div className={classes.inputHashTag}>
          <TextField
            margin="dense"
            id="hashtagPost"
            label="Hashtag"
            type="text"
            fullWidth
            variant="standard"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
          />
        </div>
        <div className={classes.inputSummary}>
          <TextField
            id="input-content-context"
            label="Nội dung"
            multiline
            rows={4}
            minRows={4}
            maxRows={20}
            fullWidth
            size="medium"
            variant="standard"
            value={contentPost}
            onChange={(e) => setContentPost(e.target.value)}
          />
        </div>
        <div className={classes.changeFont}>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              flexWrap: "wrap",
            }}>
            <StyledToggleButtonGroup size="small" value={formats} onChange={handleFormat} aria-label="text formatting">
              <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underlined" aria-label="underlined">
                <FormatUnderlinedIcon />
              </ToggleButton>
              <ToggleButton value="color" aria-label="color" disabled>
                <FormatColorFillIcon />
                <ArrowDropDownIcon />
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
        </div>
        <div className={classes.inputFile}>
          <label htmlFor="icon-button-file">
            <Input onChange={onUploadImage} accept="image/*" id="icon-button-file" type="file" />
            <IconButton aria-label="upload picture" component="span">
              <AddPhotoAlternateIcon sx={{ color: "black" }} fontSize="large" />
            </IconButton>
          </label>
        </div>
        {images.length > 0 && (
          <Grid container spacing={1} className={classes.listImg}>
            {images.map((img: any, index: number) => (
              <Grid item className={classes.imagePost} key={index}>
                <div className={classes.imageItemPost}>
                  <img className={classes.image} key={index} src={img.src} alt="img" />
                  <div className={classes.deleteButton} onClick={() => onRemoveImage(img, index)}>
                    <CloseIcon />
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy Đăng bài</Button>
        <Button onClick={handleClose}>Đăng bài</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Post;
