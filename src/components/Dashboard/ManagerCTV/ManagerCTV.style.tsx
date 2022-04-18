import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  root: {},
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
