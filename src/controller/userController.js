import userService from "../service/userService.js";

class UserController {
  async userById(req, res) {
    try {
      const userById = await userService.getUserById(req.params.user_id);
      if (!userById) throw new Error("User not Found");
      return res.status(userById.status).json({
        success: userById.status == process.env.SUCCESS ? true : false,
        message: userById.message,
        data: userById.data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `INTERNAL SERVER ERROR`,
        data: err.message,
      });
    }
  }

  async getUserBySearch(req, res) {
    try {
      const { search, limit, skip } = req.query;
      console.log(search);
      const userById = await userService.getUserByQuery(search, limit, skip);
      if (!userById) throw new Error("User not Found");
      return res.status(userById.status).json({
        success: userById.status == process.env.SUCCESS ? true : false,
        message: userById.message,
        data: userById.data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `INTERNAL SERVER ERROR`,
        data: err.message,
      });
    }
  }
  async follow(req, res) {
    try {
      const followUser = await userService.followUsers(
        req.loginUser.id,
        req.body.follower_id
      );
      if (!followUser) throw new Error("User not Found");
      return res.status(followUser.status).json({
        success: followUser.status == process.env.SUCCESS ? true : false,
        message: followUser.message,
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

export default new UserController();
