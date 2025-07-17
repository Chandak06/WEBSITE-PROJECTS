import { UserContext } from "./UserContext";
import { useContext, useState } from "react";


import React from 'react'

const UpdateUser = () => {
    const {updateUser}=useContext(UserContext)
    const [newname,setNewname]=useState("");
    const handleSubmit=e=>{
        e.preventDefault()

        if(newname.trim()){
            updateUser(newname)
            setNewname("")
        }
    }
  return (
    <div>
        <h2>Update User Name</h2>
        <form onSubmit={{handleSubmit}}>
            <input onChange={e=>setNewname(e.target.value)} type="text" value={newname} placeholder="Enter new name"/>
            <button type="Submit">Update</button>
        </form>
    </div>
  )
}

export default UpdateUser