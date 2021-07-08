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