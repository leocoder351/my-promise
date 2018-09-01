let Promise = require('./Promise');

let promise = new Promise((resolve, reject) => {
  resolve('hello promise');
  reject('oh error!');
});

promise.then((data) => {
  console.log('promise resolved');
  console.log(data);
}, (error) => {
  console.log('promise rejected');
  console.log(error);
});