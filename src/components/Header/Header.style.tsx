import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  header: {
    display: "flex",
    fontSize: 24,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 5,
  },
  logo: {
    width: "25%",
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
    display: "block",
    margin: "0 16px",
    cursor: "pointer",
  },
  eventHome: {
    width: "25%",
    marginTop: 8,
    transition: "0.5s",
    "&:hover": {
      cursor: "pointer",
      opacity: 0.8,
      fontSize: 28,
    },
  },

  findInput: {
    width: "20%",
    height: 30,
    marginTop: 10,
    right: 178,
  },
  iconSearch: {
    width: 30,
    height: 25,
    backgroundColor: "white",
    marginTop: 10,
    marginRight: 30,
    padding: 5,
    border: "1px grey solid",
    borderLeft: 0,
    borderRadius: "2px",

    "&:hover": {
      background: "grey",
      cursor: "pointer",
    },
  },
  profile: {
    display: "flex",
    margin: "6px 10px",
    width: "25%",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  iconNotification: { cursor: "pointer" },

  usernameProfile: {
    cursor: "pointer",
    display: "flex",
  },
  avatarProfile: {
    width: 25,
    height: 25,
    overflow: "hidden",
    margin: "0 10px",
  },
}));
