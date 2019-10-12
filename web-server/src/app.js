const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

/* Set paths for express config */
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/* Setup handelbars engine and views */
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

/* Setup static directory to serve */
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    author: 'Pankaj Nelson Tirkey'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    author: 'Pankaj Nelson Tirkey'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    author: 'Pankaj Nelson Tirkey',
    message: 'Feel free to contact me for any help.'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'nolocationGiven',
      message: 'No location was provided'
    });
  }
  const { address } = req.query;

  geoCode(address, (error, location) => {
    if (error) {
      console.log(error);
      return res.send({ error });
    }
    forecast(location, (error, { current, day }) => {
      if (error) {
        console.log(error);
        return res.send({ error });
      }
      res.send({
        address,
        location: location.location,
        forecast: { current, day }
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('not-found', {
    title: '404',
    author: 'Pankaj Nelson Tirkey',
    errorMessage: 'Help article not found'
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'noSearchQuery',
      message: 'No search parameter was provided'
    });
  }
  res.send({ products: [] });
});

app.get('*', (req, res) => {
  res.render('not-found', {
    title: '404',
    author: 'Pankaj Nelson Tirkey',
    errorMessage: 'Page not found'
  });
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
