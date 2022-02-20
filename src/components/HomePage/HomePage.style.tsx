import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(
  () => ({
    container: {
      padding: 16,
      marginBottom: 62,
    },
    searchDialog: {
      width: "100%",
      flexWrap: "nowrap",
      height: 60,
      zIndex: 10,
      background: "#FFFFFF",
      alignItems: "center",
    },
    search: {
      "& > div": {
        background: "#F8F8F8",
        minHeight: 36,
        height: 46,
        padding: `3px 16px`,
        fontSize: "0.75rem",
        boxSizing: "border-box",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        "& > input": {
          color: "#3C3C43",
          fontSize: 17,
          fontWeight: 400,
          border: "unset",
          backgroundColor: "#F8F8F8",
          padding: 0,
        },
      },
    },
    searchIcon: {
      width: 20,
    },
    noBorder: {
      border: "none",
      borderStyle: "unset !important",
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
    listPost: {
      marginTop: 20,
    },
    post: {
      width: "100%",
      height: "auto",
      backgroundColor: "#F8F8F8",
      padding: 15,
      borderRadius: 8,
      marginBottom: 16,
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
    dialogContent: {
      padding: 16,
    },
    dialogHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    backBtn: {
      "& > svg": {
        width: 20,
        height: 20,
      },
    },
    moreBtn: {
      display: "flex",
      justifyContent: "flex-end",
    },
    postTitle: {
      textAlign: "center",
      "& > p": {
        fontSize: 16,
        fontWeight: 500,
        color: "#0288d1",
      },
    },
    simpleActions: {
      marginTop: "30px !important",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& > div": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  }),
  { index: 1 }
);
