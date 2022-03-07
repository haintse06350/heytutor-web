import React, { useRef, useState } from "react";
// material
import { alpha } from "@mui/material/styles";
import { Badge, Box, IconButton } from "@mui/material";
// components
import MenuPopover from "./MenuPopover";

//icons
import EmailIcon from "@mui/icons-material/Email";

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}>
        <Badge badgeContent={2} color="error">
          <EmailIcon color="primary" />
        </Badge>
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>All messages</Box>
      </MenuPopover>
    </>
  );
}
