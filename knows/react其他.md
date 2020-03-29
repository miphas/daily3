
### fragments

有时候需要一个父元素，返回 React 元素，但是 DOM 添加额外的节点就很烦人

``` javascript
 // Without Fragments   
return (
    <div>
       <CompoentA />
       <CompoentB />
       <CompoentC />
    </div>
)

// With Fragments   
return (
  <React.Fragment>
      <CompoentA />
      <CompoentB />
      <CompoentC />
  </React.Fragment>
)
```

### Portals

子组件渲染到父组件以外地方的传送门


### 