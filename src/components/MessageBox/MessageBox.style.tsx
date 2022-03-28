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
    padding: "8px 12px",
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
  minimize: {
    marginRight: 8,
  },
  messageContent: {
    padding: "0 12px",
    minHeight: 350,
    maxHeight: 350,
    overflowY: "scroll",
  },
  messageRow: {
    padding: "8px 0",
    alignItems: "flex-start",
  },
  message: {
    padding: 16,
    maxWidth: 250,
    borderRadius: "0px 8px 8px",
    backgroundColor: "#eceff5",
  },
  messageInput: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0px 8px 8px",
  },
  inputBase: {
    padding: "0px 8px",
    flexGrow: 1,
  },
}));
