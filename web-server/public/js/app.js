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
        messageOne.textContent = 'An error occurred.';
        messageTwo.textContent = response.error;
      } else {
        response.json().then(data => {
          if (data.error) {
            messageOne.textContent = 'An error occurred.';
            messageTwo.textContent = data.error;
          } else {
            const { address, location, forecast } = data;
            const { current, day } = forecast;
            messageOne.textContent = location;
            messageTwo.innerHTML = `
            <p> Current: ${current.summary} It is ${current.temperature} degrees with ${current.precipProbability}% chance of rain. </p>
            <p> Day: ${day.summary} </p>`;
          }
        });
      }
    });
  }
});
