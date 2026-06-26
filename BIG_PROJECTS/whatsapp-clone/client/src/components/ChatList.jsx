import React from "react";

const ChatList = () => {
  const chats = [
    { name: "Papa", last: "Hello beta", time: "9:21 pm" },
    { name: "Capstone", last: "Typing...", time: "9:21 pm" },
  ];
  return (
    <div className="w-[350px] bg-[#111b21] border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 text-lg font-semibold bg-[#202c33]">WhatsApp</div>

      {/* Search */}
      <div className="p-3">
        <input
          placeholder="Search or start new chat"
          className="w-full p-2 rounded bg-[#202c33] text-sm outline-none"
        />
      </div>

      {/* Chat items */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 hover:bg-[#202c33] cursor-pointer"
          >
            <div className="w-12 h-12 bg-gray-600 rounded-full"></div>

            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">{chat.name}</h3>
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>

              <p className="text-sm text-gray-400">{chat.last}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
