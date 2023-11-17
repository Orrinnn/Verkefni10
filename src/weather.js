function getWeather(city) {
    const apiKey = 'd4860dda773305489a53b2949b8b6f88';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Check if the city returned from the API matches the city queried
            if (data.name.toLowerCase() === city.toLowerCase()) {
                const cityElement = document.querySelector('.city');
                const weatherElement = document.querySelector('.weather');
                const temperatureElement = document.querySelector('.temperature');
                const humidityElement = document.querySelector('.humidity');

                // Perform null checks before accessing properties
                if (cityElement) {
                    cityElement.textContent = city;
                }

                if (weatherElement) {
                    weatherElement.textContent = `The weather is ${data.weather[0].description}`;
                }

                if (temperatureElement) {
                    temperatureElement.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
                }

                if (humidityElement) {
                    humidityElement.textContent = `${data.main.humidity}%`;
                }
            } else {
                console.error('Error: The city returned from the API does not match the city queried.');
            }
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    const getWeatherButton = document.querySelector('.get-weather-button');

    if (getWeatherButton) {
        getWeatherButton.addEventListener('click', function () {
            const cityInput = document.querySelector('.city-input');
            
            if (cityInput instanceof HTMLInputElement) {
                const city = cityInput.value;
                getWeather(city);
            }
        });
    }
});
