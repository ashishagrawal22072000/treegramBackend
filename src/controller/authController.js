import userModel from "../model/userModel.js";
import authService from "../service/authService.js";
import methods from "../util/methods.js";
import sendMail from "../util/sendMail.js";
import authValidator from "../validator/authValidator.js";

class AuthController {
  async login(req, res) {
    const loginValidation = authValidator.loginValidator.validate(req.body);
    if (loginValidation.error) {
      return res.status(process.env.BADREQUEST).json({
        success: false,
        message: loginValidation.error.details[0].message,
      });
    }
    const userLogin = await authService.loginUser(loginValidation.value);
    return res.status(userLogin.status).json({
      success: userLogin.status == process.env.SUCCESS ? true : false,
      message: userLogin.message,
      token: userLogin.token,
    });
  }
  async signUp(req, res) {
    try {
      const signUpValidation = authValidator.signUpValidator.validate(req.body);
      if (signUpValidation.error) {
        return res.status(process.env.BADREQUEST).json({
          success: false,
          message: signUpValidation.error.details[0].message,
        });
      }
      const signupData = await authService.signUp(signUpValidation.value);
      if (signupData.status == 200) {
        const emailSend = await sendMail.mail(
          signupData.data,
          "welcome",
          "Welcome to BracketIN"
        );
      }
      return res.status(signupData.status).json({
        success: signupData.status == 200 ? true : false,
        message: signupData.message,
        data: signupData.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: `INTERNAL SERVER ERROR`,
        data: err.message,
      });
    }
  }

  async verifyEmail(req, res) {
    try {
      const emailData = await authService.VerificationEmail(req.query);
      if (!emailData) throw new Error("User not Found");
      return res.status(emailData.status).json({
        success: emailData.status == process.env.SUCCESS ? true : false,
        message: emailData.message,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `INTERNAL SERVER ERROR`,
        data: err.message,
      });
    }
  }

  async forgetPassword(req, res) {
    try {
      const forgetPasswordValidation =
        authValidator.forgetPasswordValidator.validate(req.body);
      if (forgetPasswordValidation.error) {
        return res.status(process.env.BADREQUEST).json({
          success: false,
          message: forgetPasswordValidation.error.details[0].message,
        });
      }
      const forgetPasswordData = await authService.forgetPassword(
        forgetPasswordValidation.value
      );
      if (forgetPasswordData.status == process.env.SUCCESS) {
        const emailSend = await sendMail.mail(
          forgetPasswordData.data,
          "forgetPassword",
          "Reset Password"
        );
      }
      return res.status(forgetPasswordData.status).json({
        success: forgetPasswordData.status == 200 ? true : false,
        message: forgetPasswordData.message,
        data: forgetPasswordData.data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `INTERNAL SERVER ERROR`,
        data: err.message,
      });
    }
  }

  async forgetEmail(req, res) {
    try {
      const forgetEmailValidation = authValidator.forgetEmailValidator.validate(
        req.body
      );
      if (forgetEmailValidation.error) {
        return res.status(process.env.BADREQUEST).json({
          success: false,
          message: forgetEmailValidation.error.details[0].message,
        });
      }
      const forgetEmailData = await authService.forgetEmail(
        forgetEmailValidation.value
      );
      return res.status(forgetEmailData.status).json({
        success: forgetEmailData.status == 200 ? true : false,
        message: forgetEmailData.message,
        data: forgetEmailData.data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `INTERNAL SERVER ERROR`,
        data: err.message,
      });
    }
  }

  async resetPassword(req, res) {
    try {
      const resetPasswordData = await authService.resetPassword(
        req.query.token,
        req.body
      );
      return res.status(resetPasswordData.status).json({
        success: resetPasswordData.status == 200 ? true : false,
        message: resetPasswordData.message,
        data: resetPasswordData.data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `INTERNAL SERVER ERROR`,
        data: err.message,
      });
    }
  }
}

export default new AuthController();
