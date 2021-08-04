var todaysForecast = document.getElementById("todaysforecast");
var searchBtn = document.getElementById("searchBtn");
var cityBtn = document.getElementById("searchBtns");
var pastCitySearch = JSON.parse(localStorage.getItem("data")) || [];

//add for loop over pCS that will run in 2 places one on page load and after search city gets ran

//new function up here called 
function cityButton(event){
  event.preventDefault();
  var buttonValue = event.target.textContent
  var cityDisplay = document.getElementById("searchcity");

  cityDisplay.value = buttonValue

  

  console.log(cityDisplay)
       
    
//add code to local storage here 
  getWeather(event)
}

function citySearch(event){
  event.preventDefault();
  var cityDisplay = document.getElementById("searchcity").value;
  const newBtn = document.createElement("button");

  newBtn.textContent = cityDisplay
  cityBtn.append(newBtn)
  newBtn.setAttribute("style", "display: block; width: 90%; color: whitesmoke; border: 2px lightcyan solid; border-radius: 10px; background-color: lightslategray; padding: 10px; margin: 1%;")
// call here 
pastCitySearch.push(cityDisplay)
localStorage.setItem("data",JSON.stringify(pastCitySearch));
//run function here 
  getWeather(event)
}

function getWeather(event) {
  event.preventDefault();
  
  var cityDisplay = document.getElementById("searchcity").value;
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=9f4c68a8f9a7e6ace879b24363e78f05";
  var geoSearch =
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityDisplay}&limit=5&appid=9f4c68a8f9a7e6ace879b24363e78f05`;
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
      var searchCity = `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&appid=9f4c68a8f9a7e6ace879b24363e78f05&units=imperial`
      fetch(searchCity)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          todaysForecast.innerHTML= ""
          console.log(response)
          //button click works returns data to console
            console.log(searchCity)
           // Creating elements, tablerow, tabledata, and anchor
           var tableData = document.createElement("td");

           var weatherIcon = response.current.weather[0].icon;
           var weatherImage = document.createElement("img");


           
           weatherImage.setAttribute(
             "src",
             "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
           );
           todaysForecast.appendChild(weatherImage)
         
          // Setting the text of link and the href of the link
          tableData.textContent = response.current.temp;
          // tableData.appendChild(link);
          todaysForecast.appendChild(tableData);
          // tableBody.appendChild(createTableRow);

          document.getElementById("searchcity").value = ""
          fiveDay(response)
        });
    });
}

function fiveDay (fivedaydata){

  var fiveDayDiv = document.getElementById("fivedayforecast")
  fiveDayDiv.innerHTML = ""

  fivedaydata.daily.splice(1,5).forEach(forecast => {
    var dateTime = forecast.dt * 1000
    console.log(new Date(dateTime).toLocaleString())
    var divEl = document.createElement("div");
    var tempEl = document.createElement("p");

    tempEl.textContent = "temp: " + forecast.temp.day 

    divEl.append(tempEl)

    var uviEl = document.createElement("p");

    uviEl.textContent = "uvi: " + forecast.uvi

    divEl.append(uviEl)




    fiveDayDiv.append(divEl)
 
  });



}

searchBtn.addEventListener("click", citySearch);
cityBtn.addEventListener("click", cityButton);