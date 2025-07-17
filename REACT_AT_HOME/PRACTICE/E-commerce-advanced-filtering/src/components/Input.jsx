import React from 'react'

const Input = ({handleChange,value,name,title,color,border}) => {
  return (
    <label className="sidebar-label-container">

      <input onChange={handleChange} type="radio" value={value} name={name}/>
      <span className="checkmark" style={{backgroundColor:color,border:border}}></span>
      {title}
    </label>
  )
}

export default Input