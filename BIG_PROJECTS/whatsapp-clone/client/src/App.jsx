import React from 'react'
import Sidebar from "./components/Sidebar.jsx";
import ChatList from "./components/ChatList.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import './index.css'

const App = () => {
  return (
    <div className="flex h-screen bg-[#111b21] text-white">
      <Sidebar />
      <ChatList />
      <ChatWindow />
    </div>
  )
}

export default App