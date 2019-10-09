const request = require('request');

const geoCode = (address, cb) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoicGFua2FqbmVsc29udGlya2V5IiwiYSI6ImNrMWcxdTMzczB3M28zbXFtbjJtdDAwYzEifQ.olbzYUjEqI8DiHgrgVpAuQ&limit=1';

  request({ url, json: true }, (error, response) => {
    if (error) {
      cb('Unable to connect to location service.', undefined);
    } else if (!response.body.features.length) {
      cb('No results found for your query.', undefined);
    } else {
      cb(undefined, {
        /* NOTE: mapbox returns longitude first in center property; darksky takes latitude first, so be alert! */
        location: response.body.features[0].place_name,
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1]
      });
    }
  });
};

module.exports = geoCode;
