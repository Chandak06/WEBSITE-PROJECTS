import { useState } from "react";

interface Todo{
  id:number;
  task:string;
  completed:boolean;
}
const TodoList = () => {
  const [todos,setTodos]=useState<Todo[]>([]);
  const AddTodo=(task:string)=>{
    const newTodo:Todo={
      id:todos.length+1,
      task:task + ` ${todos.length+1}`,
      completed:false,
    }
    setTodos((prevTodos:Todo[])=>[...prevTodos,newTodo])
  }
  return (
    <div>
      <h2>Todo List</h2>
      <button onClick={()=>AddTodo("New Todo")}>Add Todo</button>
      {todos.map((todo)=>(
        <li key={todo.id}>
          {todo.task} {todo.completed?"Completed":"Pending"}
        </li>
      ))}
    </div>
  )
}

export default TodoList