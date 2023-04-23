function formatDate(timestamp) {
let now = new Date(timestamp);
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function searching(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#search");
  let h3 = document.querySelector("#cityName");
  h3.innerHTML = `Searching for ${inputValue.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searching);


function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = `b35c686ba9565ba0ab254c2230937552`
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(dayForecast);
console.log(apiUrl);
console.log(coordinates.daily);
}


function dayForecast(response){
  // console.log(response.data.daily);
  let forecast2 = response.data.daily;

  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast2.forEach(function(forecastDay,index)
  {
  if (index < 6) {
      forecastHTML = forecastHTML + `
    <div class="col-2">
      <h4 style="text-align: center"> ${formatDay(forecastDay.dt)}</h4>
      <img src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
      alt=""
      width=""

      <p class="degreebottom">
      <span class="weater-forecast-temp-max"> 
      <b>${Math.round(forecastDay.temp.max)}°</b></span>
      /
      <span class="weater-forecast-temp-min">${Math.round(forecastDay.temp.min)}° </span></p>
    </div>`
  }
  });
      forecastHTML = forecastHTML + `</div>`
      forecast.innerHTML = forecastHTML;
}

function showTemperature(response) {
  console.log(response.data);

  celsiusTemperature = response.data.main.temp

  let temperature = Math.round(celsiusTemperature);
  let temp = document.querySelector("#mein-number");
  temp.innerHTML = `${temperature}°`;

  let humidity = Math.round(response.data.main.humidity);
  let hum = document.querySelector("#humidity");
  hum.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let wind = document.querySelector("#windSp");
  wind.innerHTML = `Wind: ${windSpeed} km/h`;

  let feelLike = Math.round(response.data.main.feels_like);
  let feel = document.querySelector("#feels-like");
  feel.innerHTML = `Feels like: ${feelLike}°C`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = weatherDescription;

  let weekDayMain = document.querySelector("#weekDay");
  weekDayMain.innerHTML = formatDate(response.data.dt * 1000);

   console.log(response.data.dt)

   getForecast(response.data.coord);
   console.log(response.data.coord);
 

}

function searching2(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#search");
  let city = inputValue.value;
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=63214c4281922e3bb72fdf12dada7734`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

  let h3 = document.querySelector("#cityName");
  h3.innerHTML = `Searching for ${inputValue.value}`;
}

let form2 = document.querySelector("#search-form");
form2.addEventListener("submit", searching2);



function showFahrenheitTemp(event){
  event.preventDefault();
  temperatureElement = document.querySelector("#mein-number");

  celsius.classList.remove("celsius-link");
  fahrenheit.classList.add("celsius-link");
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(FahrenheitTemperature);
}

function showCelsiusTemp(event){
  event.preventDefault();

  celsius.classList.add("celsius-link");
  fahrenheit.classList.remove("celsius-link");

  let celsiusShowTemp = document.querySelector("#mein-number");
  celsiusShowTemp.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celsiusTemperature = null;

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsiusTemp);

