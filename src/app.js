import express from "express";
import { config } from "dotenv";
import middleware from "./middleware/middleware.js";
import Routes from "./router/route.js";
import connection from "./config/connection.js";

class app {
  constructor() {
    config();
    this.app = express();
    //  middleware will be called
    //  routes will be called
    // console.log("Server app js called");
    middleware.init(this.app);
    Routes.init(this.app);
    connection();
  }
}

export default new app().app;
