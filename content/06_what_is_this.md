#### 本文涉及的内容
* 一句话概括this指向
* 怪异的设计
* call、apply和bind
* Es6箭头函数

---

#### 一句话概括this指向

this指向的是函数运行期间所在的那个对象。

示例:
```JavaScript
function foo() {
  console.log(this.bar)
}
foo(); // 在window作用域下相当于调用window.foo(),this指向window

const cat = {
  name: "tom",
  miao: function(){
    console.log(this.name);
  }
}
cat.miao() // 在cat上执行miao，this指向cat

const windowMiao = cat.miao
windowMiao() // 在window作用域下调用windowMiao，this指向window
```

#### 怪异的设计

运行时确定变量指向的这种机制，有一个专有名字叫运行时作用域。与之相对的就是静态作用域，更学术化的叫做词法作用域(Lexcial scope)，就是在定义这个变量时指向的作用域。

JS里使用词法作用域--除了this之外。this使用的是运行时作用域。是不是很奇怪？一种语言使用两种作用域机制。

这可能是为了高阶函数实现起来方便，因为回调函数你想要传递的是函数，而不是默认把函数和this当做一个闭包给传过去。JS可以将函数作为变量传递的特性使得可以很方便的将动态作用域this指向改变，但是如果实现成了静态作用域就不能随便的更改this指向(不能从设计上违背自己对静态作用域的定义)。

示例
```JavaScript
// 静态作用域,foo内部的a不会在运行时确定，会在函数定义时确定。
// foo定义在window作用域下，foo内的a找不到会去父级作用域window去查找，而不是运行时的父级作用域bar
// 所以打印输出的是10
const a = 10;
function foo() {
  console.log(a);
}
function bar() {
  const a = 100;
  foo();
}
bar(); // 10


```


#### call、apply和bind

相同点：改变this指向来模拟继承效果。
不同点：call和apply改变this指向并执行函数，所以他们的返回结果就是函数的返回结果。bind只绑定this不执行函数，返回结果为改变this指向后的函数。

调用方式:
```JavaScript
// call和apply改变this指向并执行函数，所以他们的返回结果就是函数的返回结果
const xiaoMing = {
  name: "xiaoMing",
  getName: function() {
    console.log(this.name);
  },
  getAge: function(age) {
    console.log(`${this.name}'s age is ${age}`);
  }
}

const xiaoHong = {
  name: "xiaoHong"
}
// 没有入参时，两者调用是一致的
xiaoMing.getName.call(xiaoHong); // xiaoHong
xiaoMing.getName.apply(xiaoHong); // xiaoHong
// 有入参时，第二个参数不一样
xiaoMing.getAge.call(xiaoHong, 11); // xiaoHong's age is 11
xiaoMing.getAge.apply(xiaoHong, [11]); // xiaoHong's age is 11

// bind只绑定this不执行函数，返回结果为改变this指向后的函数。
const xBind = xiaoMing.getName.bind(xiaoHong)
xBind() // 虽然相当于执行window.xBind(),但是bind改变了this指向,打印输出xiaoHong
```

#### Es6的箭头函数

箭头函数对于this的改变是一个bind函数的语法糖，最终会转成bind的调用或者使用非this变量来保存定义时的作用域(词法作用域)。
当然箭头函数和普通函数不一样的还挺多，这里只关注this这个指向。
```JavaScript
// Es6箭头函数 () => {},xiaoMing.getName和上面的普通函数的定义稍微有点不同
const xiaoMing = {
  name: "xiaoMing",
  getName: () => {
    console.log(this.name);
  }
}

```
