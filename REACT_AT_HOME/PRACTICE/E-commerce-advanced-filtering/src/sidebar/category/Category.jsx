import React from 'react'
import Input from '../../components/Input'
import "./category.css"

const Category = ({handleChange}) => {
  return (
    <div>
      <h2 className='sidebar-title'>Category</h2>
      <div>
        <Input
         handleChange={handleChange}
        title="All"
        value=""
        name="test"/>
        <Input
         handleChange={handleChange}
        title="Flats"
        value="flats"
        name="test"/>
        <Input
         handleChange={handleChange}
        title="Sneakers"
        value="sneakers"
        name="test"/>
        <Input
         handleChange={handleChange}
        title="Scandals"
        value="scandals"
        name="test"/>
        <Input
         handleChange={handleChange}
        title="Heels"
        value="heels"
        name="test"/>
      </div>
    </div>
  )
} 

export default Category