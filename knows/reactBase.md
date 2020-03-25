
### React 组件生命周期

#### 首次渲染
constructor => getDerivedStateFromProps => render => componentDidMount

- constructor 初始化内部状态，唯一可以直接修改 state 的地方
- getDerivedStateFromProps 从传入props获取值，每次render都会调用，不推荐使用，一般用于 input 默认值场景
- render之后会更新 dom 和 refs，componentDidMount 可以拿到真实节点信息，可以 dom 操作（UI 渲染完成后调用，只执行一次，典型场景：获取外部资源）

#### 中间刷新
getDerivedStateFromProps => shouldComponentUpdate => render => getSnapshotBeforeUpdate => componentDidUpdate

- shouldComponentUpdate 性能优化的点，可以选择是否更新组件，也可以通过 PureComponent 来实现简单的 state 和 props 对比
- getSnapshotBeforeUpdate 属于 preCommit 阶段，修改还没有直接映射到真实 dom 节点，此时可以做一些诸如计入弹幕滑动位置等问题（ render 之前调用 state 已更新，获取 render 之前 DOM 的状态）
- componentDidUpdate 可以使用 DOM，运行副作用，安排更新


#### 销毁阶段
componentWillUnmount

- 释放资源


### 高阶组件（HOC）

1. 解决 props 层层传递的问题，可以将外部资源获取 给组件使用

高阶组件作为参数，返回新的组件，此时组件数据来源包含：
- 高阶组件传递来的
- 父组件传递来的

https://zh-hans.reactjs.org/docs/higher-order-components.html


对应 vue

- mixins (组件混入，或者 mixin 全局混入)
- 使用 v-bind="$listner" v-on="$attrs"

[Vue实现HOC](http://hcysun.me/2018/01/05/%E6%8E%A2%E7%B4%A2Vue%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6/?from=timeline&isappinstalled=0&nsukey=ulcoyIdTEyC/FOnxHZldz4llVm5bwZnWirmI4Esr7F1YiayFi7JpdGL7KEZ9DvAJNSFdYoonL4jBVGhm5vJTT3uHhtZCpucjnGto71nf4L7oNu1r50pwTvKeqmKHqe3ATEE9ELSXKZPM3v%20auk33Wx0pVbIntvyIPPTZVpnenMNdH53UC/XQDTLbxiBpddebzpoYIjT5GjStTkQ20KxmdQ==)


### 函数作为子组件

父组件定义 children 作为 props
``` jsx
// 定义
<div>
{ this.props.value && this.props.children(this.props.value)}
</div>

// 使用
<Component>
  {(value) => (
    <span style={{display: 'inlineblock', background: value}}></span>
  )}
</Component>
```

- vue slot => 对应 {this.props.children}


### Context API 及其使用场景

解决组件之间通信的问题

``` jsx
const ThemeConext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      <ThemeConext.Provider value="dark">
        <ThemeButton/>
      </ThemeContext.Provider>
    )
  }
}

function ThemeButton(props) {
  return (
    <ThemeContext.Consumer>
    {theme => <Button {...props} theme={theme}/>}
    <ThemeContext.Consumer/>
  )
}
```


类似于 vue 的 provider 和 inject

- 设置数据 可以为静态，需要为动态时，vue可以使用this/this.data (有响应数据变化的)