/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import PropTypes from "prop-types";
// material
import { Box, Container } from "@mui/material";

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = "", ...other }: any, ref) => (
  <Box ref={ref} {...other}>
    <Container sx={{ pt: 9 }} maxWidth="xl">
      {children}
    </Container>
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired as any,
  title: PropTypes.string,
};

export default Page;
