import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from './assets/pageNotFound.jpg'; // Correct import statement

const NotFound = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${BackgroundImage})`, // Use the imported image variable here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'darkblue',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      
    </div>
  );
};

export default NotFound;
