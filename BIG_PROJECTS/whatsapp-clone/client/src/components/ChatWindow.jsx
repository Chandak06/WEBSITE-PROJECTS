import React from "react";
import MessageInput from "./MessageInput.jsx";
const ChatWindow = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Empty State */}
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <h1 className="text-xl mb-2">Select a chat to start messaging</h1>
          <p className="text-sm">Your messages are end-to-end encrypted</p>
        </div>
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
};

export default ChatWindow;
