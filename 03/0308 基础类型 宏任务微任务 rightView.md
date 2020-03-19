

### 1. JS 基础类型

- 基本类型 Boolean String Number
- 其他类型 Object Null Undefined
- ES6 Symbol

### 2. 如何进行 code review 的  
- 空格、引入但为使用、代码风格等问题借助 eslint 配置来进行检查
- 功能、执行是否正确借助 单元测试 && CI 来完成
- 其他接口设计、代码逻辑写法通过人工进行 code review

code review时
- 按照自顶向下的方法，先关注高层次问题，重新设计类的接口、分解复杂函数等等，在关注低层次问题
- 多写一些代码示例和常见问题的总结
- 说明真实存在的问题而非指责 && 真诚表扬写的好的地方


### 3. 是如何保证组件库的质量的
- 保证单元测试的覆盖率


### 4. 宏任务和微任务

[事件循环之宏任务/微任务](https://juejin.im/post/5b498d245188251b193d4059)

基本的两点知识：
- JS是单线程语言
- Event Loop是其执行机制

对于执行栈中的代码，会根据任务性质的同步或者异步来
- 同步任务 主线程执行
- 异步任务 进入 EventTable 并注册回调函数 -> 任务完成后回调放入 EventQueue  
同步任务执行完成后，检查 EventQueue 中是否有待调用的函数

关于宏任务和微任务
- 两种任务处在不同的任务队列之中
- 系统会优先调用微任务的回调（清空微任务的 EventLoop ），然后宏任务的回调

宏任务包含以下
- setTimeout
- setInterval
- 其他（ajax、鼠标键盘事件）

微任务包含以下
- Promise
- MutationObserver
- process.nextTick


### 5. Binary Tree Right Side View

Input: [1,2,3,null,5,null,4]
Output: [1, 3, 4]
Explanation:

   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---

https://leetcode.com/problems/binary-tree-right-side-view/submissions/

``` javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    if (!root) {
        return []
    }
    let ans = []
    let lastArr = [root]
    while (lastArr && lastArr.length) {
        ans.push(lastArr[lastArr.length - 1].val)
        let tmpArr = []
        lastArr.forEach(item => {
            item.left && tmpArr.push(item.left)
            item.right && tmpArr.push(item.right)
        })
        lastArr = tmpArr
    }
    return ans
};
```


补充 宏微任务 配合 async await

[issue](https://github.com/smileyby/notes/issues/40)

``` javascript
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
```

PS.
Node 的 nextTick 会优先于 micro 微任务队列执行