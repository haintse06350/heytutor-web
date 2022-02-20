import React from "react";
import { Box, Button } from "@mui/material";
import { useStyles } from "./Event.style";
const Event = () => {
  const classes = useStyles();

  return (
    <div className={classes.hashtag}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "7vh"}}>
        <div>
          <Button variant="outlined" size="small" href="#contained-buttons" style={{color: 'red', margin: 5}}>
            Semester I
          </Button>
          <Button variant="outlined" size="small" href="#contained-buttons" style={{color: 'red', margin: 5}}>
            Semester II
          </Button>
          <Button variant="outlined" size="small" href="#contained-buttons" style={{color: 'red', margin: 5}}>
            Semester III
          </Button>
        </div>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "7vh"}}>
        <div>
          <Button variant="outlined" size="small" href="#contained-buttons" style={{color: 'red', margin: 5}}>
            MAS291
          </Button>
          <Button variant="outlined" size="small" href="#contained-buttons" style={{color: 'red', margin: 5}}>
            MAS291
          </Button>
          <Button variant="outlined" size="small" href="#contained-buttons" style={{color: 'red', margin: 5}}>
            MAS291
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Event;
