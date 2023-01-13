import authService from "../service/authService.js";
import Messages from "../util/Messages.js";
import methods from "../util/methods.js";

export const Auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(process.env.UNAUTHORIZED)
        .json({ success: false, message: Messages.AUTH_ERROR });
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = await methods.verifyToken(token);
    console.log(decodedToken, "decodedToken");
    if (decodedToken) {
      console.log(decodedToken);
      req.loginUser = decodedToken;
      console.log(req.loginUser);
      const validUser = await authService.verifyUser(req.loginUser.id);
      if (validUser.status !== process.env.SUCCESS)
        return res.status(validUser.status).json({
          success: false,
          message: validUser.message,
        });
      next();
    } else {
      return res.status(process.env.UNAUTHORISED).json({
        success: false,
        message: Messages.JWT_ERROR,
      });
    }
  } catch (err) {
    return res.status(process.env.INTERNALSERVERERROR).json({
      success: false,
      message: Messages.JWT_ERROR,
    });
  }
};
