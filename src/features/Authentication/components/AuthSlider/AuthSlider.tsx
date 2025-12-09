import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import { sliderData } from "constant";
import "./index.css";

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    adaptiveHeight: false,
    // optional: smooth crossfade instead of slide
    // fade: true,
  };

  return (
    <Box className="slider-container" sx={{ height: '100%' }}>
      <Slider {...settings}>
        {sliderData.map((img, i) => (
          <Box
            key={i}
            component="img"
            src={img}
            sx={{
              width: "100%",
              height: { md: '90vh', sm: '100vh', xs: '100vh' },
              objectFit: "cover",
              borderRadius: "10px",

            }}
          />
        ))}
      </Slider>
    </Box>
  );
}

export default SimpleSlider;
