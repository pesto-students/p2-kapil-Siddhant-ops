import { body, oneOf } from "express-validator";

const userUpdateValidationMiddleware = () => {
  return oneOf(
    [
      body("newUsername", "invalid username")
        .isString()
        .trim()
        .isLength({
          min: 3,
        })
        .withMessage("username should have minimum length of 3"),
      [
        body("newEmail", "Invalid email").isEmail().normalizeEmail({
          all_lowercase: true,
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
      ],
      [
        body("oldPassword")
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
        body("newPassword")
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
      ],
    ],
    "body should contain update params like newUsername, newEmail ( with password ) or newPassword ( with email and oldPassword ) and their respective values"
  );
};

export { userUpdateValidationMiddleware };
