
### 执行栈

存储函数调用的栈结构


### call

// code / 0319x

``` javascript
Function.prototype.call = function() {
  const args = [...arguments]
  const context = args.shift()
  const fn = this
  context.__fn = fn
  const result = context.__fn(...args)
  delete context.__fn
  return result
}
function fa() {
  console.log(this.a, ...arguments)
}
fa.call({a: 10}, 'other1', 'other2')
```

### bind

// code / 0319x


### new

// code / 0319x

new 步骤：  
- 1.新生成了一个对象
- 2.链接到原型
- 3.绑定 this
- 4.返回新对象

实现注意：  
- 绑定 this 并执行构造函数
- 确保返回值为对象


### instanceOf

// code / 0319x