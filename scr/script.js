function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();

    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    let cityElement = document.querySelector("#citymain");
    let temperatureElement = document.querySelector("#temperaturemain");
    let descriptionmainElement = document.querySelector("#descriptionmain");
    let windymainElement = document.querySelector("#metrick-wind");
    let pressureElement = document.querySelector("#metrick-pressure");
    let humidityElement = document.querySelector("#humidity");
    let updateElement = document.querySelector("#lastupdate");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

    cityElement.innerHTML = (response.data.name);
    descriptionmainElement.innerHTML = (response.data.weather[0].description);
    windymainElement.innerHTML = Math.round(response.data.wind.speed);
    pressureElement.innerHTML = (response.data.main.pressure);
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    updateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
}

function search(city) {
    let apiKey = "49813f7b6218c304bf646ff9c4c866c4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}



function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.getElementById("city-input");
    search(cityInputElement.value);
}



function displayFahrenheitTemp(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temperaturemain");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
    tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let tempElement = document.querySelector("#temperaturemain");
    tempElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#faren");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;


search("Lisbon");