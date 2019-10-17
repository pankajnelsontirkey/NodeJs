require('../src/db/mongoose');

const User = require('../src/models/user');

/* User.findByIdAndUpdate('5da82232499ac21b18551a18', { age: 2 }, { new: true })
  .then(user => {
    console.log(user);
    return User.countDocuments({ age: 2 });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  }); */

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age: { $lte: 5 } });
  return count;
};

updateAgeAndCount('5da82232499ac21b18551a18', 6)
  .then(count => {
    console.log('Younger than 5 ', count);
  })
  .catch(e => {
    console.log('Error ', e);
  });
