import React, { useState } from 'react'
import "../style.css"


const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const generateId=()=>Math.floor(Math.random()*10);
    const handleSubmit = () => {
        setTodos((todo) =>
            todos.concat({ text: inputValue, id: generateId() })
        )
        setInputValue("");
    }
    const removeTodo = (id) => setTodos(todos.filter((t) => t.id !== id));
    return (
        <div className='container'>
            <input type="text" value={inputValue} placeholder='Add todo' onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>

            <ul className="todos-list">
                {todos.map(({ text, id }) => (
                    <li className="todo" key={id}>
                        <span>{text}</span>
                        <button onClick={() => removeTodo(id)} className='close'>X</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todo