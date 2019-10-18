require('./db/mongoose');
const express = require('express');

const UserRouter = require('./routes/user.routes');
const TaskRouter = require('./routes/task.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(UserRouter);
app.use(TaskRouter);

app.listen(port, () => {
  console.log('Server is up, listening on port ' + port);
});
