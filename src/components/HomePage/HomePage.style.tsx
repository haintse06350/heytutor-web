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
    position: "relative",
    marginTop: 20,
    "& > div:nth-child(2)": {
      position: "absolute",
      top: 0,
      right: 0,
    },
  },
}));
