
function MyPromise(resolver) {
  const STATES = this.STATES;
  this.state = STATES.Pending;
  this.value = null;
  this.onFilledWaitingList = [];
  this.onRejectWaitingList = [];

  const _this = this;

  const onResolve = (value) => {
    if (_this.state !== STATES.Pending) {
      return;
    }
    _this.state = STATES.Resolved;
    _this.value = value;
    _this.onRejectWaitingList.splice(0, _this.onRejectWaitingList.length);
    while (_this.onFilledWaitingList.length) {
      const onFilledFunc = _this.onFilledWaitingList.shift();
      onFilledFunc && onFilledFunc(_this.value);
    }
  }
  const onReject = (value) => {
    if (_this.state !== STATES.Pending) {
      return;
    }
    _this.state = STATES.Rejected;
    _this.value = value;
    _this.onFilledWaitingList.splice(0, _this.onFilledWaitingList.length);
    while (_this.onRejectWaitingList.length) {
      const onRejectFunc = _this.onRejectWaitingList.shift();
      onRejectFunc && onRejectFunc(_this.value);
    }
  }

  resolver(onResolve, onReject);
}

MyPromise.prototype.STATES = {
  Pending: 0,
  Resolved: 1,
  Rejected: 2,
};
MyPromise.prototype.then = function(onResolve, onReject) {
  const _this = this;
  const STATES = _this.STATES;
  return new MyPromise((resolve, reject) => {
    const onResolveFunc = function() {
      resolve(onResolve(_this.value))
    }
    const onRejectFunc = function() {
      reject(onReject(_this.value))
    }
    switch (_this.state) {
      case STATES.Pending:
        onResolveFunc && _this.onFilledWaitingList.push(onResolveFunc);
        onRejectFunc && _this.onRejectWaitingList.push(onRejectFunc);
        break;
      case STATES.Resolved:
        onResolveFunc && onResolveFunc(_this.value);
        break;
      case STATES.Rejected:
        onRejectFunc && onRejectFunc(_this.value);
        break;
    }
  });
}



var p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('get result')
  }, 100);
  setTimeout(() => {
    resolve('get result 2')
  }, 100);
});

p.then((value) => {
  console.log(value);
  return 1;
})