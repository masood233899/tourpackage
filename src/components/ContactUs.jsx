import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import emailjs from 'emailjs-com';
import backgroundImage from './assets/conversation.png'; // Replace with your image path
import Navbar from './navbar';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    
      const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill out all the fields.');
        return;
      }
    try {
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        to_name: 'admin', // Replace with the recipient's name or email
        subject: formData.subject,
        message: formData.message,
      };

      // Replace 'your_emailjs_service_id', 'your_emailjs_template_id', 'your_emailjs_user_id' with your actual EmailJS values
      const response = await emailjs.send(
        'service_lmc8h9h',
        'template_jdnu2am',
        templateParams,
        'BjsrqXPJTgpEWPpC5'
      );

      console.log('Email sent successfully!', response);
      // Do something here after the email is sent (e.g., show success message)

    //   const autoReplyParams = {
    //     // Replace with dynamic fields from your form data or other custom data
    //     from_name: 'Admin',
    //     reply_to: 'your_email@example.com', // Replace with your auto-reply email address
    //     to_name: formData.name, // Auto-reply to the user who submitted the message
    //     subject: 'Auto-Reply: Thank you for your message',
    //     message: 'Thank you for your message. We will get back to you shortly!',
    //   };
  
    //   const autoReplyResponse = await emailjs.send(
    //     'service_lmc8h9h',
    //     'template_jdnu2am', // Use the template ID of the auto-reply template
    //     autoReplyParams,
    //     'BjsrqXPJTgpEWPpC5'
    //   );
  
    //   console.log('Auto-reply sent successfully!', autoReplyResponse);
    setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Set the form submission state to true
      setIsFormSubmitted(true);

      alert('Message received, We will get back to you shortly');

      // After a few seconds, reset the form submission state
      setTimeout(() => {
        setIsFormSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('Error sending email:', error);
      // Handle any errors that occurred during email sending (e.g., show error message)
    }
  };

  return (
    <Box>
        {/* <Navbar /> */}
        <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'whitesmoke',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    }}
    >
      <Box sx={{ marginTop: '200px', background: 'white', padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Reach out to us
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary" type="submit">
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box
          sx={{
            mt: 4,
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.807128899879!2d-122.41940608434232!3d37.77492997976081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580a7d8ae616d%3A0xa5b076d8c51d6948!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1630534644965!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Box>
        {isFormSubmitted && (
          <Typography variant="body1" color="primary" sx={{ marginTop: '10px' }}>
            Your message has been sent successfully!
          </Typography>
        )}
      </Box>
    </Box>
    </Box>
  );
};

export default ContactUs;
