import React from "react";
import { useStyles } from "./Header.style";

const Header = () => {
  const classes = useStyles();
  return <div className={classes.helloParagraph}>Hello</div>;
};
export default Header;
