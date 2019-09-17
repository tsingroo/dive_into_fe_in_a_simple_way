#### 本文涉及的内容
* 函数作用域
* 变量提升
* 作用域链
* 块级作用域

----

每个变量最终都是要落到内存中去存储的，所以自然就有分配和回收。有回收自然就有变量触及不到的区域，触及到的区域就叫做作用域-scope。

早期语言都会有一些作用域上的先天不足。JS就是还没把先天不足给改掉的时候，已经在世界范围内被广泛传播了，比如这个函数作用域和变量提升。

#### 函数作用域
解释：在一个function范围内的var变量声明，在这个function的生命周期内有效.跑出这个生命周期，这个变量就释放，自然也就访问不到。

示例:
```JavaScript
function foo() {
  var bar = 123;
  console.log(bar);
}
foo();
console.log(bar);

// 打印结果如下，在window下无法直接打印foo作用域内的bar变量(无法直接访问，但是可以直接赋值)
// 123
// Uncaught ReferenceError: bar is not defined
```

相对于块级作用域，函数作用域的出现的次数更少，对于每遇到一个function关键字就声明一个作用域也更容易实现。而块级`{}`在程序中出现的次数更多，更频繁的分配和释放空间，管理起来更复杂。

这些feature在开发初期可能给人极大的方便，也给编译器的实现以极大的降低难度，但是也带来了一些问题：就是一个变量无需声明也可使用，变量可以使用var重复声明，局部作用域中没有使用var声明会意外操作外层作用域变量，等等...

随着代码越来越难维护，一些特性的越来越难以让人理解，后来出现的"use strict"，块级作用域等都是为了限制这些feature的使用。

#### 变量提升
解释：用var声明的变量，在同一个函数作用域下，会自动的将变量的声明提前，并且会合并声明。如果有一个函数跟一个变量重名，函数会覆盖变量声明。所以可以认为对于var声明的变量这个应该叫做变量声明提升，因为只提升了声明部分，赋值还是留在原始语句位置。而对于function声明则会提升整体的函数体。

示例:
```JavaScript
console.log(foo);
var foo = 100;
var foo = 200;
console.log(foo);
// 打印结果为
// undefined
// 200
```
上面的语句在解释执行时会先被翻译成下面的语句，并且重复var声明会合并:
```JavaScript
var foo;
console.log(foo);
foo = 100;
foo = 200;
console.log(foo);

// 打印结果为
// undefined
// 200
```

这应该也是一个早期为了使用者方便也为了JS解释器实现方便，所简化的一个设计。初期简单的网页一眼就能看完的代码用这种设计没问题。

#### 作用域链

解释：每一个function构成了一个作用域，嵌套的function就构成了嵌套的作用域，如果一个变量在内层的作用域找不到，JS引擎会向外层作用域去找，一直找到window作用域。这个查找的链就叫做作用域链。

示例:
```JavaScript
// window scope
function fooOuter() {
  // fooOuter scope
  function fooInner() {
    // fooInner scope

    bar = 100;
  }
  fooInner();
}
fooOuter();
console.log(window.bar);

// 打印输出100
// bar在fooIner作用域找不到会去fooOuter找
// 在fooOuter找不到会去window找并赋值，意外污染了全局变量

```

#### 块级作用域

解释:可以简单的认为一对花括号`{}`之间构成的区域就叫做块，在这这个花括号之间用let或const定义的变量只在花括号内有效，跑出花括号去就访问不到。

示例:
```JavaScript
if(true) {
  const bar =123;
  console.log(bar);
}
console.log(bar)

// 打印结果如下
// 123
// Uncaught ReferenceError: bar is not defined
```

块级作用域的出现就是为了缩小变量影响范围，避免如作用域链的访问一样修改到全局变量。

const的出现是为了限制变量的使用，函数式里面提倡不用变量，函数式编程具体会在后面讲解。
