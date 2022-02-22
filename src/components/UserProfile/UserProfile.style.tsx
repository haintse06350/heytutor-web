import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles((theme) => ({
  root: {},
  wrap: {
    width: "100%",
    margin: "auto",
    fontFamily: "sans-serif",
  },
  userHeader: {
    width: "100%",
    margin: "auto",
  },
  header: {
    padding: 20,
    width: "100%",
    textAlign: "center",
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
    width: 128,
    height: 128,
    margin: "auto",
  },
  roundedAvt: {
    width: "128px !important",
    height: "128px !important",
    borderRadius: "50%",
    border: "3px solid #fff",
    objectFit: "cover",
    "& > svg": {
      width: "80%",
      height: "80%",
    },
  },
  userSumarry: {
    textAlign: "center",
    alignItems: "center",
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
    // color: "liner-gradient(to right, blue, green)",
    "& > svg": {
      marginRight: 12,
    },
  },

  userStory: {
    justifyContent: "center",
    height: 40,
    display: "flex",
    "& > svg": {
      margin: "0 12px",
      position: "relative",
      top: 5,
    },
    "& > textarea": {
      background: "transparent",
      textAlign: "center",
      position: "relative",
      fontSize: 15,
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
      top: -4,
      marginLeft: 15,
    },
  },
  storyInput: {},
  userPosted: {},
  userReview: {},
  name: {},
}));
