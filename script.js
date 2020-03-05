const container = document.querySelector('.container');

//Put everything inside as a NodeList;
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

//adding + to a string transform the data type String into Number;
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMoveData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update Total and count
function updateSelectedCount() {
  //querySelector insert inside of a NodeList;
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats into arr;
  //spreads operator copies elements from array, from objects but not the OBJECT or the ARRAY only the values;
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  //We pass seatsIndex because seatsIndex is an array;
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  // Map through array;
  // return a new array indexes;

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//GetData from localStorage and populate UI;
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMoveData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
