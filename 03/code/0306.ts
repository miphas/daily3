
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