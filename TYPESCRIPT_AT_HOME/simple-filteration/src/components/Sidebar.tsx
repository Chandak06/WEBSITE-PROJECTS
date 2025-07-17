
const Sidebar = () => {
  return (
     <div className="w-16 fixed h-screen border border-[#242424] p-4 flex flex-col items-center space-y-26 bg-gray-800">
      <div className="mt-[20px] text-[20px] cursor-pointer text-white font-bold">Logo</div>
      <div className="text-gray-400 cursor-pointer text-3xl">📁</div>
      <div className="text-gray-400 cursor-pointer text-3xl">👤</div>
      <div className="text-gray-400 cursor-pointer text-3xl">⚙️</div>
    </div>
  )
}

export default Sidebar