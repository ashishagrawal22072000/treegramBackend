import mongoose from "mongoose";
import http from "http";

import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT);

server.on("listening", () => console.log(`App is running at ${PORT}`));

server.on("error", (err) => {
  console.log(`App error: ${err}`);
});
