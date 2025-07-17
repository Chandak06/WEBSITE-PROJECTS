import React, { useRef } from 'react'

const FocusInput = () => {
    const inputElement=useRef(null);
    const FocusInput=()=>{
           inputElement.current.focus();
        //    inputElement.current.value="Harshit";
    }
  return (
    <div>
        <input type="text" ref={inputElement} />
        <button onClick={FocusInput} placeholder='Click the button to focus'>Focus</button>
    </div>
  )
}

export default FocusInput