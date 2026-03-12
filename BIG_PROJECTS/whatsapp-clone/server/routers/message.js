const express = require("express");
const router = express.Router();

const Message = require("../models/Message.js");
const Chat = require("../models/Chat.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const upload = require("../middleware/upload.js");

router.post(
  "/send-file",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    const { chatId } = req.body;

    const message = new Message({
      chat: chatId,
      sender: req.userId,
      file: req.file.path,
    });

    const savedMessage = await message.save();

    req.io.to(chatId).emit("receive_message", savedMessage);

    res.json(savedMessage);
  },
);
router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { chatId, text } = req.body;

    const message = new Message({
      chat: chatId,
      sender: req.userId,
      text,
    });

    const savedMessage = await message.save();

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: savedMessage._id,
    });

    req.io.to(chatId).emit("receive_message", savedMessage);
    res.json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:chatId", authMiddleware, async (req, res) => {
  try {
    const { chatId } = req.params;
    const { cursor } = req.query;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat Not Found" });
    }

    if (!chat.members.includes(req.userId)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    const limit = 20;

    let query = { chat: chatId };

    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    const messages = await Message.find(query)
      .populate("sender", "name email")
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(messages);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
