import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ApiContext } from "./ApiContextProvider";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { History } from "@mui/icons-material";

const PackageDetails = ({ packageId }) => {
  const [packageDetails, setPackageDetails] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedHotelPlace, setselectedHotelPlace] = useState(null);
  const [selectedVehiclePlace, setselectedVehiclePlace] = useState(null);
  const {
    selectedPackage,
    setSelectedPackage,
    selectedPackagePrice,
    setSelectedPackagePrice,
  } = useContext(ApiContext);

  const [roomDetails, setRoomDetails] = useState([]);
  const [roomDetailsMain, setRoomDetailsMain] = useState([]);
  const [selectedRoomsMap, setSelectedRoomsMap] = useState({});
  const [selectedVehiclesMap, setSelectedVehiclesMap] = useState({});
  const [selectedDate, setSelectedDate] = useState(""); // State to store the selected date
  const [numberOfPersons, setNumberOfPersons] = useState(1);

  const [selectedRoomPrices, setSelectedRoomPrices] = useState([]);

  const [bookingData, setBookingData] = useState({
    id: null,
    userId: null,
    packageMasterId: null,
    feedback: null,
    totalAmount: null,
  });

  const [selectedRoomDetails, setSelectedRoomDetails] = useState([]); // Initialize as an empty array

  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState([]);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Months are 0-indexed, so we add 1.
    let day = today.getDate();

    // Add leading zeros if month or day are single digits.
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchPackageDetailsById = async (packageId) => {
      try {
        const response = await axios.post(
          "https://localhost:7290/api/PackageMasters/Get_package_details",
          {
            idint: selectedPackage,
          }
        );
        setPackageDetails(response.data);
        console.log("see this", response.data)
      } catch (error) {
        console.error("Error fetching package details by ID:", error);
        setPackageDetails(null);
      }
    };

    fetchPackageDetailsById(packageId);
  }, [packageId]);

  if (!packageDetails) {
    return <div>Loading...</div>;
  }

  const handleShowHotels = (placeId) => {
    setselectedHotelPlace(placeId);
  };

  const handleShowVehicles = (placeId) => {
    setselectedVehiclePlace(placeId);
  };

  // const handleShowRooms = async (hotelId) => {
  //   try {
  //     const response = await axios.post('https://localhost:7290/api/RoomDetailsMasters/getRoomDetailsByHotel', {
  //       idint: hotelId,
  //     });
  //     setRoomDetails(response.data);
  //     console.log("roomDetails:", response.data); // Add this log
  //     setSelectedHotel(hotelId); // Set the selectedHotel to the clicked hotelId
  //   } catch (error) {
  //     console.error('Error fetching room details:', error);
  //   }
  // };
  const handleShowRooms = async (hotelId) => {
    try {
      const response = await axios.post(
        "https://localhost:7290/api/RoomDetailsMasters/getRoomDetailsByHotel",
        {
          idint: hotelId,
        }
      );
      setRoomDetails(response.data);

      // Update the roomDetailsMain state by combining the previous data with the new data
      setRoomDetailsMain((prevRoomDetails) => [
        ...prevRoomDetails,
        ...roomDetails,
      ]);

      console.log("roomDetails:", response.data); // Add this log
      setSelectedHotel(hotelId); // Set the selectedHotel to the clicked hotelId
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  //   const handleSelectRoom = (roomId) => {
  //   // Check if the roomId is not already in the selectedRoomsList
  //   if (!selectedRoomsList.includes(roomId)) {
  //     setSelectedRoomsList((prevSelectedRoomsList) => [...prevSelectedRoomsList, roomId]);
  //   }
  // };

  // const handleSelectVehicle = (vehicleId) => {
  //   // Check if the vehicleId is not already in the selectedVehiclesList
  //   if (!selectedVehiclesList.includes(vehicleId)) {
  //     setSelectedVehiclesList((prevSelectedVehiclesList) => [...prevSelectedVehiclesList, vehicleId]);
  //   }
  // };

  // const allRoomsAndVehiclesSelected = () => {
  //     console.log("ROOOM",selectedRoomsList)
  // console.log("vEHICLE",selectedVehiclesList)
  // console.log("PLACES",packageDetails.placeList)

  //   return (
  //     packageDetails.placeList.length === selectedRoomsList.length &&
  //     packageDetails.placeList.length === selectedVehiclesList.length
  //   );
  // };

  const handleSelectRoom = (placeId, roomId) => {
    console.log("Selected Room:", roomId);
    setSelectedRoomsMap((prevSelectedRoomsMap) => ({
      ...prevSelectedRoomsMap,
      [placeId]: roomId,
    }));
    console.log("Selected Rooms Map:", selectedRoomsMap);
  };

  const handleSelectVehicle = (placeId, vehicleId) => {
    setSelectedVehiclesMap((prevSelectedVehiclesMap) => ({
      ...prevSelectedVehiclesMap,
      [placeId]: vehicleId,
    }));
  };

  const allRoomsAndVehiclesSelected = () => {
    console.log("ROOOM", selectedRoomsMap);
    console.log("vEHICLE", selectedVehiclesMap);
    console.log("PLACES", packageDetails.placeList);

    const isDateSelected = selectedDate !== ""; // Check if a date is selected
    const isNumberOfPersonsSelected = numberOfPersons > 0; // Check if the number of persons is greater than 0

    return (
      isDateSelected &&
      isNumberOfPersonsSelected &&
      packageDetails.placeList.every((place) => {
        return (
          selectedRoomsMap[place.placeId] !== undefined
          // && selectedVehiclesMap[place.placeId] !== undefined
        );
      })
    );
  };

  const handleCreateBooking = async () => {
    const selectedVehicleIds = Object.values(selectedVehiclesMap);
    const selectedVehiclePrices = selectedVehicleIds.map((vehicleId) => {
      const placeId = Number(
        Object.keys(selectedVehiclesMap).find(
          (key) => selectedVehiclesMap[key] === vehicleId
        )
      );

      console.log("selectedVehiclesMap:", selectedVehiclesMap);
      console.log("placeId:", placeId);
      console.log("packageDetails.placeList:", packageDetails.placeList);

      const place = packageDetails.placeList.find(
        (place) => place.placeId === placeId
      );

      console.log("place:", place);
      console.log("place.vechileList:", place ? place.vechileList : "N/A");

      if (!place || !place.vechileList || place.vechileList.length === 0)
        return 0;

      const vehicle = place.vechileList.find(
        (vehicle) => vehicle.vehicleDetailsId === vehicleId
      );
      return vehicle ? vehicle.carPrice : 0;
    });

    const totalVehiclePrice = selectedVehiclePrices.reduce(
      (total, price) => total + price,
      0
    );

    // const selectedRoomIds = Object.values(selectedRoomsMap).map(Number);
    // const selectedRoomPrices = selectedRoomIds.map((roomId) => {
    // const placeId = Number(Object.keys(selectedRoomsMap).find((key) => selectedRoomsMap[key] === roomId));

    // const place = packageDetails.placeList.find((place) => place.placeId === placeId);
    // console.log("placeR:", place);
    //     console.log("place.vechileListR:", place ? place.roomDetails : "N/A");

    // if (!place || !place.roomList || place.roomList.length === 0) return 0;

    // const room = place.roomDetails.find((room) => room.roomDetailsMasterId === roomId);
    // return room ? room.price : 0;
    // });

    const selectedRoomIds = Object.values(selectedRoomsMap).map(Number);
    console.log(selectedRoomIds);
    console.log("check", roomDetailsMain);
    const selectedRoomPrices = selectedRoomIds.map((roomId) => {
      const room = roomDetailsMain.find(
        (room) => room.roomDetailsMasterId === roomId
      );
      return room ? room.price : 0;
    });

    //   const getRoomPrice = (roomId) => {
    //     console.log("roomId:", roomId);

    //     // Check if the roomId exists in roomDetails
    //     const room = roomDetails.find((room) => room.roomDetailsMasterId === roomId);

    //     if (room) {
    //       console.log("room:", room);
    //       return room.price;
    //     }

    //     return 0;
    //   };

    // console.log("packageDetails.placeList:", packageDetails.placeList);
    // console.log("selectedRoomsMap:", selectedRoomsMap);

    // const selectedRoomIds = Object.values(selectedRoomsMap).map(Number);
    // console.log("selectedRoomIds:", selectedRoomIds);
    // const selectedRoomPrices = selectedRoomIds.map((roomId) => {
    //   return getRoomPrice(roomId);
    // });

    // console.log("packageDetails.placeList:", packageDetails.placeList);
    // console.log("selectedRoomsMap:", selectedRoomsMap);

    console.log("aksjdfiulbj", selectedRoomPrices);
    const totalRoomPrice = selectedRoomPrices.reduce(
      (total, price) => total + price,
      0
    );

    const totalPackagePrice =
      selectedPackagePrice + totalVehiclePrice + totalRoomPrice;

    const totAmount = totalPackagePrice * numberOfPersons;

    // Create the booking payload based on selected data
    const bookingPayload = {
      userId: sessionStorage.getItem("userId"),
      packageMasterId: selectedPackage, // Use the selectedPackage from context
      feedback: "",
      totalAmount: totAmount, // Use the calculated total package price
      startdate: selectedDate, // Use the selectedDate state as the start date
      personCount: numberOfPersons, // Use the numberOfPersons state as the person count
    };
    // Debug Logs
    console.log("Previous Selected Vehicles Map:", selectedVehiclesMap);
    console.log("New Selected Vehicles Map:", selectedVehiclesMap);
    console.log("Booking details:", bookingPayload);
    console.log("Total Package Price:", totalPackagePrice);
    console.log("Total Room Price:", totalRoomPrice);
    console.log("Total Room Price for all:", totAmount);
    console.log("Total Vehicle Price:", totalVehiclePrice);
    console.log("Selected Room Prices:", selectedRoomPrices);
    console.log("Selected Vehicle Prices:", selectedVehiclePrices);

    try {
      // Make the POST request to create the booking
      const bookingResponse = await axios.post(
        "https://localhost:7290/api/Bookings/PostBooking",
        bookingPayload
      );
      const newBookingId = bookingResponse.data.id; // Assuming the response contains the booking ID

      // Loop through the selectedRoomsMap and create room bookings
      Object.entries(selectedRoomsMap).forEach(([placeId, roomId]) => {
        const roomBookingPayload = {
          roomDetailsId: roomId,
          bookingId: newBookingId,
        };
        axios
          .post(
            "https://localhost:7290/api/RoomBookings/Add_RoomBooking",
            roomBookingPayload
          )
          .then((response) => {
            console.log("Room Booking created:", response.data);
            setSelectedRoomDetails((prevSelectedRoomDetails) => [
              ...prevSelectedRoomDetails,
              {
                id: response.data.id, // Assuming you will get an ID from the API after posting
                roomDetailsId: roomId,
                bookingId: newBookingId,
              },
            ]);
          })
          .catch((error) => {
            console.error("Error creating room booking:", error);
          });
      });

      // Loop through the selectedVehiclesMap and create vehicle bookings
      Object.entries(selectedVehiclesMap).forEach(([placeId, vehicleId]) => {
        const vehicleBookingPayload = {
          vehicleDetailsId: vehicleId,
          bookingId: newBookingId,
        };
        axios
          .post(
            "https://localhost:7290/api/VehicleBookings/PostVehicleBooking",
            vehicleBookingPayload
          )
          .then((response) => {
            console.log("Vehicle Booking created:", response.data);
            setSelectedVehicleDetails((prevSelectedVehicleDetails) => [
              ...prevSelectedVehicleDetails,
              {
                id: response.data.id, // Assuming you will get an ID from the API after posting
                vehicleDetailsId: vehicleId,
                bookingId: newBookingId,
              },
            ]);
          })
          .catch((error) => {
            console.error("Error creating vehicle booking:", error);
          });
      });

      console.log("Booking created:", bookingResponse.data);
      console.log("amttt:", totAmount);
      alert("Booking successful, Total Amount: Rs." + totAmount);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Booking failed");
    }
  };

  return (
    <Box
      sx={{
        margin: "20px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h2>Package Name: {packageDetails.packageName}</h2>
      <p>Package Price: {packageDetails.packagePrice}</p>
      <p>Region: {packageDetails.region}</p>

      <h2>Package Details for Package ID: {packageId}</h2>

      {/* Date Selection */}
      <label>
        Select Date:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={getCurrentDate()}
        />
      </label>

      {/* Number of Persons Input */}
      <label>
        Number of Persons:
        <input
          type="number"
          value={numberOfPersons}
          onChange={(e) => setNumberOfPersons(parseInt(e.target.value))}
          min="1"
        />
      </label>
      <h3>Places to Visit:</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {packageDetails.placeList.map((place, index) => (
          <Card key={index} sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {place.placeName}
              </Typography>
             
              <img
                src={`data:image/jpeg;base64,${place.placeImagepath}`}
                alt={`Image ${index + 1}`}
                style={{ width: "304px", height: "200px" }}
              />
              <Typography variant="body2" color="text.secondary">
                Day Number: {place.dayNumber}
                {console.log(place)}
              </Typography>
               <Typography variant="body2" color="text.secondary">
                Iterinary: {place.iterinary}
              </Typography>
              
              {/* You can add more place details here if needed */}
              <Button sx = {{marginRight: '10px'}} variant="contained" onClick={() => handleShowHotels(place.placeId)}>
                Show Hotels
              </Button>
              {selectedHotelPlace === place.placeId &&
                place.hotelList &&
                place.hotelList.length > 0 && (
                  <div>
                    {place.hotelList.map((hotel, i) => (
                      <div key={i}>
                        <Typography gutterBottom variant="h6" component="div">
                          Hotel Name: {hotel.hotelName}
                        </Typography>
                        {/* <img
                          src={`data:image/jpeg;base64,${hotel.hotelImagepath}`}
                          alt={`Image ${index + 1}`}
                          style={{ maxWidth: "100%", height: "auto" }}
                        /> */}
                        {/* Add more hotel details here */}
                        <Button sx = {{marginBottom: '10px'}} variant="outlined" onClick={() => handleShowRooms(hotel.hotelId)}>
                          Show Rooms
                        </Button>
                        <Dialog
                          open={selectedHotel !== null}
                          onClose={() => setSelectedHotel(null)}
                        >
                          <DialogTitle>Room Details</DialogTitle>
                          <DialogContent>
                            {roomDetails.map((room, index) => (
                              <div key={index}>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                >
                                  {room.roomType}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Price: {room.price}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Description: {room.description}
                                </Typography>
                                {/* <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  id: {room.roomDetailsMasterId}
                                </Typography> */}
                                {/* <Button onClick={() => handleSelectRoom(room.roomDetailsMasterId)}>Select Room</Button> */}
                                <Button
                                  onClick={() =>
                                    handleSelectRoom(
                                      place.placeId,
                                      room.roomDetailsMasterId
                                    )
                                  }
                                >
                                  Select Room
                                </Button>

                                {console.log(selectedRoomDetails)}
                              </div>
                            ))}
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => setSelectedHotel(null)}>
                              Close
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                )}
              <Button variant="contained" onClick={() => handleShowVehicles(place.placeId)}>
                Show Vehicles
              </Button>
              {selectedVehiclePlace === place.placeId &&
                place.vechileList &&
                place.vechileList.length > 0 && (
                  <div>
                    {place.vechileList.map((vehicle, i) => (
                      <div key={i}>
                        <Typography gutterBottom variant="h5" component="div">
                          Vehicle Name: {vehicle.vehicleName}
                        </Typography>
                        {/* <img
                          src={`data:image/jpeg;base64,${vehicle.vehicleImagepath}`}
                          alt={`Image ${index + 1}`}
                          style={{ maxWidth: "100%", height: "auto" }}
                        /> */}
                        <Typography gutterBottom variant="h6" component="div">
                          No. Of Seats: {vehicle.numberOfSeats}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                          Price Per Person: {vehicle.carPrice}
                        </Typography>
                        {/* Add more vehicle details here */}
                        {/* <Button onClick={() => handleSelectVehicle(vehicle.vehicleDetailsId)}>Select Vehicle</Button> */}
                        <Button variant="outlined"
                          onClick={() =>
                            handleSelectVehicle(
                              place.placeId,
                              vehicle.vehicleDetailsId
                            )
                          }
                        >
                          Select Vehicle
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
            </CardContent>
          </Card>
        ))}
        
      </div>
      <Button variant="contained"
         sx = {{
            marginTop: '10px'
        }}
          onClick={handleCreateBooking}
          disabled={!allRoomsAndVehiclesSelected()}
        >
          Create Booking
        </Button>
    </Box>
  );
};

export default PackageDetails;
