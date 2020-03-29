
### 1. 不用 + 实现两个数相加

``` javascript
function add(a, b) {
  if (a === 0) return b;
  if (b === 0) return a;
  let newA = a ^ b;
  let newB = a & b;
  return add(newA, newB << 1);
}
```

### 2. Color Sort  [2,0,2,1,1,0] 排序成 [0,0,1,1,2,2]

``` javascript
function colorSort(array) {
  let left = -1;
  let right = array.length;
  for (let i = 0; i < right; i++) {
    if (array[i] === 0) {
      swap(array, i, ++left);
    } else if (array[i] === 2) {
      swap(array, i--, --right);
    }
  }
}
```


### 3. 第 K 大元素位置