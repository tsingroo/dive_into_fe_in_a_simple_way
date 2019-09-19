#### 本文涉及的内容
* 高阶函数
* 闭包
* 模块化

----
#### 高阶函数

简单来说如果一个函数的返回值也是一个函数，就可以把这个函数叫做高阶函数。

JS语言可以把函数也看做是一个变量，这个特性非常有用，不光是高阶函数，回调函数的实现也依赖于此特性。

高阶函数实现示例:
```JavaScript
function outerFoo() {
  return function innerFoo() {
    console.log("inner foo");
  }
}
// f变量接收一个函数
const f = outerFoo();
f(); // inner foo
```
回调实现示例
```JavaScript
function ajax(successCb) {
  successCb();
}
ajax(function() {
  console.log("success callback");
})
// 输出 success callback
```

#### 闭包-closure

闭包就是高阶函数的一种特殊的形式。拿上个例子来说，如果innerFoo引用了outerFoo作用域的变量,这样outerFoo返回的这个特殊的带有外部变量的函数就叫做闭包。

简单改一下高阶函数的例子为闭包：
```JavaScript
function outerFoo() {
  const outerFooVar = 100;
  return function innerFoo() {
    console.log(outerFooVar);
  }
}
// f变量接收一个函数
const f = outerFoo();
f();// 输出100
```

在JS方面闭包是一个经常被提及的概念，但是似乎上面的完全也可以不用闭包来实现。其实闭包的作用就是在一定程度上实现对函数的封装，可以模拟一些OO机制中的私有变量的特性。

我们以一个计算器的例子来看一下闭包的隐藏内部变量的特性:
```JavaScript
function calculator(initVal) {
  return {
    add(val) {
      initVal += val;
    },
    minus(val) {
      initVal -= val;
    },
    result() {
      return initVal;
    }
  }
}

const calc = calculator(0);
calc.add(100);
calc.minus(20);
calc.result();// 80
```

如上面的例子，使用calc并不能直接访问initVal，并且可以通过函数来操作initVal，也可以通过result来获得返回值。避免了对全局变量的污染，避免了直接对局部变量的修改，在没有class的情况下将一些函数和算法封装到内部，从一定程度上实现了模块化。

#### 模块化

JS或者说前端在很长时间的演进中，模块化都是一个重要的课题。从最简单的闭包，到CommonJs/AMD/CMD等各种规范和实现，再到webpack等工程化工具。
模块化的目的就是隐藏一些实现和变量，避免污染全局作用域。我们自己写代码也要尽量缩小变量的作用域，尽量不要使用全局变量。

目前前端框架都是使用import和export这样的模块化机制。NodeJs原生使用module.exports和require这样的模块化机制。

如webpack文档所言，它是一个可以将所有的资源都打包的一个工具。任何一种资源都可以打成一个bundle模块。不论是图片，JS还是CSS。只不过一些资源需要通过loaders的方式来转换一下。具体的在后面会单独介绍webpack
