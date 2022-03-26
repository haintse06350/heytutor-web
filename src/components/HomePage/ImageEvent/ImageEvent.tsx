import React from "react";
import { Card } from "@mui/material";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import slImgHome1 from "../../../assets/home_event_images/1.png";
import slImgHome2 from "../../../assets/home_event_images/2.png";
import slImgHome3 from "../../../assets/home_event_images/3.png";
import slImgHome4 from "../../../assets/home_event_images/4.png";
import { useStyles } from "./ImageEvent.style";
const ImageEvent = () => {
  const classes = useStyles();
  const imagesSlide = [{ url: slImgHome1 }, { url: slImgHome2 }, { url: slImgHome3 }, { url: slImgHome4 }];

  return (
    <Card>
      <div className="slide-container">
        <Slide duration={5000} indicators={false} arrows={true}>
          {imagesSlide.map((imageSlide: any, index: number) => (
            <div className="each-slide" key={index}>
              <div className={classes.slideImage} style={{ backgroundImage: `url(${imageSlide.url})` }}></div>
            </div>
          ))}
        </Slide>
      </div>
    </Card>
  );
};

export default ImageEvent;
