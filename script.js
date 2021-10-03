var prevButtonsEl = document.querySelector('#prev-buttons');
var cityInput = document.querySelector("#city-text");
var cityForm = document.querySelector("#city-form");

var prevCities = [];

function init() {
    // Get stored todos from localStorage
    var storedTodos = JSON.parse(localStorage.getItem("todos"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedTodos !== null) {
      todos = storedTodos;
    }
  
    // This is a helper function that will render todos to the DOM
    renderTodos();
}

function storePrev() {
    localStorage.setItem("prev", JSON.stringify(prevCities));
}
  
  // Add submit event to form
  //We add an event listener to the to-do form so that when a user enters a to-do item, the data is stored on submit. The to-dos are stored and rendered using two helper functions, storeTodos() and renderTodos()
todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var todoText = todoInput.value.trim();
  
    // Return from function early if submitted todoText is blank
    if (todoText === "") {
      return;
    }
  
    // Add new todoText to todos array, clear the input
    todos.push(todoText);
    todoInput.value = "";
  
    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderTodos();
});

function renderWeather() {
    // Display todays weather in larger div
        // City name, date, icon, temperature, humidity, wind speed, uv index
    // Display 5day forcast cards with date, icon, temperature, humidity
}

prevButtonsEl.addEventListener("click", function(event) {
    var element = event.target;
    console.log("I was clicked");

    if (element.matches("button") === true) {
      renderWeather();
    }
});

