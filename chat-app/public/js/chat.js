const socket = io();

/* DOM Elements */
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $shareLocationButton = document.querySelector('#share-location');
const $messages = document.querySelector('#messages');
/* End DOM Elements */

/* Templates */
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;
/* End Templates */

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const autoscroll = () => {
  // Find the new message element
  const $newMessage = $messages.lastElementChild;

  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  // Hieght of the new message
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;
  // Visible Hieght
  const visibleHeight = $messages.offsetHeight;
  // Height of message container
  const containerHeight = $messages.scrollHeight;
  // How far have we scrolled
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

socket.on('message', message => {
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format('hh:mm a')
  });

  $messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('location', url => {
  const html = Mustache.render(locationTemplate, {
    username: message.username,
    url: url.url,
    createdAt: moment(url.createdAt).format('hh:mm a')
  });
  $messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('roomData', ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users
  });
  document.querySelector('#sidebar').innerHTML = html;
});

$messageForm.addEventListener('submit', e => {
  e.preventDefault();

  $messageFormButton.setAttribute('disabled', 'disabled');

  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message, error => {
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();
    if (error) {
      return console.log(error);
    }
  });
});

$shareLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    $shareLocationButton.setAttribute('disabled', 'disabled');
    return alert('Geolocation not supported by your browser.');
  }

  $shareLocationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      'shareLocation',
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      () => {
        console.log('Location shared!');
      }
    );
    $shareLocationButton.removeAttribute('disabled');
  });
});

socket.emit('join', { username, room }, error => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});
