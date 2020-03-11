
### BFC

[学习BFC](https://juejin.im/post/59b73d5bf265da064618731d)

BFC - 块级格式上下文

什么是格式化模型：  
- 块盒（block box）
- 行内盒（inline box）
- 匿名盒（anonymous box）

三个定位方案：  
- 正常流（Normal flow）
- 浮动（Float）
- 绝对定位（Absolute Position）

块级上下文：  
用于决定**块级盒子内布局**以及**浮动的相互影响范围**

BFC创建方法：  
- 根元素或其他包含它的元素
- 浮动（float不为none的元素）
- 绝对定位元素（position: absolute | fixed）
- display: inline-block 元素
- display: table-cell 表格单元格
- overflow 不为 visible 元素
- display: flex 弹性盒元素

BFC影响范围：  
- BFC 内的子元素
- 但不包含自行创建了 BFC 的子元素

BFC特性：  
- 内部元素按照常规流排列
- 处于同一个 BFC 的元素相互影响，可能发生边距折叠
- BFC 元素计算高度时需要包含内部浮动元素的高度
- BFC 是一个独立的区域，内部元素不能影响到外部，反之亦然
- 浮动盒不能叠加到 BFC 上


### 边距折叠发生的情况

[边距折叠的 3 种情况](https://juejin.im/post/5965c46ef265da6c2518f5ec)

- 相邻元素（上下边距折叠，左右要么 float、要么 inline-block 都会触发 BFC、父子元素的左右也不折叠？）
- 父元素与子元素（比如二者都具有相同的 margin-top，margin-left 不折叠）
- 空元素 

``` html
// 空元素
<p style="margin-bottom: 0px;">这个段落的和下面段落的距离将为 20px</p>

<div style="margin-top: 20px; margin-bottom: 20px;"></div>

<p style="margin-top: 0px;">这个段落的和上面段落的距离将为 20px</p>
```

这样第一个 p 元素和第三个 p 元素之间距离为 20px


### computed 和 watch 

[computed 和 watch如何工作](https://juejin.im/post/5b87f13bf265da436479f3c1)

相同点：都可以监听/依赖一些数据的变化，并作出相应的处理  
不同点：

computed   
- 计算属性
- 主要用于同步的数据处理

watch   
- 侦听属性
- 主要观测某个值变化完成开销较大的复杂业务

使用场景：能使用 computed 时尽量使用 computed 避免多个数据影响情况下多次调用 watch 的问题

本质：  
本质上都是使用 Vue 的 Watcher 实现  
computed 用的 computed watcher 而 watch 是 user watcher (初始化 options 不一致)

深度 computed：
1. computed 会有一个标记 dirty   
- 初始化是 dirty = computed 即第一次要更新
- 后续 dirty === false 时直接返回缓存值

2. 相关属性变化时会触发 update，来计算 computed 新值  
- 新值变化或者 Object 时会触发通知 computed 的订阅者
