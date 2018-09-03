let Promise = require('../Promise');
let expect = require('expect.js');

describe('Promise单元测试', function () {
  it('测试01 - 同步触发resolve', function () {
    let promise = new Promise((resolve, reject) => {
      resolve('aaaa');
    }).then((data) => {
      expect(data).to.be('aaaa');
    }, (error) => {
      console.log('error', error)
    });

    return promise;
  });

  it('测试02 - 异步触发resolve', function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('bbbb');
      }, 1000);
    }).then((data) => {
      expect(data).to.be('bbbb');
    }, (error) => {
      console.log('error', error)
    });
  });

  it('测试03 - Promise.all', function () {
    let promise_1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('cccc-1');
      }, 100);
    });

    let promise_2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('cccc-2');
      }, 200);
    });

    let promise_3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('cccc-3');
      }, 1000)
    });

    let promise = Promise.all([promise_1, promise_2, promise_3])
    .then((data) => {
      expect(data).to.eql(['cccc-1', 'cccc-2', 'cccc-3']);
    }, (error) => {
      console.log('error', error);
    });

    return promise;
  });

  it('测试04 - Promise.race', function () {
    let promise_1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('dddd-1');
      }, 100);
    });

    let promise_2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('dddd-2');
      }, 200);
    });

    let promise_3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('dddd-3');
      }, 1000)
    });

    let promise = Promise.race([promise_1, promise_2, promise_3])
    .then((data) => {
      expect(data).to.be('dddd-1');
    }, (error) => {
      console.log('error', error);
    });

    return promise;
  });

  it('测试05 - Promise穿透', function () {
    let promise = new Promise((resolve, reject) => {
      resolve('eeee');
    }).then().then((data) => {
      expect(data).to.be('eeee');
    }, (error) => {
      console.log('error', error);
    });

    return promise;
  });
});