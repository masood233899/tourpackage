import React, { useState, useEffect } from "react";
import axios from "axios";
import { CarouselProvider, Slider, Slide, Dot } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const PostGallery = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7290/api/PostGalleries/Get_all_PostGallery"
        );
        setSlides(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getdata();
  }, []);

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={60} // Adjust aspect ratio as needed
      totalSlides={slides.length}
      isPlaying={true} // Auto-play carousel
    >
      <Slider>
        {slides.map((slide) => (
          <Slide key={slide.id} index={slide.id - 1}>
            <img
              src={`data:image/jpeg;base64,${slide.images}`}
              alt={`Slide ${slide.id}`}
              style={{
                display: "block", // Ensures proper alignment
                margin: "0 auto", // Centers the image horizontally
                maxWidth: "100%",
                height: "50%",
              }} // Make the image responsive
            />
          </Slide>
        ))}
      </Slider>
      {slides.map((slide) => (
        <Dot key={slide.id} slide={slide.id - 1} />
      ))}
    </CarouselProvider>
  );
};

export default PostGallery;
