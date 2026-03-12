
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
    console.log("User joined the chat : ", chatId);
  });

  socket.on("user_online", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("Online users:", onlineUsers);
  });

  socket.on("send_message", (data) => {
    const { chatId, message } = data;
    socket.to(chatId).emit("receive_message", message);
  });

  socket.on("message_delivered",async (messageId)=>{
    await Message.findByIdAndUpdate(messageId,{
      status : "delivered"
    })
  })
  socket.on("message_read",async (messageId)=>{
    await Message.findByIdAndUpdate(messageId,{
      status : "read"
    })
  })

  socket.on("typing",(chatId)=>{
    socket.to(chatId).emit("user_typing")
  })
  socket.on("stop_typing",(chatId)=>{
    socket.to(chatId).emit("user_stop_typing")
  })

  socket.on("disconnect", () => {
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId == socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    console.log("User disconnected", socket.id);
  });
});

module.exports = socketHandler;