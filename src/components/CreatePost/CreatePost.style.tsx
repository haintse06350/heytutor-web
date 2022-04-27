import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  post: {
    fontFamily: "sans-serif",
    background: "#f6f6f7",
    width: "100%",
    height: "calc(100vh - 62px)",
    justifyContent: "center",
    marginTop: "64px",
  },
  listImg: {
    width: "100%",
    padding: "0px 10px",
    display: "flex",
    paddingLeft: 15,
  },
  imagePost: {
    maxWidth: 100,
    minWidth: 100,
    minHeight: 100,
    maxHeight: 100,
    width: 100,
    height: 100,
    marginTop: 5,
    // marginRight: 5,

    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: 16,
    right: 6,
    width: 20,
    height: 20,
    background: "#fff",
    borderRadius: "50%",
    opacity: 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > svg": {
      width: "80%",
      height: "80%",
    },
  },
  headerPost: {
    display: "flex",
    width: "100%",
    textAlign: "center",
    background: "#1976d2",
    alignItems: "center",
    // position: "fixed",
    "@media(min-width: 812px)": {
      height: 48,
    },
    "@media(max-width:811px)": {
      height: 48,
    },
  },
  titleHeader: {
    width: "50%",
    margin: "1vh auto",
    color: "white",
    "@media(max-width: 811px)": {
      fontSize: 22,
    },
  },
  buttonDiscardMobile: {
    width: "25%",
    height: "100%",
    paddingTop: 8,
    "@media(min-width: 812px)": {
      display: "none",
    },
  },
  buttonPostdMobile: {
    width: "25%",
    height: "100%",
    paddingTop: 8,
    "@media(min-width: 812px)": {
      display: "none",
    },
  },

  addOptionPostS: {
    "@media(min-width: 812px)": {
      display: "none",
    },
    "@media(max-width: 811px)": {
      width: "25%",
      height: 24,
      padding: 25,
      position: "relative",
    },
  },
  addOptionDetailPostS: {
    "@media(min-width: 812px)": { display: "none" },
    "@media(max-width: 811px)": {
      position: "absolute",
      boxShadow: "revert",
      top: "5vh",
      right: "10vw",
      width: "30vw",
      height: "fit-content",
      backgroundColor: "#f6f6f7",
      border: "1px solid black",
    },
  },
  textOptionPost: {
    marginLeft: 5,
  },
  contentPost: {
    width: "100%",
    background: "#f6f6f7",
    marginBottom: 40,
  },
  contentDetail: {
    width: "100%",
    height: "auto",
    margin: "0 auto",
    padding: "0px 16px",
  },
  titlePost: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    border: "1px solid #dcdfe6",
    margin: "10px 0",
    padding: "0px 15px",
    "@media(min-width: 812px)": {},
    "@media(max-width: 811px)": {},
  },
  hashtagPost: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    border: "1px solid #dcdfe6",
    padding: "0px 15px",
    margin: "10px 0",
    "@media(max-width: 811px)": {},
  },
  addOptionPostL: {
    display: "flex",
  },
  textIcon: {
    marginLeft: 20,
  },

  attachFilePost: {
    "@media(min-width: 812px)": {
      marginLeft: -20,
      justifyContent: "center",
      alignItems: "center",
    },
    "@media(max-width: 811px)": {
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  insertPhotoPost: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& > span": {
      fontSize: 12,
      fontWeight: 500,
    },
    "@media(min-width: 812px)": {
      marginLeft: 5,
      marginRight: 15,
    },
    "@media(max-width: 811px)": {
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
  },

  contentDetailPost: {
    width: "100%",
    minHeight: 200,
    height: "30vh",
    margin: "10px 0",
    padding: 15,
    fontSize: 16,
    "&:active": {
      border: "1px solid green",
    },
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonPostScreen: { marginTop: 20 },
  buttonDiscardScreen: {
    marginLeft: 20,
    alignItems: "center",
    marginTop: 20,
  },
  loading: {
    position: "absolute",
    zIndex: 99,
    top: "25%",
    left: "50%",
  },
  input: {
    fontSize: 14,
    fontWeight: 500,
    "& > div": {
      fontSize: 14,
      fontWeight: 500,
    },
    "& > div > textarea": {
      fontSize: 14,
      fontWeight: 500,
    },
    "& > div > input": {
      fontSize: 14,
      fontWeight: 500,
    },
  },
  selectPlaceholder: {
    color: "#919eab",
    fontSize: 14,
    fontWeight: 500,
    "& > input": {
      color: "#919eab",
    },
  },
  image: {
    width: 150,
    height: 100,
    position: "relative",
    "& > img": {
      width: "100%",
      height: "100%",
      borderRadius: 4,
    },
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 4,
    top: 0,
    "&:hover": {
      display: "block",
      backgroundColor: "rgba(9, 30, 66, 0.5)",
    },
  },
  removeImage: {
    position: "absolute",
    bottom: 6,
    right: 6,
  },
}));
