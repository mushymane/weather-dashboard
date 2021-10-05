var prevButtonsEl = document.querySelector('#prev-buttons');
var cityInput = document.querySelector("#city-text");
var cityForm = document.querySelector("#city-form");
var button = document.querySelector(".btn");

var todayHeader = document.querySelector("#today-header");
var todayTemp = document.querySelector("#temp");
var todayHumidity = document.querySelector("#humidity");
var todayWind = document.querySelector("#wind");
var todayUV = document.querySelector("#uv");
var uvColor = document.querySelector("#uv-color");

var forecastContainer = document.querySelector("#forecast-container");

var prevCities = [];
var appid = "75b8497a982601cce9f89a559e6380bb";

// This function is run at start. It get the saved city search history and shows current weather for SF
function init() {
    var storedCities = JSON.parse(localStorage.getItem("prevCities"));

    // Updates prevCities array
    if (storedCities !== null) {
      prevCities = storedCities;
    }
  
    renderPrevCities(); // Renders search history
    renderWeather(37.7749, -122.4194, "San Francisco"); // Initializes to SF
}

// Displays the weather
function renderWeather(lat, lon, city) {
    // Requests a response from Open Weather API and uses imperial units (American - Farenheight, miles per hour)
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + appid;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                
                // Get and append the icon
                var iconCode = data.current.weather[0].icon;
                var iconLink = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                var icon = document.createElement("img");
                icon.setAttribute("src", iconLink);
                todayHeader.textContent = city + " (" + moment().format("dddd, MMMM Do YYYY") + ")";
                todayHeader.append(icon)

                // Get the current temperature, humidity, and wind speed
                todayTemp.textContent = "Temperature: " + data.current.temp + " °F";
                todayHumidity.textContent = "Humidity: " + data.current.humidity;
                todayWind.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";

                // Get and append the UV index, color coded
                todayUV.textContent = "UV Index: ";
                var uvbg = document.createElement("span");
                uvbg.textContent = data.current.uvi;
                getUVI(data.current.uvi, uvbg);
                todayUV.append(uvbg);

                // Clear the cards
                $(forecastContainer).empty();

                // Creates new cards for the 5-day forecast
                for (let i = 0; i < 5; i++) {

                    // Initialize card, set attribute, set the date
                    var card = document.createElement("div");
                    card.setAttribute("class", "col mx1");
                    var date = moment().add(i + 1, "days").format("ddd, MMM D YYYY");
                    var cardHeader = document.createElement("h4");
                    cardHeader.textContent = date;
                    card.append(cardHeader)

                    // Set the icon
                    var iconCode = data.daily[i + 1].weather[0].icon;
                    var iconLink = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                    var icon = document.createElement("img");
                    icon.setAttribute("src", iconLink);
                    card.append(icon);

                    // Set the temp
                    var temp = document.createElement("p");
                    temp.textContent = "Temp: " + data.daily[i + 1].temp.day + " °F";
                    card.append(temp);

                    // Set the humidity
                    var humidity = document.createElement("p");
                    humidity.textContent = "Humidity: " + data.daily[i + 1].humidity;
                    card.append(humidity);

                    // Append to container in HTML
                    forecastContainer.append(card)
                }
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
}

// Requests a response from Geocoding API to get coordinates. Latitude and longitude are needed to
// receive a response from One Call API. Then renders the weather
function getCoordinates(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1" + "&appid=" + appid;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // Get lat and lon properties from response
                var lat = data[0].lat.toString();
                var lon = data[0].lon.toString();
                renderWeather(lat, lon, data[0].name);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
}

// Color codes the UV
function getUVI(num, element) {
    element.style.borderRadius = "3px";
    element.style.padding = "3px";
    element.style.color = "white";
    if (num >= 0 && num < 3) {
        element.style.backgroundColor = "green";
    } else if (num >= 3 && num < 6) {
        element.style.backgroundColor = "yellow";
    } else if (num >= 6 && num < 8) {
        element.style.backgroundColor = "orange";
    } else if (num >= 8 && num < 11) {
        element.style.backgroundColor = "red";
    } else {
        element.style.backgroundColor = "purple";
    }
}

// Creates buttons for previous searches
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

// Updates localStorage
function storePrev() {
    localStorage.setItem("prevCities", JSON.stringify(prevCities));
}

// Event listener for submitted city input
cityForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var cityText = cityInput.value.trim();
  
    // Return from function early if submitted cityText is blank
    if (cityText === "") {
      return;
    }
  
    // Add new cityText to prevCities array, clear the input, limits history to 10
    if (prevCities.length >= 10){
        prevCities.shift();
    }
    prevCities.push(cityText);
    cityInput.value = "";
  
    // Store updated cities in localStorage, re-render the list, render the weather
    storePrev();
    renderPrevCities();
    getCoordinates(cityText);
});

// Event listener for previous cities buttons - renders the weather
prevButtonsEl.addEventListener("click", function(event) {
    var element = event.target;
    console.log("I was clicked");

    if (element.matches("button") === true) {
        var city = element.textContent;
        getCoordinates(city);
    }
});

init();