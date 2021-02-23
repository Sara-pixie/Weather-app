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
    windSpeedKMH = Math.round(wind);
    windElement.innerHTML = windSpeedKMH;
}
function displayIcon(icon){
    let iconElement = document.querySelector("#weather-icon");
    let iconImage = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    iconElement.innerHTML = `<img src="${iconImage}" alt="weather icon">`;
}
function nightTheme(){
    let background = document.querySelector("#background");
    background.setAttribute("style", "background-image:url(images/background-nightsky.jpg)");
    let app = document.querySelector("#app");
    app.setAttribute("style", "border:1px solid rgb(247, 202, 1)");
    let city = document.querySelector("#current-city");
    city.setAttribute("style", "color:rgb(247, 161, 1)");
    let date = document.querySelector("#current-date");
    date.setAttribute("style", "color:rgb(35, 235, 235);");
    let hr = document.querySelector("#hr");
    hr.setAttribute("style", "color:white");
    let cityWeather = document.querySelector("#city-weather");
    cityWeather.setAttribute("style", "color:rgb(255, 248, 149)");
    let forecast = document.querySelector("#forecast");
    forecast.setAttribute("style", "color:rgb(255, 244, 96)");
    let footer = document.querySelector("#footer");
    footer.setAttribute("style", "color:rgb(255, 248, 149)");
    let saraLink = document.querySelector("#sara-link");
    saraLink.setAttribute("style", "color:rgb(255, 241, 52)");
    let weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.setAttribute("style", "background:rgba(0, 0, 0, 0.4)");
    let leftCol = document.querySelector("#left-col");
    leftCol.setAttribute("style", "box-shadow:1px 0 0 rgba(255, 255, 255, 0.4)");
    let day1 = document.querySelector("#day-1");
    let day2 = document.querySelector("#day-2");
    let day3 = document.querySelector("#day-3");
    let day4 = document.querySelector("#day-4");
    let day5 = document.querySelector("#day-5");
    let day6 = document.querySelector("#day-6");
    day1.setAttribute("style", "background:rgba(0, 0, 0, 0.5)");
    day2.setAttribute("style", "background:rgba(0, 0, 0, 0.5)");
    day3.setAttribute("style", "background:rgba(0, 0, 0, 0.5)");
    day4.setAttribute("style", "background:rgba(0, 0, 0, 0.5)");
    day5.setAttribute("style", "background:rgba(0, 0, 0, 0.5)");
    day6.setAttribute("style", "background:rgba(0, 0, 0, 0.5)");
}
function dayTheme(){
    let background = document.querySelector("#background");
    background.setAttribute("style", "background-image:url(images/background-weather.jpg)");
    let app = document.querySelector("#app");
    app.setAttribute("style", "border:1px solid rgb(0, 0, 51)");
    let city = document.querySelector("#current-city");
    city.setAttribute("style", "color:rgb(102, 25, 175)");
    let date = document.querySelector("#current-date");
    date.setAttribute("style", "color: rgb(48, 48, 247);");
    let hr = document.querySelector("#hr");
    hr.setAttribute("style", "color:default");
    let cityWeather = document.querySelector("#city-weather");
    cityWeather.setAttribute("style", "color:black");
    let forecast = document.querySelector("#forecast");
    forecast.setAttribute("style", "color:black");
    let footer = document.querySelector("#footer");
    footer.setAttribute("style", "color:rgba(0, 0, 0, 0.75)");
    let saraLink = document.querySelector("#sara-link");
    saraLink.setAttribute("style", "color:rgba(0, 0, 0, 0.9)");
    let weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.setAttribute("style", "background:rgba(255, 255, 255, 0.2)");
    let leftCol = document.querySelector("#left-col");
    leftCol.setAttribute("style", "box-shadow:1px 0 0 rgba(0, 0, 51, 0.25)");
    let day1 = document.querySelector("#day-1");
    let day2 = document.querySelector("#day-2");
    let day3 = document.querySelector("#day-3");
    let day4 = document.querySelector("#day-4");
    let day5 = document.querySelector("#day-5");
    let day6 = document.querySelector("#day-6");
    day1.setAttribute("style", "background:rgba(255, 255, 255, 0.3)");
    day2.setAttribute("style", "background:rgba(255, 255, 255, 0.3)");
    day3.setAttribute("style", "background:rgba(255, 255, 255, 0.3)");
    day4.setAttribute("style", "background:rgba(255, 255, 255, 0.3)");
    day5.setAttribute("style", "background:rgba(255, 255, 255, 0.3)");
    day6.setAttribute("style", "background:rgba(255, 255, 255, 0.3)");
}
function changeBackground(sunrise, sunset){
    if (now < sunrise || now > sunset){
        nightTheme();    
    }  else{dayTheme();}
}
function showCityWeather(result){
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
    let sunRise = new Date((result.data.sys.sunrise)*1000);
    let sunSet = new Date((result.data.sys.sunset)*1000);
    changeBackground (sunRise, sunSet);
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

// km/h and mph
// "km/h" / 1.609344 = mph
let windSpeedKMH = null;
function convertToMPH(){
    let speedElement = document.querySelector("#wind-speed");
    let speedUnit = document.querySelector("#speed-unit");
    speedUnit.innerHTML = "mph";
    speedElement.innerHTML = Math.round(windSpeedKMH/1.609344);
}
function convertToKMH(){
    let speedElement = document.querySelector("#wind-speed");
    let speedUnit = document.querySelector("#speed-unit");
    speedUnit.innerHTML = "km/h";
    speedElement.innerHTML = windSpeedKMH;
}

//Celsius and fahrenheit
// (C*1.8)+32=F
function convertToF(event){
    let tempElement = document.querySelector("#now-temp");
    let tempFLink = document.querySelector("#fahrenheit");
    let tempCLink = document.querySelector("#celsius");
    tempFLink.classList.add("selected");
    tempCLink.classList.remove("selected");
    let tempC = tempElement.innerHTML;
    tempElement.innerHTML = Math.round((tempC*1.8)+32);
    convertToMPH();
    tempCLink.addEventListener("click", convertToC);
    tempFLink.removeEventListener("click", convertToF);
}
function convertToC(event){
    let tempElement = document.querySelector("#now-temp");
    let tempFLink = document.querySelector("#fahrenheit");
    let tempCLink = document.querySelector("#celsius");
    tempCLink.classList.add("selected");
    tempFLink.classList.remove("selected");
    let tempF = tempElement.innerHTML;
    tempElement.innerHTML = Math.round((tempF-32)/1.8);
    convertToKMH();
    tempFLink.addEventListener("click", convertToF);
    tempCLink.removeEventListener("click", convertToC);
}

let tempFLink = document.querySelector("#fahrenheit");
tempFLink.addEventListener("click", convertToF);

//Forecast



