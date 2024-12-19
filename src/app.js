// prompt-container elements
const popup = document.getElementById("entry-prompt-popup");
const username = document.getElementById("name");
const city = document.getElementById("city");
const userDetailSubmitButton = document.getElementById("form-submit");

// nav/greeting container elements
const mainContainer = document.getElementById("main-container");
const searchBox = document.getElementById("search-box");
const searchBoxSubmitButton = document.getElementById("search-box-submit-button");
const greeting = document.getElementById("day-greeting");
const usernameContainer = document.getElementById("username-container");
const currentTimeDate = new Date();
const currentDateContainer = document.getElementById("current-date");
const currentTimeContainer = document.getElementById("current-time");

// current weather container elements 
const currentWeatherContainer = document.getElementById("current-weather-container");
const cityNameDisplay = document.getElementById("city-name");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const currentWeatherIcon = document.getElementById("current-weather-icon");
const currentTemp = document.getElementById("current-temp");
const fahrenheitButton = document.getElementById("imperial");
const celciusButton = document.getElementById("metric");

// forecast container elements
const forecastContainer = document.querySelector(".forecast-container")

// footer element
const footer = document.getElementById("footer");

// api key
const apiKey = "34a0b3608792f91t1oc6463e450b7ab0";



// Greeting based on time of day
function updateGreeting() {
  if (currentTimeDate.getHours() < 12) {
    greeting.innerHTML = "Good Morning";
  } else if (
    currentTimeDate.getHours() > 11 &&
    currentTimeDate.getHours() < 18
  ) {
    greeting.innerHTML = "Good Afternoon";
  } else {
    greeting.innerHTML = "Good Evening";
  }
}
updateGreeting();

// Insert formatted username from form input in greeting container
function updateUsername() {
  user = username.value;
  usernameFormatted =
    user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();
  usernameContainer.innerHTML = usernameFormatted;
}

// Format date: Day, Month Date (i.e - Mon, October 12)
function dateFormatter() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthsOfYear = [
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

  let day = daysOfWeek[currentTimeDate.getDay()];
  let date = currentTimeDate.getDate();
  let month = monthsOfYear[currentTimeDate.getMonth()];

  if (date < 10) {
    date = `0${date}`
  }

  return `${day}, ${month} ${date}`;
}

// Insert formatted date in date container
function updateCurrentDate() {
  currentDateContainer.innerHTML = dateFormatter(currentTimeDate);
}
updateCurrentDate();

