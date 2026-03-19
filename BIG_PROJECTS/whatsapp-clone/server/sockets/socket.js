const Message = require("../models/Message");

const socketHandler = (io, redisClient) => {
  io.on("connection", async (socket) => {
    const userId = socket.userId;
    await redisClient.sAdd(`user_socket:${userId}`, socket.id);
    console.log("User Connected:", userId);

    if (userId) {
      await redisClient.sAdd("online_users", userId);
      socket.broadcast.emit("user_online", userId);
    }

    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
      console.log(`User ${userId} joined chat ${chatId}`);
    });

    socket.on("send_message", async (data) => {
      const { chatId, receiverId, senderId, content } = data;

      const message = await Message.create({
        chatId,
        sender: senderId,
        receiver: receiverId,
        content,
        status: "sent",
      });

      socket.to(chatId).emit("receive_message", message);

      const sockets = await redisClient.sMembers(`user_socket:${receiverId}`);

      sockets.forEach((id) => {
        io.to(id).emit("receive_message", message);
      });
    });

    socket.on("message_delivered", async (messageId) => {
      const message = await Message.findByIdAndUpdate(
        messageId,
        { status: "delivered" },
        { new: true },
      );

      const sockets = await redisClient.sMembers(
        `user_socket:${message.sender}`,
      );

      sockets.forEach((id) => {
        io.to(id).emit("message_delivered", messageId);
      });
    });

    socket.on("message_read", async (messageId) => {
      const message = await Message.findByIdAndUpdate(
        messageId,
        { status: "read" },
        { new: true },
      );

      const sockets = await redisClient.sMembers(
        `user_socket:${message.sender}`,
      );

      sockets.forEach((id) => {
        io.to(id).emit("message_read", messageId);
      });
    });

    socket.on("typing", async (chatId) => {
      const key = `typing:${chatId}:${userId}`;
      await redisClient.set(key, "1", { EX: 3 });
      socket.to(chatId).emit("user_typing", userId);
    });

    socket.on("stop_typing", async (chatId) => {
      const key = `typing:${chatId}:${userId}`;
      await redisClient.del(key);
      socket.to(chatId).emit("user_stop_typing", userId);
    });

    socket.on("disconnect", async () => {
      if (userId) {
        await redisClient.sRem("online_users", userId);
        await redisClient.set(`last_seen:${userId}`, Date.now());

        socket.broadcast.emit("user_offline", userId);
        console.log("User disconnected:", userId);
        await redisClient.sRem(`user_socket:${userId}`, socket.id);
      }
    });
  });
};

module.exports = socketHandler;
