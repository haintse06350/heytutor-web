import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles((theme) => ({
  root: {},
  wrap: {
    width: "100%",
    margin: "auto",
  },
  userHeader: {
    width: "100%",
    margin: "auto",
  },
  header: {
    width: "100%",
    textAlign: "center",
    "& > p": {
      marginTop: 9,
      fontWeight: "bold",
      fontSize: 22,
      color: "#222222",
      width: "100%",
    },
  },
  avatar: {
    position: "relative",
    width: 128,
    height: 128,
    margin: "auto",
  },
  roundedAvt: {
    width: "128px !important",
    height: "128px !important",
    borderRadius: "50%",
    border: "3px solid #fff",
    objectFit: "cover",
    "& > svg": {
      width: "80%",
      height: "80%",
    },
  },
  name: {},
}));
