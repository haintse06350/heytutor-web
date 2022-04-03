import demoImg1 from "../../assets/default_images/1.jpg";
import demoImg2 from "../../assets/default_images/2.jpg";
import demoImg3 from "../../assets/default_images/3.jpg";
import demoImg4 from "../../assets/default_images/4.jpg";
import demoImg5 from "../../assets/default_images/5.jpg";
import demoImg6 from "../../assets/default_images/6.jpg";

export const renderCardImg = (index: number) => {
  if (index === 0) {
    return demoImg1;
  }
  if (index === 1) {
    return demoImg2;
  }
  if (index % 2 === 0) {
    return demoImg3;
  }
  if (index % 3 === 0) {
    return demoImg4;
  }
  if (index % 5 === 0) {
    return demoImg5;
  }
  return demoImg6;
};
