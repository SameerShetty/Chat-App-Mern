const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {});
});

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/chat-client/public/index.html");
// });
server.listen(port, () =>
  console.log(`Server is up and running on the port ${port} `)
);
