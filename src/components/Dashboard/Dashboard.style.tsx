import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  importContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  selectTerm: {
    marginTop: "20px !important",
    width: 200,
  },
  buttonFetch: {
    marginTop: "20px !important",
  },

  active: {
    backgroundColor: "#4d545c",
    borderRadius: 8,
    color: "#fff",
    "&:hover": {
      color: "#000",
    },
  },
  itemText: {
    "& > span": {
      display: "flex",
    },
  },
}));
