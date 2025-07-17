import React from 'react'

type MyButton={
    label:string,
    onClick:()=>void,
    disabled:boolean,
}
const Button = ({label,onClick,disabled}:MyButton) => {

   
  return (
    <div>
        <button onClick={onClick} disabled={disabled}>{label}</button>
    </div>
  )
}

export default Button