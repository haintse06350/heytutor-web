import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  header: { display: "flex", justifyContent: "flex-end" },
  wrapListTask: {},
  listTask: {
    display: "flex",
    padding: 16,
    width: "100%",
    overflowX: "scroll",
    "& > div": {
      paddingRight: 16,
      borderRight: "1px dashed black",
    },
    "& > div:last-child": {
      border: "none !important",
    },
    "&::-webkit-scrollbar": { display: "none" },
    "&:hover": {
      "&::-webkit-scrollbar": { display: "block", height: 10, minHeight: 10, maxHeight: 10 },
      "&::-webkit-scrollbar-thumb": { borderRadius: "10px", background: "#ccc" },
    },
  },

  task: {
    width: "25%",
    maxWidth: "25%",
    minWidth: "25%",
    height: "74px",
    display: "flex",
    flexDirection: "row",
    "& > div:first-child": {
      textAlign: "center",
      padding: 8,

      "& > svg": {
        width: 56,
        height: 56,
        minWidth: 56,
      },
    },
  },
  filter: {
    "& > div:last-child": {},
  },
  listPost: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 16,
  },
  iconMoreHoriz: {},
  tableBox: {
    display: "flex",
    position: "relative",
    "& > svg": {
      position: "absolute",
      top: 13,
      left: 40,
    },
  },
  btnCreatePost: {
    display: "flex",
    justifyContent: "flex-end",
  },
  item: {
    width: "100%",
    height: "100%",
    padding: 16,
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
    "& > h6": {
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  dueDate: {
    display: "flex",
    alignItems: "center",
  },
  cardContent: {},
  shortContent: {
    display: "flex",
    alignItems: "center",
    padding: "24px 0px",
  },
  actions: {
    "& > h6": {
      borderRadius: 4,
      cursor: "pointer",
      "&:hover": {
        background: "#e9ecef",
      },
    },
  },
}));
