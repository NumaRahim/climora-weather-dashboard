const cityDisplay = document.getElementById("city-name");
const countryDisplay = document.getElementById("city-subtitle");

const condition = document.getElementById("condition-text");
const conditionIcon = document.getElementById("condition-icon");

const searchInput = document.getElementById("search-input");
const validateCity = document.getElementById("validationError");
const refreshDisplay = document.getElementById("btn-refresh");

const fahrenheitDisplay = document.getElementById("btn-unit");
const temperatureDisplay = document.getElementById("temperature");

const humidityDisplay = document.getElementById("Humidity");
const visibilityDisplay = document.getElementById("Visibility");
const feelsLike = document.getElementById("feelsLike");
const localtimeDisplay = document.getElementById("localTime");
const latitudeDisplay = document.getElementById("Latitude");
const longitudeDisplay = document.getElementById("Longitude");
const windspeedDisplay = document.getElementById("windSpeed");

const CODisplay = document.getElementById("C0");
const NODisplay = document.getElementById("NO");
const O3Display = document.getElementById("O3");
const SO2Display = document.getElementById("SO2");

const PM2Display = document.getElementById("PM2");
const PM10Display = document.getElementById("PM10");
const epaindexDisplay = document.getElementById("s-epa-index");

// Store API response globally
let weatherData = null;

const searchWeather = async (event) => {
  if (event.key === "Enter") {
    const city = searchInput.value.trim();

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=99bdd38e32e44778ba7150354263007&q=${city}&aqi=yes`,
      );

      const data = await response.json();

      //vaidation of the city
      if (data.error) {
        validateCity.textContent = "City Not Found";
        return;
      }

      // Save the API response
      weatherData = data;

      //Display the data
      validateCity.textContent = "";

      cityDisplay.textContent = weatherData.location.name;
      countryDisplay.textContent = weatherData.location.country;
      temperatureDisplay.textContent = `${weatherData.current.temp_c}°C`;
      condition.textContent = weatherData.current.condition.text;

      conditionIcon.src = "https:" + weatherData.current.condition.icon;
      conditionIcon.hidden = false;

      humidityDisplay.textContent = `${weatherData.current.humidity}%`;
      visibilityDisplay.textContent = `${weatherData.current.vis_km}km`;
      localtimeDisplay.textContent = weatherData.location.localtime;
      feelsLike.textContent = `${weatherData.current.feelslike_c}°C`;
      latitudeDisplay.textContent = `${weatherData.location.lat}° N`;
      longitudeDisplay.textContent = `${weatherData.location.lon}° E `;
      windspeedDisplay.textContent = `${weatherData.current.wind_kph} km/h`;

      CODisplay.textContent = weatherData.current.air_quality.co;
      NODisplay.textContent = weatherData.current.air_quality.no2;
      O3Display.textContent = weatherData.current.air_quality.o3;
      SO2Display.textContent = weatherData.current.air_quality.so2;

      PM2Display.textContent = weatherData.current.air_quality.pm2_5;
      PM10Display.textContent = weatherData.current.air_quality.pm10;
      epaindexDisplay.textContent =
        weatherData.current.air_quality["us-epa-index"];
    } catch (error) {
      console.error("Error fetching weather:", error);
      validateCity.textContent = "Network Error";
    }
  }
};

// Fahrenheit Button
const Fahrenheit = (event) => {
  if (!weatherData) return;

  temperatureDisplay.textContent = `${weatherData.current.temp_f}°F`;
};

//Refresh Page
const Refresh = () => {
  weatherData = null;
  temperatureDisplay.textContent = "";
  condition.textContent = "";
  conditionIcon.hidden = true;
  cityDisplay.textContent = "";
  countryDisplay.textContent = "";
  searchInput.value = "";
  validateCity.textContent = "";
  humidityDisplay.textContent = "";
  visibilityDisplay.textContent = "";
  localtimeDisplay.textContent = "";
  feelsLike.textContent = "";
  latitudeDisplay.textContent = "";
  longitudeDisplay.textContent = "";
  windspeedDisplay.textContent = "";
  CODisplay.textContent = "";
  NODisplay.textContent = "";
  O3Display.textContent = "";
  SO2Display.textContent = "";

  PM2Display.textContent = "";
  PM10Display.textContent = "";
  epaindexDisplay.textContent = "";
};

searchInput.addEventListener("keydown", searchWeather);
fahrenheitDisplay.addEventListener("click", Fahrenheit);
refreshDisplay.addEventListener("click", Refresh);
