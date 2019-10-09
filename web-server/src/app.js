const path = require('path');

const express = require('express');
const hbs = require('hbs');

const app = express();

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
  res.send({ location: 'Gurgaon', forecast: 'It is okay.' });
});

app.get('/help/*', (req, res) => {
  res.render('not-found', {
    title: '404',
    author: 'Pankaj Nelson Tirkey',
    errorMessage: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('not-found', {
    title: '404',
    author: 'Pankaj Nelson Tirkey',
    errorMessage: 'Page not found'
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
