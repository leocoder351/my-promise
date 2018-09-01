function Promise(executor) {
  const self = this;
  self.state = 'pending';
  self.value = undefined;
  self.error = undefined;

  function resolve(data) {
    // 把状态由 pending -> resolved
    if (self.state === 'pending') {
      self.state = 'resolved';
      self.value = data;
    }
  }

  function reject(error) {
    // 把状态由 pending -> rejected
    if (self.state === 'pending') {
      self.state = 'rejected';
      self.error = error;
    }
  }

  try {
    executor(resolve, reject);
  } catch(error) {
    reject(error);
  }
}

Promise.prototype.then = function(onfulfilled, onrejected) {
  // 判断状态 resolved执行onfulfilled rejected执行onrejected
  if (this.state === 'resolved') {
    onfulfilled(this.value);
  } else if (this.state === 'rejected') {
    onrejected(this.error);
  }
};

module.exports = Promise;