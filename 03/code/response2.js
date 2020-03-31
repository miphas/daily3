

let target = {
  a: 1,
  b: {
    bb1: 'bb1',
    bb2: 'bb2'
  },
  c: [1,2]
}

const proxyArrayPrototype = Object.create(Array.prototype)
const proxyArrayMethods = ['push', 'shift']
proxyArrayMethods.forEach(method => {
  proxyArrayPrototype[method] = function() {
    Array.prototype[method].apply(this, arguments)
    console.log('arrayChanged')
  }
})


function reactive(target) {
  if (typeof target !== 'object' || target == null) {
    return target
  }
  if (Array.isArray(target)) {
    target.__proto__ = proxyArrayPrototype
  }
  for (let key in target) {
    bindReactive(target, key, target[key])
  }
  return target
}

function bindReactive(target, key, value) {
  reactive(value)
  Object.defineProperty(target, key, {
    get() {
      console.log('get key', key, 'value is', value)
      return value
    },
    set(newValue) {
      if (newValue === value) {
        return console.log('skip set value is same')
      }
      newValue = reactive(newValue)
      value = newValue
      console.log('set key', key)
    }
  })
}
