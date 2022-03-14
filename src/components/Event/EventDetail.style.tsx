import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
}));
