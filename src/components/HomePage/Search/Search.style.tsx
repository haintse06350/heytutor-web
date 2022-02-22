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
}));
