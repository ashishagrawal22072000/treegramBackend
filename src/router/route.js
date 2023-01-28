import express from "express";
import { Auth } from "../middleware/authMiddelware.js";
import AuthRouter from "./authRouter.js";
import feedRouter from "./feedRouter.js";
import PublicRouter from "./publicRouter.js";
import UserRouter from "./userRouter.js";

export default class Routes {
  static init(app) {
    const router = express.Router();

    app.get("/", (req, res) => {
      return res.send(`<h1>Server is running now !</h1>`);
    });
    app.use("/api/v1/auth", AuthRouter);
    app.use("/api/v1", PublicRouter);
    app.use("/api/v1/user", Auth, UserRouter);
    app.use("/api/v1/feed", Auth, feedRouter);
    app.all("*", (_, res) => {
      res.status(process.env.NOTFOUND).json({
        success: false,
        message: `API not found.`,
      });
    });
  }
}
