import { compare, genSalt, hash } from "bcrypt";
import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import { sign } from "jsonwebtoken";
import { authLoginValidationMiddleware } from "../middleware/auth";
import { verifyToken } from "../middleware/token";
import { userUpdateValidationMiddleware } from "../middleware/userInfo";
import UserModel from "../schema/User";
import { secret } from "../utils/constants";
import { decodeToken } from "../utils/token";

const router = Router({
  caseSensitive: true,
});

router.post(
  "/delete",
  [verifyToken, ...authLoginValidationMiddleware()],
  async (req: Request, res: Response) => {
    const expressValidationErrors = validationResult(req);

    if (!expressValidationErrors.isEmpty()) {
      return res.status(400).json({
        errors: expressValidationErrors.array(),
      });
    }

    const inputEmail = req.body.email;

    try {
      const userDoc = await UserModel.findOne({ email: inputEmail });

      if (userDoc === null)
        return res.status(400).json({
          message: "User not found",
        });

      const passwordIsSame = await compare(req.body.password, userDoc.password);

      if (!passwordIsSame)
        return res.status(400).json({
          message: "Invalid credentials",
        });

      await userDoc.deleteOne();

      return res.sendStatus(200);
    } catch (error) {
      if (error) {
        console.error(error);
        return res.status(400).json({
          error,
        });
      }
    }
  }
);

router.post(
  "/updateInfo",
  [verifyToken, userUpdateValidationMiddleware()],
  async (req: Request, res: Response) => {
    const expressValidationErrors = validationResult(req);

    if (!expressValidationErrors.isEmpty()) {
      return res.status(400).json({
        error: expressValidationErrors.array(),
      });
    }

    const userUUID = decodeToken(req.token);

    if (req.body.newPassword) {
      const queryNewPassword = req.body.newPassword;
      const queryOldPassword = req.body.oldPassword;

      try {
        const userDoc = await UserModel.findOne({ uuid: userUUID });

        if (userDoc === null)
          return res.status(400).json({
            message: "User not found with the given email",
          });

        const isSamePassword = await compare(
          queryOldPassword,
          userDoc.password
        );

        if (!isSamePassword)
          return res.status(400).json({
            message: "Invalid credentials",
          });

        const salt = await genSalt(10);

        const passwordHash = await hash(queryNewPassword, salt);

        userDoc.password = passwordHash;

        const docRes = await userDoc.save();

        const payload = {
          uuid: docRes.uuid,
        };

        sign(
          payload,
          secret,
          {
            expiresIn: "7d",
          },
          (signErr, token) => {
            if (signErr) throw signErr;

            return res.status(201).json({
              token,
            });
          }
        );
      } catch (error) {
        if (error) {
          console.error(error);
          return res.status(400).json({
            error,
          });
        }
      }
    }

    if (req.body.newEmail) {
      const queryNewEmail = req.body.newEmail;
      const queryPassword = req.body.password;

      try {
        const userDoc = await UserModel.findOne({ uuid: userUUID });

        if (userDoc === null)
          return res.status(400).json({
            message: "User not found with the given email",
          });

        const isSamePassword = await compare(queryPassword, userDoc.password);

        if (!isSamePassword)
          return res.status(400).json({
            message: "Invalid credentials",
          });

        userDoc.email = queryNewEmail;

        const tempUUID = Buffer.from(
          userDoc.username + "__" + queryNewEmail,
          "base64"
        ).join("");

        userDoc.uuid = tempUUID;

        const docRes = await userDoc.save();

        const payload = {
          uuid: docRes.uuid,
        };

        sign(
          payload,
          secret,
          {
            expiresIn: "7d",
          },
          (signErr, token) => {
            if (signErr) throw signErr;

            return res.status(200).json({ token });
          }
        );
      } catch (error) {
        if (error) {
          console.error(error);
          return res.status(400).json({
            error,
          });
        }
      }
    }

    if (req.body.newUsername) {
      const queryNewUsername = req.body.newUsername;

      try {
        const userDoc = await UserModel.findOneAndUpdate(
          {
            uuid: userUUID,
          },
          {
            $set: {
              username: queryNewUsername,
            },
          }
        );

        if (userDoc === null)
          return res.status(400).json({
            message: "User not found with the given email",
          });

        return res.sendStatus(200);
      } catch (error) {
        if (error) {
          console.error(error);
          return res.status(400).json({
            error,
          });
        }
      }
    }
  }
);

export default router;
