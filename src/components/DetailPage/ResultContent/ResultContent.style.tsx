import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
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
  postTitle: {
    flexGrow: 1,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginRight: 8,
    marginLeft: 16,
    "& > h6": {
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  cardContent: {},
  dueDate: {
    display: "flex",
    alignItems: "center",
  },
  shortContent: {
    display: "flex",
    alignItems: "center",
    padding: "24px 0px",
  },
  userPostAvatar: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userPostAvatarRegister: {
    marginTop: 8,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  leftContent: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
  },
  usernameAndRank: {
    marginLeft: 4,
  },
  rank: {
    display: "flex",
    alignItems: "center",
  },
  dueDateAndNoti: {
    marginTop: 4,
    marginLeft: -2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  starCount: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  starCountItem: {
    display: "flex",
    alignItems: "center",
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
    minWidth: 30,
  },
  blink: {
    width: 10,
    height: 10,
    borderRadius: 10,
    animation: "$blinker 1s linear infinite",
    backgroundColor: "red",
    marginRight: 5,
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
