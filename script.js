// Select DOM elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

// OpenWeatherMap API Key (Replace with your own API key)
const apiKey = 'fe8f581156fa977daf4d4780149d0b66'; // Replace this with your actual API key

// Function to fetch weather data
async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('City not found. Please try again.');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResult.innerHTML = `<p>${error.message}</p>`;
  }
}

// Function to display weather data
function displayWeather(data) {
  const { name } = data; // City name
  const { temp, humidity } = data.main; // Temperature and humidity
  const { description, icon } = data.weather[0]; // Weather description and icon

  // Construct HTML to display weather info
  const weatherHTML = `
    <h2>Weather in ${name}</h2>
    <p><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}"></p>
    <p><strong>Temperature:</strong> ${temp}°C</p>
    <p><strong>Condition:</strong> ${description}</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
  `;

  weatherResult.innerHTML = weatherHTML;
}

// Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload
  const city = cityInput.value.trim(); // Get city name from input
  if (city) {
    getWeather(city); // Fetch weather data
    cityInput.value = ''; // Clear input field
  } else {
    weatherResult.innerHTML = '<p>Please enter a city name.</p>';
  }
});