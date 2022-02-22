import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  headerWrap: {
    "@media(max-width:1024px)": {
      display: "none",
    },
  },
  headerMenu: {
    display: "block",
  },
}));
