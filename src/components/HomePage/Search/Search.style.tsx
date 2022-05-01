import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  searchContainer: {
    padding: 16,
    height: "100%",
    width: "100%",
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
    fontWeight: 700,
  },
  active: {
    background: "#00aa55",
    color: "#fff",
  },
  countResult: {
    marginTop: 10,
    fontWeight: "normal",
    "& > span": {
      fontWeight: 700,
      fontStyle: "italic",
    },
  },
  searchResult: {
    width: "100%",
    height: "100%",
    marginTop: 20,
  },
  searchResultItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: 30,
  },
  left: {
    "& > img": {
      minWidth: 300,
      minHeight: 180,
    },
  },
  right: {
    marginLeft: 12,
  },
  userBox: {
    display: "flex",
    alignItems: "center",
  },
  hashtag: {
    marginTop: 4,
  },
}));
