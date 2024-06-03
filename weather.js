const apiKey = '5c58d456aa3fdc817d4360bec9741ddd'; // Replace with your OpenWeatherMap API key

function getWeatherByInput() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location');
    }
}

function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        /*Does browser support the geolocation are not */
        navigator.geolocation.getCurrentPosition(position => {
            /*getcurrentposition is a variable and position its will perform  lon and lat  */
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(null, lat, lon);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function fetchWeatherData(location, lat = null, lon = null) {
    /*lat is latitite and lon is longitute */
    let url;
    if (location) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }

    fetch(url)
        .then(response => response.json())
        /*After actually response is an object that get url fetched data in json format */
        .then(data => displayWeatherData(data))
        /*data also object from js data that extracted by response will pass to displayweather(data) */
        .catch(error => alert('Error fetching weather data: ' + error));
}

function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    if (data.cod === 200) {
        /*the data that get from url shhould be equal to 200 then it 
        conform that the data extracted correctlty or response from weatherapi is correct */
        /*So the below when the response object trevwe the values they are stored in different class weather,wind,speed
        etcc classes or methods  */
        weatherDataDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherDataDiv.innerHTML = `<p>${data.message}</p>`;
    }
}