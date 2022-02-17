import React from "react";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { useStyles } from "./Header.style";

interface IPropsHeader {
  leftIcon?: any;
  rightIcon?: any;
  titleCenter: string;
  actionLeft?: Function;
  actionRight?: Function;
  isLoading?: boolean;
}

const Header = (props: IPropsHeader) => {
  const classes = useStyles();
  const { leftIcon, rightIcon, titleCenter, actionLeft, isLoading, actionRight } = props;

  return (
    <Grid container item xs={12} className={classes.wrapper}>
      {leftIcon && actionLeft ? (
        <Grid item xs={3} className={classes.actionLeft}>
          <div className={classes.iconLeft} onClick={() => actionLeft && actionLeft()}>
            {leftIcon}
          </div>
        </Grid>
      ) : (
        <Grid item xs={3} />
      )}
      <Grid item xs={6} className={classes.titleCenter}>
        <Typography>{titleCenter}</Typography>
      </Grid>
      {rightIcon && actionRight ? (
        <Grid item xs={3} className={classes.actionRight}>
          {isLoading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            <div className={classes.iconRight} onClick={() => actionRight && actionRight()}>
              {rightIcon}
            </div>
          )}
        </Grid>
      ) : (
        <Grid item xs={3} />
      )}
    </Grid>
  );
};

export default Header;
