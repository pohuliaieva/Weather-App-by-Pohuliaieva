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

function getForecast(coordinates) {
    let apiKey = "49813f7b6218c304bf646ff9c4c866c4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);

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

    getForecast(response.data.coord);
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

function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#weather-week");
    let forecastHTML = `<div class="container">
        <div class="row ">`;
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    days.forEach(function (day) {
        forecastHTML = forecastHTML + `
            <div class="col col-sm-6 col-md-2 col-xs-4">
                <div class="card" id="weather-week-card">
                    <div class="ic-weather"> ⛅</div>

                    <div class="card-body">
                        <h5 class="card-title">${day}</h5>
                        <p class="card-text" id="weather-week-card-text"> <span class="week-temp-max">25</span>°C - <span
                            class="week-temp-min">25</span><span class="min-metrik">°C</span> </p>
                    </div>
                </div>
            </div>
            `;
    });
    forecastHTML = forecastHTML + `</div>
          </div>`;
    forecastElement.innerHTML = forecastHTML;

}


let fahrenheitLink = document.querySelector("#faren");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;


search("Lisbon");