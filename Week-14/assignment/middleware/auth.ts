import { body } from "express-validator";
import UserModel from "../schema/User";

const authSignupValidationMiddleware = () => {
  return [
    body("email", "Invalid email")
      .isEmail()
      .normalizeEmail({
        all_lowercase: true,
      })
      .custom(async (value) => {
        const userDoc = await UserModel.find({
          email: value,
        });
        if (userDoc && userDoc.length === 1) {
          return Promise.reject("Email already in user");
        }
      }),
    body("username")
      .isString()
      .trim()
      .isLength({
        min: 3,
      })
      .custom(async (value) => {
        const userDoc = await UserModel.find({
          username: value,
        });
        if (userDoc && userDoc.length === 1) {
          return Promise.reject("Username already in user");
        }
      }),
    body("password")
      .isLength({
        min: 8,
      })
      .withMessage("Password must contain at least 8 characters")
      .matches(/[a-zA-Z]/)
      .withMessage("must contain alphabets")
      .matches(/[A-Z]/)
      .withMessage("must contain an uppercase letter")
      .matches(/\d/)
      .withMessage("must contain a number")
      .matches(/[~!@#$%^&*()_+-=\\]/)
      .withMessage("must contain a special character"),
  ];
};

const authLoginValidationMiddleware = () => {
  return [
    body("email", "Invalid email").isEmail().normalizeEmail(),
    body("password")
      .isLength({
        min: 8,
      })
      .withMessage("Password must contain at least 8 characters")
      .matches(/[a-zA-Z]/)
      .withMessage("must contain alphabets")
      .matches(/[A-Z]/)
      .withMessage("must contain an uppercase letter")
      .matches(/\d/)
      .withMessage("must contain a number")
      .matches(/[~!@#$%^&*()_+-=\\]/)
      .withMessage("must contain a special character"),
  ];
};

export { authSignupValidationMiddleware, authLoginValidationMiddleware };
