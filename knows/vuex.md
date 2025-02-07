
### VueX如何实现的$store注入到每一个子组件？

注意到使用 Vuex 之前需要使用 [Vue.use](https://cn.vuejs.org/v2/api/#Vue-use) 安装插件
然后通过new Vue的方式将Store传入

vuex中源码如下  

``` javascript
// 2.0 only

if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })


function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
```


### 如何实现一个简单的vuex

**充分利用Vue实例的特性:**  
- data => state
- getter => computed
- mutation => 在commit时调用
- 全局的$store实例 => 插件功能

``` javascript

let Vue;
function install (_Vue) {
  Vue = _Vue;
  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
  Vue.mixin({ beforeCreate: vuexInit });
}

const Store = function Store (options = {}) {
  const {state = {}, mutations={}, getters={}} = options
  const computed = {}
  const store = this
  store.getters = {};
  for (let [key, fn] of Object.entries(getters)) {
    computed[key] = function () { return fn(store.state, store.getters); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
    });
  }
  this._vm = new Vue({
    data: {
      $$state: state
    },
    computed,
  })
  this._mutations = mutations
}
Store.prototype.commit = function(type, payload){
  if(this._mutations[type]) {
    this._mutations[type](this.state, payload)
  }
}
Object.defineProperties(Store.prototype, { 
  state: { 
    get: function(){
      return this._vm._data.$$state
    } 
  }
});
export default {Store, install}
```



### vue 中同异步提交变更

``` javascript

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment() {
      this.store.count++
    }
  },
  actions: {
    setTimeout(() => 
      this.commit('increment') // 避免直接操作 state
    },0)
  },
  
})
```