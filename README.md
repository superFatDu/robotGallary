# React&TS notes

## create a project

```bash
~ npx create-react-app my-app --template typescript
```

## class组件

```js
import React from 'react'
interface Props {}
interface State {
  count: string
}
class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  render() {
    return (
      <div>{this.state.count}</div>
    )
  }
}
```

## function组件

```js
import React, {useState, useEffect} from 'react'
export const App: React.FC = (props) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `You've clicked ${count} times.`
  }, [count])
  return (
    <div>{count}</div>
  )
}
```

## context

### 创建-Provider

```js
import React, {useState} from 'react'

interface AppDefalutVal {
  username: string,
  cart: { items: {id: number, name: string}[] }
}

const defaultVal: AppDefaultVal = {
  username: 'cheng5',
  cart: []
}
// 数据context
export const appContext = React.createContent(defaultVal)
// 方法context
export const appSetStateContext = React.createConrext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(undefined)

export const AppProvider: React.FC = (props) => {
  const [state, setState] = useState(defaultVal)
  return (
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>
        {props.children}
      </appSetStateContext.Provider>
    </appContext.Provider>
  )
}
```

### 外层组件

```js
import {AppProvider} from './AppProvider'

render(
  <AppProvider>
    <App />
  </AppProvider>  
)
```

### Consumer

```js
import {AppContext} from '../provider'

return (
  <AppContext.Consumer>
    {value => (
      <div>{value.username}</div>
    )}
  </AppContext.Consumer>
)
```

### useContext

```js
import {useContext} from 'react'
import {AppContext} from '../provider'

const value = useContext(AppContext)

return (
  <div>{value.username}</div>
)
```

## 高阶函数

> It returns a component whose argument is component, and it's name started with 'with'.

### 定义

```js
import React from 'react'
import {CartProps} from './Cart'

export const withApp = (ChildComponent: React.ComponentType<CartProps>) {
  return (props: any) {
    // logic
    const addCart = (id: number) => {
      // TODO
    }
    return <ChildComponent {...props} addCart={addCart} >
  }
}
```

### 使用

```js
import React from 'react'
import {withApp} from './withapp'

interface Cart {
  id: number,
  addCard: (id) => void
}

const Cart: React.FC = ({id, addCard}) {
  retutn (
    <button onClick={() => addCard(id)}>add</button>
  )
}

export default withApp(Cart)
```

## 自定义钩子

### 自定义钩子-定义

```js
import {appSetStateContext} from './provider'
export const useAddCart = () => {
  const setState = useContext(appSetStateContext)
  const addCart = (id: number, name: string) => {
    // TODO
  }
  return addCart
}
```

### 自定义钩子-使用

```js
import {useAddCart} from './useApp'

const addCart = useAddCart()
return (
  <div onClick={() => addCart(id)}></div>
)
```

## 备注

### AppState.tsx

```js
import React, { useState } from "react";

interface AppStateValue {
  username: string,
  shoppingCart: { items: { id: number, name: string }[] }
}

const defaultVal: AppStateValue = {
  username: "cheng5",
  shoppingCart: { items: [] }
}

export const appContext = React.createContext(defaultVal)
export const appSetStateContext = React.createContext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(undefined)

export const AppStateProvider: React.FC = (props) => {
  const [state, setState] = useState(defaultVal)
  return (
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>
        {props.children}
      </appSetStateContext.Provider>
    </appContext.Provider>
  )
}
```

### AddToCart.tsx

```js
import React from "react";
import { useContext } from "react";
import { appSetStateContext } from '../AppState'
import { RobotProps } from "./Robot";

export const withAddToCart = (ChildComponent: React.ComponentType<RobotProps>) => {
  return (props: any) => {
    const setState = useContext(appSetStateContext)
    const addToCart = (id: number, name: string) => {
      if (setState) {
        setState(state => {
          return {
            ...state,
            shoppingCart: {
              items: [...state.shoppingCart.items, { id, name }]
            }
          }
        })
      }
    }
    return <ChildComponent {...props} addToCart={addToCart} />
  }
}

export const useAddToCart = () => {
  const setState = useContext(appSetStateContext)
  const addToCart = (id: number, name: string) => {
    if (setState) {
      setState(state => {
        return {
          ...state,
          shoppingCart: {
            items: [...state.shoppingCart.items, { id, name }]
          }
        }
      })
    }
  }
  return addToCart
}
```
