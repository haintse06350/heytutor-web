import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  tableBox: {
    display: "flex",
    position: "relative",
    "& > svg": {
      position: "absolute",
      top: 13,
      left: 40,
    },
  },
  iconMoreHoriz: {},
  topUser: {
    display: "flex",
    width: "100%",
    padding: 16,
    alignItems: "center",
  },

  borderBoxSizing: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 1px 2px 0 rgb(145 158 171 / 24%)",
    boxSizing: "inherit",
  },

  cupIcon: {
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
  cardHeader: {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
  },
  cardImg: {
    "& > img": {
      width: 64,
      height: 64,
      minWidth: 64,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
  postTitle: {
    flexGrow: 1,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginRight: 8,
    marginLeft: 16,
  },
  dueDate: {
    display: "flex",
    alignItems: "center",
  },
  imageCup: {
    width: "50px",
    height: "50px",
  },
  timeLine: {},
  infoHome: {
    "& > img": {
      width: "30px",
      height: "auto",
    },
  },
}));
