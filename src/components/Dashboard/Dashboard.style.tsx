import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(
  () => ({
    importContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    selectTerm: {
      marginTop: "20px !important",
    },
    buttonFetch: {
      marginTop: "20px !important",
    },
  }),
  { index: 1 }
);
