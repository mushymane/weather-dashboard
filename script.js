var prevButtonsEl = document.querySelector('#prev-buttons');
var cityInput = document.querySelector("#city-text");
var cityForm = document.querySelector("#city-form");
var button = document.querySelector(".btn");

var prevCities = [];

function init() {
    var storedCities = JSON.parse(localStorage.getItem("prevCities"));
  
    if (storedCities !== null) {
      prevCities = storedCities;
    }
  
    renderPrevCities();
}

function renderWeather() {
    // Display todays weather in larger div
        // City name, date, icon, temperature, humidity, wind speed, uv index
    // Display 5day forcast cards with date, icon, temperature, humidity
}

function storePrev() {
    localStorage.setItem("prevCities", JSON.stringify(prevCities));
}

function renderPrevCities() {
    // Clear prevButtons element and update
    prevButtonsEl.innerHTML = "";
  
    // Render a new button for each city
    for (var i = prevCities.length - 1; i >= 0; i--) {
      var city = prevCities[i];
  
      var btn = document.createElement("button");
      btn.textContent = city;

      btn.setAttribute("class", "btn");
      prevButtonsEl.appendChild(btn);
    }
}

// Event listener for submitted city input
cityForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var cityText = cityInput.value.trim();
  
    // Return from function early if submitted cityText is blank
    if (cityText === "") {
      return;
    }
  
    // Add new cityText to todos array, clear the input
    prevCities.push(cityText);
    cityInput.value = "";
  
    // Store updated cities in localStorage, re-render the list, render the weather
    storePrev();
    renderPrevCities();
    renderWeather();
});

// Event listener for previous cities buttons
prevButtonsEl.addEventListener("click", function(event) {
    var element = event.target;
    console.log("I was clicked");

    if (element.matches("button") === true) {
      renderWeather();
    }
});

init();