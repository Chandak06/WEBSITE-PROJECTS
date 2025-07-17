import React, { useState } from 'react'

const TodoList = () => {
  const [todos, setTodo] = useState([]);
  const [inputValue,setInputValue]=useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(inputValue.trim()!==""){
      setTodo([...todos,inputValue]);
      setInputValue("");
    }
  }
  const handleChange=(e)=>{
    setInputValue(e.target.value)
  }
  return (
    <div>
      <h1>TodoList</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} placeholder='Add a new todo'/>
        <button>Submit</button>
      </form>
        <ul>
          {todos.map((todo,index)=>(
            <li key={index}>{todo}</li>
          ))}
        </ul>
    </div>
  )
}

export default TodoList