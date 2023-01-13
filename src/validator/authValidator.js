import Joi from "joi";
class AuthValidator {
  signUpValidator = Joi.object().keys({
    username: Joi.string()
      .trim()
      .min(3)
      .max(20)
      .pattern(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/)
      .required()
      .messages({
        "any.required": "USERNAME REQUIRED",
        "string.empty": "USERNAME SHOULD NOT BE EMPTY",
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
      .required()
      .messages({
        "any.required": "EMAIL REQUIRED",
        "string.empty": " EMAIL SHOULD NOT BE EMPTY",
        "string.email": "EMAIL IS NOT VALID",
      }),
    password: Joi.string()
      .trim()
      .min(8)
      .max(20)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
      )
      .required()
      .messages({
        "any.required": "PASSWORD REQUIRED",
        "string.empty": " PASSWORD SHOULD NOT BE EMPTY",
        "string.min": "8 CHARACTER REQUIRED",
        "string.max": "20 CHARACTER ONLY",
        "string.pattern.base":
          "Minimum eight characters, at least one letter and one number",
      }),
    dateOfBirth: Joi.string().trim().required().messages({
      "any.required": "Date of Birth is required",
    }),
    phone: Joi.string()
      .trim()
      .min(10)
      .pattern(/^[6-9]{1}[0-9]{9}$/)
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
    name: Joi.string().trim().required().messages({
      "any.required": "EMAIL, USERNAME or PHONE REQUIRED",
      "string.empty": "EMAIL, USERNAME or PHONE SHOULD NOT BE EMPTY",
    }),
    password: Joi.string().trim().required().messages({
      "any.required": "PASSWORD REQUIRED",
      "string.empty": " PASSWORD SHOULD NOT BE EMPTY",
    }),
  });

  forgetEmailValidator = Joi.object().keys({
    phone: Joi.string().trim().required(),
  });
  forgetPasswordValidator = Joi.object().keys({
    name: Joi.string().trim().required().messages({
      "any.required": "EMAIL, USERNAME or PHONE REQUIRED",
      "string.empty": "EMAIL, USERNAME or PHONE SHOULD NOT BE EMPTY",
    }),
  });

  ChangePasswordSchema = Joi.object().keys({
    confirmPassword: Joi.string().required().messages({
      "string.empty": `Old password cannot be empty`,
      "any.required": `Old password is required`,
    }),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
      )
      .required()
      .messages({
        "string.empty": `New password cannot be empty`,
        "any.required": `New password is required`,
        "string.pattern.base": `New Password should be minimum 8 characters long (1 UpperCase Alphabet, 1 LowerCase Alphabet, 1 Number, 1 Special Character )`,
      }),
  });
}

export default new AuthValidator();
