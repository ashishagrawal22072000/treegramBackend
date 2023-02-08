import express from "express";
import feedController from "../controller/feedController.js";

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.routes(this.router);
    }
    routes = (router) => {
        router.post("/create-post", feedController.createPost);
        router.get("/get-single-post/:id", feedController.getSinglePost);
        router.patch("/like/:post_id", feedController.likePost)
        router.get("/post-list", feedController.getAllPosts)
        router.post("/comment", feedController.commentPost)
        router.get("/comment-list/:post_id", feedController.getCommentList)
        router.delete("/comment", feedController.deleteComment)
        router.post("/reply-comment", feedController.replyComment)
    };
}

export default new UserRouter().router;
