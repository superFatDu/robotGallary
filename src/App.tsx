import React, { useContext, useEffect, useState } from 'react';
import logo from './assets/images/logo.svg';
// import './App.css';
import styles from './App.module.css'
// import robots from './mockdata/robots.json'
import Robot from './components/Robot'
import RobotDiscount from './components/RobotDiscount'
import ShoppingCart from './components/ShoppingCart';
import { appContext } from './AppState';
// 方式1
// function App() {
// return (
//   <div className={styles.app}>
//     <div className={styles.appHeader}>
//       <img src={logo} alt="" className={styles.appLogo} />
//       <h1>Robots</h1>
//     </div>
//     <ShoppingCart />
//     <ul className={styles.robotList}>
//       {robots.map(r => <Robot id={r.id} name={r.name} email={r.email} />)}
//     </ul>
//   </div>
// );
// }

// export default App;


// 方式2
// interface Props { }

// interface State {
//   robotGallary: any[]
// }
// class App extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props)
//     this.state = {
//       robotGallary: []
//     }
//   }
//   componentDidMount() {
// fetch("https://jsonplaceholder.typicode.com/users")
//   .then(res => res.json())
//   .then(data => this.setState({ robotGallary: data }))
//   }
//   render() {
// return (
//   <div className={styles.app}>
//     <div className={styles.appHeader}>
//       <img src={logo} alt="" className={styles.appLogo} />
//       <h1>Robots</h1>
//     </div>
//     <ShoppingCart />
//     <ul className={styles.robotList}>
//       {this.state.robotGallary.map(r => <Robot id={r.id} name={r.name} email={r.email} />)}
//     </ul>
//   </div>
// );
//   }
// }

// export default App


// 方式3
// interface Props {
//   username: string
// }
const App: React.FC = (props) => {
  const [count, setCount] = useState<number>(0)
  const [robotGallary, setRobotGallary] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const value = useContext(appContext)
  useEffect(() => {
    document.title = `You clicked ${count} times`
  }, [count])
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then(res => res.json())
    //   .then(data => setRobotGallary(data))
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await res.json()
        setRobotGallary(data)
        setIsLoading(false)
      } catch (e) {
        console.log(e)
        setError(e.message)
      }
    }
    fetchData()
  }, [])
  return (
    // <appContext.Consumer>
    //   {(value) => {
    //     return <div className={styles.app}>
    //       <div className={styles.appHeader}>
    //         <img src={logo} alt="" className={styles.appLogo} />
    //         <h1>Robots</h1>
    //       </div>
    //       <button onClick={() => setCount(count + 1)}>click me</button>
    //       <span>{count}</span>
    //       <ShoppingCart />
    //       {/* <span>username: {props.username}</span> */}
    //       <span>username: {value.username}</span>
    //       {(!error || error !== '') && <div>error: {error}</div>}
    //       {
    //         isLoading ?
    //           <span>loading</span> :
    //           <ul className={styles.robotList}>
    //             {robotGallary.map((r: any) => <Robot id={r.id} name={r.name} email={r.email} />)}
    //           </ul>
    //       }
    //     </div>
    //   }}
    // </appContext.Consumer>
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} alt="" className={styles.appLogo} />
        <h1>Robots</h1>
      </div>
      <button onClick={() => setCount(count + 1)}>click me</button>
      <span>{count}</span>
      <ShoppingCart />
      {/* <span>username: {props.username}</span> */}
      <span>author: {value.username}</span>
      {(!error || error !== '') && <div>error: {error}</div>}
      {
        isLoading ?
          <span>loading</span> :
          <ul className={styles.robotList}>
            {robotGallary.map((r: any, i: number) => (
              i % 2 === 0 ?
                <RobotDiscount key={r.id + Math.random()} id={r.id} name={r.name} email={r.email} /> :
                <Robot key={r.id + Math.random()} id={r.id} name={r.name} email={r.email} />
            ))}
          </ul>
      }
    </div>
  );
}

export default App