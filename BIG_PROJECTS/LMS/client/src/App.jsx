import { Route, Routes } from "react-router"
import {Home} from "./pages/student/Home.jsx"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App