# my-promise [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**MyPromise.js**是基于[PromiseA+规范](https://promisesaplus.com/)实现的一款 Mini Promise 类库。

## 作者
**liuxuan**
- [Segmentfault](https://segmentfault.com/u/liuxuan_5845129fbf248)
- [个人博客](https://blog.liuxuan.site)


## 为什么会有这个项目
主要为了通过手写一个Promise去理解其内部的运行机制，当你可以自己实现一个Promise时，你还会被它难住吗？大家可以参考这个项目自己实现一个Promise，欢迎star和提issue。

## 已实现功能
- PromiseA+规范的所有功能，主要是Promise.then()
- Promise.resolve()
- Promise.reject()
- Promise.defer()
- Promise.all()
- Promise.race()
- Promise.prototype.catch()
- Promise.prototype.done()
- Promise.prototype.finally()

## 使用方法
1. 引入
```
let Promise = require('./MyPromise');
```
2. 使用
```
new Promise((resolve, reject) => {
  resolve('my-promise');
}).then((data) => {
  console.log(data);
}).catch((error) => {
  console.log('error', error);
});
```

## 单元测试
1. 自己写测试
index.js是使用该Promise的一些常用例子
test/test.js是基于 **mocha + expect** 写的几个单元测试例子

2. 使用 **promises-aplus-tests** 测试
- 安装
```
npm install promises-aplus-tests -g
```
- 使用
```
promises-aplus-tests MyPromise.js
```

## 完整测试报告
该Promise实现 **100%** 通过 **promises-aplus-tests** 测试，完整单元测试报告见    **mochawesome-report/mochawesome.html**