import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  slideImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: 600,
    width: "100%",
    objectFit: "fill",
  },
}));
