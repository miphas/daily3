
[前端模块化](https://juejin.im/post/5aaa37c8f265da23945f365c)

### commonJS

NodeJS 的模块化规范：  
同步加载  
- module.export 导出  
- require 引入  


### amd

RequireJS 代表的规范：  
异步加载  
- define(function(){}) 定义模块   
- require(["a", "b"], function(a, b)) 来引入模块  

PS. require.config 用来指定引用名和路径

### cmd

SeaJS 代表的规范：

异步加载，与 amd 类似，区别在于   
- amd 推崇依赖前置，提前执行  
- cmd 推崇依赖就近，延迟执行  

``` javascript
/** AMD写法 **/
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
     // 等于在最前面声明并初始化了要用到的所有模块
    a.doSomething();
    if (false) {
        // 即便没用到某个模块 b，但 b 还是提前执行了
        b.doSomething()
    } 
});

/** CMD写法 **/
define(function(require, exports, module) {
    var a = require('./a'); //在需要时申明
    a.doSomething();
    if (false) {
        var b = require('./b');
        b.doSomething();
    }
});

/** sea.js **/
// 定义模块 math.js
define(function(require, exports, module) {
    var $ = require('jquery.js');
    var add = function(a,b){
        return a+b;
    }
    exports.add = add;
});
// 加载模块
seajs.use(['math.js'], function(math){
    var sum = math.add(1+2);
});

```


### ES6 Module

- 导出 export
- 导入 import


### CommonJS 与 ES6 module 区别

- 1. CommonJS 输出值的拷贝，ES6 Module 输出值的引用
- 2. CommonJS 运行时记载，ES6 Module 编译时输出接口


### 关于 script 加载模块

- module 形式需要使用 <script type="module"></script>
- 不加 type 等其他标记的 script 下载时阻断文档解析 (似乎高版本浏览器没有)
- defer 和 async 可以让脚本异步下载，区别在于

1. defer 下载完依照文档中顺序执行，不会中断渲染
2. async 下载完后立即执行，顺序可能与文档中不一致，会中断渲染