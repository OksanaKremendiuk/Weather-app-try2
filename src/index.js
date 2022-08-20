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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${days[day]} at ${hours}:00`;
}

function displayForecast(response) {
  let forecast = response.data.list;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (
      index === 0 ||
      index === 9 ||
      index === 16 ||
      index === 23 ||
      index === 30 ||
      index === 37
    ) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
             <div class="weather-date-forecast">${formatDay(
               forecastDay.dt
             )}</div>
       <img
         src="https://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png"
         alt=""
         width="48"
       />
       <div class="weather-forecast-temp">
         <span class="forecast-temp-max">
           <strong>${Math.round(forecastDay.main.temp_max)}°</strong>
         </span>
         <span class="forecast-temp-min">${Math.round(
           forecastDay.main.temp_min
         )}°</span>
       </div>
     </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(city) {
  let apiKey = "4a6d5a2213f3c0c35df9b43a1ead3cfc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  getForecast(response.data.id);
  let temperatureElement = document.querySelector("#temparature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let pressureElement = document.querySelector("#pressure");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  pressureElement.innerHTML = response.data.main.pressure;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  date.innerHTML = formatedDate();
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].main}`);
}
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

search("Kyiv");