// Format time: 00:00
function timeFormatter() {
  let hour = currentTimeDate.getHours();
  let minute = currentTimeDate.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${hour}:${minute}`;
}

// Insert formatted time in time container
function updateCurrentTime() {
  currentTimeContainer.innerHTML = timeFormatter(currentTimeDate);
}
updateCurrentTime();


// PROMPT POPUP FUNCTIONALITY
let popupVisible = true;
function showPopup() {
  mainContainer.style.position = "relative";
  mainContainer.style.zIndex = "1";
  mainContainer.style.filter = "blur(40px)";
  mainContainer.style.background = "transparent"

  popup.style.display = "block";
  popup.style.zIndex = "2";

  popupVisible = true;
}
showPopup();

function closePopup() {
  if (
    (username.value === null || username.value === "") &&
    (city.value === null || city.value === "")
  ) {
    alert("Enter your name and a city");
  } else if (username.value === null || username.value === "") {
    alert("Enter your name");
  } else if (city.value === null || city.value === "") {
    alert("Enter a city");
  } else {

    let promptContainer = document.querySelector(".prompt-container")
    promptContainer.remove(popup)
    // popup.style.display = "hidden";
    // popup.style.zIndex = "-2";
    mainContainer.style.position = "relative";
    mainContainer.style.zIndex = "2";
    mainContainer.style.filter = "blur(0)";
    mainContainer.style.background = "rgba(255, 255, 255, 0.903)";
    popupVisible = false;

    updateUsername();

    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(updateCurrentWeather);
    axios.get(apiUrl).then(weatherIcon);
  }
}


// SEARCH FUNCTIONALITY
// Searches api for inputted city name from form
function checkCity(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(validCityCheck);
}
// Searches api for inputted city name from search bar
function getSearchValue(event) {
  event.preventDefault();
  let searchInput = searchBox.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(validCityCheck);
}
// Directs action for if or if not the inputted city has been located in the api
function validCityCheck(response) {
  if (response.data.message === "City not found") {
    alert("🚨 City not found. Try again.");

    city.value = "";
    searchBox.value = "";
  }

  if (popupVisible) {
    closePopup();
    searchBox.value = city.value;
  } else {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchBox.value}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(updateCurrentWeather);
    axios.get(apiUrl).then(weatherIcon);

    getImperialTemp()
  }
}
userDetailSubmitButton.addEventListener("click", checkCity);
searchBoxSubmitButton.addEventListener("click", getSearchValue);


// CURRENT WEATHER UPDATE FUNCTIONALITY
// Update weather icon
function weatherIcon(response) {
  let apiWeatherDescription = response.data.condition.description;

  if (apiWeatherDescription.includes("rain")) {
    currentWeatherIcon.src = "media/rainy-6.svg";
  } else if (apiWeatherDescription.includes("clear")) {
    currentWeatherIcon.src = "media/day.svg";
  } else if (apiWeatherDescription.includes("cloud")) {
    currentWeatherIcon.src = "media/cloudy.svg";
  } else if (apiWeatherDescription.includes("thunderstorm")) {
    currentWeatherIcon.src = "media/thunder.svg";
  } else if (apiWeatherDescription.includes("snow")) {
    currentWeatherIcon.src = "media/snowy-6.svg";
  } else if (apiWeatherDescription.includes("mist")) {
    currentWeatherIcon.src = "media/rainy-2.svg";
  }
}
// Update current weather info
function updateCurrentWeather(response) {
  if (response.data.message === "City not found") {
    city.value = "";
    searchBox.value = "";

    let cityName = "City not found";
    cityNameDisplay.innerHTML = cityName;

    let currentDescription = "N/A";
    description.innerHTML = currentDescription;

    let humidityLevel = "N/A";
    humidity.innerHTML = humidityLevel;

    let windSpeed = "N/A";
    wind.innerHTML = windSpeed;

    let temperature = "N/A";
    currentTemp.innerHTML = temperature;
  } else {
    let cityName = response.data.city;
    cityNameDisplay.innerHTML = cityName;
    cityNameDisplay.style.fontSize = "35px"
    cityNameDisplay.style.fontWeight = "800"

    let currentDescription = response.data.condition.description;
    description.innerHTML = currentDescription;

    let humidityLevel = response.data.temperature.humidity;
    humidity.innerHTML = humidityLevel;

    let windSpeed = Math.round(response.data.wind.speed);
    wind.innerHTML = windSpeed;

    let temperature = Math.round(response.data.temperature.current);
    currentTemp.innerHTML = temperature;

    weatherIcon();
  }
}


// TEMPERATURE UNIT BUTTON FUNCTIONALITY
function getImperialTemp(response) {
  fahrenheitButton.style.borderBottom = "1px solid #03283f";
  celciusButton.style.borderBottom = "none";

  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchBox.value}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateCurrentWeather);

  let temperature = Math.round(response.data.temperature.current);
  currentTemp.innerHTML = temperature;
}
function getMetricTemp(response) {
  celciusButton.style.borderBottom = "1px solid #03283f";
  fahrenheitButton.style.borderBottom = "none";

  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchBox.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateCurrentWeather);

  let temperature = Math.round(response.data.temperature.current);
  currentTemp.innerHTML = temperature;
}

fahrenheitButton.addEventListener("click", getImperialTemp);
celciusButton.addEventListener("click", getMetricTemp);

// Forecast functionality
function displayForecast() {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = ``

  // Get the current day index
  const currentDayIndex = currentTimeDate.getDay() - 1; //Adjust to align with daysOfWeek index
  const adjustedDayIndex = (currentDayIndex + 7) % 7; // Ensure positive indices

  // Generate the next 5 days
  for (let i = 1; i <= 5; i++) {
    const nextDayIndex = (adjustedDayIndex + i) % 7; // Wrap around the week
    const day = daysOfWeek[nextDayIndex];

    forecastHtml = forecastHtml + `
      <div class="future-forecast">
        <div class="forecast-day">${day}</div>
        <div class="forecast-icon">☀️</div>
        <div class="forecast-temp">
          <div class="max-temp"><strong>#&deg;</strong></div>
          <div class="min-temp">#&deg;</div>
        </div>
      </div>`;
  }
  forecastContainer.innerHTML = forecastHtml
}

displayForecast()
