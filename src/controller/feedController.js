import feedService from "../service/feedService.js";
import userService from "../service/userService.js";
import Messages from "../util/Messages.js";
import feedvalidator from "../validator/feedvalidator.js";
import userValidator from "../validator/userValidator.js";

class feedController {
    async createPost(req, res) {
        try {
            const createPost = await feedService.createPost(req.loginUser.id, req.body);
            // if (createPost.status == process.env.SUCCESS) {
            //     const post = await feedService.postService(req.params.user_id, createPost.data)
            //     return res.status(post.status).json({
            //         success: post.status == process.env.SUCCESS ? true : false,
            //         message: post.message,
            //         data: post.data,
            //     });
            // }
            return res.status(createPost.status).json({
                success: createPost.status == process.env.SUCCESS ? true : false,
                message: createPost.message,
                data: createPost.data,
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


    async getSinglePost(req, res) {
        try {
            const post = await feedService.getSinglePost(req.params.id);
            return res.status(post.status).json({
                success: post.status == process.env.SUCCESS ? true : false,
                message: post.message,
                data: post.data
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: `INTERNAL SERVER ERROR`,
                data: err.message,
            });
        }
    }
    async likePost(req, res) {
        try {
            const post = await feedService.getSinglePost(req.params.post_id);
            console.log(post)
            if (post.status == process.env.SUCCESS) {
                const like = await feedService.likePost(req.loginUser.id, post.data)
                return res.status(like.status).json({
                    success: like.status == process.env.SUCCESS ? true : false,
                    message: like.message,
                    data: like.data
                })
            }
            return res.status(post.status).json({
                success: false,
                message: post.message
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: `INTERNAL SERVER ERROR`,
                data: err.message,
            });
        }
    }

    async getAllPosts(req, res) {
        try {
            const getPostListSchema = feedvalidator.getPostList.validate(req.query);
            if (getPostListSchema.error) {
                return res.status(process.env.BADREQUEST).json({
                    success: false,
                    message: getPostListSchema.error.details[0].message,
                });
            }
            const postList = await feedService.getAllPosts(getPostListSchema.value);
            return res.status(postList.status).json({
                success: postList.status == process.env.SUCCESS ? true : false,
                message: postList.message,
                data: postList.data
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: `INTERNAL SERVER ERROR`,
                data: err.message,
            });
        }
    }


    async commentPost(req, res) {
        try {
            // const postCommentSchema = feedvalidator.postComment.validate(req.body)
            // if (postCommentSchema.error) {
            //     return res.status(process.env.BADREQUEST).json({
            //         success: false,
            //         message: postCommentSchema.error.details[0].message,
            //     });
            // }
            const comment = await feedService.postComment(req.loginUser.id, req.body)
            return res.status(comment.status).json({
                success: comment.status == process.env.SUCCESS ? true : false,
                message: comment.message,
                data: comment.data
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: `INTERNAL SERVER ERROR`,
                data: err.message,
            });
        }
    }

    async deleteComment(req, res) {
        try {
            const removeComment = await feedService.deleteComment(req.loginUser.id, req.body)
            return res.status(removeComment.status).json({
                success: removeComment.status == process.env.SUCCESS ? true : false,
                message: removeComment.message
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: `INTERNAL SERVER ERROR`,
                data: err.message,
            });
        }
    }

    async updateComment(req, res) {
        try {
            const comment = await feedService.updateComment(req.loginUser.id, req.body)
            return res.status(comment.status).json({
                success: comment.status == process.env.SUCCESS ? true : false,
                message: comment.message
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: `INTERNAL SERVER ERROR`,
                data: err.message,
            });
        }

    }

    async replyComment(req, res) {
        try {
            const replyComment = await feedService.replyComment(req.loginUser.id, req.body)
            return res.status(replyComment.status).json({
                success: replyComment.status == process.env.SUCCESS ? true : false,
                message: replyComment.message
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: `INTERNAL SERVER ERROR`,
                data: err.message,
            });
        }
    }

    async getCommentList(req, res) {
        try {
            const getComment = await feedService.getCommentList(req.params)
            return res.status(getComment.status).json({
                success: getComment.status == process.env.SUCCESS ? true : false,
                message: getComment.message,
                data: getComment.data
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: `INTERNAL SERVER ERROR`,
                data: err.message,
            });
        }
    }



    // async userById(req, res) {
    //     try {
    //         const userById = await userService.getUserById(req.params.user_id);
    //         if (!userById) throw new Error("User not Found");
    //         console.log(userById);
    //         return res.status(userById.status).json({
    //             success: userById.status == process.env.SUCCESS ? true : false,
    //             message: userById.message,
    //             data: userById.data,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }

    // async getUserBySearch(req, res) {
    //     try {
    //         const { search, limit, skip } = req.query;
    //         console.log(search);
    //         const userById = await userService.getUserByQuery(search, limit, skip);
    //         if (!userById) throw new Error("User not Found");
    //         return res.status(userById.status).json({
    //             success: userById.status == process.env.SUCCESS ? true : false,
    //             message: userById.message,
    //             data: userById.data,
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }
    // async follow(req, res) {
    //     try {
    //         const followUser = await userService.followUsers(
    //             req.loginUser.id,
    //             req.body.follower_id
    //         );
    //         if (!followUser) throw new Error("User not Found");
    //         return res.status(followUser.status).json({
    //             success: followUser.status == process.env.SUCCESS ? true : false,
    //             message: followUser.message,
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }

    // async closeFriend(req, res) {
    //     try {
    //         const closeFriend = await userService.AddcloseFriends(
    //             req.loginUser.id,
    //             req.body.follower_id
    //         );
    //         if (!closeFriend) throw new Error("User not Found");
    //         return res.status(closeFriend.status).json({
    //             success: closeFriend.status == process.env.SUCCESS ? true : false,
    //             message: closeFriend.message,
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }

    // async Favouriate(req, res) {
    //     try {
    //         const AddFavouriate = await userService.AddToFavouriate(
    //             req.loginUser.id,
    //             req.body.follower_id
    //         );
    //         if (!AddFavouriate) throw new Error("User not Found");
    //         return res.status(AddFavouriate.status).json({
    //             success: AddFavouriate.status == process.env.SUCCESS ? true : false,
    //             message: AddFavouriate.message,
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }

