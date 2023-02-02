import Joi from "joi";
class FeedValidator {
    getPostList = Joi.object().keys({
        limit: Joi.number().integer().min(1).default(10),
        skip: Joi.number().integer().min(0).default(0)
    })
    postComment = Joi.object().keys({
        post_id: Joi.string().required(),
        comment: Joi.string().required()
    })
}

export default new FeedValidator();
