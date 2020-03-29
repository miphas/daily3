
https://github.com/supnate/react-geek-time

### 为什么需要路由

1. 单页应用需要进行页面切换
2. 通过 URL 可以定位到页面
3. 更有语义的组织资源


### React Router

``` javascript
<Router>
  <div>
    <ul id="menu">
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/hello">Hello</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>

    <div id="page-container">
      <Route path="/home" component={Home}/>
      <Route path="/hello" component={Hello}/>
      <Route path="/about" component={About}>
    </div>
  </div>
</Router>
```

### 类型

1. BrowserRouter 浏览器路由（history模式）
2. HashRouter 通过Hash实现
3. MemoryRoute Route在内存而非反映在 URL (考虑SSR情况)


### 基本用法

1. 普通链接  
普通链接，但不会触发浏览器刷新
<Link to="/about">About</Link>

2. NavLink
类似Link，但是会增加选中状态
<NavLink to="/faq" activeClassName="Selected">FAQs</NavLink>

3. Prompt 满足条件时提示用户是否要离开当前页面
<Prompt when={fromIsHalfFilledOut} message="Are you sure to leave?" />

4. Redirect 重定向当前页面，例如登录判断
<Route exact path="/" render={() => (
  LoggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}

5. Route 路径匹配时显示对应组件（路径匹配并不排他，匹配两个则显示两个）
<Route exact path="/" component={Home}>
<Route path="/news" component={NewsFeed}>

6. Switch 改变上述多匹配行为
<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>


### router

链接带参数可以通过 { match } 来拿到

``` jsx
const Topic = ({match}) => {
  <h1>Topic {match.params.id}</h1>
}

<Route path="/topic/:id" component={Topic} />
```

### 嵌套子路由

必须有父级路由的相同link


### 配合 react-loadable

配合 react-loadable 实现动态加载

``` javascript
const RedditPage = loadable({
  loader: () => import('./RedditPage'),
  loading: () => <div>loading...</div>
})
```