import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  detailRoot: {},
  deleteIcon: {
    "& > .MuiChip-deleteIcon": {
      color: "rgb(255, 94, 123)",
      "&:hover": {
        color: "rgb(255, 25, 67)",
      },
    },
  },
}));
