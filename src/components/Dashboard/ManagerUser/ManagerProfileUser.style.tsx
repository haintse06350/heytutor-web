import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  baseProfile: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: 8,
  },
  root: {
    width: "calc(100%-20px)",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-72px",
  },
  moreBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
  postContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
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
}));
