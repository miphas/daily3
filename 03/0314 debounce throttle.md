
防抖 和 节流

[函数式组件实现防抖和节流](https://juejin.im/post/5ce3e400f265da1bab298359)

### debounce

``` javascript
function debounce(fn, delay = 500) {
    let timer = null
    return function() {
        if (timer !== null) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(fn, delay)
    }
}

// eg.
function handle() {
    consolelog(Math.random())
}
window.addEventListener('scroll', debounce(handle))
```


### throttle

``` javascript
function throttle(fn, delay = 500) {
    let preTime = Date.now()
    return function() {
        let nowTime = Date.now()
        if (nowTime - preTime > delay) {
            fn()
            preTime = Date.now()
        }
    }
}

// eg.
function handle() {
    console.log(Math.random())
}
window.addEventListener('scroll', throttle(handle))
```


