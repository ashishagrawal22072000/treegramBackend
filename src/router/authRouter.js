import express from "express";
import authController from "../controller/authController.js";

class AuthRouter {
  constructor() {
    this.router = express.Router();
    this.routes(this.router);
  }
  routes = (router) => {
    router.post("/login", authController.login);
    router.post("/signup", authController.signUp);
    router.post("/verify-email", authController.verifyEmail);
    router.post("/forget-password", authController.forgetPassword);
    router.post("/forget-email", authController.forgetEmail);
    router.patch("/reset-password/:token", authController.resetPassword);
    router.post("/check-username", authController.checkUsername);
    router.post("/resend-otp", authController.resendOtp);
  };
}

export default new AuthRouter().router;
