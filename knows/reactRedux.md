

### Redux 特性

- 单一数据源 Single of Truth
- 可预测性 state + action = new state
- 纯函数更新 store


### Store Action Reducer

Store (const store = createStore(reducer))
- getState()
- dispatch(action)
- subscribe(listener)

Action  
``` javascript
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

Reducer  
``` js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    default:
      return state
  }
}
```

Redux 数据流向

Action      =>      Store
  |                   |
  |                 Dispatcher
  |                   |
  |                  Reducer
  |                   |
View      <=       state


- combineReducers  
多个 Reducer 通过 combineReducers 来封装  
- bindActionCreators  
action + dispatch (接受产生action的函数以及dispatch函数[storeA.dispatch])


### React 中使用 Redux

通过 HOC 的方式将 props 与 Store|Actions 绑定

                       <-  store       <-
connect <- props传入                   reducers
                       <-  Actions       |


``` jsx
import { bindActionCreators, createStore } from "redux";
import { Provider, connect } from "react-redux";

const initialState = { count: 0 };

function counter(state = init, action) {
  switch (action.type) {
    case "PLUS_ONE":
      return { count: state.count + 1 };
    case "MINUS_ONE":
      return { count: state.count - 1 };
    default:
      break;
  }
  return state;
}

const store = createStore(counter);

function plusOne() {
  return { type: "PLUS_ONE" };
}
function minusOne() {
  return { type: "MINUS_ONE" };
}

class MyCount extends React.Component {
  render() {
    const { count, plusOne, minusOne } = this.props;
    return (
      <div className="counter">
        <button onClick={minusOne}>-</button>
        <span>{count}</span>
        <button onClick={plusOne}>+</button>
      </div>
    ) 
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({plusOne, minusOne}, dispatch)
}

const connectedCount = connect(mapStateToProps, mapDispatchToProps)(MyCount)

export default class Sample extends Rect.Component {
  render() {
    return (
      <Provider store={store}>
       <connectedCount />
      </Provider>
    )
  }
}
```


### 异步 Action

Action 过程不变 -> 在 dispatch 阶段使用 middlewares 进行拦截
根据 API 返回的不同结果再调用不同的action 

1. 异步action 不是特殊 action，而是同步 action 的组合使用
2. 中间件在 dispatcher 中结果 action 做特殊处理

``` javascript
function asyncAction(args = {}) {
  return dispatch => {
    dispatch({type: "Req_Send"});

    let promise = new Promise(function(resolve, reject) {
      ...
      request.then[
        res => {
          dispatch({ type: "Req_Succ", data: res.data });
          resolve(res)
        }
      ]
    }) 
    }) 

    return promise
  }
}

```


### 不可变数据（Redux基础 - immer）

旧的状态值不能进行修改，需要复制一份到新的状态下

1. 性能优化（判断是否刷新直接进行 引用 的比较而不用深层比较值）
2. 易于调试和跟踪（方便看旧的状态和新的状态）
3. 易于推测