const https = require('https');
const url =
  'https://api.darksky.net/forecast/b998c789da0a6e7ff63023d94a1957c7/40, -75';

const request = https.request(url, response => {
  let data = '';
  response.on('data', chunk => {
    data += chunk.toString();
  });
  response.on('end', () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on('error', error => {
  console.log('Error: ', error);
});

request.end();
