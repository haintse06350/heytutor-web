import React from "react";
import { Card } from "@mui/material";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import slImgHome1 from "../../../assets/home_event_images/1.png";
import slImgHome2 from "../../../assets/home_event_images/slide2.jpg";
import slImgHome3 from "../../../assets/home_event_images/slide3.jpg";
import slImgHome4 from "../../../assets/home_event_images/slide4.jpg";
import { useStyles } from "./ImageEvent.style";
import { useNavigate } from "react-router-dom";

const ImageEvent = () => {
  const classes = useStyles();
  const imagesSlide = [{ url: slImgHome1 }, { url: slImgHome2 }, { url: slImgHome3 }, { url: slImgHome4 }];
  const navigate = useNavigate();

  const onClickSlide = (index: number) => {
    navigate(`/event-detail?eventid=${index}`);
  };
  return (
    <Card>
      <div className="slide-container">
        <Slide duration={4000} indicators={false} arrows={true}>
          {imagesSlide.map((imageSlide: any, index: number) => (
            <div className="each-slide" key={index} onClick={() => onClickSlide(index)}>
              <div className={classes.slideImage} style={{ backgroundImage: `url(${imageSlide.url})` }}></div>
            </div>
          ))}
        </Slide>
      </div>
    </Card>
  );
};

export default ImageEvent;
