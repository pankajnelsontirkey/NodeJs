const fs = require('fs');

// const book = {
//   title: 'The road less travelled',
//   author: 'M. Scott Peck'
// };

// const bookJSON = JSON.stringify(book);
// console.log(bookJSON);

// const parsedData = JSON.parse(bookJSON);
// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.author);

const dataBuffer = fs.readFileSync(`1-json.json`);
let dataJSON = dataBuffer.toString();
let data = JSON.parse(dataJSON);
data.name = 'Pankaj Nelson Tirkey';

dataJSON = JSON.stringify(data);

fs.writeFileSync(`1-json.json`, dataJSON);
