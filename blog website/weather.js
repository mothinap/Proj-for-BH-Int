function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "7f64b171f97a16b2a3ba7a4cd7aa0c69";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById("weather-info");
            weatherInfo.classList.remove("error");
            if (data.cod === 200) {
                const temperature = data.main.temp;
                const Humidity = data.main.humidity;
                
                const description = data.weather[0].description;
                weatherInfo.textContent = `Temperature: ${temperature}°C, Description: ${description},Humidity:${Humidity}`;
                
                // Dynamically style based on weather conditions
                if (description.includes("rain")) {
                    weatherInfo.style.color = "blue";
                    const img = new Image(100, 200); // width, height
                    img.src = 'rain.png';
                    document.body.appendChild(img);

                } else if (description.includes("cloud")) {
                    weatherInfo.style.color = "gray";
                    const img1 = new Image(100, 200); // width, height
                    img1.src = 'weather.png';
                    document.body.appendChild(img1);
                } else if (description.includes("clear")) {
                    weatherInfo.style.color = "yellow";
                    const img2 = new Image(100, 200); // width, height
                    img2.src = 'cloudy.jpeg';
                    document.body.appendChild(img2);
                } else {
                    weatherInfo.style.color = "black";
                }
            } else {
                weatherInfo.textContent = `City not found. Please try again.`;
                weatherInfo.classList.add("error");
            }
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            const weatherInfo = document.getElementById("weather-info");
            weatherInfo.textContent = `Error fetching data. Please try again later.`;
            weatherInfo.classList.add("error");
        });
}
