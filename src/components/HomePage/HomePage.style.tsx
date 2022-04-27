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
  },
  wrapHomePage: { position: "relative" },
  wrapWarningUser: {
    position: "fixed",
    top: 70,
    right: 10,
  },
  notiBox: {
    border: "1px solid black",
    borderRadius: "8px 8px 50% 50% ",
    backgroundColor: "black",
    color: "#fff",
    width: "120px",
    height: "fit-content",
    "& > p": {
      alignItems: "center",
      textAlign: "center",
      fontSize: "12px",
      padding: 12,
    },
  },
  quickNoti: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: 8,
    background: "#ffffff",
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
