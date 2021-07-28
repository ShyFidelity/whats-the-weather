var todaysForecast = document.getElementById('todaysforecast');
var atlBtn = document.getElementById('searchBtn');

function getWeather() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=9f4c68a8f9a7e6ace879b24363e78f05';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //button click works returns data to console
      //do i need to create a table element here? what am i placing exactly 

        // Creating elements, tablerow, tabledata, and anchor
        var tableData = document.createElement('td');
    

        // Setting the text of link and the href of the link
        link.textContent = data[i].html_url;
        link.href = data[i].html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        // tableData.appendChild(link);
        todaysForecast.appendChild(tableData);
        // tableBody.appendChild(createTableRow);
      }
    });

searchBtn.addEventListener('click', getApi);