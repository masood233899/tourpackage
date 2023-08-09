import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        marginTop: '50px',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h6">Contact Us</Typography>
        <Typography variant="body2" color="text.secondary">
          Email: contact@example.com
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: +1 (123) 456-7890
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: 123 Main Street, City, Country
        </Typography>
        <Typography variant="h6">Follow Us</Typography>
        <Typography variant="body2" color="text.secondary">
          <Link href="https://www.instagram.com/" target="_blank" rel="noopener">
            Instagram
          </Link>{' '}
          |{' '}
          <Link href="https://www.facebook.com/" target="_blank" rel="noopener">
            Facebook
          </Link>{' '}
          |{' '}
          <Link href="https://twitter.com/" target="_blank" rel="noopener">
            Twitter
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Your Website. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
