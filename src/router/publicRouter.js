import express from "express";
import userController from "../controller/userController.js";
import { uploadImage, getImage } from "../util/imageUpload.js";

class PublicRouter {
  constructor() {
    this.router = express.Router();
    this.routes(this.router);
  }
  routes = (router) => {
    router.get("/image/:file_name", getImage);
    router.post("/upload-image", uploadImage);
  };
}

export default new PublicRouter().router;
