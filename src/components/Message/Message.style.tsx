import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  messageWrapContext: {
    width: "25%",
    height: "100vh",
    position: "relative",
    minWidth: 270,
    top: 0,
    right: 0,
    boxShadow: "5px",
  },
  messageHeader: {
    height: "15vh",
    borderBottom: "#f2f2f2 1px solid",
  },
  messageTitle: {
    fontSize: 24,
  },
  messageClose: {
    position: "absolute",
    top: 5,
    right: 20,
    "&:hover": {
      cursor: "pointer",
    },
  },

  messageSearch: {
    position: "absolute",
    height: "fit-content",
    marginTop: 10,
  },

  findInput: {
    width: 170,
    height: 24,
    background: "#f2f2f2",
    border: "none",
    borderRadius: "0 15px 15px 0",
    position: "relative",
    justifyContent: "center",
    wordWrap: "break-word",
    outline: 0,
    right: -10,
    paddingRight: 10,
    top: -8.5,
  },
  iconSearch: {
    position: "relative",
    background: "#f2f2f2",
    padding: "1px 5px",
    borderRadius: "15px 0 0 15px",
    left: 10,
  },
  messageContent: {
    display: "flex",
    marginTop: 10,
  },
  avatarUser: {
    margin: "0 15px",
  },

  messageUsername: {},
  messageStatus: {
    margin: "0 15px",
  },

  messageMoreOption: {
    marginRight: 15,
  },
}));
