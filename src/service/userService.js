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
        follow_from: user_id,
        follow_to: follower_id,
      });
      if (!getUserById) {
        const follow = await new CreateRepo(follower).create({
          follow_from: user_id,
          follow_to: follower_id,
        });
        return {
          status: process.env.SUCCESS,
          message: Messages.FOLLOW,
        };
      } else {
        if (getUserById.status == true) {
          getUserById.status = false;
          await getUserById.save();
          return {
            status: process.env.SUCCESS,
            message: Messages.UNFOLLOW,
          };
        } else {
          getUserById.status = true;
          await getUserById.save();
          return {
            status: process.env.SUCCESS,
            message: Messages.FOLLOW,
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

  async AddToFavouriate(user_id, follower_id) {
    try {
      const favouriate = await new FindRepo(follower).findByQuery({
        follow_from: user_id,
        follow_to: follower_id,
      });
      if (favouriate.favouriate_status) {
        favouriate.favouriate_status = false;
        await favouriate.save();
        return {
          status: process.env.SUCCESS,
          message: Messages.REMOVE_FROM_FAVOURIATE,
        };
      } else {
        favouriate.favouriate_status = true;
        await favouriate.save();
        return {
          status: process.env.SUCCESS,
          message: Messages.ADD_TO_FAVOURIATE,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async AddcloseFriends(user_id, friend_id) {
    try {
      const friend = await new FindRepo(follower).findByQuery({
        follow_from: user_id,
        follow_to: friend_id,
      });
      if (friend.close_status) {
        friend.close_status = false;
        await friend.save();
        return {
          status: process.env.SUCCESS,
          message: Messages.REMOVE_CLOSE_FRIEND,
        };
      } else {
        friend.close_status = true;
        await friend.save();
        return {
          status: process.env.SUCCESS,
          message: Messages.ADD_CLOSE_FRIEND,
        };
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

export default new UserService();
