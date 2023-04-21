let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
document.querySelector("#current-day").innerHTML = `${currentDay}`;

let hours = now.getHours();
let minutes = now.getUTCMinutes();
if (hours < 10) hours = "0" + hours;
if (minutes < 10) minutes = "0" + minutes;
let currentTime = `${hours}:${minutes}`;
document.querySelector("#current-time").innerHTML = `${currentTime}`;

function showCelsius(number) {
  return number;
}
showCelsius(10);

function celsiusEvent() {
  document.querySelector(`#temperature`).innerHTML = showCelsius(10);
}
document.querySelector(`#celsius`).addEventListener("click", celsiusEvent);

function showFahrenheit(numbers) {
  return numbers;
}
showFahrenheit(40);

function fahrenheitEvent() {
  document.querySelector(`#temperature`).innerHTML = showFahrenheit(40);
}
document
  .querySelector(`#fahrenheit`)
  .addEventListener("click", fahrenheitEvent);

function showValues(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-city").innerHTML = `${response.data.name}`;
  document.querySelector("#hiTemperature").innerHTML = ` ${Math.round(
    response.data.main.temp_max
  )} °C`;
  document.querySelector("#lowTemperature").innerHTML = ` ${Math.round(
    response.data.main.temp_min
  )} °C`;
  document.querySelector("#feelsTemperature").innerHTML = `  ${Math.round(
    response.data.main.feels_like
  )} °C`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} m/s`;
  document.querySelector("#clouds").innerHTML = `${Math.round(
    response.data.clouds.all
  )} %`;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )} %`;
  document.querySelector(
    "#weather-description"
  ).innerHTML = `${response.data.weather[0].main} `;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response.data);
}
function defaultCity(definedCity) {
  let units = `metric`;
  let apiKey = `a33b693cfbefd271b0ed075f9a8f65f0`;
  let endPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${endPoint}?q=${definedCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showValues);
}

function showCity(event) {
  event.preventDefault();
  definedCity = document.querySelector(`#search-input`).value;
  defaultCity(definedCity);
}
document.querySelector(`#search-form`).addEventListener("submit", showCity);
defaultCity("Edmonton");
function eventGetPosition() {
  navigator.geolocation.getCurrentPosition(getPosition);
}
let currentLocation = document.querySelector(`#current-location-button`);
currentLocation.addEventListener("click", eventGetPosition);
function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `metric`;
  let apiKey = `a33b693cfbefd271b0ed075f9a8f65f0`;
  let endPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${endPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showValues);
}

function getParis() {
  document.querySelector(`#search-input`).value = "Paris";
  let parisUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=a33b693cfbefd271b0ed075f9a8f65f0&units=metric`;
  axios.get(parisUrl).then(showValues);
}
document.querySelector(`#paris-city`).addEventListener("click", getParis);

function getRome() {
  document.querySelector(`#search-input`).value = "Rome";
  let romeUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rome&appid=a33b693cfbefd271b0ed075f9a8f65f0&units=metric`;
  axios.get(romeUrl).then(showValues);
}
document.querySelector(`#rome-city`).addEventListener("click", getRome);

function getKyiv() {
  document.querySelector(`#search-input`).value = "Kyiv";
  let kyivUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=a33b693cfbefd271b0ed075f9a8f65f0&units=metric`;
  axios.get(kyivUrl).then(showValues);
}
document.querySelector(`#kyiv-city`).addEventListener("click", getKyiv);
