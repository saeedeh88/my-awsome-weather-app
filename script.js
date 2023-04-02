let now = new Date();

let h3 = document.querySelector("li.h3");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h3.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

//
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#name");
  city.innerHTML = `${searchInput.value}`;
}
let forme = document.querySelector("#city-name");
forme.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = `${temperature}°`;
}

function searchTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiKey = "d239b564cc467756f4d883a3864bf3dc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#city-name");
searchForm.addEventListener("submit", searchTemp);

//

//bonus
let currentTemp = document.querySelector("#current");
currentTemp.addEventListener("click", showCurrentTemp);
function showCurrentTemp() {
  function showWeather(response) {
    let h1 = document.querySelector("#name");
    let temperature = Math.round(response.data.main.temp);
    h1.innerHTML = `Currently ${temperature}° in ${response.data.name}`;
  }

  function retrievePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}
