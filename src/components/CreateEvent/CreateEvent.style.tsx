import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(
  () => ({
    hashtag: {},
    title: {
      color:"blue"
    },
    
  contentDetailPost: {
    width: "100%",
    minHeight: 200,
    height: "30vh",
    margin: "10px 0",
    padding: 15,
    fontSize: 16,
  },
    userPanel: {
      "& > div": {
        "&:first-child": {
          maxWidth: 43,
          margin: 0,
          borderRadius: "50%",
          border: "1px solid #0288d1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        "&:nth-child(2)": {
          marginLeft: 10,
        },
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        "&:last-child": {
          alignItems: "flex-end",
        },
      },
    },
    userAvatar: {
      width: 43,
      height: 43,
    },
    userNameAndPostTime: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      "& > p:nth-child(1)": {
        fontSize: 16,
        lineHeight: "16px",
        letterSpacing: -0.2,
        fontWeight: 700,
        color: "#0288d1",
      },
      "& > p:nth-child(2)": {
        marginTop: 4,
        fontSize: 12,
        lineHeight: "16px",
        letterSpacing: -0.2,
        fontWeight: 400,
        color: "#727477",
      },
    },
    content: {
      width: "100%",
      "& > p:first-child": {
        fontSize: 18,
        fontWeight: 700,
        textAlign: "left",
        color: "#0288d1",
      },
    },
    postContent: {
      width: "100%",
      height: "auto",
      marginTop: 10,
      "& > p": {
        textAlign: "left",
      },
    },
    postActions: {
      marginTop: 30,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      "& > div": {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        "&:last-child": {
          justifyContent: "flex-end",
        },
        "& > div": {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginRight: 20,
          "&:last-child": {
            margin: 0,
          },
          "& > p": {
            marginLeft: 6,
          },
        },
      },
    },
  }),
  { index: 1 }
);
