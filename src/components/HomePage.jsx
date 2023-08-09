import React, { useContext, useState, useEffect  } from 'react';
import { Box, AppBar, Toolbar, Button, Container, TextField, Typography, Card, CardContent, CardMedia } from '@mui/material';
import backgroundImage from './assets/Background2.jpg'; // Replace with your image path
import Navbar from './navbar';
import Footer from './Footer';
import { ApiContext } from './ApiContextProvider';
import { Link } from 'react-router-dom';
import guide from './assets/guide.jpg';
import guide2 from './assets/service2.jpg';
import guide3 from './assets/service3.jpg';
import guide4 from './assets/service4.jpg';
import guide5 from './assets/service5.jpg';
import axios from "axios";
import { CarouselProvider, Slider, Slide, Dot } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const HomePage = () => {
  const { userRole, userToken, userName, setUserName, setUserRole, setUserToken, userId, setUserId } = useContext(ApiContext);
  const [slides, setSlides] = useState([]);
  const [album, setAlbum] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7290/api/PostGalleries/Get_all_PostGallery"
        );

        // Filter the response data to get only the slides with 'imageType' of 'album'
        const albumSlides = response.data.filter((slide) => slide.imageType === "album");
        const carouselSlides = response.data.filter((slide) => slide.imageType === "carousel");
          setAlbum(albumSlides);
        setSlides(carouselSlides);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getdata();
  }, []);
  return (
    <Box>
      {/* <Navbar /> */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          height: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        
        <Container sx={{ display: 'flex', background: 'rgba(255, 255, 255, 0.2)',
         alignItems: 'center', flexDirection:'column', justifyContent: 'center',
         padding: '30px'
          }}>
        <Typography variant="h4" gutterBottom>
          Discover Amazing Places
        </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          {/* <Box sx={{ mr: 2 }}>
            <TextField variant="outlined" placeholder="Search" />
          </Box> */}
          {userRole === 'admin' || userRole === 'agent' || userRole === 'user' ? (
            <Button variant="contained" color="primary" sx={{ height: '55px' }} component={Link} to="/user">
              Book Your Favorite Package Now!
            </Button>
          ) : (
            <Button variant="contained" color="primary" sx={{ height: '55px' }} component={Link} to="/login">
              Login to Book Your Favorite Package
            </Button>
          )}
          </Box>
        </Container>
      </Box>

      {/* Travel Assurance Qualities */}
      <Container sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Our Travel Assurance Qualities
        </Typography>
        <Box sx={{ 
          display: 'flex', gap: '40px', flexDirection: 'row', alignItems: 'center',
      '@media (max-width: 900px)': {
        flexDirection: 'column'
      }, }}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={guide} // Replace with your image URL for quality 1
              alt="Quality 1"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Experienced Tour Guides
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our experienced and knowledgeable tour guides will make your journey memorable and informative.
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={guide2} // Replace with your image URL for quality 2
              alt="Quality 2"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Handpicked Accommodations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We carefully select accommodations to ensure comfort and relaxation during your stay.
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={guide3} // Replace with your image URL for quality 3
              alt="Quality 3"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customizable Itineraries
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create your own personalized itinerary to suit your travel preferences and interests.
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={guide4} // Replace with your image URL for quality 4
              alt="Quality 4"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Local Cuisine Delights
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Savor the authentic flavors of local cuisine with our carefully curated dining experiences.
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={guide5} // Replace with your image URL for quality 5
              alt="Quality 5"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Expert Travel Advice
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our travel experts are always available to provide valuable advice and support throughout your journey.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3 style={{ marginBottom: "20px" }}>Album</h3>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {album.map((slide) => (
          <Card key={slide.id} style={{ margin: "10px", maxWidth: "300px" }}>
            <CardMedia
              component="img"
              height="200"
              image={`data:image/jpeg;base64,${slide.images}`}
              alt={`Slide ${slide.id}`}
            />
          </Card>
        ))}
      </div>
    </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3 style={{ marginBottom: "20px" }}>Gallery</h3>
      <div style={{ width: "80%", height: "100%" }}>
        <CarouselProvider
          naturalSlideWidth={130}
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
                    height: "100%", // Adjust the height as needed
                  }} // Make the image responsive
                />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
    </div>
    
    </Box>
  );
};

export default HomePage;
