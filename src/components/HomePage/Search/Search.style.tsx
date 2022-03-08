import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  searchContainer: {
    padding: 16,
    height: "100vh",
    width: "100vw",
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
  noBorder: {
    border: "none",
    borderStyle: "unset !important",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    "& > p": {
      marginLeft: 8,
      color: "#0288d1",
    },
  },
  searchResult: {
    width: "100%",
    height: "100%",
  },
  centerView: {
    width: "100%",
    position: "absolute",
    top: "50%",
    right: "50%",
    transform: "translate(50%, -50%)",
    textAlign: "center",
    "& > p": {
      fontSize: 16,
      fontWeight: 700,
    },
    "& > span": {
      fontSize: 14,
      fontWeight: 14,
    },
  },
  filter: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  formSelect: {
    width: "100%",
    position: "relative",
    "& > div": {
      margin: "10px 20px 10px 0",
    },
    "& > Button": {
      position: "absolute",
      bottom: 12,
    },
  },
  filterItemContainer: { display: "flex" },
  filterItem: {
    width: "auto",
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    borderRadius: 16,
    padding: 14,
    background: "#F8F8F8",
  },
  active: {
    background: "#0288d1",
    color: "#fff",
  },
  listResult: {
    marginTop: 20,
  },
  countResult: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: "14px",
    letterSpacing: -0.2,
    fontWeight: 700,
    color: "#000",
  },
  resultItem: {
    padding: 8,
    width: "100%",
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    display: "flex",
  },
  postUser: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
    "& > div": {
      position: "absolute",
      top: 5,
    },
  },
  postContent: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& > p:nth-child(1)": {
      color: "#0288d1",
    },
    "& > p:nth-child(2)": {
      fontSize: 12,
      lineHeight: "16px",
      letterSpacing: -0.2,
      fontWeight: 400,
      color: "#727477",
    },
  },
  postReaction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "& > div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      "& > svg": {
        width: 20,
        height: 20,
      },
      "& > span": {
        marginLeft: 4,
        fontSize: 14,
        lineHeight: "16px",
        letterSpacing: -0.2,
        fontWeight: 400,
        color: "#727477",
      },
    },
  },
  hashTag: {
    margin: "4px 0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "& > span": {
      marginRight: 4,
      fontSize: 14,
      lineHeight: "16px",
      letterSpacing: -0.2,
      fontWeight: 400,
      backgroundColor: "#bfbebe",
      color: "#727477",
      borderRadius: 4,
      padding: 3,
    },
  },
  button: {
    margin: "5px 0",
    "& > Button": {
      marginLeft: 12,
    },
  },
  previewProfileContent: {
    width: "100%",
    height: 42,
  },
}));
