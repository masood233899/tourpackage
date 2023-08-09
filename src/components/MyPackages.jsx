import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ApiContext } from './ApiContextProvider';
import { Card, CardContent, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyPackages = () => {
  const [bookingData, setBookingData] = useState([]);
  const { userRole, userToken, userName, setUserName, setUserRole, setUserToken, userId, setUserId,setBill } = useContext(ApiContext);
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedPacks, setSelectedPacks] = useState([]);
  var navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.post('https://localhost:7290/api/Bookings/getbybookingsbyuserid', {
          idint: userId,
        });

        setBookingData(response.data);
        console.log(response.data);

        // Map the bookingData to the desired format and store in selectedPacks state
        const mappedData = response.data.map((booking) => ({
          id: booking.bookId,
          name: booking.packageName,
          customers: booking.personCount,
          adults: Math.floor(booking.personCount / 2),
          children: Math.ceil(booking.personCount / 2),
        }));
        setSelectedPacks(mappedData);
        console.log('kjabsdakj',mappedData)
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails();
  }, [userId]);

  const handleFeedbackClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setOpen(true);
  };
 
  const gotobill =(booking) => {
    var value = booking;
    setBill(value);

    navigate('/invoice');

  }
  const handleClose = () => {
    setOpen(false);
    setFeedback('');
  };

  const handleSubmitFeedback = async () => {
    try {
      const feedbackData = {
        id: selectedBookingId,
        feedback: feedback,
      };

      const response = await axios.put('https://localhost:7290/api/Bookings/AddFeedback', feedbackData);
      console.log('Feedback submitted:', response.data);
      handleClose();
      // You can also show a success message to the user if needed
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // You can also show an error message to the user if needed
    }
  };

  return (
    <div>
      <h2>Booking Details</h2>
      {bookingData.length > 0 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {bookingData.map((booking, key) => (
            <Card key={booking.bookId} sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Booking : {key + 1}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Amount: {booking.totalAmount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Date: {booking.startdate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Person Count: {booking.personCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Package Name: {booking.packageName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Region: {booking.region}
                </Typography>
                <Button sx={{marginRight: '5px'}} variant="contained" color="primary" onClick={() => handleFeedbackClick(booking.bookId)}>
                  Give Feedback
                </Button>
                <Button variant="contained" color="primary" onClick={() => gotobill(booking)}>
                  View Bill
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No bookings found.
        </Typography>
      )}

      {/* Feedback Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            label="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmitFeedback} color="primary" variant="contained">
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>

      
    </div>
  );
};

export default MyPackages;
