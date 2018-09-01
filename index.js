let Promise = require('./Promise');

let promise = new Promise((resolve, reject) => {
  resolve(111);
});

promise.then((data) => {
  console.log('promise resolved');
  console.log(data);
}, (error) => {
  console.log('promise rejected');
  console.log(error);
});

promise.then((data) => {
  console.log('second then callback');
  console.log(data);
}, (error) => {
  console.log('second then callback rejected');
  console.log(error);
});

console.log(222);
