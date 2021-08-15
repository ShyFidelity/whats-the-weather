var todaysForecast = document.getElementById("todaysforecast");
var searchBtn = document.getElementById("searchBtn");
var cityBtn = document.getElementById("searchBtns");
var todaysForecastDiv = document.querySelector(".forecast");
var pastCitySearch = JSON.parse(localStorage.getItem("data")) || [];
var cityNameEl = document.getElementById("currentCity")

//search begins on button click
function cityButton(event) {
  event.preventDefault();
  var buttonValue = event.target.textContent;
  var cityDisplay = document.getElementById("searchcity");

  cityDisplay.value = buttonValue;

  // call get weather event on button click
  getWeather(event);
}

function citySearch(event) {
  //add city name to display 
  var cityDisplay = document.getElementById("searchcity").value;
  const cityDisplayHeader = document.createElement("h3");
  cityDisplayHeader.textContent = cityDisplay;
  cityNameEl.append(cityDisplayHeader)
 
  pastCitySearch.push(cityDisplay);
  localStorage.setItem("data", JSON.stringify(pastCitySearch));
  const newBtn = document.createElement("button");
  console.log(cityDisplay);
  newBtn.textContent = cityDisplay;
  //creates a new button with the city search displayed in text
  cityBtn.append(newBtn);
  newBtn.setAttribute(
    "style",
    "display: block; width: 90%; color: whitesmoke; border: 2px lightcyan solid; border-radius: 10px; background-color: lightslategray; padding: 10px; margin: 1%;"
  );
  //run function here
  getWeather(event);
}

function getWeather(event) {
  event.preventDefault();

  var cityDisplay = document.getElementById("searchcity").value;
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=9f4c68a8f9a7e6ace879b24363e78f05";
  var geoSearch = `http://api.openweathermap.org/geo/1.0/direct?q=${cityDisplay}&limit=5&appid=9f4c68a8f9a7e6ace879b24363e78f05`;
  fetch(geoSearch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //pulls city name out of object array index and sets to local storage

      return data;
    })

    .then(function (data) {
      var searchCity = `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&appid=9f4c68a8f9a7e6ace879b24363e78f05&units=imperial`;
      fetch(searchCity)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          todaysForecast.innerHTML = "";
          console.log(response);
          //button click works returns data to console
          // Creating elements, tablerow, tabledata
          var tableData = document.createElement("td");
          var weatherIcon = response.current.weather[0].icon;
          var weatherImage = document.createElement("img");
          var displayDailyDate = new Date().toLocaleString();
          var parseDate = displayDailyDate.split(",");
          var uvIndexEl = document.createElement("p");
          var uvIndex = response.current.uvi;
          var parseDateEl = document.createElement("p");
          var windDailyEl = document.createElement("p");
          var humidityDailyEl = document.createElement("p");

          //creating and displaying image icon 
          weatherImage.setAttribute(
            "src",
            "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
          );
          todaysForecast.appendChild(weatherImage);
          //temp display from API data 
          tableData.textContent = "current temp: " + response.current.temp;
       
          todaysForecast.appendChild(tableData);

          //creating elements for daily forecast 
      
         //change background color based off uv index
          uvIndexEl.textContent = "uvi: " + uvIndex
          if (uvIndex < 3) {
            uvIndexEl.setAttribute("style", "background-color: green");
          } else if (uvIndex > 3 && uvIndex <= 5) {
            uvIndexEl.setAttribute( "style", "background-color: lightyellow; color: black");
          } else if (uvIndex > 5 && uvIndex <= 7) {
            uvIndexEl.setAttribute("style", "background-color: orange");
          } else if (uvIndex > 7 && uvIndex <= 10) {
            uvIndexEl.setAttribute("style", "background-color: red");
          } else if (uvIndex > 11) {
            uvIndexEl.setAttribute("style", "background-color: violet");
          }

          todaysForecast.appendChild(uvIndexEl)
           //humidity 
           humidityDailyEl.textContent = "humidity: " + response.current.humidity 
           todaysForecast.appendChild(humidityDailyEl)
           //wind
           windDailyEl.textContent = "wind: " + response.current.wind_speed + " MPH"
           todaysForecast.appendChild(windDailyEl)

              //date
          parseDateEl.textContent = "date: " + parseDate
          todaysForecast.appendChild(parseDateEl)
          console.log(uvIndex);

          document.getElementById("searchcity").value = "";
          fiveDay(response);
          console.log(data);
        });
    });
}

// appending 5 day forecast
function fiveDay(fiveDayData) {
  var fiveDayDiv = document.getElementById("fivedayforecast");
  fiveDayDiv.innerHTML = "";

  fiveDayData.daily.splice(1, 5).forEach((forecast) => {
    //formatting date
    var dateTime = forecast.dt * 1000;
    var displayDate = new Date(dateTime).toLocaleString();
    var divEl = document.createElement("div");
    var tempEl = document.createElement("p");
    var uviEl = document.createElement("p");
    var humidEl = document.createElement("p");
    var dateEl = document.createElement("p");
    var windEl = document.createElement("p")
    var fiveDayWeatherImage = document.createElement("img");
    var fiveDayWeatherIcon = forecast.weather[0].icon;
    //adding different data to five day div
    tempEl.textContent = "temp: " + forecast.temp.day;
    divEl.append(tempEl);

    uviEl.textContent = "uvi: " + forecast.uvi;
    divEl.append(uviEl);

    humidEl.textContent = "humidity: " + forecast.humidity;
    divEl.append(humidEl);
    windEl.textContent = "wind speed: " + forecast.wind_speed + " MPH";
    divEl.append(windEl)
    dateEl.textContent = displayDate;
    divEl.append(dateEl);

  

    fiveDayWeatherImage.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + fiveDayWeatherIcon + "@2x.png"
    );
    divEl.append(fiveDayWeatherImage);

    fiveDayDiv.append(divEl);
  });
}

searchBtn.addEventListener("click", citySearch);
cityBtn.addEventListener("click", cityButton);
//city displays on page
document.addEventListener("DOMContentLoaded", function () {
  pastCitySearch.forEach((element) => {
    console.log(element);
    const newBtn = document.createElement("button");

    newBtn.textContent = element;
    //creates a new button with the city search displayed in text
    cityBtn.append(newBtn);
    newBtn.setAttribute(
      "style",
      "display: block; width: 90%; color: whitesmoke; border: 2px lightcyan solid; border-radius: 10px; background-color: lightslategray; padding: 10px; margin: 1%;"
    );
  });
});
