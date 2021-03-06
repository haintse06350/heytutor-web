/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import PropTypes from "prop-types";
// material
import { Box, Container } from "@mui/material";

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = "", maxWidth, ...other }: any, ref) => (
  <Box ref={ref} {...other}>
    <Container sx={{ pt: 10 }} maxWidth={maxWidth || "xl"}>
      {children}
    </Container>
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired as any,
  title: PropTypes.string,
};

export default Page;
