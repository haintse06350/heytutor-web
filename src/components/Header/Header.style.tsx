import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  headerWrap: {
    "@media(max-width:1024px)": {
      display: "none",
    },
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
    marginLeft: "10% !important",
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
  post: {
    width: "100%",
    height: "auto",
    backgroundColor: "#F8F8F8",
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
  },
}));
