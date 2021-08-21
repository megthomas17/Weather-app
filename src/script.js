let now = new Date();
let currentDate = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let currentYear = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
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
let todaysDate = document.querySelector(".date");
todaysDate.innerHTML = `${day} ${currentDate} ${month}, ${hour}:${minutes}`;

function showForecast(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temperature");
  tempNow.innerHTML = currentTemp;
  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector(".description");
  description.innerHTML = weatherDescription;
  let humidityDescription = response.data.main.humidity;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${humidityDescription}%`;
  let msWind = Math.round(response.data.wind.speed);
  let windSpeed = msWind * 3.6;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${windSpeed}%`;

  function celToFah(event) {
    event.preventDefault();
    let convertToFah = document.querySelector("#temperature");
    let fahrenheit = (currentTemp * 9) / 5 + 32;
    convertToFah.innerHTML = fahrenheit;
  }
  function celcius(event) {
    event.preventDefault();
    let fahToCel = document.querySelector("#temperature");
    fahToCel.innerHTML = currentTemp;
  }
  let cel = document.querySelector("#celcius-link");
  let fah = document.querySelector("#fahrenheit-link");
  fah.addEventListener("click", celToFah);
  cel.addEventListener("click", celcius);
}

function searchCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;
  let units = "metric";
  let apiKey = "ac7473eafa8b396827d343452dce4674";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${endpoint}?q=${city.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}
let city = document.querySelector("#city");
let search = document.querySelector("#search");
search.addEventListener("click", searchCity);

function showTemperature(response) {
  let geoLocationTemp = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temperature");
  tempNow.innerHTML = geoLocationTemp;
  let geoLocation = response.data.name;
  let location = document.querySelector("h1");
  location.innerHTML = geoLocation;
  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector(".description");
  description.innerHTML = weatherDescription;
  let humidityDescription = response.data.main.humidity;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${humidityDescription}%`;
  let msWind = Math.round(response.data.wind.speed);
  let windSpeed = msWind * 3.6;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${windSpeed}%`;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "ac7473eafa8b396827d343452dce4674";
  let geoEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let geoApiUrl = `${geoEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(geoApiUrl).then(showTemperature);
}
function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", currentPosition);
