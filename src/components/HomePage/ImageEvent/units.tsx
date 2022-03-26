import imageSlide1 from "../../../assets/home_event_images/1.jpg";
import imageSlide2 from "../../../assets/home_event_images/2.jpg";
import imageSlide3 from "../../../assets/home_event_images/3.jpg";
import imageSlide4 from "../../../assets/home_event_images/4.jpg";
import imageSlide5 from "../../../assets/home_event_images/5.jpg";
import imageSlide6 from "../../../assets/home_event_images/6.jpg";
import imageSlide7 from "../../../assets/home_event_images/7.jpg";
import imageSlide8 from "../../../assets/home_event_images/8.jpg";
import imageSlide9 from "../../../assets/home_event_images/9.jpg";
import imageSlide10 from "../../../assets/home_event_images/10.jpg";

export const renderImageSlideHome = (index: number) => {
  if (index === 1) {
    return imageSlide1;
  } else if (index === 2) {
    return imageSlide2;
  } else if (index === 3) {
    return imageSlide3;
  } else if (index === 4) {
    return imageSlide4;
  } else if (index === 5) {
    return imageSlide5;
  } else if (index === 6) {
    return imageSlide6;
  } else if (index === 7) {
    return imageSlide7;
  } else if (index === 8) {
    return imageSlide8;
  } else if (index === 9) {
    return imageSlide9;
  }
  return imageSlide10;
};
