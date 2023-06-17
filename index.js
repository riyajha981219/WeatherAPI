import express from 'express';
import getWeatherData from './get-weather/getWeatherData.js';
import finalResponse from './get-weather/finalResponse.js';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();

const apiKey = process.env['API_KEY'];
app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const weatherData = await getWeatherData(apiKey, city);
    const Response = finalResponse(weatherData);
    res.json(Response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
