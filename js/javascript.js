const weatherCurrent = [
  "temperature_2m",
  "apparent_temperature",
  "relative_humidity_2m",
  "wind_speed_10m",
  "wind_direction_10m",
  "precipitation",
  "weather_code",
];

/*
const weatherHourly = [
  "temperature_2m",
  "wind_speed_10m",
  "wind_direction_10m",
  "precipitation_probability",
  "precipitation",
  "weather_code",
  "time",
];
*/

const weatherCodeText = new Map();
weatherCodeText.set(0, "Clear sky");
weatherCodeText.set(1, "Mainly clear");
weatherCodeText.set(2, "Partly cloudy");
weatherCodeText.set(3, "Overcast");
weatherCodeText.set(45, "Fog");
weatherCodeText.set(48, "Rime fog");
weatherCodeText.set(51, "Light drizzle");
weatherCodeText.set(53, "Moderate drizzle");
weatherCodeText.set(55, "Dense drizzle");
weatherCodeText.set(56, "Light freezing drizzle");
weatherCodeText.set(57, "Dense freezing drizzle");
weatherCodeText.set(61, "Slight rain");
weatherCodeText.set(63, "Moderate rain");
weatherCodeText.set(65, "Heavy rain");
weatherCodeText.set(66, "Light freezing rain");
weatherCodeText.set(67, "Dense freezing rain");
weatherCodeText.set(71, "Slight snow fall");
weatherCodeText.set(73, "Moderate snow fall");
weatherCodeText.set(75, "Heavy snow fall");
weatherCodeText.set(77, "Snow grains");
weatherCodeText.set(80, "Slight rain showers");
weatherCodeText.set(81, "Moderate rain showers");
weatherCodeText.set(82, "Violent rain showers");
weatherCodeText.set(85, "Slight snow showers");
weatherCodeText.set(86, "Heavy snow showers");
weatherCodeText.set(95, "Moderate thunderstorm");
weatherCodeText.set(96, "Thunderstorm with slight hail");
weatherCodeText.set(99, "Thunderstorm with heavy hail");

const weatherCodeIcon = new Map();
weatherCodeIcon.set(0, "sunny.png");
weatherCodeIcon.set(1, "sunny.png");
weatherCodeIcon.set(2, "sun-clouds.png");
weatherCodeIcon.set(3, "atmosphere.png");
weatherCodeIcon.set(45, "clouds.png");
weatherCodeIcon.set(48, "wind.png");
weatherCodeIcon.set(51, "drizzle.png");
weatherCodeIcon.set(53, "drizzle.png");
weatherCodeIcon.set(55, "drizzle.png");
weatherCodeIcon.set(56, "drizzle.png");
weatherCodeIcon.set(57, "drizzle.png");
weatherCodeIcon.set(61, "rain.png");
weatherCodeIcon.set(63, "rain.png");
weatherCodeIcon.set(65, "rain.png");
weatherCodeIcon.set(66, "rain.png");
weatherCodeIcon.set(67, "rain.png");
weatherCodeIcon.set(71, "snow.png");
weatherCodeIcon.set(73, "snow.png");
weatherCodeIcon.set(75, "snow.png");
weatherCodeIcon.set(77, "snow.png");
weatherCodeIcon.set(80, "rain.png");
weatherCodeIcon.set(81, "rain.png");
weatherCodeIcon.set(82, "rain.png");
weatherCodeIcon.set(85, "snow.png");
weatherCodeIcon.set(86, "snow.png");
weatherCodeIcon.set(95, "storm.png");
weatherCodeIcon.set(96, "storm.png");
weatherCodeIcon.set(99, "storm.png");

const BASE_API_URL = "https://api.open-meteo.com/v1";
const LATITUDE_LONGITUDE = "/forecast?latitude=50.7338&longitude=4.2345";
const WEATHER_DAILY =
  "&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant,precipitation_probability_max,precipitation_sum,weather_code";
const WEATHER_HOURLY =
  "&hourly=temperature_2m,wind_speed_10m,wind_direction_10m,precipitation_probability,precipitation,weather_code";
const WEATHER_CURRENT =
  "&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,precipitation,is_day,weather_code";
const TIMEZONE = "&timezone=Europe%2FBerlin";

