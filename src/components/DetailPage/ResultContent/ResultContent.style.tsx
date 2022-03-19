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
  },
  postTitle: {
    flexGrow: 1,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginRight: 8,
  },
  cardContent: {},
  dueDate: {
    display: "flex",
    alignItems: "center",
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
  },
  blink: {
    width: 10,
    height: 10,
    borderRadius: 10,
    animation: "$blinker 1s linear infinite",
    backgroundColor: "red",
    marginRight: 5,
  },
}));
