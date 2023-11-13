const apiKey = "0379c75686eed42803b9d620f4d49e35";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")
const searchBox2 = document.getElementById("Searchy");

async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status < 200 || response.status > 299) {
        document.querySelector(".error").classList.remove("hidden");
        document.querySelector(".weather").classList.add("hidden");
    }
    else {
        document.querySelector(".error").classList.add("hidden");
        document.querySelector(".weather").classList.remove("hidden");
    }

        if (!city) {
        document.querySelector(".error").classList.add("hidden");
    }
    var data = await response.json();

    document.querySelector(".city").innerHTML = data?.name;
    document.querySelector(".temp").innerHTML = Math.round(data?.main?.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data?.main?.humidity + "%";
    document.querySelector(".wind").innerHTML = data?.wind;
    document.querySelector(".wind").innerHTML = data?.wind?.speed + " km/h";

    if (data.weather[0].main === "Clouds") {
       weatherIcon.src = "assets/clouds.png";
    } 
    else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "assets/clear.png";
    }
     else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "assets/rain.png";
    }
    else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "assets/drizzle.png";
    }
    else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "assets/mist.png";
    }

    
}

searchBox.addEventListener("submit", ()=> {
    checkWeather(searchBox.value);
})

searchBox.onkeyup = function(e) {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
}

searchBox.oninput = function(e) {
    checkWeather(e.target.value);
}

searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value);
})

checkWeather(city);