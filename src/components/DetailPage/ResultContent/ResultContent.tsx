import { Box, Typography, Grid, Card, Popover, Button, Divider, Avatar } from "@mui/material";
import { map } from "lodash";
import * as React from "react";
import { useStyles } from "./ResultContent.style";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function RegisterContent(props: any) {
  const { data } = props;
  const classes = useStyles();
  const [openPostMenu, setOpenPostMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const onOpenMenu = (event: any) => {
    setOpenPostMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const onCloseMenu = () => {
    setOpenPostMenu(false);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Showing {data?.length} results:
      </Typography>
      <Grid container spacing={2}>
        {map(data, (item: any, index: number) => (
          <Grid key={index} item xs={4} md={6} lg={6}>
            <Card className={classes.item}>
              <div className={classes.cardHeader}>
                <div className={classes.postTitle}>
                  <Typography variant="subtitle1">{item.postData.title}</Typography>
                </div>
                <div>
                  <MoreHorizOutlinedIcon onClick={onOpenMenu} />
                </div>
              </div>
              <div className={classes.cardContent}>
                <div className={classes.dueDate}>
                  <AccessTimeOutlinedIcon sx={{ color: "#94a4c4" }} />
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#94a4c4", fontSize: 12, fontWeight: 500, lineHeight: 1.5, ml: 1 }}>
                    Due on Nov 3
                  </Typography>
                </div>
                <Divider sx={{ mt: 8 }} />
                <div className={classes.userPostAvatar}>
                  <Avatar sx={{ border: "2px solid #fff", borderRadius: "50%" }} />
                </div>
              </div>
            </Card>
          </Grid>
        ))}
        <Popover
          open={openPostMenu}
          anchorEl={anchorEl}
          onClose={onCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}>
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", py: 2, px: 2.5 }}>
            <Button variant="outlined">Huỷ đăng kí</Button>
            <Button variant="outlined">Chi tiết</Button>
          </Box>
        </Popover>
      </Grid>
    </Box>
  );
}
