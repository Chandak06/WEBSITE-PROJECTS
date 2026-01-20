import { Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import { Navigate } from "react-router";
import { useUser } from "@clerk/clerk-react";

const App = () => {
  const {isSignedIn}= useUser();
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>     
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/problems" element={isSignedIn ? <ProblemsPage/> : <Navigate to="/"/>}/>
    </Routes>
  );
};

export default App;
