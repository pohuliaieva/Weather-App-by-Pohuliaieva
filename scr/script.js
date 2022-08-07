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
    console.log(response.data);
    let cityElement = document.querySelector("#citymain");
    let temperatureElement = document.querySelector("#temperaturemain");
    let descriptionmainElement = document.querySelector("#descriptionmain");
    let windymainElement = document.querySelector("#metrick-wind");
    let pressureElement = document.querySelector("#metrick-pressure");
    let humidityElement = document.querySelector("#humidity");
    let updateElement = document.querySelector("#lastupdate");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = (response.data.name);
    descriptionmainElement.innerHTML = (response.data.weather[0].description);
    windymainElement.innerHTML = Math.round(response.data.wind.speed);
    pressureElement.innerHTML = (response.data.main.pressure);
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    updateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "49813f7b6218c304bf646ff9c4c866c4";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=lisbon&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature).then(formatDate);
