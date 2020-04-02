const obj = {
  name: 'obj name'
};
function getName() {
  return this.name;
}

// apply,call,bind
// console.log(getName.call(obj, undefined));
// console.log(getName.apply(obj, []));
// const bindFn = getName.bind(obj);
// console.log(bindFn());
// console.log(bindFn());

Function.prototype.myCall = function(obj) {
  const _this = this;
  const fnName = _this.name;//getName
  obj[fnName] = _this;
  const result = obj[fnName]();
  delete obj[fnName];
  return result;
}

console.log(getName.myCall(obj));

///////
Function.prototype.myBind = function(obj) {
  const _this = this;
  const fnName = _this.name;
  function inner() {
    return _this.call(obj);
  }
  inner.prototype = Object.create(_this.prototype);
  return inner;
}

let bidnFn = getName.myBind(obj);
console.log(bidnFn());
console.log(bidnFn());
bidnFn = getName.myBind({
  name: 'new name newnew'
});
console.log(bidnFn());
console.log(bidnFn());