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

  db.collection('users').find({ age: 25 }, () => { })

})