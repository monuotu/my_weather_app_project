let date = new Date();
let h5 = document.querySelector("#date");
let hours = date.getHours();
let mins = date.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
h5.innerHTML = `${day} ${hours}:${mins}`;

function entry(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-name-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let apiKey = "d45725e2a4509bd29a0ea9ad2c2f0d66";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

  function showTemperature(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    let temperatureNow = document.querySelector(".temperatureNow");
    temperatureNow.innerHTML = `${currentTemperature}`;
  }
  axios
    .get(`${apiUrl}${searchInput.value}&appid=${apiKey}&units=metric`)
    .then(showTemperature);
}

let form = document.querySelector("#city-input");
form.addEventListener("submit", entry);

function retrieve(event) {
  event.preventDefault();
  function myLocation(position) {
    console.log(position);
    let myLatitude = position.coords.latitude;
    let myLongitude = position.coords.longitude;
    let apiKey = "d45725e2a4509bd29a0ea9ad2c2f0d66";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=";
    function temperatureHere(response) {
      console.log(response);
      let myTemperature = Math.round(response.data.main.temp);
      let tempHere = document.querySelector(".temperatureNow");
      tempHere.innerHTML = `${myTemperature}`;
      let h1 = document.querySelector("h1");
      let cityName = response.data.name;
      h1.innerHTML = `${cityName}`;
    }
    axios
      .get(
        `${apiUrl}${myLatitude}&lon=${myLongitude}&appid=${apiKey}&units=metric`
      )
      .then(temperatureHere);
  }
  navigator.geolocation.getCurrentPosition(myLocation);
}
let current = document.querySelector(".btn-secondary");
current.addEventListener("click", retrieve);
