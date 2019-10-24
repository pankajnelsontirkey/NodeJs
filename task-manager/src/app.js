const express = require('express');
require('./db/mongoose');

const UserRouter = require('./routes/user.routes');
const TaskRouter = require('./routes/task.routes');

const app = express();

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

module.exports = app;
