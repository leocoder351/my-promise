let MyPromise = require('./MyPromise.js');


new MyPromise(function(resolve) {
  resolve(42)
}).then(function(value) {
  a.b = 111;
}).done()