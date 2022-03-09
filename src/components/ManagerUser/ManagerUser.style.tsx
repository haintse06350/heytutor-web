import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  wrapTableManager: {},
  tableBox: {
    display: "flex",
    position: "relative",
    "& > svg": {
      position: "absolute",
      top: 13,
      left: 40,
    },
  },
  iconMoreHoriz: {
    position: "relative",
  },
}));