    // async AccountPrivacy(req, res) {
    //     try {
    //         const AccountPrivacy = await userService.UpdateAccountPrivacy(
    //             req.loginUser.id,
    //             req.body.privacy_id
    //         );
    //         if (!AccountPrivacy) throw new Error("User not Found");
    //         return res.status(AccountPrivacy.status).json({
    //             success: AccountPrivacy.status == process.env.SUCCESS ? true : false,
    //             message: AccountPrivacy.message,
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }
    // async Account(req, res) {
    //     try {
    //         const updateAccountValidation =
    //             userValidator.updateAccountValidator.validate(req.body);
    //         if (updateAccountValidation.error) {
    //             return res.status(process.env.BADREQUEST).json({
    //                 success: false,
    //                 message: updateAccountValidation.error.details[0].message,
    //             });
    //         }
    //         const updateAccount = await userService.UpdateAccountDetails(
    //             req.loginUser.id,
    //             updateAccountValidation.value
    //         );
    //         if (!updateAccount) throw new Error("User not Found");
    //         return res.status(updateAccount.status).json({
    //             success: updateAccount.status == process.env.SUCCESS ? true : false,
    //             message: updateAccount.message,
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }
    // async FollowerList(req, res) {
    //     try {
    //         console.log("dfhdbfhdbf");
    //         const followerList = await userService.getFollowerList(
    //             req.loginUser.id,
    //             req.query
    //         );

    //         return res.status(followerList.status).json({
    //             success: followerList.status == process.env.SUCCESS ? true : false,
    //             message: followerList.message,
    //             data: followerList.data,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }
    // async FollowingList(req, res) {
    //     try {
    //         const followingList = await userService.getfollowingList(
    //             req.loginUser.id,
    //             req.query
    //         );
    //         return res.status(followingList.status).json({
    //             success: followingList.status == process.env.SUCCESS ? true : false,
    //             message: followingList.message,
    //             data: followingList.data,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }
    // async closeFriendList(req, res) {
    //     try {
    //         const closeFriendList = await userService.getCloseFriendList(
    //             req.loginUser.id,
    //             req,
    //             query
    //         );
    //         return res.status(closeFriendList.status).json({
    //             success: closeFriendList.status == process.env.SUCCESS ? true : false,
    //             message: closeFriendList.message,
    //             data: closeFriendList.data,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }

    // async FavouriateList(req, res) {
    //     try {
    //         const favouriateList = await userService.getFavouriateList(
    //             req.loginUser.id,
    //             req.query
    //         );
    //         return res.status(favouriateList.status).json({
    //             success: favouriateList.status == process.env.SUCCESS ? true : false,
    //             message: favouriateList.message,
    //             data: favouriateList.data,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }
    // async UserList(req, res) {
    //     try {
    //         const userList = await userService.getUserList(
    //             req.loginUser.id,
    //             req.query
    //         );
    //         return res.status(userList.status).json({
    //             success: userList.status == process.env.SUCCESS ? true : false,
    //             message: userList.message,
    //             data: userList.data,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }
    // async getAuthUser(req, res) {
    //     try {
    //         const authUser = await userService.getUserById(
    //             req.loginUser.id,
    //         );
    //         return res.status(authUser.status).json({
    //             success: authUser.status == process.env.SUCCESS ? true : false,
    //             message: authUser.message,
    //             data: authUser.data,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }
    // async ViewProfile(req, res) {
    //     try {
    //         const authUser = await userService.viewProfile(
    //             req.loginUser.id,
    //             req.query
    //         );
    //         return res.status(authUser.status).json({
    //             success: authUser.status == process.env.SUCCESS ? true : false,
    //             message: authUser.message,
    //             data: authUser.data,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }
    // }

    // async deleteFollower(req, res) {
    //     try {
    //         const user = await userService.deleteFollower(
    //             req.loginUser.id,
    //             req.params
    //         );
    //         return res.status(user.status).json({
    //             success: user.status == process.env.SUCCESS ? true : false,
    //             message: user.message,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({
    //             success: false,
    //             message: `INTERNAL SERVER ERROR`,
    //             data: err.message,
    //         });
    //     }

    // }
}

export default new feedController();
