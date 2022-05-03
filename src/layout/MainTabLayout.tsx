import React from "react";
// material
import { styled } from "@mui/material/styles";
import { Card, CardHeader, Divider, FormControl, MenuItem, Box } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useStyles } from "./Layout.style";

// ----------------------------------------------------------------------

const FILTER_REGISTER = [
  { label: "Tuần này", value: "week" },
  { label: "Tháng này", value: "month" },
  { label: "Kì này", value: "semester" },
];

const MainTabLayout = (props: any) => {
  const { title, icon, content } = props;
  const [sortListRegister, setSortListRegister] = React.useState("semester");
  const classes = useStyles();

  const onChangeSort = (event: SelectChangeEvent) => {
    setSortListRegister(event.target.value as string);
  };

  const RootStyle = styled(Card)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxShadow: "none",
    textAlign: "center",
    padding: theme.spacing(2),
    color: "#000",
    backgroundColor: "#fff",
  }));

  const CardHeaderStyle = styled("div")(({ theme }: any) => ({
    margin: "0",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: theme.spacing(4),
    justifyContent: "flex-start",
    color: "#000",
    "& > div > div > span": {
      fontSize: "1rem",
    },
  }));

  return (
    <RootStyle>
      <CardHeaderStyle
        sx={{ height: "fit-content", display: "flex", alignItems: "center", justifyContent: "space-between", py: 2 }}>
        <Box display="flex" alignItems="center">
          {icon}
          <CardHeader title={title} sx={{ p: 0, ml: 1, fontSize: "0.9rem", fontWeight: "400" }} />
        </Box>
        <FormControl sx={{ width: 1 / 3 }}>
          <Select
            classes={{ select: classes.selectRoot }}
            id="demo-simple-select"
            value={sortListRegister}
            defaultValue="Kì này"
            onChange={onChangeSort}>
            {FILTER_REGISTER.map((filter: any, index: number) => (
              <MenuItem sx={{ fontSize: 12 }} key={index} value={filter.value}>
                {filter.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardHeaderStyle>
      <Divider />
      {content}
    </RootStyle>
  );
};

export default MainTabLayout;
