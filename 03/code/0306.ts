
namespace d0306_01 {
    function solution(array, num) {
        array.sort((a, b) => a - b)
        for (let i = array.length - 1, cnt = 0; i >= 0; i--) {
            cnt += array[i]
            if (num < cnt) {
                return (array.length - i)
            }
        }
        return array.length
    }
    
    // Test case
    console.assert(solution([], 3) === 0, 'case1')
    console.assert(solution([3], 3) === 1, 'case2')
    console.assert(solution([1, 4], 5) === 2, 'case3')
    console.assert(solution([2, 3, 4, 7], 5) === 1, 'case4')
    console.assert(solution([2, 3, 4, 7], 8) === 2, 'case5')

    // 无序数组
    // f[i][j] 第i位到第j位的和
    // f[i][j] = f[i - 1][j] + array[i] | f[i][j - 1] + array[j]
    function s2(array, num) {
        let f = []
        let ans = array.length
        for (let i = 0; i < array.length; i++) {
            if (num < array[i]) {
                return 1
            }
            f[i] = []
            f[i][i] = array[i]
        }
        for (let i = 0; i < array.length; i++) {
            for (let j = i + 1; j < array.length; j++) {
                f[i][j] = f[i][j - 1] + array[j]
                if (num < f[i][j]) {
                    ans = Math.min(ans, j - i + 1)
                }
            }
        }
        return ans
    }

    console.assert(s2([], 3) === 0, 'case1')
    console.assert(s2([1, 3, 4], 2) === 1, 'case2')
    console.assert(s2([1, 3, 5, 2], 6) === 2, 'case3')
    console.assert(s2([1, 5, 7, 3, 2], 14) === 3, 'case4')
    console.assert(s2([7, 6, 5, 3, 1], 14) === 3, 'case5')
    console.assert(s2([1, 3, 5, 7, 11], 16) === 2, 'case6')
}

namespace d0306_02 {
    function solution(array, num) {
        if (!array || array.length === 0) {
            return 0
        }
        let start = 0
        let end = array.length - 1
        while (start + 1 < end) {
            let mid = Math.floor((start + end) / 2)
            if (array[mid] === num) {
                end = mid
            }
            else if (array[mid] < num) {
                start = mid
            }
            else {
                end = mid
            }
        }
        if (array[end] < num) {
            return end + 1
        }
        return start + 1
    }

    // Test Case
    console.assert(solution([], 3) === 0, 'case1')
    console.assert(solution([1, 1], 2) === 2, 'case2')
    console.assert(solution([2, 3], 3) === 1, 'case3')
    console.assert(solution([1, 2, 3, 4], 2) === 1, 'case4')
}