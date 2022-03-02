import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  feedback: {
    fontFamily: "sans-serif",
    background: "#f6f6f7",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
  },
  middleBox: {
    background: "#33ccff",
    paddingBottom: "10px",
    height:"640px"
  },
  bottomBox: {
    background: "#33ccff",
    paddingTop: "10px",
    paddingBottom: "10px"
  },
  image: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 0,
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
    overflow: "scroll",
    marginBottom: 40,
    // marginTop: 48,
    "@media(min-width: 812px)": {},
    "@media(max-width: 811px)": {},
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
    padding: "0px 16px",
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
  priceChangePost: {
    marginLeft: 30,
    "@media(min-width: 812px)": {},
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
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonPostScreen: {
    "@media(min-width: 812px)": {},
    "@media(max-width: 811px)": { display: "none" },
  },
  buttonDiscardScreen: {
    "@media(min-width: 812px)": {
      marginLeft: 20,
      alignItems: "center",
    },
    "@media(max-width: 811px)": {
      display: "none",
    },
  },
  loading: {
    position: "absolute",
    zIndex: 99,
    top: "25%",
    left: "50%",
  },
}));
