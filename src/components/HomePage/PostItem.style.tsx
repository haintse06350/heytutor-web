import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  wrapPostItem: {
    maxWidth: "800px",
    height: "auto",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#fff",
    margin: "10px 5%",
    padding: 20,
    wordBreak: "break-word",
  },

  userPanel: {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
  },

  isResolve: {
    display: "flex",
  },

  hashTag: {
    "& > div": {
      backgroundColor: "whitesmoke",
      width: "fit-content",
      padding: 3,
      borderRadius: 5,
    },
  },
}));
