import { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";

import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const RightSideBar = () => {

  const {selectedUser,messages}=useContext(ChatContext);
  const {logout,onlineUsers}=useContext(AuthContext);
  const [msgImages,setMsgImages]=useState([]);

  useEffect(()=>{
    setMsgImages(
      messages.filter(msg=>msg.image).map(msg=>msg.image)
    )
  }, [messages])

  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full relative overflow-auto ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            className="aspect-[1/1] w-20 rounded-full mx-auto"
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2 text-white">
            {onlineUsers.includes(selectedUser._id) && <p className="h-2 w-2 rounded-full bg-green-500"></p>}
            {selectedUser.fullName}
          </h1>
          <p className="px-10 mx-auto text-white text-center">
            {selectedUser.bio}
          </p>
        </div>

        <hr className="border-[#ffffff50] my-4 w-[90%] mx-auto" />

        <div className="px-5 text-xs">
          <p>Media</p>
          <div className="mt-2 max-h-[200px] grid grid-cols-2 gap-4 opacity-80 overflow-y-auto">
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded"
              >
                <img src={url} className="h-full rounded-md" />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={()=>logout()}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer">
          Logout
        </button>
      </div>
    )
  );
};

export default RightSideBar;
