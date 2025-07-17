// import { useState,useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// const Card = ({ title }) => {
//   const [hasLiked, setHasLiked] = useState(false);
//   const [count,setCount]=useState(0);

//   useEffect(()=>{
//     console.log(hasLiked)
//   },[hasLiked])
//   useEffect(()=>{

//   },[])
//   return (
//     <div className="card" onClick={()=>setCount(count+1)}>
//       <h2>{title} <br />{count}</h2>
//       <button onClick={() => setHasLiked(!hasLiked)}>
//         {hasLiked ? "Liked" : "Like"}
//       </button>
      
//     </div>
//   ) 
// }
// const App = () => {
//   return (
//     <div className='card-container' >
//       <Card title="This is a prop title 1 !" />
//       <Card title="This is a prop title 2 !" />
//       <Card title="This is a prop title 3 !" />
//     </div>
//   );
// };


// export default App

// import React from 'react'
// import UserList from './components/UserList'
// const App = () => {
//   return (
//     <div>
//       <UserList/>
//     </div>
//   );
// }

// export default App

// import React from 'react'

// const User=(props)=> {
//   return (
//     <div>
//       <h1>Name:{props.name}</h1>
//       <h2>Age:{props.age}</h2>
//     </div>
//   )
// }

// const App=()=>{
//   return <User name="Harshit Chandak" age={20}/>
// }

// export default App


// import React from 'react'

// const ValidPassoword=()=><h1>Valid Password</h1>
// const InvalidPassoword=()=><h1>Invalid Password</h1>

// const Password=({isValid})=>{
//   if (isValid) {
//     return <ValidPassoword/>
//   }
//   else{
//     return <InvalidPassoword />
//   }
// }
// function App() {
//   return (
//     <div> <Password isValid={false} /> </div>
//   )
// }

// import React from 'react'
// import Weather from './components/Weather'
// const App = () => {
//   return (
//    <Weather temperature={25}/>
//   )
// }

// export default App

// import React from 'react'
// import StyledCard from './components/StyledCard'
// const App = () => {
//   return (
//     <StyledCard/>
//   )
// }

// export default App


// import React from 'react'
// import ProfileCard from './components/ProfileCard'
// import Counter from './components/Counter'
// import TodoList from './components/TodoList'
// import { ShoppingList } from './components/shoppingList'
// import CopyInput from './components/CopyInput'
// import BasicEffect from './components/BasicEffect'
// import FetchDataEffect from './components/FetchDataEffect'

// const App = () => {
//   return (
//     // <ProfileCard/>  
//     // <Counter/>
//     // <TodoList/>
//     // <ShoppingList/>
//     // <CopyInput/>
//     // <BasicEffect/>
//     <FetchDataEffect/>
//   )
// }

// export default App

// import React from 'react'
// import { UserProvider } from './components/UserContext'
// import UserProfile from './components/UserProfile'

// const App = () => {
//   return (
//     <UserProvider>
//       <UserProfile/>
//     </UserProvider>
//   )
// }

// export default App

import React from 'react'
// import CountReducer from './components/CountReducer'
// import Counter from './components/Counter'
// import FocusInput from './components/FocusInput'
import Timer from './components/Timer'
const App = () => {
  return (
    <div>
      {/* /* <CountReducer/> */ }
      {/* <Counter/> */}
      {/* <FocusInput/> */}
      <Timer/>
    </div>
  )
}

export default App