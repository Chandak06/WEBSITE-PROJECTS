// import React, { useState } from 'react'

// const Counter = () => {
//     const [count,setCount]=useState(0);
//   return (
//     <div>
//         <h1>{count}</h1>
//     <button onClick={()=>setCount(count+1)}>Increment</button>
//     </div>
//   )
// }

// export default Counter


import React, { useReducer, useState } from 'react'
import { counterReducer, initialState } from './CountReducer'

const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState)
  const [inputValue, setInputValue] = useState(0);

  const handleIncrement = () => dispatch({ type: "increment" })
  const handleDecrement = () => dispatch({ type: "decrement" })

  const handleIncrementByAmount = () => {
    dispatch({ type: "incrementByAmount", payload: +inputValue })
    setInputValue(0);
  }
  const handleDecrementByAmount = () => {
    dispatch({ type: "decrementByAmount", payload: +inputValue })
    setInputValue(0);
  }
  return (
    <div>
      <h2>Count:{state.count}</h2>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>

      <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <button onClick={handleIncrementByAmount}>Add</button>
      <button onClick={handleDecrementByAmount}>Subtract</button>
    </div>
  )
}

export default Counter