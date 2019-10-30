const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const { generateMessage, generateLocation } = require('./utils/messages');
const {
  addUser,
  deleteUser,
  getUser,
  getUsersInRoom
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', socket => {
  console.log('New WebSocket connection');

  socket.emit('message', generateMessage('Welcome!'));
  socket.broadcast.emit(
    'message',
    generateMessage('A new user joined the room.')
  );

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', generateMessage(`Welcome ${user.username}!`));
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        generateMessage(`${user.username} has joined the room.`)
      );

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback('Profanity detected.');
    }
    io.to('gaming').emit('message', generateMessage(message));
    callback();
  });

  socket.on('disconnect', () => {
    const user = deleteUser(socket.id);
    io.to(user.room).emit(
      'message',
      generateMessage('A user has left the room.')
    );
  });

  socket.on('shareLocation', (position, callback) => {
    io.emit(
      'location',
      generateLocation(
        `https://google.com/maps/\@${position.latitude},${position.longitude}`
      )
    );
    callback();
  });
});

server.listen(port, () => {
  console.log(`App listening on port: ${port}!`);
});
