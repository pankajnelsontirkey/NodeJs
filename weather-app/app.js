const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast.js');

if (process.argv.length < 3) {
  return console.log('No location was provided.');
}

const query = process.argv.slice(2).join(' ');
geoCode(query, (error, location) => {
  if (error) {
    return console.log('Error', error);
  }
  const { latitude, longitude } = location;
  console.log('Weather at ', location.location, '...');
  forecast(latitude, longitude, (error, forecast) => {
    if (error) {
      return console.log('Error: ', error);
    }
    console.log(
      "Today's forecast: ",
      forecast.summary,
      `It is currently ${forecast.current.temperature} degrees out. There is a ${forecast.day.precipProbability}% chance of rain.`
    );
  });
});
