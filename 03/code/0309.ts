
namespace d0309_01 {
  function solution() {
    let arr = new Array(5)
    let getRandNum = () => {
      return Math.floor(Math.random() * 31 + 2)
    }
    let idx = 0
    let getAns = function() {
      let num = getRandNum()
      if (arr.indexOf(num) === -1) {
        arr[idx++] = num
      }
      if (arr.length === idx) {
        return arr
      } else {
        return getAns()
      }
    }
    return getAns()
  }

  console.log(solution())
}