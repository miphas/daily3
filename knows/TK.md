
### 1.一个 tcp 连接能发几个 http 请求？
- 1.0
- 1.1
- 2.0

### 2.Virtual Dom 的优势在哪里？  
- 不会直接触发渲染，更新虚拟 dom 不会挂起 js 进程，触发渲染
- 多次修改合并，减少修改次数
- 有效降低大面积 DOM 的排版与重绘，根据 diff 算法，只修改部分节点，达到局部渲染目的
- 方便实现跨端渲染

### 3.commonJs 和 es6 中模块引入的区别？
- 规范角度，commonJs 源自 Node, es6 module 源自 es6 规范
- commonJs运行时加载，esModule 编译时输出接口
- 引入 值 和 引用
- 静态语法 动态语法
- commonJs this 指向模块 es6 指向 undefined

### 4.cookie token 和 session 的区别？
SameSite属性  
- Strict 仅允许一方请求携带 Cookie，即浏览器将只发送相同站点请求的 Cookie，即当前网页 URL 与请求目标 URL 完全一致。
- Lax 允许部分第三方请求携带 Cookie (从第三方站点的链接打开和从第三方站点提交 Get 方式的表单这两种方式都会携带 Cookie。但如果在第三方站点中使用 Post 方法，或者通过 img、iframe 等标签加载的 URL，这些场景都不会携带 Cookie)
- None 无论是否跨站都会发送 Cookie

### 5.如何选择图片格式，例如 png, webp?  
- jpg
- png
- gif
- webp
- svg


### 6.首屏和白屏时间如何计算？
- 渲染方式不同 native web
- 小程序双线程设计 主渲染进程（加载并渲染主逻辑）Service Worker进程（执行index.worker.js）并执行里面的内容


### 7.如何判断 0.1 + 0.2 与 0.3 相等？  
- 底层实现
- 解决方案


### 8.了解v8引擎吗，一段js代码如何执行的？


### 9. 性能优化能从哪些方面入手?
- 文件大小入手
1. JS 文件大小（- 去掉用不到的逻辑，- 加载当前页面需要的JS，其他的实现懒加载）
2. 图片文件大小（- 压缩图片大小，-支持webp使用webp）
3. 其他文件大小，尽量缩减，首屏用不到的后续加载
- 从减少请求数入手
1. 减少页面发送数据请求（- 考虑多个请求合并，-首屏不需要的数据后续加载）
2. 减少页面内资源的请求（- 小图片使用base64，-图标使用icon-font、svg）
- 从浏览器渲染机制入手
1. CSS 放在 head 的 link 标签中，提前下载且下载时不耽误解析 DOM，尽快生成CSSOM
2. script 放在 body 尾部，不耽误解析 dom 节点，使用 defer 实现同时下载多个
3. 减少 CSS、script 大小，减少渲染时间
- 从浏览器缓存机制入手
1. 给 JS 等资源设置强缓存，时间设置较长（文件名是 hash 值）


### 10. TCP/IP 协议层

https://juejin.im/post/598ba1d06fb9a03c4d6464ab#heading-23


### 11. Babel Parse AST 过程
通过@babel/parse (babylon) 实现解析，分为两个步骤：  
- 词法分析，将文本解析为 tokens(令牌) 流，令牌类似 AST 节点
- 语法分析，将 tokens 流转化为 AST 表述结构


