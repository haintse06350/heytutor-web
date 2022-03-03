import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  headerWrap: {
    "@media(max-width:1024px)": {
      display: "none",
    },
    // position: "fixed",
    // zIndex: 100,
    width: "100%",
  },
  headerTitle: {
    cursor: "pointer",
  },

  headerMenu: {
    display: "block",
  },
  searchDialog: {
    width: "50%",
    flexWrap: "nowrap",
    height: "auto",
    zIndex: 10,
    background: "#FFFFFF",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: "3% !important",
  },
  search: {
    "& > div": {
      background: "#fff",
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
        backgroundColor: "#fff",
        padding: 0,
      },
    },
  },
  noBorder: {
    border: "none",
    borderStyle: "unset !important",
  },
}));
