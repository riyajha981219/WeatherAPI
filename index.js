const express = require('express');
const axios = require('axios');

const app = express();
const apiKey = 'GMjG6GNA1jSvNMHCgXYApbD2ACVl9OKF'; // Replace with your actual AccuWeather API key

app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const weatherData = await getWeatherData(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

async function getWeatherData(city) {
  const locationKey = await getLocationKey(city);
  const apiUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

  const response = await axios.get(apiUrl);
  const weatherData = response.data[0];
  return weatherData;
}

async function getLocationKey(city) {
  const apiUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

  const response = await axios.get(apiUrl);
  const locationKey = response.data[0].Key;
  return locationKey;
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
