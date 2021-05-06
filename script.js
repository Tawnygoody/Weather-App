let appId = "c2e8eb2096cf950919bb5ac090bd01f8";
let units = "imperial";
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("assets/images/clear.jpeg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("assets/images/cloudy.jpeg")';
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("assets/images/rain.jpeg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("assets/images/storm.jpeg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("assets/images/snow.jpeg")';
            break;
        
        default:
            document.body.style.backgroundImage = 'url("assets/images/default.jpeg")';
            break;
    }

    let weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader");
    let temperatureElement = document.getElementById("temperature");
    let humidityElement = document.getElementById("humidity");
    let windSpeedElement = document.getElementById("windSpeed");
    let cityHeader = document.getElementById("cityHeader");
    let weatherIcon = document.getElementById("documentIconImg");
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})