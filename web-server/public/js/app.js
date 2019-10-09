const weatherForm = document.querySelector('form');
const searchField = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  const location = searchField.value;

  if (!location) {
    console.log('Please enter a location.');
  } else {
    messageOne.textContent = 'Fetching weather data.';
    messageTwo.textContent = '';
    fetch('/weather?address=' + location).then(response => {
      if (response.error) {
        console.log(response.error);
        messageOne.textContent = 'An error occurred.';
        messageTwo.textContent = response.error;
      } else {
        response.json().then(forecast => {
          if (forecast.error) {
            console.log(forecast.error);
            messageOne.textContent = 'An error occurred.';
            messageTwo.textContent = forecast.error;
          } else {
            console.log(forecast.location);
            console.log(forecast.forecast);
            messageOne.textContent = forecast.location;
            messageTwo.textContent = forecast.forecast;
          }
        });
      }
    });
  }
});
