import React, { useContext } from "react";
import { useStyles } from "./UserProfile.style";
import { Grid, Avatar, Typography } from "@mui/material";
import Header from "../Common/Header/Header";
import { UserCtx } from "../../context/user/state";

const UserProfile = () => {
  const classes = useStyles();
  const { user }: any = useContext(UserCtx);

  return (
    <div className={classes.root}>
      <Header titleCenter={"Profile"} />
      <div className={classes.wrap}>
        <Grid item className={classes.userHeader}>
          <div className={classes.header}>
            <div className={classes.avatar}>
              <Avatar src={""} alt="" className={classes.roundedAvt} />
            </div>
            <Typography className={classes.name}>{user?.name}</Typography>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default UserProfile;
