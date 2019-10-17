require('../src/db/mongoose');

const Task = require('../src/models/task');

/* Task.findByIdAndDelete('5da8092859d7bd1b9486eda8')
  .then(task => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  }); */

const deleteTaskAndCount = async id => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount('5da8515ca5547f127cc6a49b')
  .then(count => {
    console.log('Incomplete tasks left ', count);
  })
  .catch(e => {
    console.log('Error ', e);
  });
