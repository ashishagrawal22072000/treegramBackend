import express from "express";
import userController from "../controller/userController.js";

class UserRouter {
  constructor() {
    this.router = express.Router();
    this.routes(this.router);
  }
  routes = (router) => {
    router.get("/", userController.getUserBySearch);
    router.get("/authuser", userController.getAuthUser);
    router.post("/follow", userController.follow);
    router.post("/close-friend", userController.closeFriend);
    router.post("/favouriate", userController.Favouriate);
    router.patch("/privacy", userController.AccountPrivacy);
    router.patch("/account", userController.Account);
    router.get("/follower-list", userController.FollowerList);
    router.get("/following-list", userController.FollowingList);
    router.get("/friend-list", userController.closeFriendList);
    router.get("/favouriate-list", userController.FavouriateList);
    router.get("/user-list", userController.UserList);
    router.get("/view-profile?:username", userController.ViewProfile);
  };
}

export default new UserRouter().router;
