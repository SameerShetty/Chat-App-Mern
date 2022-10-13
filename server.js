require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const BodyParser = require("body-parser");

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
app.use(BodyParser.urlencoded({ extended: true }));
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
});

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/chat-client/public/index.html");
// });
server.listen(port, () =>
  console.log(`Server is up and running on the port ${port} `)
);
