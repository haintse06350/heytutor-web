import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  btnHideContentMyPost: {
    position: "relative",
    "& > div:nth-child(2)": {
      position: "absolute",
      right: 0,
    },
  },
  headerEvent: {
    "& > img": {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: 8,
    },
  },
  rootEventList: {
    marginTop: 64,
    "& > div": {
      backgroundColor: "#fff",
    },
  },
}));
