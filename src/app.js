const mainContainer = document.getElementById("main-container");
const popup = document.getElementById("myPopup");
const userDetailSubmitButton = document.getElementById("user-detail-submit");

function showPopup() {
  mainContainer.style.position = "relative";
  mainContainer.style.zIndex = "1";
  mainContainer.style.filter = "blur(40px)"

  popup.style.display = "block";
  popup.style.zIndex = "2";
}

showPopup()

function closePopup(event) {
  event.preventDefault();
  popup.style.display = "hidden";
  popup.style.zIndex = "1";

  mainContainer.style.position = "relative";
  mainContainer.style.zIndex = "2";
  mainContainer.style.filter = "blur(0)";
}

userDetailSubmitButton.addEventListener("click", closePopup)