import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  moreBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
  postContent: {},

  commentButton: {},
  inputComment: {
    position: "relative",
    "& > div": {
      maxWidth: "80%",
      width: "80%",
      marginRight: "20px",
      "@media(max-width: 510px)": {
        width: "210px",
      },
    },
    "& > Button": {
      width: "fit-content",
      position: "absolute",
      top: "25%",
      "@media(max-width: 510px)": {
        right: 0,
      },
    },
  },
}));
