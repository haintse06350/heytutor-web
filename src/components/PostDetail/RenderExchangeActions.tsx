import React from "react";
import { ListItemButton, ListItemIcon, ListItemText, List, ListItem } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PriceCheckRoundedIcon from "@mui/icons-material/PriceCheckRounded";
import { useStyles } from "./PostItem.style";
interface IProps {
  role?: string | null;
  selectedSupporter?: any;
}
export const RenderExchangeActions = (props: IProps) => {
  const { role, selectedSupporter } = props;

  const classes = useStyles();
  return (
    <>
      {role === "my-request" && selectedSupporter ? (
        <List classes={{ root: classes.listRoot }}>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <CheckCircleRoundedIcon />
              </ListItemIcon>
              <ListItemText sx={{ fontWeight: 700 }} primary="Xác nhận xong" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton disabled>
              <ListItemIcon>
                <PriceCheckRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Xác nhận đã thanh toán" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List classes={{ root: classes.listRoot }}></List>
      )}
    </>
  );
};
