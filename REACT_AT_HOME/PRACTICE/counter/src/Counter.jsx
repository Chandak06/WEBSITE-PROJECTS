import React, { useState } from 'react'


const Counter = () => {
    const [count,setCount]=useState(0);
    
    const handleIncrement=()=>setCount(count+1);
    const handleDecrement=()=>setCount(count-1);
  return (
    <div>
        <div className='container'>
            <h1 className="number text-8xl">{count}</h1>
        </div>
        <div className="btns-container w-[40rem] flex justify-around mt-20 " >
            <button className="increment cursor-pointer  font-semibold" value={count} onClick={handleIncrement}>Increment</button>
            <button className="decrement cursor-pointer font-semibold" value={count} onClick={handleDecrement}>Decrement</button>
        </div>
    </div>
  )
}

export default Counter