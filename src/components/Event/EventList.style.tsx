import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  rootEventList: {
    backgroundColor: "#fff",
    marginTop: "64px",
  },
  searchEvent: {
    display: "flex",
  },
  wrapEventHeader: {
    display: "block",
  },

  wrapEventList: {
    display: "flex",
    marginTop: "24px",
    width: "calc(100%+24px)",
    marginLeft: "-24px",
    backgroundColor: "rgb(227, 242, 253)",
    borderRadius: 20,
  },

  wrapEvent: {
    paddingTop: "24px",
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingBottom: "24px",
    position: "relative",
  },
  wrapEventContent: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "rgb(255, 255, 255)",
    padding: 12,
    borderRadius: 8,
  },
  fillterEvent: {
    display: "flex",
    "& > div": {
      marginRight: 23,
    },
  },
  sortEvent: {},
}));
