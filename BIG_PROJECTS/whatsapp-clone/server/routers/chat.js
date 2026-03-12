const express = require("express");
const Chat = require("../models/Chat.js");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { receiverId } = req.body;
    const chat = new Chat({
      members: [req.userId, receiverId],
    });
    await chat.save();
    res.json({
      message: "Chat Created",
      chat,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/",async (req,res)=>{
  try {
    const chats = (await Chat.find({members : req.userId}).populate("members","name email").populate("lastMessage")).toSorted({updatedAt : -1})
    res.json(chats)    
  } catch (error) {

      res.status(500).json({ message: "Server error" });
  }
})