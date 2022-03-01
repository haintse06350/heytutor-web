import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  selectTypePost: {},
  inputTitle: {},
  inputSummary: {
    fontSize: "1.3rem !important",
  },
  inputHashTag: {},
  inputFile: { marginBottom: 10 },
  changeFont: { marginTop: "15px" },
  listImg: {
    width: "100%",
    padding: "0px 10px",
    display: "flex",
  },
  imagePost: {
    maxWidth: 100,
    minWidth: 100,
    minHeight: 100,
    maxHeight: 100,
    width: 100,
    height: 100,
  },
  imageItemPost: {
    position: "relative",
    width: "cover",
    height: "auto",
    "& > img:nth-child(odd)": {
      paddingLeft: 2,
      paddingRight: 2,
    },
  },
  image: {
    borderRadius: 8,
    width: "100px",
    height: "100px",
    objectFit: "cover",
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 0,
    width: 20,
    height: 20,
    background: "#fff",
    borderRadius: "50%",
    opacity: 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > svg": {
      width: "80%",
      height: "80%",
    },
  },
}));
