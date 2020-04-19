// Promise
// 实例方法:then
// 静态方法:resolve/reject/race/all/

// ----
// Episode-1:then和链式调用
// * 1.then只是一个注册resolve/reject方法,等new Promise的时候才是真正执行
// * 2.then为什么能链式调用?因为它返回的是Promise实例


class MyPromise {

  succCbFns: Function[] = [];
  failCbFns: Function[] = [];
  
  constructor(executor) {
    const doResolve = (data) => {
      setTimeout(() => {
        this.succCbFns.forEach((cb) => {
          cb(data);
        });
      });
    }
    const doReject = (reason) => {
      setTimeout(() => {
        this.failCbFns.forEach((cb) => {
          cb(reason);
        });
      });
    }
    executor(doResolve, doReject);
  }

  then(resolveCb, rejectCb?) {
    const thenPromise = new MyPromise((resolve, reject) => {
      let thenData;
      let thenReason;

      this.succCbFns.push((data) => {
        thenData = resolveCb(data);
        resolve(thenData);
      });
      this.failCbFns.push((reason) => {
        thenReason = rejectCb(reason);
        reject(thenReason);
      });
    });

    return thenPromise;
  }

}



new MyPromise((resolve, reject) => {
  resolve('Hello World!'); 
}).then((data) => {
  console.log(data);
  return 'Hello MyPromise'
}).then((data2) => {
  console.log(data2);
  return 'abcdefghijklmn'
}).then((data3) => {
  console.log(data3);
});
