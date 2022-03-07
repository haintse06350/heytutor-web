import React, { useRef, useState } from "react";
// material
import { alpha } from "@mui/material/styles";
import { MenuItem, IconButton } from "@mui/material";
// components
import MenuPopover from "../Header/MenuPopover";

//icons
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";

// ----------------------------------------------------------------------

export default function EventPopover() {
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
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[700], 0.72),
            },
          }),
        }}>
        <MenuOutlinedIcon />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <MenuItem key={"profile"} onClick={handleClose} sx={{ typography: "body2", py: 1, px: 2.5 }}>
          <VisibilityOffOutlinedIcon
            sx={{
              mr: 2,
              width: 24,
              height: 24,
            }}
          />
          Ẩn sự kiện
        </MenuItem>

        <MenuItem key={"join"} onClick={handleClose} sx={{ typography: "body2", py: 1, px: 2.5 }}>
          <EventAvailableOutlinedIcon
            sx={{
              mr: 2,
              width: 24,
              height: 24,
            }}
          />
          Tham gia sự kiện
        </MenuItem>
      </MenuPopover>
    </>
  );
}
