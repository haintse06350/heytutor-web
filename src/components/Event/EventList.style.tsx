import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  rootEventList: { marginTop: "-64px" },
  searchEvent: {
    display: "flex",
  },
  wrapEventHeader: {
    display: "block",
    padding: 12,
  },

  wrapEventList: {
    display: "flex",
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
  },
  sortEvent: {},
  slideImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: 600,
    width: "100%",
    objectFit: "fill",
  },
  headerEvent: {
    "& > img": {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: 8,
    },
  },
  detailRoot: {},
  searchAndFilter: {
    marginTop: "50px",
    background: "#ffffff",
    padding: 16,
    borderRadius: 12,
  },
  deleteIcon: {
    background: "#fff",
    "& > .MuiChip-deleteIcon": {
      color: "rgb(255, 94, 123)",
      "&:hover": {
        color: "rgb(255, 25, 67)",
      },
    },
  },
  moreFilter: {
    background: "#fff",
    "& > span": {
      fontWeight: 600,
    },
  },
  selectedHashtag: {
    background: "#00AB55",
    color: "#fff",
  },

  tab: {
    display: "flex",
    alignItems: "center",
    "& > p": {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    "& > span": {
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.5,
      textTransform: "none",
      whiteSpace: "normal",
      marginLeft: 8,
      padding: "0px 10px",
      borderRadius: 10,
      backgroundColor: "rgb(229, 234, 242)",
    },
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
