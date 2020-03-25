
### MVVM

MVC 问题  
控制器责任太大了：  
- 视图从模型中取数据去渲染
- 当有用户输入时，通过控制器更新模型，并通知视图进行更新

MVVM  
要点取决于 VM 的抽象，类似于 Vue 的组件实例，View 是模板，Model 在 Vuex 引入下完全和组件分离


### 虚拟 dom

1. Virtual dom 是什么

通过 JS 对象来模拟 DOM 的一种形式

2. Virtual 优势在哪里

- 从渲染性能角度考虑
  1. 直接修改真实 DOM 会进行渲染挂起 JS 进程，频繁操作会影响执行性能，通过修改虚拟 DOM 方式不会
  2. 虚拟 DOM 可以汇总一段时间内的修改，并统一进行真实 DOM 的变更
  3. 虚拟 DOM 可以跟之前的虚拟 DOM 做对比，仅进行局部更新
- 从跨平台角度考虑
  1. 虚拟 DOM 通过中间层，可以实现跨平台渲染，比如在浏览器输出真实 DOM，在服务端输出 HTML


### 路由原理

前端路由实现起来其实很简单，本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新页面。目前前端使用的路由就只有两种实现方式

1. Hash 模式
2. History 模式

``` javascript
// hash 模式，通过 hashchange 事件监听 URL 变化
window.addEventListener('hashchange', () => {
  // ... 具体逻辑
})

// history 模式，通过监听 popstate 来实现事件监听
// 新增历史记录
history.pushState(stateObject, title, URL)
// 替换当前历史记录
history.replaceState(stateObject, title, URL)
window.addEventListener('popstate', e => {
  // e.state 就是 pushState(stateObject) 中的 stateObject
  console.log(e.state)
})
```

模式对比
- hash 使用简单，兼容性好  
  1. 使用 hash 不能支持内面内跳转  
  2. 不支持浏览器 前进/后退
  3. 仅支持修改页面 # 后的内容，路径无法修改
- history H5特性，支持前进后退，页面内可以 hash 跳转  
  1. 需要后端配合，多个 URL 指向一个 index.html

