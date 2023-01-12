import express from "express";
import userController from "../controller/userController.js";

class UserRouter {
  constructor() {
    this.router = express.Router();
    this.routes(this.router);
  }
  routes = (router) => {
    router.get("/:user_id", userController.userById);
    router.get("/", userController.getUserBySearch);
  };
}

export default new UserRouter().router;
