import React from 'react';
import { Box } from '@mui/material';
import Login from './components/Login';
import {Typography, Link } from '@mui/material';
import SignUp from './components/SignUp';
import { Route, Router, Routes } from 'react-router-dom';
import ContactUs from './components/ContactUs';
import emailjs from 'emailjs-com';
import Home from './components/Home';
import ChatbotComponent from './components/ChatbotComponent';
import HomePage from './components/HomePage';
import Admin from './components/Admin';
import NotFound from './components/NotFound';
import  {User}  from './components/User';
import Agent from './components/Agent';
import { useContext } from 'react';
import { ApiContext } from './components/ApiContextProvider';
import PackageDetails from './components/PackageDetails';
import PostGallery from './components/PostGallery';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import MyPackages from './components/MyPackages';
import InvoicePage from './components/InvoicePage';

const App = () => {
  // Simulate user roles (you can get this from your authentication system)
  const { userRole, userToken, userId, userName } = useContext(ApiContext);
  emailjs.init('your_emailjs_user_id');


  return (
    <Box>
      <Navbar/>
      <Routes>
        <Route path="/login" element={(userRole !== 'admin' && userRole !=='agent' && userRole !=='user') ?<Login />: <NotFound/> } />
        <Route path="/signup" element={(userRole !== 'admin' && userRole !=='agent' && userRole !=='user') ?<SignUp />: <NotFound/> } />
        <Route path="/contactus" element={< ContactUs />}/>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/postgallery" element={<PostGallery />} /> */}
        <Route path="/admin" element={userRole === 'admin' ? <Admin /> : <NotFound />}/>
        <Route path="/agent" element={userRole === 'agent' ? <Agent /> : <NotFound />}/> 
        <Route path="/user/*" element={(userRole === 'admin' || userRole === 'agent' || userRole === 'user') ? <User /> : <NotFound />}/> 
        <Route path="/*" element={<NotFound />} />
        <Route path="/package-details" element={(userRole === 'admin' || userRole === 'agent' || userRole === 'user') ? <PackageDetails /> : <NotFound />}/>
        <Route path="/mypackages" element={(userRole === 'admin' || userRole === 'agent' || userRole === 'user') ? <MyPackages /> : <NotFound />}/>

        <Route path="/invoice" element={(userRole === 'admin' || userRole === 'agent' || userRole === 'user')?<InvoicePage />: <NotFound />} />  
      </Routes>
      <Footer/>
    </Box>
      
  
    );
};

export default App;
