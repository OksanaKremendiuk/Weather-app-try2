let unit = "metric";
function formatedDate() {
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
  let day = days[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${day} ${currentHour}:${currentMinute}`;
}

function displayForecast(response) {
  let forecastElement1 = document.querySelector("#forecast");
  let forecast = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecast =
      forecast +
      `<div class="col-2">
       <div class="weather-date-forecast">${day}</div>
       <img
         src="http://openweathermap.org/img/wn/04n@2x.png"
         alt=""
         width="48"
       />
       <div class="weather-forecast-temp">
         <span class="forecast-temp-max">
           <strong>18°</strong>
         </span>
         <span class="forecast-temp-min">12°</span>
       </div>
     </div>`;
  });
  forecast = forecast + `</div>`;
  forecastElement1.innerHTML = forecast;
}
function getForecast(coordinates) {
  let latitude = coordinates.latitude;
  let longitude = coordinates.longitude;
  let apiKey = "4a6d5a2213f3c0c35df9b43a1ead3cfc";
  let apiUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  celsLink.classList.add("active");
  farhLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temparature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let pressureElement = document.querySelector("#pressure");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celsiusTemp = response.data.main.temp;
  pressureElement.innerHTML = response.data.main.pressure;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  date.innerHTML = formatedDate();
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].main}`);
  getForecast(response.data.coord);
}
displayForecast();
function search(city) {
  let apiKey = "4a6d5a2213f3c0c35df9b43a1ead3cfc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

function weatherInYourCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4a6d5a2213f3c0c35df9b43a1ead3cfc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(weatherInYourCity);
}

let button = document.querySelector("#geo-position-button");
button.addEventListener("click", getCurrentCity);

function displayTempInFarh(event) {
  event.preventDefault();
  celsLink.classList.remove("active");
  farhLink.classList.add("active");
  let temperatureElement = document.querySelector("#temparature");
  let farhTemp = celsiusTemp * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(farhTemp);
}

function displayTempInCels(event) {
  event.preventDefault();
  celsLink.classList.add("active");
  farhLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temparature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let farhLink = document.querySelector("#farh-link");
farhLink.addEventListener("click", displayTempInFarh);

let celsLink = document.querySelector("#cels-link");
celsLink.addEventListener("click", displayTempInCels);

search("Kyiv");
