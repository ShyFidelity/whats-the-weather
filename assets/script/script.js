var todaysForecast = document.getElementById("todaysforecast");
var searchBtn = document.getElementById("searchBtn");
var cityBtn = document.getElementById("searchBtns");


//add to local storage 

function cityButton(event){
  event.preventDefault();
  var buttonValue = event.target.textContent
  var cityDisplay = document.getElementById("searchcity").value;

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

  getWeather(event)
}

function getWeather(event) {
  
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
      localStorage.setItem("data",JSON.stringify(data[0].name));
      return data;
    })

    .then(function (data) {
      var searchCity = `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&appid=9f4c68a8f9a7e6ace879b24363e78f05&units=imperial`
      fetch(searchCity)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data)
          //button click works returns data to console
            console.log(searchCity)
           // Creating elements, tablerow, tabledata, and anchor
           var tableData = document.createElement("td");


          

         
          // Setting the text of link and the href of the link
          tableData.textContent = data.current.temp;
          // tableData.appendChild(link);
          todaysForecast.appendChild(tableData);
          // tableBody.appendChild(createTableRow);
          cityDisplay.value = " "
        });
    });
}

searchBtn.addEventListener("click", citySearch);
cityBtn.addEventListener("click", cityButton);