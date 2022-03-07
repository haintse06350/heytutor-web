import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles((theme) => ({
  bottomNavigation: {
    position: "fixed",
    backgroundColor: "#fff",
    zIndex: 22,
    width: "100%",
    bottom: 0,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.15)",
    marginBottom: -5,
    "@media(min-width:1025px)": {
      display: "none",
    },
  },
  childrenContent: {
    height: "fit-content",
    paddingBottom: 20,
  },
}));
