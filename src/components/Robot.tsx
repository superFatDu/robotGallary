import React, { useContext } from "react";
import { appContext } from "../AppState";
import styles from './Robot.module.css'
import { withAddToCart } from './AddToCart'

export interface RobotProps {
  id: number,
  name: string,
  email: string,
  addToCart: (id: number, name: string) => void
}

const Robot: React.FC<RobotProps> = ({ id, name, email, addToCart }) => {
  const value = useContext(appContext)
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
      <h2>{name}</h2>
      <p>{email}</p>
      <span>author: {value.username}</span>
      <button onClick={() => addToCart(id, name)}>add to cart</button>
    </li>
  )
}

export default withAddToCart(Robot)