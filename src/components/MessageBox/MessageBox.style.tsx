import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles((theme) => ({
  root: {
    width: 340,
    height: 455,
    position: "fixed",
    bottom: 0,
    right: "2%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  minimizeBox: {
    height: 40,
    width: 340,
    position: "fixed",
    bottom: 0,
    right: "2%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  header: {
    width: "100%",
    height: "10%",
    padding: 8,
  },
  postTitleAndUserName: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
  body: {
    width: "100%",
    height: "75%",
  },
  messageBox: {
    width: "100%",
    height: "15%",
    padding: 8,
  },
  messageInput: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  minimize: {
    marginRight: 8,
  },
}));
