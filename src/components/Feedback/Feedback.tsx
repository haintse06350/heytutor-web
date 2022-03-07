import React from "react";
import { useStyles } from "./Feedback.style";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import LinearProgress from '@mui/material/LinearProgress';

const Feedback = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  return (
    <Box className={classes.feedback}>
      <div>
        <Box className={classes.middleBox}>
          <div className={classes.title}>
            <h1>Rate your experience</h1>
            <h3>Are you satisfied with the service!</h3>
          </div>
          <Rating
            name="rating-control"
            size="large"
            value={value}
            onChange={(event, newValue: any) => {
              setValue(newValue);
            }}
          />
          {/* <LinearProgress color="inherit" /> */}
          <hr></hr>
          <div>
            <h3>Tell us what can be improve!</h3>
            <Fab variant="extended" aria-label="add">
              Overall Service
            </Fab>
            <Fab variant="extended" aria-label="add">
              Customer Support
            </Fab>
            <Fab variant="extended" aria-label="add">
              Speed and Efficiency
            </Fab>
            <Fab variant="extended" aria-label="add">
              Repair Quality
            </Fab>
            <Fab variant="extended" aria-label="add">
              Transparency
            </Fab>
          </div>
          <div>
            <TextField id="outlined-multiline-static" multiline rows={4} defaultValue="Default Value" />
          </div>
        </Box>
        <Box className={classes.bottomBox}>
          <Button
            className={classes.bottomButton}
            variant="contained"
            style={{ height: "50px", width: "370px", borderRadius: 8, background: "#f20c32" }}>
            Summit
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default Feedback;
