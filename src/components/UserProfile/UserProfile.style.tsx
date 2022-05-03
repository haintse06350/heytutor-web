import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles((theme) => ({
  root: {},
  wrap: {
    width: "100%",
    margin: "auto",
    fontFamily: "sans-serif",

    marginTop: "64px",
  },
  userHeader: {
    width: "100%",
    margin: "auto",
    "@media(max-width:1023px)": {
      alignItems: "center",
      textAlign: "center",
    },
  },
  header: {
    padding: 20,
    width: "100%",
    textAlign: "center",
    "@media(min-width:1024px)": {
      display: "flex",
    },
    "@media(max-width:1023px)": {
      display: "block",
    },
    "& > p": {
      marginTop: 9,
      fontWeight: "bold",
      fontSize: 22,
      color: "#222222",
      width: "100%",
    },
    color: "white",
  },
  avatar: {
    margin: "0 4%",
  },
  roundedAvt: {
    width: "128px !important",
    height: "128px !important",
    borderRadius: "50%",
    border: "3px solid #fff",
    objectFit: "cover",
    "@media(max-width:1023px)": {
      margin: "auto",
    },
    "@media(min-width:1024px)": {
      margin: "0",
    },
    "& > svg": {
      width: "80%",
      height: "80%",
    },
  },
  userSumarry: {
    alignItems: "center",
    "@media(min-width:1024px)": {
      textAlign: "start",
    },
    "@media(max-width:1023px)": {
      textAlign: "center",
    },
  },
  userName: {
    fontFamily: "sans-serif",
    fontSize: 24,
    fontWeight: 600,
  },
  userMajor: {
    "& > svg": {
      marginRight: 12,
    },
  },

  userRanking: {
    "@media(min-width:1024px)": {
      display: "flex",
    },
    "@media(max-width:1023px)": {
      display: "center",
    },
    "& > svg": {
      marginRight: 12,
    },
  },

  userStory: {
    justifyContent: "center",
    height: 40,
    display: "flex",
    "& > svg": {
      position: "relative",
      top: 5,
    },
    "& > textarea": {
      background: "transparent",
      textAlign: "start",
      position: "relative",
      fontSize: "17px",
      wordWrap: "break-word",
      border: "none",
      width: 200,
      minWidth: 300,
      maxWidth: 400,
      height: 100,
      minHeight: 50,
      maxHeight: 50,
      resize: "none",
      color: "white",
      marginLeft: "11px",
      "&:focus": {
        outline: "none",
      },
    },
  },
  countLenght: {
    width: "fit-content",
    fontSize: 12,
    position: "relative",
    top: 20,
  },

  userView: {
    display: "flex",
    marginLeft: "5vw",
    marginRight: "5vw",
  },
  buttonFixStory: {
    margin: 10,
    padding: 10,
    "& > Button": {
      "@media(min-width:1024px)": {
        marginTop: "65px",
      },
    },
  },
  storyInput: {},
  userPosted: {},
  userReview: {},
  name: {},
}));
