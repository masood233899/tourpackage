import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Table, TableHead, TableRow, TableCell, TableBody , Select, MenuItem , FormControl, InputLabel
} from "@mui/material";
import {
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
// import "../Css/Admin.css";

const Popup = ({
  modalIsOpen,
  setModalIsOpen,
  handleFileChange,
  handleInputChange,
  postToDb,
}) => {
  const [imageType, setImageType] = useState('carousel'); // Add this line to declare the imageType state variable

  const handleImageTypeChange = (event) => {
    setImageType(event.target.value);
    handleInputChange(event);
  };
  return (
    <Modal
      open={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '30%',
          maxHeight: '40%',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#fff',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={() => setModalIsOpen(false)}
        >
          Close
        </Button>
        <Typography variant="h6" gutterBottom>
          Add Image
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel htmlFor="packageImg"></InputLabel>
          <input
            type="file"
            id="packageImg"
            name="packageImg"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="packageImg">
            <Button variant="outlined" component="span">
              Choose File
            </Button>
          </label>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel htmlFor="imagetype">Image Type</InputLabel>
          <Select
            id="imagetype"
            name="imagetype"
            value={imageType}
            onChange={handleImageTypeChange}
            required
          >
            <MenuItem value="carousel">Carousel</MenuItem>
            <MenuItem value="album">Album</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={postToDb}>
          Add Image
        </Button>
      </Box>
    </Modal>
  );
};

const Admin = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState([
    {
      id: 0,
      username: "",
      phone: "",
      email: "",
      name: "",
      hashkey: "",
      password: "",
      role: "",
      isActive: true,
    },
    // Add more data objects as needed
  ]);

  const [myObject, setMyObject] = useState({
    Id: 0,
    AdminId: sessionStorage.getItem('userId'),
    Adminimage: "a",
    ImageType: "carousel",
    FormFile: null,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setMyObject({
      ...myObject,
      FormFile: file,
    });
  };

  const handleInputChange = (event) => {
    const type = event.target.value;
    setMyObject({
      ...myObject,
      ImageType: type,
    });
  };

  const handleData = () => {
    fetch("https://localhost:7290/api/Users/GetUnApprovedAgent", {
      method: "GET",
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem('userToken')
      },
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        setData(myData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const postToDb = () => {
    const formData = new FormData();
    formData.append("Id", myObject.Id);
    formData.append("AdminId", myObject.AdminId);
    formData.append("Adminimage", myObject.Adminimage);
    formData.append("ImageType", myObject.ImageType);
    formData.append("FormFile", myObject.FormFile);

    console.log(myObject);

    const apiUrl =
      "https://localhost:7290/api/PostGalleries/PostPostGalleryImage";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        accept: "text/plain",
      },
      body: formData,
    })
      .then(async (data) => {
        if (data.status === 200) {
          var myData = await data.json();
          console.log(myData);
          alert("post happened");
        } else {
          var myData = await data.json();
          console.log(myData);
          alert("no post happened");
        }
      })
      .catch((err) => {
        console.log(err.error);
        alert("server error");
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  var handleApprove = (item) => {
    const toapprove = {
      id: item.id,
      username: item.username,
      phone: item.phone,
      email: item.email,
      name: item.name,
      hashkey: item.hashkey,
      password: item.password,
      role: item.role,
      isActive: true,
    };

    console.log(toapprove);
    const apiUrl = "https://localhost:7290/api/Users/ApproveAgent";
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...toapprove }),
    })
      .then(async (data) => {
        if (data.status === 200) {
          var myData = await data.json();
          console.log(myData);
        } else {
          alert("Invalid username or password");
        }
      })
      .catch((err) => {
        console.log(err.error);
      });
    handleData();
    window.location.reload();
  };

  const handleDecline = (item) => {
    const todecline = {
      id: item.id,
      username: item.username,
      phone: item.phone,
      email: item.email,
      name: item.name,
      hashkey: item.hashkey,
      password: item.password,
      role: item.role,
      isActive: true,
    };

    console.log(todecline);
    const apiUrl = "https://localhost:7290/api/Users/DeleteAgent";
    fetch(apiUrl, {
      method: "Delete",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...todecline }),
    })
      .then(async (data) => {
        if (data.status === 200) {
          var myData = await data.json();
          console.log(myData);
          alert(" Delted sucessfully");
        } else {
          alert("error in delteing");
        }
      })
      .catch((err) => {
        console.log(err.error);
      });

    handleData();
    window.location.reload();
  };

  return (
    <>
      <Box>
        <div></div>
        <Box className="table-container">
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Table className="responsive-table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item, index) => {
                      if (item.username !== '') {
                        return (
                          <TableRow key={index}>
                            <TableCell>{item.username}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.role}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleApprove(item)}
                                startIcon={<CheckCircleIcon />}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDecline(item)}
                                startIcon={<DeleteIcon />}
                              >
                                Decline
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      } else {
                        return null; // Return null if item.username is empty to skip rendering the row
                      }
                    })}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Button variant="contained" color="primary" onClick={() => setModalIsOpen(true)}>
        Post Image
      </Button>
      <Popup
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        handleFileChange={handleFileChange}
        handleInputChange={handleInputChange}
        postToDb={postToDb}
      />
    </>
  );
};

export default Admin;
