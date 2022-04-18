import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  wrapTableManager: {},
  tableBox: {
    display: "flex",
    position: "relative",
    "& > svg": {
      position: "absolute",
      top: 13,
      left: 40,
    },
  },
  iconMoreHoriz: {
    position: "relative",
  },
  wrapHeader: {
    width: "100%",
    height: "auto",
  },
  wrapSearchCTV: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > div": {},
    "& > button": {
      position: "absolute",
      right: 8,
      height: "100%",
    },
  },
  fillterFeedBack: {},
  nameUser: {
    textDecoration: "underline",
    cursor: "pointer",
  },
  textField: {
    "& > div": {
      background: "#fff",
    },
  },
  eventTitle: {
    textDecoration: "underline",

    cursor: "pointer",
  },
  select: {
    fontSize: 14,
    fontWeight: 500,
    "& > fieldset": {
      border: "none",
    },
  },
}));
