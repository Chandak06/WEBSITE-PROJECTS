require("dotenv").config();

const express = require("express");
const connectDB = require("./db.js");
const authRoutes = require("./routers/auth.js");
const messageRoutes = require("./routers/message.js");
const presenceRoutes = require("./routers/presence.js")

const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const socketHandler = require("./sockets/socket.js");

const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.userId = decoded.userId;

    next();
  } catch (error) {
    next(new Error("Authentication error"));
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/presence", presenceRoutes);

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

async function startServer() {

  const pubClient = createClient({
    url: "redis://localhost:6379",
  });

  const subClient = pubClient.duplicate();

  await pubClient.connect();
  await subClient.connect();
  app.locals.redis = pubClient;
  console.log("Redis connected");

  io.adapter(createAdapter(pubClient, subClient));

  socketHandler(io,pubClient);

  server.listen(5000, () => {
    console.log("Server running at port 5000");
  });
}

startServer();