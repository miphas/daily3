

// call
Function.prototype.call = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Not a function')
  }
  context = context || window;
  const args = [...arguments].slice(1);
  // Point
  context.__fn = this;
  const result = context.__fn(...args);
  delete context.__fn;
  return result;
}


// bind
Function.prototype.bind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Not a function')
  }
  const func = this;
  const bindArgs = [...arguments].slice(1);
  return function F() {
    const args = bindArgs.concat([...arguments]);
    // Point
    if (this instanceof F) {
      return new func(...args)
    }
    // 可以直接使用 call
    return func.call(context, ...args)
  }
}


// create
function create(Type) {
  var obj = {};
  obj.__proto__ = Type.prototype;
  const result = Type.apply(obj, [...arguments].slice(1));
  // Point
  return typeof result instanceof Object ? result : obj;
}


// mInstanceOf
function mInstanceOf(ins, Type) {
  const targetProto = Type.prototype;
  let curProto = ins.__proto__;
  while (curProto) {
    if (curProto === targetProto) {
      return true;
    }
    // Point
    curProto = curProto.__proto__;
  }
  return false;
}