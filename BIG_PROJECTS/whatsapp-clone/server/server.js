require("dotenv").config();

const express = require("express");
const connectDB = require("./db.js");
const authRoutes = require("./routers/auth.js");
const authMiddleware = require("./middleware/authMiddleware.js");
const messageRoutes = require("./routers/message.js");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message.js");
const app = express();
const server = http.createServer(app);
const socketHandler = require("./sockets/socket.js")

app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketHandler(io);

app.use("/api/auth", authRoutes);
app.use(
  "/api/message",
  (req, res, next) => {
    req.io = io;
    next();
  },
  messageRoutes,
);

app.get("/", (req, res) => {
  res.send("Server running");
});

server.listen(5000, () => {
  console.log("Server running at port 5000");
});
