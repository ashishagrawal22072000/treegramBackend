import http from "http";

import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
// const { Server } = require("socket.io");
import { Server } from "socket.io";
server.listen(PORT);



server.on("listening", () => console.log(`App is running at ${PORT}`));

const io = new Server(server)

io.on("connection", (socket) => {
  console.log(`Connected to ${socket.id}`)
  socket.on("notification", (data) => {
    socket.broadcast.emit("notify", data)
  })
})
server.on("error", (err) => {
  console.log(`App error: ${err}`);
});
