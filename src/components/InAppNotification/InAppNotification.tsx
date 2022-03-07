import React, { useEffect, useContext } from "react";
import { useStyles } from "./InAppNotification.style";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { NotificationCtx } from "../../context/notification/state";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InAppNotification = () => {
  const classes = useStyles();
  const { setShowNotif, classify, message } = useContext(NotificationCtx);

  useEffect(() => {
    const timeoutOpen = setTimeout(() => setShowNotif(false), 3000);
    return () => {
      clearTimeout(timeoutOpen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = () => {
    setShowNotif(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={true}
        autoHideDuration={6000}
        onClose={onClose}>
        <Alert onClose={onClose} severity={classify} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default InAppNotification;
