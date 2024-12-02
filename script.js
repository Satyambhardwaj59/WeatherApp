const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

const apiKey = "b77c65d18f033c854d0b1c556389ed4b";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
    const responce = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if( responce.status == 404){
        document.querySelector('.error').style.display = "block";
        document.querySelector(".weather").style.display = "none";

    } else{
        let data = await responce.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " Km/h ";
        document.querySelector('.feelLike').innerHTML = Math.ceil(data.main.feels_like) + "°C";
        document.querySelector('.airPressure').innerHTML = data.main.pressure + " Pa"


        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "rain.png";
        } else if (data.weather[0].main == "Drizzle"){
            weatherIcon.src = "drizzle.png";
        } else if (data.weather[0].main == "Mist"){
            weatherIcon.src = "mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        // console.log(data);
        

    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
})