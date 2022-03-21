import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  tableBox: {
    display: "flex",
    position: "relative",
    "& > svg": {
      position: "absolute",
      top: 13,
      left: 40,
    },
  },
  iconMoreHoriz: {},
  topUser: {
    display: "flex",
    width: "100%",
    padding: 16,
    alignItems: "center",
  },
  interactiveUser: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 1px 2px 0 rgb(145 158 171 / 24%)",
    boxSizing: "inherit",
  },
  topRegister: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 1px 2px 0 rgb(145 158 171 / 24%)",
    boxSizing: "inherit",
  },

  cupIcon: {
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
