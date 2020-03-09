
### 1. link 标签作用

- 超链接类 
1. rel = canonical 多个链接指向同一个页面的情况，该标签标示主链接是哪个
2. rel = alternate 常见场景用于RSS订阅
3. rel = author、help、licence

- icon形式
1. 用于收藏夹下网页图表展示

- 预处理类link
1. dns-prefetch
2. preconnect
3. prefetch
4. preload
PS. 
preload 可以在对当前页面的脚本、样式等资源进行加载，而无需等到 link、script 解析时加载
prefetch 不是在页面加载时就加载，而是等到浏览器空闲的时间来做

- modulepreload
JS 模块可以不用等到使用时再加载

- stylesheet
加载样式表



### 2. link 和 @import 区别
- link 除了加载 CSS 可以做很多其他事情，@import 专属CSS范畴
- link 引入页面载入时同时加载，@import 在页面完全加载后加载
- link 支持 js 控制 dom 加载 CSS，@import 不支持


### 3. 圣杯 双飞翼

[Answer](https://github.com/haizlin/fe-interview/issues/2)

圣杯
- 三栏利用 float 和负 margin 并列
- 设置父元素 padding 来给两边腾位置

双飞翼
- 三栏利用 float 和负 margin 并列
- 利用 margin 给两列留出空间



### 4. http2/3 新特性

[http2/3](https://juejin.im/post/5d9abde7e51d4578110dc77f)

http/1.1 缺陷
- 1. 线头阻塞 (Head Of Line Blocking)  
每个 TCP 连接同时只能处理一个请求 - 响应，浏览器按 FIFO 原则处理请求，如果上一个响应没返回，后续请求 - 响应都会受阻
已有的一些解决方案：
浏览器一个域名允许建立 6-8 个连接 && 雪碧图 && webpack打包js文件

- 2. 无状态特性--带来的巨大HTTP头部  
内容多、重复性高、纯文本形式、不压缩

- 3. 明文传输--带来的不安全性

- 4. 不支持服务器消息推送

http/2  
- 1. 二进制传输  
HTTP/2 将请求和响应数据分割为更小的帧，并且它们采用二进制编码

- 2. HPACK 算法压缩头部  
维护一份相同的静态字典（Static Table），包含常见的头部名称，以及特别常见的头部名称与值的组合；2 代表 Method:get
维护一份相同的动态字典（Dynamic Table），可以动态地添加内容；
支持基于静态哈夫曼码表的哈夫曼编码（Huffman Coding）

相同的头部第二次可以省略

- 3. 多路复用
不再依赖TCP来实现多流并行，而是同域名下的所有通信都在单个连接上完成

- 4. Server Push

- 5. 许多浏览器厂商只支持加密的h2，即基于 TLS 的 https

http/3  

http/2 是基于 TCP 的
- TCP 三次握手 + TLS 也需要一个握手，延时仍然不低
- TCP 丢包会阻塞 TCP 上所有的请求

http/3 基于 UDP
- QUIC 来保证数据可靠、减少握手时间、集成 TLS 加密
- QUIC 一个物理连接上可以有多个独立的数据流


### 5. 简单算法题

这是一道大题目，把考点拆成了4个小项；需要侯选人用递归算法实现（限制15行代码以内实现；限制时间10分钟内完成）：
a) 生成一个长度为5的空数组arr。
b) 生成一个（2－32）之间的随机整数rand。
c) 把随机数rand插入到数组arr内，如果数组arr内已存在与rand相同的数字，则重新生成随机数rand并插入到arr内[需要使用递归实现，不能使用for/while等循环]
d) 最终输出一个长度为5，且内容不重复的数组arr

```
// d0309_01
```
