import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  link: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
