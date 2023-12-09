// Initialize the app
const express = require('express');
const app = express();
const port = 3000;

// Import rooms data from roomsData.js
const { rooms } = require('./public/roomsData');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Define a route to render the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

// Define a route to provide room data as JSON
app.get('/room-data', (req, res) => {
  res.json({ rooms });
});

// Define a route for booking a specific room at a given time
app.get('/booking/:room/:time', (req, res) => {
  const { room, time } = req.params;
  res.sendFile(__dirname + '/views/booking.html');
});

// Handle a POST request to make a booking
app.post('/booking', (req, res) => {
  const room = req.body.room;
  const time = req.body.time;
  const userid = req.body.userid;

  // Find the room in the array
  const roomIndex = rooms.findIndex((r) => r.name === room);

  if (roomIndex !== -1) {
    // Update room booking with userId
    rooms[roomIndex].bookings[time === 'morning' ? 0 : time === 'afternoon' ? 1 : 2] = userid;
    
    // Redirect to homepage
    res.redirect('/');
  } else {
    res.status(400).json({ error: 'Room not found' });
  }
});

// Handle POST request to cancel all bookings
app.post('/cancel-bookings', (req, res) => {
  rooms.forEach((room) => {
    room.bookings = ['', '', ''];
  });
  
  // Redirect to homepage 
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
