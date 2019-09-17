#### 本文涉及的内容
* 类
* JS中的继承
* 原型链

----

先从类开始讲起，一般的文章都是直接从原型讲，这样对于一开始理解这个概念的人很不容易理解。虽然原型出现的更早，但是从类到原型的理解跟容易让人接受。

首先统一一下认知：实例方法指通过new之后产生的对象调用的方法，静态方法指在类上可以直接调用的方法。

再次注意：先是有的原型和原型链，后来才有的类。但是本文先从类开始讲起。

#### 什么是类

一些概念从英文翻译到中文会丢失很多信息，class就是这样一个翻译。类的英文叫做class，从英文直接理解来看这个是classification的一个简写，而classification代表的是对事物的分类。

面向对象中的class应该翻译为分类而不是类，拿面向对象的例子来说一个猫分类和狗分类都属于动物分类下，有动物这个分类下的特征。所以Cat Class和Dog Class才要extends这个Animal Class，因为本质上他们属于一个大的分类。

面向对象是使用分类法对世界万物进行的一种建模方法，如此自然而又通俗。如此amazing beautiful的一种方式，如果你觉得面向对象很难，那一定是你理解错了。如果还没get到这个点，请思考一下。

在这里我们就叫它class吧，和其他很多面向对象的语言一样，Es6中的类也叫做class，也是使用extends继承。可以在class内写成员方法，可以使用构造函数等。相对于ES6，TypeScript对于class的实现更加完善。在此不过多说明，各位可找资料自行学习一下。

如下示例：
```JavaScript
class Animal {
  constructor(name) {
    this._name = name;
  }
  getName() {
    return this._name;
  }
}

class Cat extends Animal {
}

const c = new Cat("tom")
c.getName()

// 打印输出tom
```

目前(2019-09-17)并不是所有浏览器都有class的原生实现，所以目前的前端项目都是靠babel进行转义为Es5之后进行发布。后面会有对babel专门介绍的文章。

#### JS中的原型

Js中的原型机制就是为了来模拟类机制的，JS的function可以使用new进行调用，调用之后的实例的`__proto__`等于function的`prototype`。在prototype上的函数都可以直接在实例上当实例方法调用。 直接对function的属性进行赋值，可以把这个方法当静态方法使用。

示例
```JavaScript
function foo() {}
const f = new foo();
f.__proto__ === foo.prototype // true

foo.prototype.bar = () => { console.log("instance foo bar!") }
f.bar() // instance foo bar!
foo.fooBar = ()=> { console.log("static foo bar!")}
foo.fooBar(); // static foo bar!
```


#### JS中的原型链

大部分面向对象的语言都有继承机制，JS通过原型链实现了继承机制。JS的原型链的顶端的class也叫做Object.

JS中的实例方法都从构造函数的原型(prototype)上找，同时这个原型(prototype)也是某个构造方法的实例(可以用类继承来理解)，最终这些都是Object的实例。一个实例方法，会先从自己的原型上找，找不到会往更上层找，如果Object都没有就会返回xxx is not a function。

示例:
```JavaScript
function Parent() {}
Parent.prototype.parentWalk = ()=> { console.log("Parent Walk"); }

function Child() {}
Child.prototype = new Parent();

const c = new Child();

c.parentWalk();
c.toString();
c.bar();

// parentWalk为父类方法，toString为Object方法,bar会抛出错误，打印如下
// Parent Walk
// [object Object]
// Uncaught TypeError: c.abc is not a function

```
用原型链来实现继承确实比较恶心，一大坨代码才实现一个extends语法。不过extends语法最终是会转成类似原型链的代码，extends只是一个语法糖，让我们写起来爽。
