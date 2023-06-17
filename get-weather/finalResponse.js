
function finalResponse(weatherData) {
    const customResponse = {
      temperature: weatherData.Temperature.Metric.Value + " C",
      weatherText: weatherData.WeatherText,
      observationTime: weatherData.LocalObservationDateTime,
    };
  
    return customResponse;
}
  
export default finalResponse;