import React from "react";
// material
import { Popover } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const ArrowStyle = styled("span")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: "absolute",
    borderRadius: "0 0 4px 0",
    transform: "rotate(-135deg)",
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha("#919EAB", 0.12)}`,
    borderBottom: `solid 1px ${alpha("#919EAB", 0.12)}`,
  },
}));

// ----------------------------------------------------------------------
const transparent = alpha("#919EAB", 0.24);

export default function MenuPopover(props: any) {
  const { children, sx, open } = props;
  return (
    <Popover
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: "inherit",
          boxShadow: `0 0 2px 0 ${transparent}, 0 20px 40px -4px ${transparent}`,
          border: (theme: any) => `solid 1px ${alpha("#919EAB", 0.08)}`,
          width: 200,
          ...sx,
        },
      }}
      {...props}>
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
}
