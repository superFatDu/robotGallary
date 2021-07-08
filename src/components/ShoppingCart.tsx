import React from "react";
import styles from "./ShoppingCart.module.css"
import { appContext } from '../AppState'

interface Props { }

interface State {
  isOpen: boolean
}

class ShoppingCart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false
    }
    // this.handleClick = this.handleClick.bind(this)
  }
  // handleClick(e: any) {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   })
  // }
  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if ((e.target as HTMLElement).nodeName === "BUTTON") {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }
  render() {
    return (
      <appContext.Consumer>
        {value => {
          return <div className={styles.cartContainer}>
            <button className={styles.button} onClick={this.handleClick}>购物车({value.shoppingCart.items.length}件)</button>
            <div className={styles.cartDropDown} style={{ display: this.state.isOpen ? "block" : "none" }}>
              <ul>
                {value.shoppingCart.items.map(r => (
                  <li key={r.id + Math.random()}>{r.name}</li>
                ))}
              </ul>
            </div>
          </div>
        }}
      </appContext.Consumer>
    )
  }
}

export default ShoppingCart