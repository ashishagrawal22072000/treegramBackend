import FindRepo from "../repo/findRepo.js";
import Messages from "../util/Messages.js";
import userModel from "../model/userModel.js";
import CommonService from "./commonServices.js";
import CreateRepo from "../repo/createRepo.js";
import follower from "../model/follower.js";
import UpdateRepo from "../repo/updateRepo.js";
import lookupRepo from "../repo/lookupRepo.js";
import DeleteRepo from "../repo/deleteRepo.js";
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

  async followUsers(user_id, { follower_id, follow_status }) {
    try {
      let user = await this.FindUserRepo.findById(follower_id, "username profile name privacy_id badge");
      const getUserById = await new FindRepo(follower).findByQuery({
        follow_from: user_id,
        follow_to: follower_id,
      });
      if (!getUserById) {
        const follow = await new CreateRepo(follower).create({
          follow_from: user_id,
          follow_to: follower_id,
          follow_status
        });
      } else {
        if (follow_status == 'pending') {
          const follow = await new UpdateRepo(follower).update({
            follow_from: user_id,
            follow_to: follower_id
          }, { follow_status })

        } else {
          const follow = await new UpdateRepo(follower).update({
            follow_from: user_id,
            follow_to: follower_id
          }, { follow_status })
        }
      }
      return {
        status: process.env.SUCCESS,
        message: Messages.FOLLOW,
        data: { ...JSON.parse(JSON.stringify(user)), follow_status }
      };
      // if (!getUserById) {
      //   
      //   return {
      //     status: process.env.SUCCESS,
      //     message: Messages.FOLLOW,
      //   };
      // } else {
      //   getUserById.follow_status = follow_status;
      //   return {
      //     status: process.env.SUCCESS,
      //     message: Messages.FOLLOW,
      //   };
      // if (getUserById.follow_status) {
      //   console.log(getUserById.status)
      //   getUserById.follow_status = false;
      //   await getUserById.save();
      //   return {
      //     status: process.env.SUCCESS,
      //     message: Messages.UNFOLLOW,
      //   };
      // } else {
      //   getUserById.follow_status = true;
      //   await getUserById.save();
      //   return {
      //     status: process.env.SUCCESS,
      //     message: Messages.FOLLOW,
      //   };
      // }

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
  async getFollowerList(user_id, { username, limit, skip }) {
    try {
      const user = await this.FindUserRepo.findByUsername(username);
      if (user) {
        const followers = await new FindRepo(follower).findAll(
          {
            follow_to: user._id,
            status: true,
          },
          "follow_from",
          limit,
          skip,
          { model: "follow_from", attribute: "username profile name privacy_id badge" }
        );
        return {
          status: process.env.SUCCESS,
          message: `Follower fetched successfully,`,
          data: followers.length ? followers.map((ele) => JSON.parse(JSON.stringify(ele.follow_from))) : [],
        };
      }
      else {
        return {
          status: process.env.NOTFOUND,
          message: Messages.USER_NOT_FOUND
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
  async getfollowingList(user_id, { username, limit, skip }) {
    try {
      const user = await this.FindUserRepo.findByUsername(username);
      if (user) {
        const following = await new FindRepo(follower).findAll(
          {
            follow_from: user._id,
            follow_status: "confirm" || "pending",
          },
          "follow_to",
          limit,
          skip,
          { model: "follow_to", attribute: "username profile name privacy_id badge" }
        );

        return {
          status: process.env.SUCCESS,
          message: `Follower fetched successfully,`,
          data: following.length ? following.map((ele) => JSON.parse(JSON.stringify(ele.follow_to))) : [],
        };
      } else {
        return {
          status: process.env.NOTFOUND,
          message: Messages.USER_NOT_FOUND
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
  async getCloseFriendList(user_id, { limit, skip }) {
    try {
      const closeFriend = await new FindRepo(follower).findAll(
        {
          follow_from: user_id,
          close_status: true,
        },
        "follow_to",
        limit,
        skip,
        { model: "follow_to", attribute: "username profile name privacy_id badge" }
      );

      return {
        status: process.env.SUCCESS,
        message: `close friend fetched successfully,`,
        data: closeFriend.length ? closeFriend.map((ele) => JSON.parse(JSON.stringify(ele.follow_to))) : [],
      };
    } catch (err) {
      console.log(err);
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getFavouriateList(user_id, { limit, skip }) {
    try {
      const FavouriateList = await new FindRepo(follower).findAll(
        {
          follow_from: user_id,
          favouriate_status: true,
        },
        "follow_to",
        limit,
        skip,
        { model: "follow_to", attribute: "username profile name privacy_id badge" }
      );

      return {
        status: process.env.SUCCESS,
        message: `favouriates fetched successfully,`,
        data: FavouriateList.length ? FavouriateList.map((ele) => JSON.parse(JSON.stringify(ele.follow_to))) : [],
      };
    } catch (err) {
      console.log(err);
      return {
        status: process.env.INTERNALSERVERERROR,
        message: Messages.INTERNAL_SERVER_ERROR,
      };
    }
  }
  async getUserList(user_id, { limit, skip }) {
    try {
      const userList = await this.FindUserRepo.findAll(
        {
          _id: { $ne: user_id },
        },
        "username email profile badge",
        limit,
        skip
      );

      if (userList.length) {
        let users = [];
        for (let i = 0; i < userList.length; i++) {
          const data = await new FindRepo(follower).findByQuery({
            follow_from: user_id,
            follow_to: userList[i]._id,
          });
          if (!data) users.push(userList[i]);
        }
        console.log(users.length);
        return {
          status: process.env.SUCCESS,
          message: `favouriates fetched successfully,`,
          data: users.length ? users : [],
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

  async viewProfile(user_id, { username }) {
    try {
      const user = await this.FindUserRepo.findByUsername(username, "username name profile privacy_id bio website badge");
      if (user) {
        const followers = await new FindRepo(follower).findAll({ follow_to: user._id, follow_status: true })
        const followings = await new FindRepo(follower).findAll({ follow_from: user._id, follow_status: true })
        return {
          status: process.env.SUCCESS,
          message: Messages.PROFILE_FETCHED,
          data: {
            user,
            follower: followers ? followers.length : 0,
            following: followings ? followings.length : 0
          }
        }
      } else {
        return {
          status: process.env.NOTFOUND,
          message: Messages.USER_NOT_FOUND
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
  async deleteFollower(user_id, { id }) {
    try {
      const follow = await new DeleteRepo(follower).delete(id)
      if (follow) {
        return {
          status: process.env.SUCCESS,
          message: Messages.FOLLOWER_DELETED,
        }
      } else {
        return {
          status: process.env.NOTFOUND,
          message: Messages.USER_NOT_FOUND
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

export default new UserService();
