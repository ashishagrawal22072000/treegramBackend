import Joi from "joi";
class UserValidator {
  updateAccountValidator = Joi.object().keys({
    username: Joi.string()
      .trim()
      .min(3)
      .max(20)
      .allow("")
      .pattern(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/)
      .messages({
        "string.min": "5 CHARACTER REQUIRED",
        "string.max": "20 CHARACTER ONLY",
        "string.pattern.base":
          "Username Only contains alphanumeric characters, underscore and dot",
      }),
    name: Joi.string().allow(""),
    email: Joi.string()
      .trim()
      .email({
        maxDomainSegments: 3,
        tlds: { allow: ["com", "co", "in"] },
      })
      .allow(""),
    phone: Joi.string()
      .trim()
      .min(10)
      .pattern(/^[6-9]{1}[0-9]{9}$/)
      .allow("")
      .messages({
        "string.empty": " MOBILE SHOULD NOT BE EMPTY",
        "string.min": "10 CHARACTER REQUIRED",
        "string.max": "10 CHARACTER ONLY",
        "string.pattern.base": "NUMBERIC REQUIRED",
      }),
    profile: Joi.string()
      .allow("")
      .default("./../.././public/assests/images/7074311_3551739.jpg"),
    website: Joi.string().trim().allow(""),
    bio: Joi.string().trim().allow(""),
    gender: Joi.string().trim().allow(""),
  });
  searchUser = Joi.object().keys({
    search: Joi.string().trim().required().messages({
      "any.required": "EMAIL or USERNAME REQUIRED",
    }),
    limit: Joi.number().integer().min(1).default(10),
    skip: Joi.number().integer().min(0).default(0)
  })
}

export default new UserValidator();
