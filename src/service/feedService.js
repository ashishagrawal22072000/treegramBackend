import FindRepo from "../repo/findRepo.js";
import Messages from "../util/Messages.js";
import userModel from "../model/userModel.js";
import CommonService from "./commonServices.js";
import CreateRepo from "../repo/createRepo.js";
import follower from "../model/follower.js";
import UpdateRepo from "../repo/updateRepo.js";
import lookupRepo from "../repo/lookupRepo.js";
import DeleteRepo from "../repo/deleteRepo.js";
import postModel from "../model/postModel.js";
import hashtagModel from "../model/hashtagModel.js";
import tagModel from "../model/tagModel.js";
import likeModel from "../model/like.js";
import commentModel from "../model/comment.js";
class FeedService extends CommonService {
    constructor() {
        super(CommonService);
        this.FindUserRepo = new FindRepo(postModel);
        this.UpdateUserRepo = new UpdateRepo(postModel);
        this.CreateUserRepo = new CreateRepo(postModel);
    }

    //   async getUserById(id) {
    //     try {
    //       const getUserById = await this.FindUserRepo.findById(id);
    //       if (!getUserById) {
    //         return {
    //           status: process.env.BADREQUEST,
    //           message: Messages.USER_NOT_FOUND,
    //         };
    //       }
    //       return {
    //         status: process.env.SUCCESS,
    //         message: Messages.USER_FOUND,
    //         data: getUserById,
    //       };
    //     } catch (err) {
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }

    //   async getUserByQuery(search, limit, skip) {
    //     try {
    //       const getUserById = await this.FindUserRepo.find(search, limit, skip);
    //       if (!getUserById.length) {
    //         return {
    //           status: process.env.BADREQUEST,
    //           message: Messages.USER_NOT_FOUND,
    //         };
    //       }
    //       return {
    //         status: process.env.SUCCESS,
    //         message: Messages.USER_FOUND,
    //         data: getUserById,
    //       };
    //     } catch (err) {
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }

    //   async followUsers(user_id, follower_id) {
    //     try {
    //       const getUserById = await new FindRepo(follower).findByQuery({
    //         follow_from: user_id,
    //         follow_to: follower_id,
    //       });
    //       console.log(getUserById)
    //       if (!getUserById) {
    //         const follow = await new CreateRepo(follower).create({
    //           follow_from: user_id,
    //           follow_to: follower_id,
    //         });
    //         return {
    //           status: process.env.SUCCESS,
    //           message: Messages.FOLLOW,
    //         };
    //       } else {
    //         getUserById.follow_status = follow_status;
    //         return {
    //           status: process.env.SUCCESS,
    //           message: Messages.FOLLOW,
    //         };
    //         // if (getUserById.follow_status) {
    //         //   console.log(getUserById.status)
    //         //   getUserById.follow_status = false;
    //         //   await getUserById.save();
    //         //   return {
    //         //     status: process.env.SUCCESS,
    //         //     message: Messages.UNFOLLOW,
    //         //   };
    //         // } else {
    //         //   getUserById.follow_status = true;
    //         //   await getUserById.save();
    //         //   return {
    //         //     status: process.env.SUCCESS,
    //         //     message: Messages.FOLLOW,
    //         //   };
    //         // }
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }

    //   async AddToFavouriate(user_id, follower_id) {
    //     try {
    //       const favouriate = await new FindRepo(follower).findByQuery({
    //         follow_from: user_id,
    //         follow_to: follower_id,
    //       });
    //       if (favouriate.favouriate_status) {
    //         favouriate.favouriate_status = false;
    //         await favouriate.save();
    //         return {
    //           status: process.env.SUCCESS,
    //           message: Messages.REMOVE_FROM_FAVOURIATE,
    //         };
    //       } else {
    //         favouriate.favouriate_status = true;
    //         await favouriate.save();
    //         return {
    //           status: process.env.SUCCESS,
    //           message: Messages.ADD_TO_FAVOURIATE,
    //         };
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }

    //   async AddcloseFriends(user_id, friend_id) {
    //     try {
    //       const friend = await new FindRepo(follower).findByQuery({
    //         follow_from: user_id,
    //         follow_to: friend_id,
    //       });
    //       if (friend.close_status) {
    //         friend.close_status = false;
    //         await friend.save();
    //         return {
    //           status: process.env.SUCCESS,
    //           message: Messages.REMOVE_CLOSE_FRIEND,
    //         };
    //       } else {
    //         friend.close_status = true;
    //         await friend.save();
    //         return {
    //           status: process.env.SUCCESS,
    //           message: Messages.ADD_CLOSE_FRIEND,
    //         };
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }
    //   async UpdateAccountPrivacy(user_id, privacy_id) {
    //     try {
    //       const user = await this.FindUserRepo.findById(user_id);
    //       if (user) {
    //         user.privacy_id = privacy_id;
    //         await user.save();
    //         return {
    //           status: process.env.SUCCESS,
    //           message: Messages.USER_UPDATE,
    //         };
    //       } else {
    //         return {
    //           status: process.env.NOTFOUND,
    //           message: Messages.USER_NOT_FOUND,
    //         };
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }
    //   async UpdateAccountDetails(user_id, data) {
    //     try {
    //       const updateAccount = await this.UpdateUserRepo.updateById(user_id, data);
    //       if (!updateAccount) {
    //         return {
    //           status: process.env.BADREQUEST,
    //           message: Messages.SOME_ERROR,
    //         };
    //       }
    //       return {
    //         status: process.env.SUCCESS,
    //         message: Messages.USER_UPDATE,
    //       };
    //     } catch (err) {
    //       console.log(err);
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }
    //   async getFollowerList(user_id, { username, limit, skip }) {
    //     try {
    //       const user = await this.FindUserRepo.findByUsername(username);
    //       if (user) {
    //         const followers = await new FindRepo(follower).findAll(
    //           {
    //             follow_to: user._id,
    //             status: true,
    //           },
    //           "follow_from",
    //           limit,
    //           skip,
    //           { model: "follow_from", attribute: "username profile email" }
    //         );
    //         return {
    //           status: process.env.SUCCESS,
    //           message: `Follower fetched successfully,`,
    //           data: followers.length ? followers : [],
    //         };
    //       }
    //       else {
    //         return {
    //           status: process.env.NOTFOUND,
    //           message: Messages.USER_NOT_FOUND
    //         }
    //       }

    //     } catch (err) {
    //       console.log(err);
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }
    //   async getfollowingList(user_id, { username, limit, skip }) {
    //     try {
    //       const user = await this.FindUserRepo.findByUsername(username);
    //       if (user) {
    //         const following = await new FindRepo(follower).findAll(
    //           {
    //             follow_from: user._id,
    //             follow_status: true,
    //           },
    //           "follow_to",
    //           limit,
    //           skip,
    //           { model: "follow_to", attribute: "username profile email" }
    //         );

    //         return {
    //           status: process.env.SUCCESS,
    //           message: `Follower fetched successfully,`,
    //           data: following.length ? following : [],
    //         };
    //       } else {
    //         return {
    //           status: process.env.NOTFOUND,
    //           message: Messages.USER_NOT_FOUND
    //         }
    //       }

    //     } catch (err) {
    //       console.log(err);
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }
    //   async getCloseFriendList(user_id, { limit, skip }) {
    //     try {
    //       const closeFriend = await new FindRepo(follower).findAll(
    //         {
    //           follow_from: user_id,
    //           close_status: true,
    //         },
    //         "follow_to",
    //         limit,
    //         skip,
    //         { model: "follow_to", attribute: "username profile email" }
    //       );

    //       return {
    //         status: process.env.SUCCESS,
    //         message: `close friend fetched successfully,`,
    //         data: closeFriend.length ? closeFriend : [],
    //       };
    //     } catch (err) {
    //       console.log(err);
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }

    //   async getFavouriateList(user_id, { limit, skip }) {
    //     try {
    //       const FavouriateList = await new FindRepo(follower).findAll(
    //         {
    //           follow_from: user_id,
    //           favouriate_status: true,
    //         },
    //         "follow_to",
    //         limit,
    //         skip,
    //         { model: "follow_to", attribute: "username profile email" }
    //       );

    //       return {
    //         status: process.env.SUCCESS,
    //         message: `favouriates fetched successfully,`,
    //         data: FavouriateList.length ? FavouriateList : [],
    //       };
    //     } catch (err) {
    //       console.log(err);
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }
    //   async getUserList(user_id, { limit, skip }) {
    //     try {
    //       const userList = await this.FindUserRepo.findAll(
    //         {
    //           _id: { $ne: user_id },
    //         },
    //         "username email profile badge",
    //         limit,
    //         skip
    //       );

    //       if (userList.length) {
    //         let users = [];
    //         for (let i = 0; i < userList.length; i++) {
    //           const data = await new FindRepo(follower).findByQuery({
    //             follow_from: user_id,
    //             follow_to: userList[i]._id,
    //           });
    //           if (!data) users.push(userList[i]);
    //         }
    //         console.log(users.length);
    //         return {
    //           status: process.env.SUCCESS,
    //           message: `favouriates fetched successfully,`,
    //           data: users.length ? users : [],
    //         };
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }

    //   async viewProfile(user_id, { username }) {
    //     try {
    //       const user = await this.FindUserRepo.findByUsername(username, "username name profile privacy_id bio website badge");
    //       if (user) {
    //         const followers = await new FindRepo(follower).findAll({ follow_to: user._id, follow_status: true })
    //         const followings = await new FindRepo(follower).findAll({ follow_from: user._id, follow_status: true })
    //         return {
    //           status: process.env.SUCCESS,
    //           message: Messages.PROFILE_FETCHED,
    //           data: {
    //             user,
    //             follower: followers ? followers.length : 0,
    //             following: followings ? followings.length : 0
    //           }
    //         }
    //       } else {
    //         return {
    //           status: process.env.NOTFOUND,
    //           message: Messages.USER_NOT_FOUND
    //         }
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }
    //   async deleteFollower(user_id, { id }) {
    //     try {
    //       const follow = await new DeleteRepo(follower).delete(id)
    //       if (follow) {
    //         return {
    //           status: process.env.SUCCESS,
    //           message: Messages.FOLLOWER_DELETED,
    //         }
    //       } else {
    //         return {
    //           status: process.env.NOTFOUND,
    //           message: Messages.USER_NOT_FOUND
    //         }
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       return {
    //         status: process.env.INTERNALSERVERERROR,
    //         message: Messages.INTERNAL_SERVER_ERROR,
    //       };
    //     }
    //   }

    async createPost(user_id, data) {
        try {
            const createPost = await this.CreateUserRepo.create({ user: user_id, ...data })
            if (!createPost) {
                return {
                    status: process.env.BADREQUEST,
                    message: createPost.message
                };
            } else {
                const createComment = await new CreateRepo(commentModel).create({ post_id: createPost._id })
                if (!createComment) throw new Error(createComment.message)
                if (data.hashtag && data.hashtag.length) {
                    var hashtags = [];
                    for (let i = 0; i < data.hashtag.length; i++) {
                        const hash = await new FindRepo(hashtagModel).findByQuery({ name: data.hashtag[i] })
                        if (!hash) {
                            const createhash = await new CreateRepo(hashtagModel).create({ name: data.hashtag[i] })
                            hashtags.push(createhash)
                        }
                    }
                }
                if (data.tag && data.tag.length) {
                    var tags = [];
                    for (let i = 0; i < data.tag.length; i++) {
                        console.log(data.tag[i].tagged_people, data.tag[i].media_url)
                        const createTag = await new CreateRepo(tagModel).create({ post_id: createPost._id, tags: data.tag[i] })
                        tags.push(createTag)
                    }
                }
            }
            return {
                status: process.env.SUCCESS,
                message: Messages.USER_FOUND,
                data: { ...JSON.parse(JSON.stringify(createPost)), hashtags, tags },
            };
        } catch (err) {
            console.log(err)
            return {
                status: process.env.INTERNALSERVERERROR,
                message: Messages.INTERNAL_SERVER_ERROR,
            };
        }
    }

    async getSinglePost(id) {
        try {
            const post = await this.FindUserRepo.findById(id);
            if (!post)
                return {
                    status: process.env.NOTFOUND,
                    message: Messages.POST_NOT_FOUND
                }
            else {
                let like = await new FindRepo(likeModel).findAndCount({ post_id: post._id })
                const tags = await new FindRepo(tagModel).findByQuery({ post_id: post._id }, "post_id tags")
                return {
                    status: process.env.SUCCESS,
                    message: Messages.POST_FOUND,
                    data: { ...JSON.parse(JSON.stringify(post)), like_count: like, tags }
                }
            }

        } catch (err) {
            console.log(err)
            return {
                status: process.env.INTERNALSERVERERROR,
                message: Messages.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async likePost(user_id, data) {
        try {
            const user = await new FindRepo(userModel).findById(user_id, "username profile");
            if (!user) {
                return {
                    status: process.env.NOTFOUND,
                    message: Messages.USER_NOT_FOUND
                }
            }
            const like = await new FindRepo(likeModel).findByQuery({ user_id, post_id: data._id })
            if (!like) {
                const createLike = await new CreateRepo(likeModel).create({ user_id, post_id: data._id, username: user.username, profile: user.profile })
                if (!createLike) throw new Error(createLike.message)
                return {
                    status: process.env.SUCCESS,
                    message: Messages.POST_LIKE,
                    data: createLike
                }
            } else {
                const deleteLike = await new DeleteRepo(likeModel).delete({ _id: like._id })
                if (!deleteLike) throw new Error(updateLike.message)
                return {
                    status: process.env.SUCCESS,
                    message: Messages.POST_UNLIKE,
                    data: deleteLike
                }
                // }
            }
        } catch (err) {
            console.log(err)
            return {
                status: process.env.INTERNALSERVERERROR,
                message: Messages.INTERNAL_SERVER_ERROR,
            };
        }
    }

    async getAllPosts({ limit, skip }) {
        try {
            let post = await this.FindUserRepo.findAll({}, "_id user content location media commment_status like_status", limit, skip, { model: "user", attribute: "username profile name privacy_id badge" });
            if (!post)
                return {
                    status: process.env.NOTFOUND,
                    message: Messages.POST_NOT_FOUND
                }
            let likes = 0
            let comment_count = []
            for (let i = 0; i < post.length; i++) {
                let tags = await new FindRepo(tagModel).findAll({ post_id: post[i]._id }, "tags")
                if (!post[i].comment_status) {
                    comment_count = await new FindRepo(commentModel).findByQuery({ post_id: post[i]._id }, "comments")
                }
                if (!post[i].like_status) {
                    likes = await new FindRepo(likeModel).findAndCount({ post_id: post[i]._id }, "_id, user_id username profile")
                }
                post[i] = { ...JSON.parse(JSON.stringify(post[i])), like_count: likes, tags, comment_count: comment_count.comments.length }
            }
            return {
                status: process.env.SUCCESS,
                message: Messages.POST_FOUND,
                data: post
            }

        } catch (err) {
            console.log(err)
            return {
                status: process.env.INTERNALSERVERERROR,
                message: Messages.INTERNAL_SERVER_ERROR,
            };
        }
    }

    async postComment(user_id, { post_id, comment }) {
        try {
            const user = await new FindRepo(userModel).findById(user_id, "username profile")
            if (!user) {
                return {
                    status: process.env.NOTFOUND,
                    message: Messages.USER_NOT_FOUND,
                }
            }
            const post = await this.FindUserRepo.findById(post_id)
            if (!post) {
                return {
                    status: process.env.NOTFOUND,
                    message: Messages.ERROR_404
                }
            }
            const updateComment = await new UpdateRepo(commentModel).update({ post_id: post._id }, { $push: { comments: { user_id, comment, username: user.username, profile: user.profile } } })
            if (!updateComment) throw new Error(updateComment.message)
            return {
                status: process.env.SUCCESS,
                message: Messages.COMMENT_POSTED,
                data: updateComment
            }
        } catch (err) {
            console.log(err)
            return {
                status: process.env.INTERNALSERVERERROR,
                message: Messages.INTERNAL_SERVER_ERROR,
            };
        }
    }


    async deleteComment(user_id, { post_id, comment_id }) {
        try {
            const post = await this.FindUserRepo.findById(post_id)
            if (!post) {
                return {
                    status: process.env.NOTFOUND,
                    message: Messages.ERROR_404
                }
            }
            const updateComment = await new UpdateRepo(commentModel).update({ post_id, user_id }, { $pull: { comments: { _id: comment_id } } })
            if (!updateComment) throw new Error(updateComment.message)
            return {
                status: process.env.SUCCESS,
                message: Messages.COMMENT_DELETED
            }
        } catch (err) {
            console.log(err)
            return {
                status: process.env.INTERNALSERVERERROR,
                message: Messages.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async replyComment(user_id, { comment_id, post_id, comment }) {
        try {
            const user = await new FindRepo(userModel).findById(user_id, "username profile")
            if (!user) {
                return {
                    status: process.env.NOTFOUND,
                    message: Messages.USER_NOT_FOUND,
                }
            }
            const post = await this.FindUserRepo.findById(post_id)
            if (!post) {
                return {
                    status: process.env.NOTFOUND,
                    message: Messages.ERROR_404
                }
            }
            const updateComment = await new UpdateRepo(commentModel).update({ post_id, "comments._id": comment_id }, {
                $push: {
                    "comments.$.comment_reply": { user_id, comment, username: user.username, profile: user.profile }
                }
            })
            console.log(updateComment)
            if (!updateComment) throw new Error(updateComment.message)
            return {
                status: process.env.SUCCESS,
                message: Messages.COMMENT_POSTED
            }
        } catch (err) {
            console.log(err)
            return {
                status: process.env.INTERNALSERVERERROR,
                message: Messages.INTERNAL_SERVER_ERROR,
            };
        }
    }

    async updateComment(user_id, { post_id, comment_id, comment }) {
        try {
            const post = await this.FindUserRepo.findById(post_id)
            if (!post) {
                return {
                    status: process.env.NOTFOUND,
                    message: Messages.ERROR_404
                }
            }
            // const updateComment = await new UpdateRepo(commentModel).update({ post_id, user_id }, {comments: { _id: comment_id }})
            const updateComment = await new UpdateRepo(commentModel).update({ post_id, "comments._id": comment_id }, { $set: comment })
            if (!updateComment) throw new Error(updateComment.message)

            // const findcommentPost = await new FindRepo(commentModel).findByQuery({ post_id })
            // if (!findcommentPost) {
            //     const commentPost = await new CreateRepo(commentModel).create({ post_id, comments: [{ user_id, comment }] })
            //     if (!commentPost) throw new Error(commentPost.message)
            //     return {
            //         status: process.env.SUCCESS,
            //         message: Messages.COMMENT_POSTED,
            //         data: commentPost
            //     }
            // }
            // else {
            //     const updateComment = await new UpdateRepo(commentModel).update({ _id: findcommentPost._id }, { $push: { comments: { user_id, comment } } })
            //     if (!updateComment) throw new Error(updateComment.message)
            return {
                status: process.env.SUCCESS,
                message: Messages.COMMENT_POSTED,
                data: updateComment
            }
        } catch (err) {
            console.log(err)
            return {
                status: process.env.INTERNALSERVERERROR,
                message: Messages.INTERNAL_SERVER_ERROR,
            };
        }
    }

    async getCommentList({ post_id }) {
        try {
            const post = await this.FindUserRepo.findById(post_id)
            if (!post) {
                return {
                    status: process.env.NOTFOUND,
                    message: Messages.ERROR_404
                }
            }
            const getAllComments = await new FindRepo(commentModel).findByQuery({ post_id }, "comments")
            if (!getAllComments) throw new Error(getAllComments.message)
            return {
                status: process.env.SUCCESS,
                message: Messages.COMMENT_POSTED,
                data: getAllComments
            }
        } catch (err) {
            console.log(err)
            return {
                status: process.env.INTERNALSERVERERROR,
                message: Messages.INTERNAL_SERVER_ERROR,
            };
        }
    }

}

export default new FeedService();
