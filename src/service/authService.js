import methods from "../util/methods.js";
import userModel from "../model/userModel.js";
import CreateRepo from "../repo/createRepo.js";
import FindRepo from "../repo/findRepo.js";
import Messages from "../util/Messages.js";
import CommonService from "./commonServices.js";

class AuthService extends CommonService {
  constructor() {
    super(userModel);
    this.FindUserRepo = new FindRepo(userModel);
  }

  async verifyUser(id) {
    try {
      const checkUser = await this.FindUserRepo.findById(id);
      if (checkUser) {
        if (!checkUser.status) {
          return { status: process.env.FORBIDDEN, message: `Session out` };
        }
        return { status: process.env.SUCCESS, message: `Found successfully` };
      } else
        return { status: process.env.FORBIDDEN, message: Messages.ERROR_404 };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async signUp(data) {
    try {
      const userData = await this.FindUserRepo.findByEmail(data.email);
      if (userData) {
        return {
          status: process.env.BADREQUEST,
          message: Messages.USER_EXISTS,
          data: {},
        };
      } else {
        const password = await methods.hashPassword(data.password);
        data.password = password;
        data.oldPassword = [password];
        // data.authOtp = await methods.generateOtp();
        const user = await new CreateRepo(userModel).create(data);
        if (!user) throw new Error("Couldn't create User");
        const token = await methods.generateToken({
          id: user._id,
          email: user.email,
        });
        return {
          status: process.env.SUCCESS,
          message: Messages.USER_CREATED,
          data: { user, token },
        };
      }
    } catch (err) {
      console.log(err, "authservice");
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async loginUser(data) {
    try {
      const userLogin = await this.FindUserRepo.findByEmail(data.email);
      if (!userLogin) {
        return {
          status: process.env.BADREQUEST,
          message: Messages.EMAIL_NOT_FOUND,
        };
      }
      const password = await methods.verifyPassword(data, userLogin.password);
      if (!password) {
        return {
          status: process.env.BADREQUEST,
          message: Messages.INVALID_CREDENTIALS,
        };
      } else {
        const token = await methods.generateToken({
          id: userLogin._id,
          email: userLogin.email,
        });
        return {
          status: process.env.SUCCESS,
          message: Messages.LOGIN_SUCCESS,
          token: token,
        };
      }
    } catch (err) {
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async VerificationEmail(data) {
    console.log(data, "VerificationEmail");
    try {
      const token = await methods.verifyToken(data.token);
      console.log(token, "VerificationEmail");
      const userLogin = await this.FindUserRepo.findByEmail(token.email);
      if (userLogin) {
        if (userLogin.isVerified) {
          return {
            status: process.env.BADREQUEST,
            message: Messages.EMAIL_ALREADY_VERIFIED,
          };
        } else {
          userLogin.isVerified = true;
          await userLogin.save();
          return {
            status: process.env.SUCCESS,
            message: Messages.USER_EMAIL_VERIFIED,
          };
        }
      }
      if (!userLogin) {
        return {
          status: process.env.BADREQUEST,
          message: Messages.EMAIL_NOT_FOUND,
        };
      }
    } catch (err) {
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async forgetPassword(data) {
    try {
      const user = await this.FindUserRepo.findByEmail(data.email);
      if (!user) {
        return {
          status: process.env.BADREQUEST,
          message: Messages.EMAIL_NOT_FOUND,
        };
      }
      const token = await methods.generateToken({
        id: user._id,
        email: user.email,
      });
      return {
        status: process.env.SUCCESS,
        message: Messages.PASSWORD_RESET_EMAIL,
        data: { user, token },
      };
    } catch (err) {
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async forgetEmail(data) {
    try {
      console.log(data);
      const userData = await this.FindUserRepo.findByQuery(
        { phone: data.phone },
        ["email"]
      );
      console.log(userData);
      if (!userData) {
        return {
          status: process.env.NOTFOUND,
          message: Messages.ERROR_404,
        };
      }
      return {
        status: process.env.SUCCESS,
        message: Messages.EMAIL_SENT,
        data: userData,
      };
    } catch (err) {
      console.log(err);
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async resetPassword(token, data) {
    try {
      const decodedToken = await methods.verifyToken(token);
      const user = await this.FindUserRepo.findByEmail(decodedToken.email);
      if (!user) {
        return {
          status: process.env.BADREQUEST,
          message: Messages.EMAIL_NOT_FOUND,
        };
      } else {
        if (data.confirmPassword === data.password) {
          const checkPassword = [];
          for (let i = 0; i <= user.oldPassword.length - 1; i++) {
            let matchPassword = await methods.comparePassword(
              data.password,
              user.oldPassword[i]
            );
            if (matchPassword === true) checkPassword.push(matchPassword);
          }
          if (checkPassword.length > 0) {
            return {
              status: process.env.BADREQUEST,
              message: Messages.PASSWORD_ALREADY_USED,
            };
          } else {
            const password = await methods.hashPassword(data.password);
            user.password = password;
            user.oldPassword = [...user.oldPassword, password];
            await user.save();
            return {
              status: process.env.SUCCESS,
              message: Messages.PASSWORD_RESET_SUCCESS,
            };
          }
        } else {
          return {
            status: process.env.BADREQUEST,
            message: Messages.PASSWORD_NOT_MATCH,
          };
        }
      }
    } catch (err) {
      console.log(err);
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }
}

export default new AuthService();
