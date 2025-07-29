import express from "express"
import { protectRoute } from "../middleware/auth.js";
import { getMessages, getUsersForSiderbar, markMessageSeen, sendMessages } from "../controllers/messageController.js"

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSiderbar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/mark/:id", protectRoute, markMessageSeen);
messageRouter.post("/send/:id",protectRoute,sendMessages)

export default messageRouter;
