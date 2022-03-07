import React, { useState } from "react";
import { useStyles } from "./CreateEvent.style";
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
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
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

export const CreateEvent = (props: any) => {
  const { openDialog, closeDialog } = props;
  const classes = useStyles();
  // const [open, setOpen] = useState(true);
  const [typeCreateEvent, setTypeCreateEvent] = useState();
  const [titleCreateEvent, setTitleCreateEvent] = useState("");
  const [contentCreateEvent, setContentCreateEvent] = useState("");
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
  const handleChangeTypeCreateEvent = (e: any) => {
    setTypeCreateEvent(e.target.value);
  };

  const onRemoveImage = (image: string, index: number) => {
    const newImages = images.filter((img: string, idx: number) => img !== image && idx !== index);
    setImages(newImages);
  };

  const [department, setDepartmentValue] = React.useState("2");
  const handleDepartmentValue = (event: any) => {
    setDepartmentValue(event.target.value);
  };

  const [subject, setSubjectValue] = React.useState("2");
  const handleSubjectValue = (event: any) => {
    setSubjectValue(event.target.value);
  };

  const current = new Date();
  const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
  const [value, setValue] = React.useState(date);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Dialog open={openDialog} onClose={closeDialog} maxWidth="lg" fullWidth={true}>
      <DialogTitle>Tạo bài viết</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, minWidth: 200 }} className={classes.selectTypeCreateEvent}>
          <InputLabel id="type-CreateEvent">Kiểu bài đăng</InputLabel>
          <Select
            labelId="type-CreateEvent"
            id="select-type-CreateEvent"
            autoWidth
            value={typeCreateEvent}
            onChange={(e) => handleChangeTypeCreateEvent(e)}
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
            id="title-CreateEvent"
            label="Tiêu đề"
            type="text"
            fullWidth
            variant="standard"
            value={titleCreateEvent}
            onChange={(e) => setTitleCreateEvent(e.target.value)}
          />
        </div>
        <div className={classes.inputHashTag}>
          <TextField
            margin="dense"
            id="hashtagCreateEvent"
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
            value={contentCreateEvent}
            onChange={(e) => setContentCreateEvent(e.target.value)}
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
        <div>
          <div>
            <div className={classes.title}>
              <h3>Khối ngành</h3>
            </div>
            <Select
              autoFocus
              value={department}
              onChange={handleDepartmentValue}
              inputProps={{
                name: "departmentValue",
                id: "departmentValue",
              }}>
              <MenuItem value="1">SE</MenuItem>
              <MenuItem value="2">IS</MenuItem>
              <MenuItem value="3">MKT</MenuItem>
            </Select>
          </div>
        </div>

        <div>
          <div className={classes.title}>
            <h3>Môn học</h3>
          </div>
          <Select
            autoFocus
            value={subject}
            onChange={handleSubjectValue}
            inputProps={{
              name: "subjectValue",
              id: "subjectValue",
            }}>
            <MenuItem value="1">CDS</MenuItem>
            <MenuItem value="2">MAS</MenuItem>
            <MenuItem value="3">PMG</MenuItem>
          </Select>
        </div>

        <div>
          <div className={classes.title}>
            <h3>Chọn thời gian của sự kiện</h3>
          </div>
          <h4>Thời gian bắt đầu</h4>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Start"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <h4>Thời gian kết thúc</h4>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="End"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        {images.length > 0 && (
          <Grid container spacing={1} className={classes.listImg}>
            {images.map((img: any, index: number) => (
              <Grid item className={classes.imageCreateEvent} key={index}>
                <div className={classes.imageItemCreateEvent}>
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
        <Button variant="text" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Tạo sự kiện
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEvent;
