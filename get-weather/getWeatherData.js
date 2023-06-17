import getLocationKey from "./getLocationKey.js";
import axios from 'axios';

async function getWeatherData(apiKey, city) {
    const locationKey = await getLocationKey(apiKey, city);
    const apiUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
    const response = await axios.get(apiUrl);
    const weatherData = response.data[0];
    return weatherData;
}
  
export default getWeatherData