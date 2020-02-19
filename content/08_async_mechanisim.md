#### 本文涉及的内容
* 进程和线程
* 浏览器、V8和NodeJs
* 异步机制的实现
* 回调地狱
* generator函数
* Promise
* async和await

---

本文只是一个简介，更详细的在NodeJs中讨论，有不正确的欢迎指正。

#### 进程和线程

简单来说进程由系统控制和分配资源和调度，而线程是由程序员编程调度和控制。一个系统下可以有多个进程，一个进程可以有多个线程。一般情况下，一个程序运行起来的一个实例就是一个进程。进程是process，线程是thread。

Chrome是多进程结构，每一个tab都是一个进程，这个tab的进程下又有渲染线程，js引擎线程，网络线程，定时器线程等。

#### 浏览器、V8和NodeJs

浏览器不是V8，NodeJs也不是V8，有时候将他三个混为一谈是为了解释JS的执行。

Chrome浏览器的JS执行引擎部分是V8,NodeJs底层的JS引擎也是V8。Chrome除了V8还有处理网络请求的模块，也有渲染引擎，还有网络下载和定时器线程等。NodeJs除了V8解释引擎，还有异步事件实现的核心Libuv库，以及一些Bindings。

说JS是单线程模型，并不是说V8是单线程，更不是说浏览器是单线程，而是指的是我们无法使用JS(web worker除外)操作其他线程，给上层暴露的就是一个单线程模型。

V8也不是单线程，因为JS是一个高级语言，有垃圾回收机制，所以不光有执行的线程，也必须有解释器和垃圾回收的线程在背后工作。

#### 异步机制实现

很早以前，面试都会问一个问题就是：既然JS是单线程的，那他是如何实现异步和回调的呢？下面我们就简单说一下这个问题。

浏览器的异步和NodeJs的异步稍微有些不同，但大体可以认为是一个模型。JS实现异步的模型可以认为有三个队列，一个执行主队列，一个微任务队列(MicroTask)，一个宏任务队列(MacroTask)。

主队列一直在循环执行同步代码，执行完之后去执行所有的微任务(注意是所有的)，然后检查宏任务，将满足条件的宏任务放入主队列，然后开始下一个周期。

NodeJs中Promise.reolve的和process.nextTick的都会放到微任务。而setTimeout和setInterval这些都会放到宏任务队列。

#### 回调地狱

写过JS的肯定对嵌套回调特别熟悉，每个前端都写过N多遍。形式上如下(实际可能更麻烦一些):

```JavaScript
$.ajax({
  url: 'someUrl',
  success: function (resp) {
    if(resp.code ===0) {
      someCallBackFn(reso.data, function() {
        // doSomthing
      }, error: function (err) {
        // errCallBack();
      });
    }
  },
  error: function (err) {
    // someErrCb();
  }
})
```
这样的代码在逻辑简单的情况下没有任何问题，当业务逻辑复杂之后，就会出现十几行代码全是花括号和小括号的情况。这样的代码执行到哪一层的逻辑从代码上并不是很容易看清楚。复杂度指数级增长，但是我们只能管理线性复杂度的项目。由此，我们必须对这些指数级的代码进行降维，由此衍生了多种方案。

比如一个支付下单的场景在回调的时候就得嵌套两层，外层是预下单接口，内层是确认接口。如果在微信内需要获取账号信息就又多了一层。
复杂的业务系统也会出现调多个系统的接口才能完成一个操作的情况，这些场景下，回调会经常搞错嵌套，也不容易维护。

#### Promise

可能为了解决回调地狱出来的第一个(可能)方案就是promise了，jQuery里面也有类似Promise的叫$deferre。$.ajax返回的就是一个$deferred，可以像下面代码这么调用。
```JavaScript
$.ajax({
}).then(function(resp) {
}).then(function(resp) {
});
```
对于上面提到的几个场景，Promise的链式调用已经把代码改进的挺好看了，并且对于从回调地狱出来的人这种写法也很是酸爽。直到现在还是有很多人在用这种写法。

这种写法有一个特点就是，代码中抛出的异常都得用.catch()方法捕获，而不能用try catch代码块捕获。个人认为这也不能叫缺点。


#### generator函数

同为ES6提出的另一项异步代码改进技术就是generator。generator函数从写法上来说是在function后面加了一个*，里面可以返回多个值，返回值的方式是yield，而调用方接收值的方式是调用next()方法。

写法和调用如下:
```JavaScript
function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
```

函数的执行本质上就是在执行到yield时，计算yield的表达式，然后保留一下当前执行的上下文，然后继续执行调用者的函数。等下一次调用next()方法的时候恢复generator函数的执行上下文，并开始新一轮的计算。

generator相对于Promise的认知门槛比较高，我的理解也有限。目前为止在阿里的DvaJs使用的Redux-saga就是generator这种形式。

#### async和await

ES标准继续向前，社区又尝试了更多好用的特性，比如async和await。代码写法如下
```JavaScript
// await 必须放到一个async声明的函数里面
async loadMyPhotos() {
  const photoUrls = [];
  try {
    const myAlbumId = await getMyAlbumId();
    photoUrls = await getPhotoByAlbumId(myAlbumId);
  } catch(exp) {
    // toast Error
  }
  return photoUrls;
}
```
对于调用多个回调才能走完的业务逻辑，并且各个异步调用之间还要处理大量的其他同步操作，这种同步的写法比Promise看起来要更清晰一些。如果对await的数据进行处理，看起来也更舒服一些。