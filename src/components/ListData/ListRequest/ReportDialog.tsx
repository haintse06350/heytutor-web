import React from "react";
import { Radio, Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, TextField } from "@mui/material";
import { ConfirmDialog } from "../../Common/ConfirmDialog/ConfirmDialog";
import { styled } from "@mui/material/styles";
import { useStyles } from "./ResultContent.style";

export const ReportDialog = (props: any) => {
  const { type, loadingConfirm, confirmAction, onCloseReportDialog, itemClicked } = props;
  const classes = useStyles();
  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
        : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: theme.palette.mode === "dark" ? "rgba(57,75,89,.5)" : "rgba(206,217,224,.5)",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#00AB55",
    backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#00AB55",
    },
  });

  const BpRadio = (props: any) => {
    return (
      <Radio
        sx={{
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  };

  const UnRegisterContent = () => {
    return (
      <Box>
        <FormControl>
          <FormLabel classes={{ root: classes.formLabel }} id="unregister">
            Lý do
          </FormLabel>
          <RadioGroup aria-labelledby="demo-customized-radios" name="customized-radios">
            <FormControlLabel
              classes={{ label: classes.formLabel }}
              value="no-reply"
              control={<BpRadio />}
              label="Không trả lời tin nhắn"
            />
            <FormControlLabel
              classes={{ label: classes.formLabel }}
              value="no-pay"
              control={<BpRadio />}
              label="Không trả thù loa như thoả thuận"
            />
            <FormControlLabel
              classes={{ label: classes.formLabel }}
              value="change-deal"
              control={<BpRadio />}
              label="Thay đổi thù lao không giống thoả thuận ban đầu"
            />
          </RadioGroup>
        </FormControl>
        <TextField multiline fullWidth rows={4} sx={{ mt: 2.5 }} placeholder="Lý do khác" />
      </Box>
    );
  };

  const ReportContent = () => {
    return (
      <Box>
        <FormControl>
          <FormLabel classes={{ root: classes.formLabel }} id="demo-customized-radios">
            Lý do
          </FormLabel>
          <RadioGroup defaultValue="female" aria-labelledby="demo-customized-radios" name="customized-radios">
            <FormControlLabel
              classes={{ label: classes.formLabel }}
              value="word"
              control={<BpRadio />}
              label="Bài viết chứa từ ngữ không hợp lệ"
            />
            <FormControlLabel
              classes={{ label: classes.formLabel }}
              value="duplicate"
              control={<BpRadio />}
              label="Bài viết trùng lặp"
            />
            <FormControlLabel
              classes={{ label: classes.formLabel }}
              value="other"
              control={<BpRadio />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>
        <TextField multiline fullWidth rows={4} sx={{ mt: 2.5 }} placeholder="Lý do khác" />
      </Box>
    );
  };

  return (
    <ConfirmDialog
      dialogTitle={
        <Box>
          <Typography variant="h6">Báo cáo bài viết cho quản trị viên</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }} noWrap>
            {itemClicked?.title}
          </Typography>
        </Box>
      }
      dialogContent={type === "unregister-confirm" ? <UnRegisterContent /> : <ReportContent />}
      confirmAction={confirmAction}
      cancelAction={onCloseReportDialog}
      open={type === "unregister-confirm" || type === "report"}
      loadingConfirm={loadingConfirm}
      onClose={onCloseReportDialog}
    />
  );
};
