import Joi from "joi";
class AuthValidator {
  signUpValidator = Joi.object().keys({
    firstName: Joi.string()
      .trim()
      .min(3)
      .max(20)
      .pattern(/[A-Za-z]/)
      .required()
      .messages({
        "any.required": "FIRST NAME REQUIRED",
        "string.empty": " FIRST NAME SHOULD NOT BE EMPTY",
        "string.min": "3 CHARACTER REQUIRED",
        "string.max": "20 CHARACTER ONLY",
        "string.pattern.base": "ALPHABETIC REQUIRED",
      }),
    lastName: Joi.string()
      .trim()
      .min(3)
      .max(20)
      .pattern(/[A-Za-z]/)
      .required()
      .messages({
        "any.required": "LAST NAME REQUIRED",
        "string.empty": " LAST NAME SHOULD NOT BE EMPTY",
        "string.min": "3 CHARACTER REQUIRED",
        "string.max": "20 CHARACTER ONLY",
        "string.pattern.base": "ALPHABETIC REQUIRED",
      }),
    email: Joi.string()
      .trim()
      .email({
        maxDomainSegments: 2,
        tlds: { allow: ["com", "co", "in"] },
      })
      .required()
      .messages({
        "any.required": "EMAIL REQUIRED",
        "string.empty": " EMAIL SHOULD NOT BE EMPTY",
        "string.email": "EMAIL IS NOT VALID",
      }),
    password: Joi.string()
      .trim()
      .min(3)
      .max(20)
      .pattern(/[A-Za-z]/)
      .required()
      .messages({
        "any.required": "PASSWORD REQUIRED",
        "string.empty": " PASSWORD SHOULD NOT BE EMPTY",
        "string.min": "3 CHARACTER REQUIRED",
        "string.max": "20 CHARACTER ONLY",
        "string.pattern.base": "ALPHABETIC REQUIRED",
      }),
    phone: Joi.string()
      .trim()
      .min(3)
      .max(20)
      .pattern(/[0-9]{10}/)
      .required()
      .messages({
        "any.required": "MOBILE REQUIRED",
        "string.empty": " MOBILE SHOULD NOT BE EMPTY",
        "string.min": "10 CHARACTER REQUIRED",
        "string.max": "10 CHARACTER ONLY",
        "string.pattern.base": "NUMBERIC REQUIRED",
      }),
    profile: Joi.string().default(
      "./../.././public/assests/images/7074311_3551739.jpg"
    ),
  });

  loginValidator = Joi.object().keys({
    email: Joi.string()
      .trim()
      .email({
        maxDomainSegments: 2,
        tlds: { allow: ["com", "co", "in"] },
      })
      .required()
      .messages({
        "any.required": "EMAIL REQUIRED",
        "string.empty": " EMAIL SHOULD NOT BE EMPTY",
        "string.email": "EMAIL IS NOT VALID",
      }),
    password: Joi.string()
      .trim()
      .min(3)
      .max(20)
      .pattern(/[A-Za-z]/)
      .required()
      .messages({
        "any.required": "PASSWORD REQUIRED",
        "string.empty": " PASSWORD SHOULD NOT BE EMPTY",
        "string.min": "3 CHARACTER REQUIRED",
        "string.max": "20 CHARACTER ONLY",
        "string.pattern.base": "ALPHABETIC REQUIRED",
      }),
  });

  forgetEmailValidator = Joi.object().keys({
    phone: Joi.string().trim().required(),
  });
  forgetPasswordValidator = Joi.object().keys({
    email: Joi.string()
      .trim()
      .email({
        maxDomainSegments: 2,
        tlds: { allow: ["com", "co", "in"] },
      })
      .required()
      .messages({
        "any.required": "EMAIL REQUIRED",
        "string.empty": " EMAIL SHOULD NOT BE EMPTY",
        "string.email": "EMAIL IS NOT VALID",
      }),
  });
}

export default new AuthValidator();
