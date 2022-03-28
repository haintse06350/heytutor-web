import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  btnHideContentMyPost: {
    position: "relative",
    "& > div:nth-child(2)": {
      position: "absolute",
      right: 0,
    },
  },
  headerEvent: {
    "& > img": {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: 8,
    },
  },
  rootEventList: {
    marginTop: 64,
    "& > div": {
      backgroundColor: "#fff",
    },
  },
  titleEvent: {
    cursor: "pointer",
    textDecoration: "underline",
    lineHeight: "40px",
  },
  wrapHomePage: { position: "relative" },
  wrapWarningUser: {
    position: "fixed",
    top: 70,
    right: 10,

    "& > div": {
      border: "1px solid black",
      borderRadius: "8px 8px 50% 50% ",
      backgroundColor: "black",
      color: "#fff",
      width: "140px",
      height: 100,
      "& > p": {
        alignItems: "center",
        textAlign: "center",
      },
    },
  },
}));
