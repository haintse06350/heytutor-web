import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    backgroundSize: "cover",
    width: "100vw",
    height: "100vh",
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  logo: {
    height: 105,
  },
  form: {
    padding: "20px 57px 66px 57px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.75)",
  },
  title: {
    fontSize: "36px !important",
    marginBottom: "34px !important",
  },
  inputEmail: {
    marginBottom: 18,
  },
  inputPassword: {
    margin: "30px 0px !important",
  },
  btnSubmit: {
    marginBottom: "20px",
  },
  btnGoogle: {
    marginTop: "30px !important",
    textTransform: "none",
  },
  loading: {
    marginRight: "0.5rem",
  },
  alert: {
    marginBottom: "1rem",
  },
});
