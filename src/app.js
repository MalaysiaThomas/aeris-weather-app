const mainContainer = document.getElementById("main-container");
const greeting = document.getElementById("day-greeting")
const usernameContainer = document.getElementById("username-container");
const popup = document.getElementById("myPopup");
const userDetailSubmitButton = document.getElementById("user-detail-submit");
const username = document.getElementById("name")
const city = document.getElementById("city")
const currentTimeDate = new Date()
const currentDateContainer = document.getElementById("current-date");
const currentTimeContainer = document.getElementById("current-time");


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
}
// showPopup()

function closePopup(event) {
    if ((username.value === null || username.value === "") && (city.value === null || city.value === "")) {
        alert("Enter your name and a city")
    } else if (username.value === null || username.value === ""){
        alert("Enter your name")
    } else if (city.value === null || city.value === "")  {
        alert("Enter a city")
    } else {
      event.preventDefault();
      popup.style.display = "hidden";
      popup.style.zIndex = "1";
      mainContainer.style.position = "relative";
      mainContainer.style.zIndex = "2";
      mainContainer.style.filter = "blur(0)";
      updateUsername()
    }
  }

userDetailSubmitButton.addEventListener("click", closePopup)




