内容:
* JS原型链
* 使用函数模拟一个new运算符
* 使用prototype模拟继承


----

### JS原型链

记住:
* 1.只有函数才有prototype，实例(new Animal())只有__proto__.
* 2.函数是Function的实例，函数的prototype是Object的实例
* 3.Function.__proto__和Function.prototype相等
* 4.Object.prototype.__proto__指向null




----

### 模拟new

四步:
* 1.声明一个对象obj
* 2.将obj.__proto__和函数Animal的prototype链接
* 3.在obj上调用Animal函数
* 4.返回obj


----

### 使用prototype模拟继承

