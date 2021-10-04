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

function storePrev() {
    localStorage.setItem("prevCities", JSON.stringify(prevCities));
}
  
  // Add submit event to form
  //We add an event listener to the to-do form so that when a user enters a to-do item, the data is stored on submit. The to-dos are stored and rendered using two helper functions, storeTodos() and renderTodos()
cityForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var cityText = cityInput.value.trim();
  
    // Return from function early if submitted cityText is blank
    if (cityText === "") {
      return;
    }
  
    // Add new todoText to todos array, clear the input
    prevCities.push(cityText);
    cityInput.value = "";
  
    // Store updated todos in localStorage, re-render the list
    storePrev();
    renderPrevCities();
});

function renderWeather() {
    // Display todays weather in larger div
        // City name, date, icon, temperature, humidity, wind speed, uv index
    // Display 5day forcast cards with date, icon, temperature, humidity
}

function renderPrevCities() {
    // Clear todoList element and update
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

prevButtonsEl.addEventListener("click", function(event) {
    var element = event.target;
    console.log("I was clicked");

    if (element.matches("button") === true) {
      renderWeather();
    }
});

init();