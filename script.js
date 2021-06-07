let currentTimeAndDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function findCity(event) {
  event.preventDefault();
  searchLocation(event);
}

function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-now");
  let currentTemp = temperatureElement.innerHTML;
  console.log("currentTemp before I convert to F", currentTemp);
  let farenheit = Math.round((currentTemp * 9) / 5 + 32);
  console.log("farenheit", farenheit);
  temperatureElement.innerHTML = farenheit;
  let farenheitLinkElement = document.querySelector("#farenheit-link");
  farenheitLinkElement.style.display = "none";
  let celciusLinkElement = document.querySelector("#celcius-link");
  celciusLinkElement.style.display = "inline";
  let degreeElement = document.querySelector("#degree");
  degreeElement.innerHTML = "°F";
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-now");
  let currentTemp = temperatureElement.innerHTML;
  let celcius = Math.round(((currentTemp - 32) * 5) / 9);
  temperatureElement.innerHTML = celcius;
  let celciusLinkElement = document.querySelector("#celcius-link");
  celciusLinkElement.style.display = "none";
  let farenheitLinkElement = document.querySelector("#farenheit-link");
  farenheitLinkElement.style.display = "inline";
  let degreeElement = document.querySelector("#degree");
  degreeElement.innerHTML = "°C";
}

function displayLocalWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );

  let celciusLinkElement = document.querySelector("#celcius-link");
  celciusLinkElement.style.display = "none";
  document.querySelector("#weather-conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchLocation(event) {
  event.preventDefault();
  let apiKey = "4c099f4f901402f4288ecadef6fa9e70";
  let unit = "metric";
  let city = document.querySelector("#search-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayLocalWeather);
}

function getCurrentWeather(response) {
  let apiKey = "4c099f4f901402f4288ecadef6fa9e70";
  let unit = "metric";
  let city = response.data.name;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayLocalWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentCoordinates);
}

function getCurrentCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4c099f4f901402f4288ecadef6fa9e70";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentWeather);
  console.log("URL", apiUrl);
}
let currentDay = days[currentTimeAndDate.getDay()];
let currentMonth = months[currentTimeAndDate.getMonth()];
let currentDate = currentTimeAndDate.getDate();
let currentHour = currentTimeAndDate.getHours();
let currentMinute = currentTimeAndDate.getMinutes();

let dateFormat = document.querySelector("#today");
dateFormat.innerHTML = `${currentMonth} ${currentDate} | ${currentDay} ${currentHour}:${currentMinute}`;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", findCity);

let celciusLinkElement = document.querySelector("#celcius-link");
celciusLinkElement.style.display = "none";
