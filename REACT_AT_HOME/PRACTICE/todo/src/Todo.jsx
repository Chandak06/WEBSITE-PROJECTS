import React, { useState } from 'react'

const Todo = () => {
    const [todos,setTodos]=useState([]);
    const [input,setInput]=useState("");

    const generateId=()=>{
        return Math.floor(Math.random()*10)
    }
    const handleSubmit=()=>{
        setTodos((todos)=>
            todos.concat({
                text:input,
                id:generateId(),
            })
        )
        setInput("");
    }
    const handleChange=(e)=>{
        setInput(e.target.value)
    }

    const removeTodo=(id)=>{
        setTodos((todos)=>todos.filter((t)=>t.id!==id))
    }
  return (
    <div className='container bg-[#fcfff3] p-[50px]' >
        <input className='p-[15px] border-none outline-none bg-[#f5f9eb] w-[300px] mr-[10px]' type="text" value={input} placeholder='New Todo' onChange={handleChange}/>
        <button onClick={handleSubmit}>Submit</button>
        <ul className="mt-[3rem]">
            {todos.map(({text,id})=>(
                <li className="flex justify-between items-center  bg-[#f5f9eb] px-[20px] py-[7px] m-[10px] list-none font-sans" key={id}>
                    <span>{text}</span>
                    <button className="py-[7x] px-[10px] cursor-pointer" onClick={()=>removeTodo(id)}>X</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Todo