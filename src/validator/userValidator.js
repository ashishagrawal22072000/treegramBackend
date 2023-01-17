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
}

export default new UserValidator();
