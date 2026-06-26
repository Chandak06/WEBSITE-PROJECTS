const Message = require("../models/Message.js");
const Chat = require("../models/Chat.js");

const socketHandler = (io, redisClient) => {
  io.on("connection", async (socket) => {
    const userId = socket.userId;

    if (!userId) {
      console.log("Unauthorized socket");
      return;
    }

    console.log("User Connected:", userId);

    // 🔹 Store socket
    await redisClient.sAdd(`user_socket:${userId}`, socket.id);
    await redisClient.sAdd("online_users", userId);

    socket.broadcast.emit("user_online", userId);

    // 🔹 JOIN CHAT
    socket.on("join_chat", async (chatId) => {
      socket.join(chatId);
      console.log(`User ${userId} joined chat ${chatId}`);

      // ✅ Mark messages as read when user opens chat
      await Message.updateMany(
        {
          chatId,
          receiver: userId,
          status: { $ne: "read" },
        },
        { status: "read" }
      );

      // ✅ Reset unread count
      await Chat.findByIdAndUpdate(chatId, {
        $set: {
          [`unreadCount.${userId}`]: 0,
        },
      });

      // Notify others
      socket.to(chatId).emit("messages_read", {
        chatId,
        userId,
      });
    });

    // 🔹 SEND MESSAGE
    socket.on("send_message", async (data) => {
      try {
        const { receiverId, content, chatId } = data;
        const senderId = userId;

        if (!receiverId || !content) {
          console.log("Invalid data");
          return;
        }

        let chat;

        // 🔹 Find or create chat
        if (!chatId) {
          chat = await Chat.findOne({
            members: { $all: [senderId, receiverId] },
            isGroup: false,
          });

          if (!chat) {
            chat = await Chat.create({
              members: [senderId, receiverId],
            });
          }
        } else {
          chat = await Chat.findById(chatId);
        }

        if (!chat) return;

        // 🔹 Authorization check
        if (!chat.members.some((id) => id.toString() === senderId)) {
          console.log("Unauthorized user");
          return;
        }

        const room = chat._id.toString();
        socket.join(room);

        // 🔹 Create message
        let message = await Message.create({
          chatId: chat._id,
          sender: senderId,
          receiver: receiverId,
          content,
          status: "sent",
        });

        // 🔹 Check if receiver is online → mark delivered
        const receiverSockets = await redisClient.sMembers(
          `user_socket:${receiverId}`
        );

        if (receiverSockets.length > 0) {
          message.status = "delivered";
          await message.save();
        }

        // 🔹 Update chat (single DB call ✅)
        await Chat.findByIdAndUpdate(chat._id, {
          $set: {
            lastMessage: message._id,
          },
          $inc: {
            [`unreadCount.${receiverId}`]: 1,
          },
        });

        // 🔹 Emit message to room
        io.to(room).emit("receive_message", message);

        // 🔹 Update chat list UI
        io.to(room).emit("chat_updated", {
          chatId: chat._id,
          lastMessage: message,
        });

      } catch (err) {
        console.error(err);
      }
    });

    // 🔹 MESSAGE READ (fallback/manual)
    socket.on("message_read", async (messageId) => {
      try {
        const message = await Message.findByIdAndUpdate(
          messageId,
          { status: "read" },
          { new: true }
        );

        if (!message) return;

        // Reset unread count
        await Chat.findByIdAndUpdate(message.chatId, {
          $set: {
            [`unreadCount.${socket.userId}`]: 0,
          },
        });

        // Notify sender
        const sockets = await redisClient.sMembers(
          `user_socket:${message.sender}`
        );

        sockets.forEach((id) => {
          io.to(id).emit("message_read", messageId);
        });

      } catch (err) {
        console.error(err);
      }
    });

    // 🔹 TYPING
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

    // 🔹 DISCONNECT
    socket.on("disconnect", async () => {
      try {
        await redisClient.sRem(`user_socket:${userId}`, socket.id);

        const remainingSockets = await redisClient.sMembers(
          `user_socket:${userId}`
        );

        // If no active sockets → user offline
        if (remainingSockets.length === 0) {
          await redisClient.sRem("online_users", userId);
          await redisClient.set(`last_seen:${userId}`, Date.now());

          socket.broadcast.emit("user_offline", userId);
          console.log("User disconnected:", userId);
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
};

module.exports = socketHandler;