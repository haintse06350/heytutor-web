import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  container: {
    position: "relative",
    padding: 16,
    marginBottom: 62,
    width: "100%",
    minWidth: "100vw",
    height: "calc(100% - 62px)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },

  btnResolve: {},

  searchIcon: {
    width: 20,
  },
  noBorder: {
    border: "none",
    borderStyle: "unset !important",
  },
  content: {
    width: "100%",
    marginTop: 10,
  },
  tabContent: {
    display: "flex",
    position: "sticky",
    "& > p": {
      fontSize: 18,
      fontWeight: 700,
      textAlign: "left",
      color: "#666666",
      marginRight: 16,
    },
  },
  searchDialogScreen: {
    "@media(min-width:1024px)": {
      display: "none !important",
    },
    width: "100%",
    flexWrap: "nowrap",
    height: "auto",
    zIndex: 10,
    background: "#FFFFFF",
    alignItems: "center",
    borderRadius: 8,
  },
  active: {
    color: "#0288d1 !important",
    textDecoration: "underline",
  },
  homeContent: {
    width: "100%",
    height: "auto",
    display: "flex",
  },
  listPost: {
    marginTop: 20,
    zIndex: 20,
    width: "100%",
    maxWidth: "calc(100vw - 20%)",
    margin: "0 auto",
    borderRadius: 8,
    "@media(min-width:600)": {
      marginLeft: "calc(50% - 250px)",
    },
  },
  post: {
    width: "100%",
    height: "auto",
    backgroundColor: "#fff",
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
    height: "calc(100% - 40px)",
    marginTop: 8,
    position: "relative",
    "& > p": {
      textAlign: "left",
      "&:first-child": {
        fontWeight: 500,
      },
    },
  },
  mainContent: {
    marginTop: 10,
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
        justifyContent: "flex-start",
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
    height: "100vh",
    margin: "0 20px",
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
  inputComment: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: "40px",
    "& > Button": {
      width: "10%",
      height: "5%",
      marginTop: "10px",
    },
    "& > div": {
      width: "70%",
      marginRight: "40px",
    },
  },
  loading: {
    width: "100%",
    position: "absolute",
    top: "50%",
    right: "50%",
    transform: "translate(50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  hashTag: {
    width: "100%",
    marginTop: 10,
    color: "#0288d1",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "auto",
  },
  hashTagItem: {
    backgroundColor: "#f4f4f5",
    border: "1px solid #e9e9eb",
    color: "#909399",
    padding: "0px 5px",
    borderRadius: 8,
    marginRight: 8,
    cursor: "pointer",
    "& > p": {
      textAlign: "left",
    },
  },
  bookmark: {
    backgroundColor: "#5488c7",
    border: "1px solid #5488c7",
    color: "#fff",
  },
  event: {
    backgroundColor: "#fea3b8",
    border: "1px solid #fd4e73",
    color: "#fff",
  },
  commentSection: {
    marginTop: 20,
  },
  commentItem: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  commentRow: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  commentContent: {
    marginLeft: 8,
    background: "#F8F8F8",
    padding: 8,
    borderRadius: 12,
    position: "relative",
    "& > p:first-child": {
      fontSize: 16,
      fontWeight: 500,
    },
    "& > div": {
      position: "absolute",
      top: 3,
      right: 10,
    },
    "& > Button": {
      width: "100%",
    },
  },

  commentAt: {
    "& > p": {
      fontSize: 14,
      color: "#727477",
      textAlign: "left",
      marginTop: 4,
      marginLeft: 20,
    },
  },
  isResolve: {
    display: "flex",
    "& > p": {
      marginLeft: 5,
    },
  },

  // chatListEngine: {
  //   position: "absolute",
  //   width: 500,
  //   height: "auto",
  //   right: 0,
  //   "@media(max-width:1500px)": {
  //     display: "none",
  //   },
  // },
}));
