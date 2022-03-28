import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
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
}));
