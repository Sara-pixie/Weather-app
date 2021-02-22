//Current Date
function formatDate(date){
    let days =["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let hour = date.getHours();
    let min = date.getMinutes();
    if (min < 10){
        min = `0${min}`;
    }
    return `${day}, ${hour}:${min}`;
}

let now = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);

//Search Engine
function displayCityName(city){
    let header = document.querySelector("#current-city");
    header.innerHTML = city;
}
function displayCityTemp(temperature){
    let tempElement = document.querySelector("#now-temp");
    let temp = Math.round(temperature);
    tempElement.innerHTML = temp;
}
function displayTempDescription(description){
    let tempDescription = document.querySelector("#temp-description");
    tempDescription.innerHTML = description;
}
function displayFeelsLike(feelsLike){
    let feelsLikeElement = document.querySelector("#feels-like");
    feelsLikeElement.innerHTML = Math.round(feelsLike);
}
function displayHumidity(humidity){
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = humidity;
}
function displayWindSpeed(wind){
    let windElement = document.querySelector("#wind-speed");
    windElement.innerHTML = Math.round(wind);
}
function displayIcon(icon){
    let iconElement = document.querySelector("#weather-icon");
    let iconImage = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    iconElement.innerHTML = `<img src="${iconImage}" alt="weather icon">`;
}
function showCityWeather(result){
    console.log(result.data);
    let city = result.data.name;
    displayCityName(city);
    let temperature = result.data.main.temp;
    displayCityTemp(temperature);
    let description = result.data.weather[0].description;
    displayTempDescription(description);
    let feelsLike = result.data.main.feels_like;
    displayFeelsLike(feelsLike);
    let humidity = result.data.main.humidity;
    displayHumidity(humidity);
    let wind = result.data.wind.speed;
    displayWindSpeed(wind);
    let icon = result.data.weather[0].icon;
    displayIcon(icon);
}
function search (city){
    let apiKey = "6193c366e72e624c45a1116d350e8278";
    let unit = "metric";
    let urlEndpoint = "https://api.openweathermap.org/data/2.5/weather?"
    let apiUrl = `${urlEndpoint}q=${city}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl).then(showCityWeather);
}
function searchEngine(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let city = searchInput.value.trim();
    search(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchEngine);

//Search Weather for My Location
function handlePosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "6193c366e72e624c45a1116d350e8278";
    let unit = "metric";
    let urlEndpoint = "https://api.openweathermap.org/data/2.5/weather?"
    let apiUrl = `${urlEndpoint}lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl).then(showCityWeather);
}
function searchMyLocation(event){
    navigator.geolocation.getCurrentPosition(handlePosition);
}
let myLocationBtn = document.querySelector("#location-btn");
myLocationBtn.addEventListener("click", searchMyLocation);

//Default City
search("Ljubljana");

//Celsius and fahrenheit and km/h and mph
// (C*1.8)+32=F
// "km/h" / 1.609344 = mph
function convertToF(event){
    let tempElement = document.querySelector("#now-temp");
    let tempFLink = document.querySelector("#fahrenheit");
    let tempCLink = document.querySelector("#celsius");
    tempFLink.classList.add("selected");
    tempCLink.classList.remove("selected");
    let tempC = tempElement.innerHTML;
    tempElement.innerHTML = Math.round((tempC*1.8)+32);
    tempCLink.addEventListener("click", convertToC);
    tempFLink.removeEventListener("click", convertToF);
    //wind Speed -> not working (it gets smaller 
    //and smaller with each conversion)
    //let speedElement = document.querySelector("#wind-speed");
    //let speedUnit = document.querySelector("#speed-unit");
    //let speedKMH = speedElement.innerHTML;
    //let speedMPH = Math.round(speedKMH/1.609344);
    //speedElement.innerHTML = speedMPH;
    //speedUnit.innerHTML = "mph";
}
function convertToC(event){
    let tempElement = document.querySelector("#now-temp");
    let tempFLink = document.querySelector("#fahrenheit");
    let tempCLink = document.querySelector("#celsius");
    tempCLink.classList.add("selected");
    tempFLink.classList.remove("selected");
    let tempF = tempElement.innerHTML;
    tempElement.innerHTML = Math.round((tempF-32)/1.8);
    tempFLink.addEventListener("click", convertToF);
    tempCLink.removeEventListener("click", convertToC);
    //Wind Speed
    //let speedElement = document.querySelector("#wind-speed");
    //let speedUnit = document.querySelector("#speed-unit");
    //let speedMPH = speedElement.innerHTML;
    //let speedKMH = Math.round(speedMPH/1.609344);
    //speedElement.innerHTML = speedKMH;
    //speedUnit.innerHTML = "km/h";
}

let tempFLink = document.querySelector("#fahrenheit");
tempFLink.addEventListener("click", convertToF);

