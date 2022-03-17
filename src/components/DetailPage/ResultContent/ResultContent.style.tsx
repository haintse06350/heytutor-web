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
  },
}));
