function Promise(executor) {
  let self = this;
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.value = value;

      self.onResolvedCallback.forEach((fn) => {
        fn();
      });
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.reason = reason;

      self.onRejectedCallback.forEach((fn) => {
        fn();
      });
    }
  }

  try {
    // 所有回调函数的执行都要放到try..catch中，因为不是自己的代码有可能会出错
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }

  let called = false;

  if (x != null && (typeof x == 'object' || typeof x == 'function')) {
    // x是对象或者函数，因为typeof null 是 'object'，所以这里要排除null
    try {
      let then = x.then;
      if (typeof then === 'function') {
        // 是thenable函数，符合Promise要求
        then.call(x, (y) => {
          // 返回值y有可能还是Promise，也有可能是普通值，所以这里继续递归进行resolvePromise
          // 直到最后x是非thenable值，然后resolve(x)
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (error) => {
          if (called) return;
          called = true;
          reject(error);
        });
      } else {
        // 是对象或者函数，但没有thenable，直接返回
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // x是普通值
    resolve(x);
  }
}

Promise.prototype.then = function(onFuifilled, onRejected) {
  onFuifilled = typeof onFuifilled === 'function' ? onFuifilled : value => {
    return value;
  };
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason;
  };

  let self = this;

  // then的返回值也是个promise
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === 'pending') {
      self.onResolvedCallback.push(() => {
        setTimeout(() => {
          // 所有回调函数的执行都要放到try..catch中，因为不是自己的代码有可能会出错
          try {
            let x = onFuifilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
      self.onRejectedCallback.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    } else if (self.status === 'resolved') {
      setTimeout(() => {
        try {
          let x = onFuifilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);
    } else if (self.status === 'rejected') {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }
  });
  
  return promise2;
};

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.finally = function(fn) {
  return this.then((data) => {
    setTimeout(fn, 0);
    return data;
  }, (reason) => {
    setTimeout(fn, 0);
    throw reason;
  });
};

Promise.prototype.done = function() {
  this.catch((reason) => {
    throw reason;
  });
};

Promise.all = function(promiseArr) {
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0;

    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i].then((data) => {
        result[i] = data;
        count++;

        if (count === promiseArr.length) {
          resolve(result);
        }
      }, reject)
    }
  });
};

Promise.race = function(promiseArr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i].then((data) => {
        resolve(data);
      }, reject)
    }
  });
};

Promise.resolve = function(value) {
  var promise = new Promise((resolve, reject) => {
    resolvePromise(promise, value, resolve, reject);
  })
  return promise;
};

Promise.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}


module.exports = Promise;