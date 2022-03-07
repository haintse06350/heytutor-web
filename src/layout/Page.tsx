import React from "react";
// material
import { Box } from "@mui/material";

const Page = (props: any) => {
  const { children, title, styles } = props;
  return (
    <Box {...styles}>
      <title>{title}</title>
      {children}
    </Box>
  );
};

export default Page;
