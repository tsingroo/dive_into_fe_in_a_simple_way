#### 本文涉及的内容
* 类型系统
* 值类型和引用类型
* 深拷贝和浅拷贝

----

#### 类型系统

JS里面有句话叫做“一切皆对象”。所有的类型都是从Object继承而来，都有Object实例的一些方法。比如下面的这些都有toString,constructor等方法。
```JavaScript
(1).toString();
(1.23).toString();
(function() {}).toString();
```
但是`function() {}`的constructor和`(1.23)`的constructor不同，是因为原型链不同。类型系统的原型链在原型一节会讲，本节讲类型系统的基本知识。

js使用固定的声明符,var/const/let，不能指定类型，JS引擎会对类型进行自动推导，类型赋值以后也可以随时改变。

#### 值类型和引用类型

变量声明并复制以后，这个变量就会有类型。有类型，JS引擎自然要做一些内存分配和初始化的一些操作，不同的类型有不同的内存结构。

赋值的时候，JS并没有传值或者传引用的方式，一切都是JS引擎根据类型来决定的。按照常识来推测，JS引擎肯定会对复制代价高的实行传引用，对复制代价低的实行值传递。
所以自然而然的对于Object自然就会实行引用传递，对于Number或者String等自然实行值传递。但是引用传递的时候，容易造成改动一个变量，造成另一个变量也变化的情况。
示例：
```JavaScript
let a = 10;
let b = a;
b = 100;
console.log(a); // 完整拷贝，互不影响，打印输出 10

let objA = { x: 10 };
let objB = objA;
objB.x = 100;
console.log(objA.x); // 因为是引用传递，所以影响到了objA.x,打印结果为100
```

#### 深拷贝和浅拷贝

为了避免引用传递的问题，我们需要对Object类型的数据进行深拷贝。深拷贝以后改一个对象就不会意外影响另外一个了
一般有如下几种方法进行深拷贝
* JSON.parse(JSON.stringify(fooBar))
* lodash.deepClone(fooBar)
* 自己写递归算法，遍历每一个key，如果key是Object继续递归
