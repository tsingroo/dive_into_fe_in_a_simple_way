function Parent() {
  this.name = 'Parent Class';
}
Parent.prototype.getName = function() {
  return this.name;
}

function Child() {

}
Child.prototype = new Parent();
const cc = new Child();
console.log(cc.getName());