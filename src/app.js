const mainContainer = document.getElementById("main-container");
const currentWeatherContainer = document.getElementById(
  "current-weather-container"
);
const footer = document.getElementById("footer")
const greeting = document.getElementById("day-greeting")
const usernameContainer = document.getElementById("username-container");
const popup = document.getElementById("myPopup");
const userDetailSubmitButton = document.getElementById("user-detail-submit");
const username = document.getElementById("name")
const city = document.getElementById("city")
const currentTimeDate = new Date()
const currentDateContainer = document.getElementById("current-date");
const currentTimeContainer = document.getElementById("current-time");
const cityNameDisplay = document.getElementById("city-name")
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const currentTemp = document.getElementById("current-temp");
const fahrenheitButton = document.getElementById("imperial")
const celciusButton = document.getElementById("metric")
const currentWeatherIcon = document.getElementById("current-weather-icon");
const searchBox = document.getElementById("search-box");
const searchBoxSubmitButton = document.getElementById(
  "search-box-submit-button"
);
let popupVisible = true
const apiKey = '34a0b3608792f91t1oc6463e450b7ab0';
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=metric`;


function getSearchValue(event) {
  event.preventDefault()
  let searchInput = searchBox.value
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(validCityCheck);
}
searchBoxSubmitButton.addEventListener("click", getSearchValue)




function checkCity (event) {
    event.preventDefault()
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(validCityCheck);
}


// function tester() {
// currentWeatherContainer.style.display = "flex";
// currentWeatherIcon.style.display = "block";
// forecastContainer.style.display = "flex";
// // cityNameDisplay.innerHTML = searchBox.value

// updateCurrentWeather()

// }

// function cityNotFound() {
//     currentWeatherContainer.style.display = "none"
//     currentWeatherIcon.style.display = "none"
//     forecastContainer.style.display = "none"
//     city.value = ""
//     searchBox.value = ""

//     let errorMessageDiv = document.createElement("div")
//     let errorMessage = document.createElement("p")
//     errorMessage.innerHTML = "City not found"
//     errorMessageDiv.appendChild(errorMessage)

//     mainContainer.insertBefore(errorMessageDiv, footer)

//     errorMessageDiv.style.textAlign = "center"
//     errorMessageDiv.style.width = "800px"
//     errorMessageDiv.style.margin = "110px auto 50px"
//     errorMessageDiv.style.height = "305px"
//     errorMessageDiv.style.display = "flex"
//     errorMessageDiv.style.alignItems = "center"
//     errorMessageDiv.style.justifyContent = "center"

//     searchBoxSubmitButton.addEventListener("click", tester);

    
// }

function validCityCheck(response) {
  // let errorMessageDiv = document.createElement("div");
  // let errorMessage = document.createElement("p");
    if (response.data.message === "City not found") {
        alert("🚨 City not found. Try again.")

        city.value = "";
        searchBox.value = "";

        // let cityName = "City not found";
        // cityNameDisplay.innerHTML = cityName;

        // let currentDescription = "N/A";
        // description.innerHTML = currentDescription;

        // let humidityLevel = "N/A";
        // humidity.innerHTML = humidityLevel;

        // let windSpeed = "N/A";
        // wind.innerHTML = windSpeed;

        // let temperature = "N/A";
        // currentTemp.innerHTML = temperature;

    }
        // errorMessageDiv.id = "errorMessageContainer";
        // errorMessageDiv.appendChild(errorMessage)
        // errorMessage.innerHTML = "City not found";

        // currentWeatherContainer.appendChild(errorMessageDiv)
        // forecastContainer.style.display = "none"
        // currentWeatherContainer.style.height = "300px"


        // // currentWeatherContainer.style.display = "none";
        // currentWeatherIcon.style.display = "none";
        // forecastContainer.style.display = "none";

        // city.value = "";
        // searchBox.value = "";

        // errorMessage.innerHTML = "City not found";
        // errorMessageDiv.appendChild(errorMessage);

        // mainContainer.insertBefore(errorMessageDiv, footer);

        // errorMessageDiv.style.textAlign = "center";
        // errorMessageDiv.style.width = "800px";
        // errorMessageDiv.style.margin = "110px auto 50px";
        // errorMessageDiv.style.height = "305px";
        // errorMessageDiv.style.display = "flex";
        // errorMessageDiv.style.alignItems = "center";
        // errorMessageDiv.style.justifyContent = "center";
    // } else {
    //   // while (mainContainer.errorMessageDiv) {
    //   //   mainContainer.removeChild(mainContainer.errorMessageDiv)
    //   // }
    //   // currentWeatherContainer.replaceChildren(currentWeatherContainer, currentWeatherIcon, forecastContainer);

    //   currentWeatherContainer.style.display = "flex";
    //   currentWeatherIcon.style.display = "block";
    //   forecastContainer.style.display = "flex";
      
    // }

    if (popupVisible) {
      closePopup()
    } else {
      let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchBox.value}&key=${apiKey}&units=imperial`;
      axios.get(apiUrl).then(updateCurrentWeather);
      axios.get(apiUrl).then(weatherIcon);

    }
}

