const book = {
  title: 'The road less travelled',
  author: 'M. Scott Peck'
};

const bookJSON = JSON.stringify(book);
console.log(bookJSON);

const bookObj = JSON.parse(bookJSON);
