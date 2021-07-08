import React, { useContext } from "react";
import { appContext } from "../AppState";
import styles from './Robot.module.css'
import { useAddToCart } from './AddToCart'

interface RobotProps {
  id: number,
  name: string,
  email: string,
  // addToCart: (id: number, name: string) => void
}

const RobotDiscount: React.FC<RobotProps> = ({ id, name, email }) => {
  const value = useContext(appContext)
  const addToCart = useAddToCart()
  // const setState = useContext(appSetStateContext)
  // return (
  //   <appContext.Consumer>
  //     {(value) => {
  //       return <li className={styles.cardContainer}>
  //         <img src={`https://robohash.org/${id}`} alt="" />
  //         <h2>{name}</h2>
  //         <p>{email}</p>
  //         <span>author: {value.username}</span>
  //       </li>
  //     }}
  //   </appContext.Consumer>
  // )
  return (
    <li className={styles.cardContainer}>
      <img src={`https://robohash.org/${id}`} alt="" />
      <h2>discount product</h2>
      <h2>{name}</h2>
      <p>{email}</p>
      <span>author: {value.username}</span>
      <button onClick={() => addToCart(id, name)}>add to cart</button>
    </li>
  )
}

export default RobotDiscount