const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true, useCreateIndex: true
})

const User = mongoose.model('User',
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid!')
        }
      }
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number.')
        }
      }
    }
  }
)

const me = new User({ name: "     Pankaj   ", email: "PANKAJ@MAIL.com" })

me.save().then(result => {
  console.log(result);
}).catch(error => {
  console.log('Error! ', error);
})

/*
const Task = mongoose.model('Task', { name: { type: String }, completed: { type: Boolean } })

const taskOne = new Task({ name: "First Task", completed: false })

taskOne.save().then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
})
*/