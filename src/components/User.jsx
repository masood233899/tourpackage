import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Button, TextField } from '@mui/material';
import { ApiContext } from './ApiContextProvider';
import { Link } from 'react-router-dom';

export const User = () => {
  const [packageDetails, setPackageDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    userRole,
    userToken,
    userId,
    userName,
    selectedPackage,
    setSelectedPackage,
    selectedPackagePrice,
    setSelectedPackagePrice,
  } = useContext(ApiContext);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get('https://localhost:7290/api/PackageMasters/GetPackageMasters');
      setPackageDetails(response.data);
    } catch (error) {
      console.error('Error fetching package details:', error);
    }
  };

  useEffect(() => {
    fetchPackageDetails();
  }, []);

  const handleBook = (packageId, packagePrice) => {
    setSelectedPackage(packageId);
    setSelectedPackagePrice(packagePrice);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the package details based on the search query
  const filteredPackageDetails = packageDetails.filter((item) =>
    item.packageName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      marginBottom: '320px'
    }}>
      <h2>Package Details</h2>
      {/* Search bar */}
      <TextField
        label="Search Packages"
        variant="outlined"
        size="small"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {filteredPackageDetails.map((item, index) => (
          <Card key={index} sx={{ width: 350, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image={`data:image/jpeg;base64,${item.packageImages}`}
              alt={`Image ${index + 1}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.packageName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Package Price: {item.packagePrice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Region: {item.region}
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to={`/package-details`}
                onClick={() => handleBook(item.id, item.packagePrice)}
              >
                Book
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default User;
