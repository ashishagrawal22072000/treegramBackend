import FindRepo from "../repo/findRepo.js";
import Messages from "../util/Messages.js";
import userModel from "../model/userModel.js";
import CommonService from "./commonServices.js";
import CreateRepo from "../repo/createRepo.js";
import follower from "../model/follower.js";
import UpdateRepo from "../repo/updateRepo.js";

class UserService extends CommonService {
  constructor() {
    super(CommonService);
    this.FindUserRepo = new FindRepo(userModel);
    this.UpdateUserRepo = new UpdateRepo(userModel);
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
  async UpdateAccountPrivacy(user_id, privacy_id) {
    try {
      const user = await this.FindUserRepo.findById(user_id);
      if (user) {
        user.privacy_id = privacy_id;
        await user.save();
        return {
          status: process.env.SUCCESS,
          message: Messages.USER_UPDATE,
        };
      } else {
        return {
          status: process.env.NOTFOUND,
          message: Messages.USER_NOT_FOUND,
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
  async UpdateAccountDetails(user_id, data) {
    try {
      const updateAccount = await this.UpdateUserRepo.updateById(user_id, data);
      if (!updateAccount) {
        return {
          status: process.env.BADREQUEST,
          message: Messages.SOME_ERROR,
        };
      }
      return {
        status: process.env.SUCCESS,
        message: Messages.USER_UPDATE,
      };
    } catch (err) {
      console.log(err);
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }
  async getFollowerList(user_id) {
    try {
      const followers = await new FindRepo(follower).findAll({
        follow_to: user_id,
        status: true,
      });
      console.log(user_id);
      if (followers.length) {
        const followerList = follower
          .aggregate({
            $lookup: {
              from: "userModel",
              localField: "follow_to",
              forignField: "_id",
              as: "user",
            },
          })
          .exec((err, result) => {
            if (err) {
              console.log("error", err);
            }
            if (result) {
              return {
                status: process.env.SUCCESS,
                message: `Follower fetched successfully,`,
                data: result ? result : [],
              };
            }
          });
      } else {
        return {
          status: process.env.BADREQUEST,
          message: `No Follower Found`,
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
  async getfollowingList(user_id) {
    try {
      const following = await new FindRepo(follower).findAll({
        follow_from: user_id,
        status: true,
      });
      if (following.length) {
        let followingList = [];
        follower
          .aggregate([
            {
              $lookup: {
                from: "userModel",
                localField: "follow_from",
                foreignField: "_id",
                as: "user",
              },
            },
          ])
          .exec((err, result) => {
            if (err) {
              console.log("error", err);
            }
            if (result) {
              followingList.push(...result);
              console.log(followingList, "gfgfggfgf");
            }
          });
        console.log(followingList, "jgghghghghghghghg");

        return {
          status: process.env.SUCCESS,
          message: `Follower fetched successfully,`,
          data: followingList.length ? followingList : [],
        };
      } else {
        return {
          status: process.env.BADREQUEST,
          message: `No Following Found`,
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
