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






#### call、apply和bind

#### Es6的箭头函数
