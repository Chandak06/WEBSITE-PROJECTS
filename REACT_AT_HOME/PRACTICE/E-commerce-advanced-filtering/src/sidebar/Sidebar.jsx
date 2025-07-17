import React from 'react'
import Category from './category/Category'
import Price from './price/Price'
import Colors from './colors/Colors'
import "./sidebar.css"
const Sidebar = ({handleChange}) => {
  return (
    <>
      <section className="sidebar overflow-y-auto">
        <div className="logo-container">
          🛒
        </div>
        <Category handleChange={handleChange}/>
        <Price handleChange={handleChange}/>
        <Colors handleChange={handleChange}/>
      </section>
    </>
  )
}

export default Sidebar