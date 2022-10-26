require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const BodyParser = require("body-parser");

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
app.use(cors());

app.use(BodyParser.urlencoded({ extended: true }));
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  io.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/chat-client/public/index.html");
// });
server.listen(port, () =>
  console.log(`Server is up and running on the port ${port} `)
);
