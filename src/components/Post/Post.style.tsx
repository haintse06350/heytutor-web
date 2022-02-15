import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  post: {
    fontFamily: "sans-serif",
    // position: "relative",
    "@media(max-width: 811px)": {},
    "@media(min-width: 812px)": {},
  },
  headerPost: {
    display: "flex",
    width: "100%",
    textAlign: "center",
    background: "#f6f6f7",
    "@media(min-width: 812px)": {
      height: 48,
    },
    "@media(max-width:811px)": {
      height: 48,
    },
  },
  buttonDiscardMobile: {
    display: "inline-block",
    width: "25%",
    height: 48,
    background: "#f6f6f7",
    "@media(min-width: 812px)": {
      display: "none",
    },
    "@media(max-width: 811px)": {
      fontSize: 24,
      border: "none",
    },
  },
  titleHeader: {
    width: "50%",
    margin: "1vh auto",
  },
  addOptionPostS: {
    "@media(min-width: 812px)": {
      display: "none",
    },
    "@media(max-width: 811px)": {
      width: "25%",
      height: 24,
      margin: "5px auto",
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
      marginLeft: "1vw",
      marginTop: "1vh",
    },
  },
  insertPhotoPost: {
    "@media(min-width: 812px)": {
      marginLeft: 5,
      marginRight: 15,
    },
    "@media(max-width: 811px)": {
      display: "flex",
      marginTop: "1vh",
      marginLeft: "1vw",
    },
  },
  priceChangePost: {
    "@media(min-width: 812px)": {},
    "@media(max-width: 811px)": {
      marginTop: "1vh",
      marginLeft: "1vw",
      display: "flex",
    },
  },
  contentDetailPost: {
    width: "100%",
    minHeight: 300,
    height: "65vh",
    margin: "10px 0",
    paddingLeft: 15,
    paddingTop: 15,
    marginLeft: -15,
  },
  buttonPost: {
    "@media(min-width: 812px)": {
      width: 200,
      height: 50,
      marginRight: "10vw",
      marginBottom: "1.7vh",
    },
    "@media(max-width: 811px)": {
      display: "block",
      width: "20vw",
      height: "5vh",
      marginTop: "2vh",
      marginBottom: "4vh",
      marginLeft: "40%",
    },
  },
  buttonDiscardScreen: {
    "@media(min-width: 812px)": {
      width: 200,
      height: 50,
    },
    "@media(max-width: 811px)": {
      display: "none",
    },
  },
}));
