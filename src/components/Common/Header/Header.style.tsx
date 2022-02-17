import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles((theme) => ({
  wrapper: {
    margin: "0 auto",
    padding: "0px 16px",
    height: 56,
    maxHeight: 56,
    minHeight: 56,
    background: "#1976d2",
    display: "flex",
    alignItems: "center",
    "@media (min-width: 600px) and (max-width: 900px)": {
      padding: "0 20px",
      "@media screen and (max-width: 413px)": {
        padding: "0 16px",
      },
    },
    "@media(max-height: 667px)": {
      height: 44,
    },
    "@media (min-height: 668px) and (max-height: 736px)": {
      height: 50,
    },
    "&.stickyHeader": {
      position: "sticky",
      top: "0px",
      zIndex: 49,
      padding: "0 20px",
    },
  },
  actionLeft: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleCenter: {
    "& > p": {
      textAlign: "center",
      fontSize: 18,
      fontWeight: 500,
      color: "#fff",
      width: "100%",
      "@media(max-width: 374px)": {
        fontSize: 15,
      },
    },
  },
  actionRight: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconRight: {},
}));
