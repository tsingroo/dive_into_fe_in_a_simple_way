function Animal() {
  this.name = 'Animal name';
}

Animal.prototype.getName = function() {
  return this.name;
}

// const aaa = new Animal();
// console.log(aaa.getName());
function myNew(fn) {
  const obj = {};
  obj.__proto__ = fn.prototype;
  fn.apply(obj, [])
  return obj;
}

const newAnimal = myNew(Animal);
console.log(newAnimal.getName());