userDetailSubmitButton.addEventListener("click", checkCity);


function weatherIcon(response) {
  let apiWeatherDescription = response.data.condition.description;

  if (apiWeatherDescription.includes("rain")) {
    currentWeatherIcon.src = "media/rainy-6.svg"
  } else if (apiWeatherDescription.includes("clear")) {
    currentWeatherIcon.src = "media/day.svg";
  } else if (apiWeatherDescription.includes("cloud")) {
    currentWeatherIcon.src = "media/cloudy.svg"
  } else if (apiWeatherDescription.includes("thunderstorm")) {
    currentWeatherIcon.src = "media/thunder.svg"
  } else if (apiWeatherDescription.includes("snow")) {
    currentWeatherIcon.src = "media/snowy-6.svg"
  } else if (apiWeatherDescription.includes("mist")) {
    currentWeatherIcon.src = "media/rainy-2.svg"
  }
}

function updateCurrentWeather(response) {

    if (response.data.message === "City not found") {
      // alert("🚨 City not found. Try again.");

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
      
      let cityName = response.data.city
      cityNameDisplay.innerHTML = cityName;
  
      let currentDescription = response.data.condition.description
      description.innerHTML = currentDescription
  
      let humidityLevel = response.data.temperature.humidity
      humidity.innerHTML = humidityLevel
  
      let windSpeed = Math.round(response.data.wind.speed)
      wind.innerHTML = windSpeed
  
      let temperature = Math.round(response.data.temperature.current);
      currentTemp.innerHTML = temperature
  
      weatherIcon()
    }
}


function updateGreeting () {
    if (currentTimeDate.getHours() < 12) {
        greeting.innerHTML = "Good Morning"
    } else if ((currentTimeDate.getHours() > 11) && (currentTimeDate.getHours() < 18)) {
        greeting.innerHTML = "Good Afternoon"
    } else {
        greeting.innerHTML = "Good Evening"
    }
}

updateGreeting()

function updateUsername () {
    user = username.value
    usernameFormatted = user.charAt(0).toUpperCase() + user.slice(1).toLowerCase()
    usernameContainer.innerHTML = usernameFormatted
}

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
    let date = currentTimeDate.getDate()
    let month = monthsOfYear[currentTimeDate.getMonth()]
    
    return(`${day}, ${month} ${date}`)
}

function updateCurrentDate() {
    currentDateContainer.innerHTML = dateFormatter(currentTimeDate)
}
updateCurrentDate()

function timeFormatter() {
    let hour = currentTimeDate.getHours()
    let minute = currentTimeDate.getMinutes()

    if (hour < 10) {
        hour = `0${hour}`
    }

    if (minute < 10) {
      minute = `0${minute}`;
    }

    return (`${hour}:${minute}`)
}

function updateCurrentTime() {
    currentTimeContainer.innerHTML = timeFormatter(currentTimeDate)
}
updateCurrentTime()

function showPopup() {
  mainContainer.style.position = "relative";
  mainContainer.style.zIndex = "1";
  mainContainer.style.filter = "blur(40px)"

  popup.style.display = "block";
  popup.style.zIndex = "2";

  popupVisible = true
}
// showPopup()

function closePopup() {
    if ((username.value === null || username.value === "") && (city.value === null || city.value === "")) {
        alert("Enter your name and a city")
    } else if (username.value === null || username.value === "") {
        alert("Enter your name")
    } else if (city.value === null || city.value === "") {
      alert("Enter a city");
    } else {
      popup.style.display = "hidden";
      popup.style.zIndex = "1";
      mainContainer.style.position = "relative";
      mainContainer.style.zIndex = "2";
      mainContainer.style.filter = "blur(0)";
      popupVisible = false

      updateUsername();

      let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=imperial`;
      axios.get(apiUrl).then(updateCurrentWeather);
      axios.get(apiUrl).then(weatherIcon);
    }
  }

function getImperialTemp (response) {
    fahrenheitButton.style.textDecoration = "underline"
    fahrenheitButton.style.textUnderlineOffset = "3px"
    celciusButton.style.textDecoration = "none"

    apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchBox.value}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(updateCurrentWeather);

    let temperature = Math.round(response.data.temperature.current);
    currentTemp.innerHTML = temperature;
}

function getMetricTemp (response) {
    celciusButton.style.textDecoration = "underline";
    celciusButton.style.textUnderlineOffset = "3px";
    fahrenheitButton.style.textDecoration = "none";

    apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchBox.value}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateCurrentWeather);

    let temperature = Math.round(response.data.temperature.current);
    currentTemp.innerHTML = temperature;
}

fahrenheitButton.addEventListener("click", getImperialTemp)
celciusButton.addEventListener("click", getMetricTemp)

