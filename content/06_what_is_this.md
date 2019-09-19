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

现在看来，this指向运行时的函数所在的对象的设计有点怪异，这跟其他语言不太合群。为此在写Vue或者React程序时还得bind一下this，感觉是不是多此一举？难道设计成在那里定义就指向哪里的设计不行？

首先，如果设计成哪定义this指向哪里，


#### call、apply和bind



#### Es6的箭头函数
