const request = require('request');

const forecast = ({ latitude, longitude }, cb) => {
  const url =
    'https://api.darksky.net/forecast/b998c789da0a6e7ff63023d94a1957c7/' +
    latitude +
    ',' +
    longitude +
    '?units=si';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connect to mapBox service.', undefined);
    } else if (body.error) {
      cb('Unable to find location', undefined);
    } else {
      cb(undefined, {
        current: body.currently,
        day: body.daily.data[0],
        summary: body.daily.summary
      });
    }
  });
};

module.exports = forecast;
