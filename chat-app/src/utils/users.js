const users = [];

const addUser = ({ id, username, room }) => {
  // Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate the data
  if (!username || !room) {
    return {
      error: 'Username & room are required!'
    };
  }

  //Check for existing user
  const userExists = users.find(
    user => user.room === room && user.username === username
  );

  // Validate username
  if (userExists) {
    return { error: 'Username is in use!' };
  }

  // Store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const deleteUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => {
  return users.find(user => user.id === id);
};

const getUsersInRoom = room => {
  room = room.trim().toLowerCase();
  return users.filter(user => user.room === room);
};

// Test methods
// addUser({ id: 1, username: 'Pankaj', room: 'gaming' });
// addUser({ id: 2, username: 'Nelson', room: 'gaming' });
// addUser({ id: 3, username: 'Tirkey', room: 'football' });
// const removedUser = deleteUser(1);
// console.log(removedUser);
// const user = getUser(2);
// console.log(user);
// console.log(users);
// const usersInRoom = getUsersInRoom('');
// console.log(usersInRoom);

module.exports = {
  addUser,
  deleteUser,
  getUser,
  getUsersInRoom
};
