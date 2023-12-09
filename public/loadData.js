document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector("table");
  
    // Fetch room data from the server
    fetch('/room-data')
      .then((response) => response.json())
      .then((data) => {
        const rooms = data.rooms;
  
        // Iterate through the rooms data and populate the table
        rooms.forEach((room) => {
          const row = document.createElement("tr");
          const nameCell = document.createElement("td");
          nameCell.textContent = room.name;
          row.appendChild(nameCell);
  
          room.bookings.forEach((booking, index) => {
            const cell = document.createElement("td");
            if (booking) {
              // Display booking information
              const span = document.createElement("span");
              const dataValue = `Unavailable <span class="booked-user">(${booking})</span>`;
              span.innerHTML = dataValue;
              cell.appendChild(span);
            } else {
              // Provide a booking link for available time slots
              const timeslot = index === 0 ? 'morning' : index === 1 ? 'afternoon' : 'evening';
              const link = document.createElement("a");
              link.href = `/booking/${room.name}/${timeslot}`;
              link.textContent = "Book";
              cell.appendChild(link);
            }
            row.appendChild(cell);
          });
  
          // Add the populated row to the table
          table.appendChild(row);
        });
      });
  });
  