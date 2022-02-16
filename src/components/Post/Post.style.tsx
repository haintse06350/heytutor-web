import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  post: {
    fontFamily: "sans-serif",
    // position: "relative",
    background: "#f6f6f7",
    width: "100vw",
    height: "100vh",
  },
  headerPost: {
    display: "flex",
    width: "100%",
    textAlign: "center",
    background: "#1976d2",
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
    height: 24,
    padding: 25,
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
    overflow: "hidden",
    "@media(min-width: 812px)": {},
    "@media(max-width: 811px)": {},
  },
  contentDetail: {
    width: "90%",
    height: "auto",
    margin: "0 auto",
  },
  titlePost: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    border: "1px solid #dcdfe6",
    margin: "10px 0",
    paddingLeft: 15,
    marginLeft: -15,
    "@media(min-width: 812px)": {},
    "@media(max-width: 811px)": {},
  },
  hashtagPost: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    border: "1px solid #dcdfe6",
    paddingLeft: 15,
    marginLeft: -15,
    margin: "10px 0",

    "@media(max-width: 811px)": {},
  },
  addOptionPostL: {
    "@media(min-width: 812px)": { display: "flex" },
    "@media(max-width: 811px)": { display: "none" },
  },
  textIcon: {
    marginLeft: 20,
  },

  attachFilePost: {
    "@media(min-width: 812px)": { marginLeft: -20 },
    "@media(max-width: 811px)": {
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  insertPhotoPost: {
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
    "@media(min-width: 812px)": {},
    "@media(max-width: 811px)": {
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  contentDetailPost: {
    width: "100%",
    minHeight: 300,
    height: "30vh",
    margin: "10px 0",
    paddingLeft: 15,
    paddingTop: 15,
    marginLeft: -15,
    fontSize: 16,
  },
  button: { display: "flex", justifyContent: "center" },

  buttonDiscardScreen: {
    "@media(min-width: 812px)": {
      marginLeft: 20,
    },
    "@media(max-width: 811px)": {
      display: "none",
    },
  },
}));
