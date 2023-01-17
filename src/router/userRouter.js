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
    router.post("/follow", userController.follow);
    router.post("/close-friend", userController.closeFriend);
    router.post("/favouriate", userController.Favouriate);
    router.patch("/privacy", userController.AccountPrivacy);
    router.patch("/account", userController.Account);
  };
}

export default new UserRouter().router;
