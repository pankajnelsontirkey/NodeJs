const mongodb = require('mongodb');

const { MongoClient, ObjectID } = mongodb;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!');
  }

  const db = client.db(databaseName);

  /* db.collection('users').findOne({ _id: ObjectID("5da5ab906401831290222cf2") }, (error, user) => {
    if (error) {
      return console.log('Unable to fetch users!');
    }
    console.log(user);
  }) */

  /* db.collection('users').find({ age: 25 }).toArray((error, user) => {
    if (error) {
      return console.log('Unable to find!');
    }
    console.log(user);
  }) */

  /* db.collection('users').find({ age: { $gte: 25 } }).count((error, count) => {
    if (error) {
      return console.log('Unable to find!');
    }
    console.log(count);
  }) */

  /* db.collection('tasks').findOne({ _id: ObjectID("5da6a77a2a6f6e8f3a8845c1") }, (error, task) => {
    if (error) {
      return console.log('Unable to fetch task!');
    }
    console.log(task);
  }) */

  /* db.collection('tasks').find({ completed: false }).toArray((error, task) => {
    if (error) {
      console.log('Unable to find!');
    }
    console.log(task);
  }) */

  /* db.collection('users').updateOne({ _id: ObjectID("5da5a32feebf461ad8eb09dd") }, { $inc: { age: 1 } }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  }) */

  /* db.collection('tasks').updateMany({ completed: false }, { $set: { completed: true } }).then(result => {
    console.log(result.modifiedCount);
  }).catch(error => {
    console.log(error);
  }) */

  /* db.collection('users').deleteOne({ age: { $gt: 25 } }).then(result => {
    console.log(result.deletedCount);
  }).catch(error => {
    console.log(error);
  }) */

  /* db.collection('users').deleteMany({ age: { $gt: 18 } }).then(result => {
    console.log(result.deletedCount);
  }).catch(error => {
    console.log(error);
  }) */

  /* db.collection('tasks').deleteOne({ name: "Setup editor" }).then(result => {
    console.log(result.deletedCount)
  }).catch(error => {
    console.log(error);
  }); */

  /* db.collection('tasks').deleteMany({ completed: true }).then(result => {
    console.log(result.deletedCount);
  }).catch(error => {
    console.log(error);
  }) */

})