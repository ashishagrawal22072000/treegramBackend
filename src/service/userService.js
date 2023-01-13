import FindRepo from "../repo/findRepo.js";
import Messages from "../util/Messages.js";
import userModel from "../model/userModel.js";
import CommonService from "./commonServices.js";
import CreateRepo from "../repo/createRepo.js";
import follower from "../model/follower.js";

class UserService extends CommonService {
  constructor() {
    super(CommonService);
    this.FindUserRepo = new FindRepo(userModel);
  }

  async getUserById(id) {
    try {
      const getUserById = await this.FindUserRepo.findById(id);
      if (!getUserById) {
        return {
          status: process.env.BADREQUEST,
          message: Messages.USER_NOT_FOUND,
        };
      }
      return {
        status: process.env.SUCCESS,
        message: Messages.USER_FOUND,
        data: getUserById,
      };
    } catch (err) {
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getUserByQuery(search, limit, skip) {
    try {
      const getUserById = await this.FindUserRepo.find(search, limit, skip);
      if (!getUserById.length) {
        return {
          status: process.env.BADREQUEST,
          message: Messages.USER_NOT_FOUND,
        };
      }
      return {
        status: process.env.SUCCESS,
        message: Messages.USER_FOUND,
        data: getUserById,
      };
    } catch (err) {
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async followUsers(user_id, follower_id) {
    try {
      const getUserById = await new FindRepo(follower).findByQuery({
        user_id,
      });
      console.log(getUserById);
      if (getUserById) {
        console.log(getUserById);
        const follow = getUserById.follow.filter((ele) => {
          return ele.follower_id == follower_id;
        });
        if (follow[0].status == true) {
          follow[0].status = false;
          await follow.save();
        } else {
          follow[0].status = true;
          await follow.save();
        }
      } else {
        const followUser = await new CreateRepo(follower).create({
          user_id,
          follow: [
            {
              follower_id,
              status: true,
            },
          ],
        });
      }
      return {
        status: process.env.SUCCESS,
        message: Messages.USER_FOUND,
      };
    } catch (err) {
      console.log(err);
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }
}

export default new UserService();
