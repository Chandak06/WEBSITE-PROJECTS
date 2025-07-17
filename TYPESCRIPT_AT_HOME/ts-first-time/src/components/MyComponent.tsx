import { useContext } from "react"
import MyContext from "./MyContext"

const MyComponent = () => {
  const context=useContext(MyContext);
  if (!context) {
   throw new Error("MyComponent must be used within a MyContextProvider");
  }
  const {value,setValue}=context;
  return (
    <div>
        <p>Value:</p>
        <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} />
    </div>
  )
}

export default MyComponent