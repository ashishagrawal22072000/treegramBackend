import express from "express";
import feedController from "../controller/feedController.js";

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.routes(this.router);
    }
    routes = (router) => {
        router.post("/create-post", feedController.createPost);

    };
}

export default new UserRouter().router;
