import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  image: {
    width: 150,
    height: 100,
    position: "relative",
    "& > img": {
      width: "100%",
      height: "100%",
      borderRadius: 4,
    },
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 4,
    top: 0,
    "&:hover": {
      display: "block",
      backgroundColor: "rgba(9, 30, 66, 0.5)",
    },
  },
  removeImage: {
    position: "absolute",
    bottom: 6,
    right: 6,
  },
}));
