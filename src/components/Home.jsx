import React from 'react';
import './css/Home.css';
import { Box, Card, CardContent, Typography } from '@mui/material';

import image1 from './assets/Background4.jpg';
import image2 from './assets/Background2.jpg';
import image3 from './assets/Background3.jpg';
import Footer from './Footer';

export const Home = () => {
  return (
    <Box>
        <div className="parallax-container">
      <div className="parallax-image" style={{ backgroundImage: `url(${image1})` }}>
        <div className="parallax-content">
          <h1>Welcome to the Travel Vista</h1>
          <h1>"Discover the World with Us!"</h1>
        </div>
      </div>

      {/* White block */}
      <div className="white-block">
        <Card sx={{ backgroundColor: 'white', margin: '10px auto', maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5">Second Parallax Section</Typography>
            <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
          </CardContent>
        </Card>
      </div>

      <div className="parallax-image" style={{ backgroundImage: `url(${image2})` }}>
        <div className="parallax-content">
          <h2>Second Parallax Section</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>

      {/* White block */}
      <div className="white-block">
        <Card sx={{ backgroundColor: 'white', margin: '10px auto', maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5">Third Parallax Section</Typography>
            <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
          </CardContent>
        </Card>
      </div>

      <div className="parallax-image" style={{ backgroundImage: `url(${image3})` }}>
        <div className="parallax-content">
          <h2>Third Parallax Section</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
    <Footer/>

    </Box>
    
  );
};

export default Home;
