
let target = {
  a: 1,
  b: {
    bb1: 'bb1',
    bb2: 'bb2'
  },
  c: [1,2]
}

function reactive(target, onSet, onGet) {
  const handler = {
    get(target, key, receiver) {
      onGet && onGet(target, key)
      if (typeof target[key] === 'object' && target[key] !== null) {
        return new Proxy(target[key], handler)
      }
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      onSet && onSet(target, key, value)
      return Reflect.set(target, key, value, receiver)
    }
  }
  return new Proxy(target, handler)
}

function onSet(target, key, value) {
  console.log(`设置${target}属性${key}为${value}`)
}
function onGet(target, key) {
  console.log(`获取${target}属性${key}`)
}

let p = reactive(target, onSet, onGet)
p.a
p.a = 3
p.b.bb = 2
p.c.push(3)