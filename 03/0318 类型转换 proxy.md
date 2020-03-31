
### [] == ![] 结果

由于 ! 优先级高于 ==, ![] 得到的结果为 false

尝试将左边转为基础类型：
- 1. 调用valueOf，得到仍为对象
- 2. 调用toString，得到 ""
- 3. 根据规则仅一方为 boolean 转 number  "" => 0

得到 0 == 0 返回 true

x == y 规则：
- 1. x y 类型相同 => x === y
- 2. null == undefined => true
- 3. string number => 转number
- 4. booelan 其他类型 => 转number
- 5. object 转基本类型


### 什么是闭包

函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包


### 原型注意

Function 的 prototype 和 __proto__ 都指向 Function 的原型对象（prototype）

构造函数通过 prototype 指向原型对象  
原型对象通过 constructor 指向构造函数

实例通过 __proto__ 指向原型对象


### 变量提升 && 暂时性死区

提升：  
- 函数提升会把函数移到作用域顶部
- 变量只会把声明移动到顶部（函数优先级 > 变量，同名情况下）

var|let|const
- var 提升可以在声明前使用，let|const 提升，但是在编译环节被告知可以在块中使用，但是访问受限制
- 全局 var 会挂载 window 上，其他两者不会
- let const 用法类似，后者赋值后不能更改


### 原型如何实现继承、Class 本质是什么

Class 本质就是函数

``` javascript
// 组合继承
function Parent(val) {
  console.log('constructor parent call')
  this.val = val;
}
Parent.prototype.getValue = function() {
  return this.val;
}
function Child(val) {
  Parent.call(this, val)
}
Child.prototype = new Parent();

const child = new Child(2);
child.getValue();
```

``` javascript
// 寄生组合继承 少一次构造函数调用
function Parent(val) {
  console.log('constructor parent call')
  this.val = val;
}
Parent.prototype.getValue = function() {
  return this.val;
}
function Child(val) {
  Parent.call(this, val)
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const child = new Child(2);
child.getValue();
```


### 模块化

好处：  
- 减少命名冲突
- 提高复用性
- 提高代码可维护性

AMD CMD 使用很少
``` javascript
// AMD
define(['./a', './b'], function(a, b) {
  // 加载模块完毕可以使用
  a.do()
  b.do()
})
// CMD
define(function(require, exports, module) {
  // 加载模块
  // 可以把 require 写在函数体的任意地方实现延迟加载
  var a = require('./a')
  a.doSomething()
})
```

CommonJS Module  

- CommonJS 是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
- CommonJS 在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是 ES Module 采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化



### Proxy

``` javascript
function proxyObj(obj, getListen, setListen) {
  const handler = {
    get(target, property, receiver) {
      getListen(target, property)
      if (typeof target[property] === 'object' && target[property] !== null) {
        return new Proxy(target[property], handler)
      } else {
        return Reflect.get(target, property, receiver);
      }
      
    },
    set(target, property, value, receiver) {
      setListen(target, property, value)
      return Reflect.set(target, property, value, receiver);
    }
  }
  return new Proxy(obj, handler)
}

let obj = { a: 1, b: { bb: 'bb'} }
let p = proxyObj(
  obj,
  (target, property) => {
    console.log(`读取${target}属性${property}`)
  },
  (target, property, value) => {
    console.log(`设置${target}属性${property}=${value}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2
```

### 并发 (concurrency) && 并行 (parallelism)

- 并发是宏观概念，两个任务 AB 通过一段时间内切换完成两个任务
- 并行是微观概念，CPU 两个核，同时完成 AB 两个任务


### 回调函数的问题

回调地狱：  
- 1. 嵌套存在耦合性，牵一发而动全身
- 2. 一层嵌套一层，难以处理错误


### promise

三种状态：  
- pending
- resolved
- rejected

状态一旦变更，无法修改

Promise 的 then 方法返回依然是 promise 对象，实现了链式调用
then 中使用 return 会被包装成 Promise.resolve

### await async

优点  
- 优雅解决回调地狱问题

缺点
- 同步代码的异步改造，可能造成多个没有依赖性的异步降低速速

``` javascript
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch(url)
  await fetch(url1)
  await fetch(url2)
}
```


