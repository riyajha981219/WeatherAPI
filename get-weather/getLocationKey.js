import axios from 'axios';
async function getLocationKey(apiKey, city) {
    const apiUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
    const response = await axios.get(apiUrl);
    const locationKey = response.data[0].Key;
    return locationKey;
}
  
export default getLocationKey
  