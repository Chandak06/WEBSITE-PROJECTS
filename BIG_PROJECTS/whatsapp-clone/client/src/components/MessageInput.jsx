import React from 'react'
import { useState } from "react";

const MessageInput = () => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    console.log(text); // later socket emit
    setText("");
  };

  return (
    <div className="p-3 bg-[#202c33] flex gap-2">
      <input
        className="flex-1 p-2 rounded bg-[#111b21] outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
      />

      <button
        onClick={handleSend}
        className="bg-green-500 px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput