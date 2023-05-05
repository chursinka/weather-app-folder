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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index >= 1 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2 days-list">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}<br /></div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="weather-icon" width="42" />
                <div class="weather-forecast-temperature"> <span class="weather-forecast-temperature-max"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
                </div>
      
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
function getForecast(coordinates) {
  let apiKey = `616b14cbd38253313b3b8852fa77335d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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
displayForecast();
