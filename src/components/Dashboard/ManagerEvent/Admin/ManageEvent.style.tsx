import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  wrapManageEvent: { position: "relative" },
  btnCreateEvent: { position: "absolute", top: 0, right: 16 },
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
  "@keyframes blinker": {
    "0%": { opacity: 1.0 },
    "50%": { opacity: 0.0 },
    "100%": { opacity: 1.0 },
  },
  newMessage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: 35,
  },
  blink: {
    width: 10,
    height: 10,
    borderRadius: 10,
    animation: "$blinker 1s linear infinite",
    backgroundColor: "red",
    marginRight: 5,
  },
  select: {
    fontSize: 14,
    fontWeight: 500,
    "& > fieldset": {
      border: "none",
    },
  },
}));
