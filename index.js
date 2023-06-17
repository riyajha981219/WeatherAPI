import express from 'express';
import getWeatherData from './get-weather/getWeatherData.js';
import finalResponse from './get-weather/finalResponse.js';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();

const apiKey = process.env['API_KEY'];

async function isValidCity(city) {
  const apiUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.length > 0; // True if city exists, false otherwise
  } catch (error) {
    return false; // Error occurred, city is invalid
  }
}

app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    if (await isValidCity(city)) {
      const weatherData = await getWeatherData(apiKey, city);
      const Response = finalResponse(weatherData);
      res.json(Response);
    }
    else {
      res.status(400).json({error:'City Invalid'})
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
