
function useState(initState) {
  let state = initState
  let setState = function(newState) {
    state = newState
  }
  return [state, setState]
}

var [num, setNumber] = useState(0);
setNumber(10)
console.log('direct', num)

var [num, setNumber] = useState(0)
console.log('after', num)