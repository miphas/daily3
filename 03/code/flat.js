

function flat(arr) {
    let ans = []
    const flatHelp = (arr) => {
        for (let item of arr) {
            if (Array.isArray(item)) {
                flatHelp(item)
            } else {
                ans.push(item)
            }
        }
    }
    flatHelp(arr)
    return ans
}

function compareArray(arrA, arrB) {
    if (arrA.length !== arrB.length) {
        return false
    }
    for (let i = 0; i < arrA.length; i++) {
        if (arrA[i] !== arrB[i]) {
            return false
        }
    }
    return true
}

console.assert(compareArray(flat([]), []), 'case1') 
console.assert(compareArray(flat([1,2]), [1,2]), 'case2') 
console.assert(compareArray(flat([[1],2]), [1,2]), 'case3') 
console.assert(compareArray(flat([[],2]), [2]), 'case4') 
console.assert(compareArray(flat([[1,[2,3]],4]), [1,2,3,4]), 'case5') 