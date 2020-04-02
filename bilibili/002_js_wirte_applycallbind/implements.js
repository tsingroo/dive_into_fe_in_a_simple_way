Function.prototype.myCall = function(obj) {
  const _this = this;
  const fnName = _this.name;
  obj[fnName] = _this;
  const result = obj[fnName]();
  delete obj[fnName];
  return result;
}



