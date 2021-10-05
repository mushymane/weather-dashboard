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
// var forecastContainer = document.querySelector("#forecast-container");

var prevCities = [];
var appid = "75b8497a982601cce9f89a559e6380bb";

function init() {
    var storedCities = JSON.parse(localStorage.getItem("prevCities"));
  
    if (storedCities !== null) {
      prevCities = storedCities;
    }
  
    renderPrevCities();
}

function renderWeather(lat, lon, city) {
    // Display todays weather in larger div
        // City name, date, icon, temperature, humidity, wind speed, uv index
    // Display 5day forcast cards with date, icon, temperature, humidity
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + appid;
    console.log("--------------------")
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log("data starts here")
                console.log(data);

                var iconCode = data.current.weather[0].icon;
                var iconLink = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                var icon = document.createElement("img");
                icon.setAttribute("src", iconLink);
                todayHeader.textContent = city + " (" + moment().format("dddd, MMMM Do YYYY") + ")";
                todayHeader.append(icon)

                todayTemp.textContent = "Temperature: " + data.current.temp + " °F";
                todayHumidity.textContent = "Humidity: " + data.current.humidity;
                todayWind.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";

                todayUV.textContent = "UV Index: ";
                var uvbg = document.createElement("span");
                uvbg.textContent = data.current.uvi;
                // console.log(data.current.uvi, typeof(data.current.uvi))
                getUVI(data.current.uvi, uvbg);
                todayUV.append(uvbg);

                for (let i = 0; i < 5; i++) {
                    var card = document.createElement("div");
                    card.setAttribute("class", "col mx1");
                    var date = moment().add(i + 1, "days");
                    var cardHeader = document.createElement("h4");
                    cardHeader.textContent = date;

                }
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
}

function getCoordinates(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1" + "&appid=" + appid;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                console.log("lat:", data[0].lat, "lon:", data[0].lon)
                console.log(data[0].lat.toString())
                var lat = data[0].lat.toString();
                var lon = data[0].lon.toString();
                renderWeather(lat, lon, data[0].name);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
}

function getUVI(num, element) {
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
    // renderWeather();
});

// Event listener for previous cities buttons
prevButtonsEl.addEventListener("click", function(event) {
    var element = event.target;
    console.log("I was clicked");

    if (element.matches("button") === true) {
        // getCoordinates();
        renderWeather();
    }
});

init();