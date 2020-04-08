
### typeof 原理

根据变量的 1-3 个位置的存储信息来判断存储类型
由于 Object 和 null 前三为都是 0，导致两者判断都是 object，实际是浏览器的 bug


### position 属性

- static
- relative
- absolute
- fixed
- sticky
- inherit

### react 生命周期 以及那个生命周期可以 setState

### img 标签间距问题

- inline-block 中间有空字符，占一个字符的大小

### dns 查询过程

- 递归查询  本机 -> 本地域名服务器 -> 其他域名服务器 -> 根域名服务器 -> 其他域名服务器 -> 本地域名服务器 -> 本机
- 迭代查询  本机 -> 本地域名服务器 -> 根域名服务器 -> 其他域名服务器 -> 本地域名服务器 -> 本机


### base64原理

使用 a-zA-Z+/组成，由于只有64位，所以 4 个字符（6字节）才能表示原来 3 个字符表示的内容（8位）
所以体积是之前的 4/3, 体积变大，不适合所有图片的场景


### 有一个应用会经常创建、删除节点对象，如何优化。（节点池）


### setState 同异步

### 有一个"123456789101112131415....n+1"类似这样的序列，求出第m位的数字

``` javascript
function solution(m) {
    let target = 1;
    let numCnt = 0;
    for (; numCnt < m; target++) {
        numCnt += String(target).length
    }
    target--;
    return Number(String(target).split('').reverse()[numCnt - m])
}

solution(1) === 1
solution(10) === 1
solution(11) === 0
solution(12) === 1
solution(13) === 1

let str = ''
for (let i = 1; i < 101; i++) {
    str += i
}

```

### 有一个有序递增序列，求有多少个不同的数字。比如 [1, 5, 7, 7, 8, 9, 9]。里面总共有5个不同的数字:1, 5, 7, 8, 9

``` javascript

function uniqueCnt(array) {
    if (!array || array.length === 0) {
        return 0
    }
    let ans = 1
    let lastVal = array[0]
    for (let i = 1; i < array.length; i++) {
        if (lastVal !== array[i]) {
            ans++
            lastVal = array[i]
        }
    }
    return ans
}

console.assert(uniqueCnt([]) === 0, 'case0')
console.assert(uniqueCnt([1]) === 1, 'case1')
console.assert(uniqueCnt([1,1]) === 1, 'case2')
console.assert(uniqueCnt([1,1,2]) === 2, 'case3')
console.assert(uniqueCnt([1, 5, 7, 7, 8, 9, 9]) === 5, 'case4')

```

### 实现一个方法，将传入对象的下划线命名方式全部换为驼峰式(考虑递归的场景)

``` javascript

function underline2Camel(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    for (let key in obj) {
        let newKey = key.replace(/_([a-z])/g, (s0, s1) => s1.toUpperCase())
        if (newKey !== key) {
            obj[newKey] = underline2Camel(obj[key])
            delete obj[key]
        }
    }
    return obj
}

console.assert(underline2Camel(null) === null, 'case0')
underline2Camel({a: 1})
underline2Camel({a_a: 2})
underline2Camel({a: 1, b_bb_c: { cd_d_d: 'we'}})

```