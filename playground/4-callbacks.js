/*
setTimeout(() => {
  console.log('Two seconds are up.');
}, 2000);
 */

/*
const names = ['Pankaj', 'John', 'Lijo'];
const shortNames = names.filter(name => name.length < 6);
console.log(shortNames);
 */

/*
const geoCode = (adrress, cb) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0
    };
    cb(data);
  }, 2000);
};

geoCode('Lodhi Colony', data => {
  console.log(data);
});
 */

/* const add = (a, b, cb) => {
  setTimeout(() => {
    const sum = a + b;
    cb(sum);
  }, 2000);
}; */

/* add(1, 4, sum => {
  console.log('The sum is ', sum);
}); */

const doWorkCallback = (callback) => {
  setTimeout(() => {
    callback(/* 'This is my error', undefined */undefined, [1, 4, 3]);
  }, 1500)
}

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error);
  }
  console.log(result);

})