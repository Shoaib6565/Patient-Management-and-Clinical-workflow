const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: "*"
  }
});

// store connected users
let users = {};

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  // register user
  socket.on("register", (userId) => {
    users[userId] = socket.id;
  });

  // listen event from Laravel
  socket.on("send_notification", ({ userId, data }) => {
    const socketId = users[userId];
    if (socketId) {
      io.to(socketId).emit("new_notification", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

console.log("Socket server running on port 3001");