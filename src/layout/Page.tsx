/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import PropTypes from "prop-types";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = "", ...other }: any, ref) => (
  <Box ref={ref} {...other}>
    <title>{title}</title>
    {children}
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired as any,
  title: PropTypes.string,
};

export default Page;