const month = [
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

const d = new Date();
let today = d.toLocaleDateString("en-UK", { weekday: "long" });
today += ", " + month[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear();
document.getElementById("date").innerText = today;

function getWindDirectionName(angle) {
  let direction = "";

  switch (true) {
    case angle < 23:
      direction = "North";
      break;
    case angle < 68:
      direction = "North-West";
      break;
    case angle < 113:
      direction = "West";
      break;
    case angle < 158:
      direction = "South-West";
      break;
    case angle < 203:
      direction = "South";
      break;
    case angle < 248:
      direction = "South-East";
      break;
    case angle < 293:
      direction = "East";
      break;
    case angle < 338:
      direction = "North-East";
      break;
    case angle <= 360:
      direction = "North";
      break;
  }

  return direction;
}

async function setDocumentWeather() {
  getWeatherData().then((weatherData) => {
    updateWeatherData(weatherData);
  });
}

function updateDailyData(weatherData) {
  const target = document.getElementById("weather_daily");
  target.innerHTML = "";

  for (
    let index = 0;
    index < weatherData.daily.temperature_2m_max.length;
    index++
  ) {
    let cardDaily = `<div class="col-12 col-md-4 col-xl-3 m-0 p-0">
                    <div class="card card-daily text-white">
                      <div class="row g-0 m-0">
                        <div class="col-12">
                          <h5 class="card-header">${new Date(
                            weatherData.daily.time[index]
                          ).toLocaleDateString("en-UK", {
                            weekday: "long",
                          })}</h5>
                        </div>
                        <div class="col-12 col-md-5">
                          <div class="card-body">
                            <h5 class="card-text m-0">
                            ${
                              weatherData.daily.temperature_2m_max[index] +
                              weatherData.daily_units.temperature_2m_max
                            } </h5>
                            <h5>
                            ${
                              weatherData.daily.temperature_2m_min[index] +
                              weatherData.daily_units.temperature_2m_min
                            }</h5>
                          </div>
                        </div>
                        <div class="col-12 col-md-7 align-content-center">
                          <img src="/img/weather-icons/${weatherCodeIcon.get(
                            weatherData.daily.weather_code[index]
                          )}" class="card-img-top w-50" alt="Icon is missing"/>                          
                        </div>
                        <div class="col-12 col-md-5">
                          <div class="card-body">
                            <h6 class="card-text">Wind</h6>
                            <p class="card-text">
                            ${
                              weatherData.daily.wind_speed_10m_max[index] +
                              weatherData.daily_units.wind_speed_10m_max
                            }<br/>                              
                              ${getWindDirectionName(
                                weatherData.daily.wind_direction_10m_dominant[
                                  index
                                ]
                              )}
                            </p>
                          </div>
                        </div>
                        <div class="col-12 col-md-7">
                          <div class="card-body">
                            <h6 class="card-text">Precipitation</h6>
                            <p class="card-text">
                            ${
                              weatherData.daily.precipitation_probability_max[
                                index
                              ] +
                              weatherData.daily_units
                                .precipitation_probability_max
                            }<br/>
                              ${
                                weatherData.daily.precipitation_sum[index] +
                                weatherData.daily_units.precipitation_sum
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`;
    target.innerHTML += cardDaily;
  }
}

async function getWeatherData() {
  const responseJson = await (
    await fetch(
      BASE_API_URL +
        LATITUDE_LONGITUDE +
        WEATHER_DAILY +
        WEATHER_HOURLY +
        WEATHER_CURRENT +
        TIMEZONE
    )
  ).json();
  return responseJson;
}

function updateWeatherData(weatherData) {
  // Start with current weather
  for (let index = 0; index < weatherCurrent.length; index++) {
    if (weatherCurrent[index] == "wind_direction_10m") {
      document.getElementById("wind_direction_10m").innerHTML =
        getWindDirectionName(weatherData.current["wind_direction_10m"]);
    } else if (weatherCurrent[index] == "weather_code") {
      const weatherCodeIconEl = `<img src="/img/weather-icons/${weatherCodeIcon.get(
        weatherData.current["weather_code"]
      )}" class="card-img-top w-50" alt="Icon is missing"/>`;

      document.getElementById("weather_code_icon").innerHTML =
        weatherCodeIconEl;
      document.getElementById("weather_code_text").innerHTML =
        weatherCodeText.get(weatherData.current["weather_code"]);
    } else {
      document.getElementById(weatherCurrent[index]).innerHTML =
        weatherData.current[weatherCurrent[index]] +
        weatherData.current_units[weatherCurrent[index]];
    }
  }

  updateDailyData(weatherData);
}
