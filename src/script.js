//Current Date
function formatHours(timestamp){
    let date = new Date(timestamp);
    let hour = date.getHours();
    let min = date.getMinutes();
    if (min < 10){
        min = `0${min}`;
    }
    return `${hour}:${min}`;
}
function formatDate(date){
    let days =["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day}, ${formatHours(date)}`;
}
function displayDate(date){
    now = date;
    let currentDate = document.querySelector("#current-date");
    currentDate.innerHTML = formatDate(now);
}
let now = new Date();

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
    windSpeedKMH = wind;
    windElement.innerHTML = windSpeedKMH;
}
function displayIcon(icon){
    let iconElement = document.querySelector("#weather-icon");
    let iconImage = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    iconElement.innerHTML = `<img src="${iconImage}" alt="weather icon">`;
}
function changeBackground(sunrise, sunset, now){
    let stylesheetDay = document.querySelector("#day-theme");
    let stylesheetNight = document.querySelector("#night-theme");
    if (now < sunrise || now > sunset){
        //nightTheme
        stylesheetDay.setAttribute("rel", "alternate stylesheet");
        stylesheetNight.setAttribute("rel", "stylesheet");
    }  else{
        //dayTheme
        stylesheetNight.setAttribute("rel", "alternate stylesheet");
        stylesheetDay.setAttribute("rel", "stylesheet");
    }
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
    let wind = Math.round((result.data.wind.speed)*18/5);
    displayWindSpeed(wind);
    let icon = result.data.weather[0].icon;
    displayIcon(icon);
    let sunRise = new Date((result.data.sys.sunrise+result.data.timezone)*1000);
    let sunSet = new Date((result.data.sys.sunset+result.data.timezone)*1000);
    let date = new Date ((result.data.dt+result.data.timezone)*1000);
    changeBackground (sunRise, sunSet, date);
    displayDate(date);
}
function showForecast(result){
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    for (let index = 0; index < 6; index++) {
        forecast = result.data.list[index];
        forecastElement.innerHTML +=
        `<div class="hour col-sm" id="hour-${index+1}">
            <h4>${formatHours((forecast.dt+result.data.city.timezone)*1000)}</h4>
            <div class="image">
                <img src=http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png />
            </div>
            <p><strong>${Math.round(forecast.main.temp_max)}°</strong> - ${Math.round(forecast.main.temp_min)}°C</p>
        </div>`;
    }
}
function search (city){
    let apiKey = "6193c366e72e624c45a1116d350e8278";
    let unit = "metric";
    let urlEndpoint = "https://api.openweathermap.org/data/2.5/weather?"
    let apiUrl = `${urlEndpoint}q=${city}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl).then(showCityWeather);
    //forecast
    let forecastUrlEndpoint = "https://api.openweathermap.org/data/2.5/forecast?";
    let forecastUrl =`${forecastUrlEndpoint}q=${city}&units=${unit}&appid=${apiKey}`;
    axios.get(forecastUrl).then(showForecast);
}
function searchEngine(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let city = searchInput.value.trim();
    search(city);
    searchInput.value = null;
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

